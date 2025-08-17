import { useDesignStore } from '../stores/designStore';
import { useDesignerUIStore } from '../stores/designerUIStore';
import * as fabric from 'fabric';

// Canvas service interface that wraps the existing design store
export interface CanvasService {
  // Element management
  addImage: (params: { url: string; name: string; metadata?: any }) => void;
  addText: (params: { content: string; font?: string; size?: number; color?: string }) => void;
  addShape: (params: { type: string; props?: any }) => void;
  
  // Color and styling
  applyColor: (params: { role: 'fill' | 'stroke' | 'text'; color: { r: number; g: number; b: number; a: number; hex: string } }) => void;
  applyFilter: (params: { type: 'brightness' | 'contrast' | 'saturation'; value: number }) => void;
  
  // Element properties
  setPersonalizable: (elementId: string, personalizable: boolean) => void;
  getSelection: () => { type: 'text' | 'shape' | 'image' | null; id?: string };
  
  // Layer management
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  lock: (id: string) => void;
  unlock: (id: string) => void;
  toggleVisibility: (id: string) => void;
}

// Implementation using the existing design store
export const useCanvasService = (): CanvasService => {
  const designStore = useDesignStore();
  const uiStore = useDesignerUIStore();

  return {
    addImage: ({ url, name, metadata }) => {
      const canvas = designStore.canvasState.canvas;
      if (canvas) {
        fabric.Image.fromURL(url).then((img: fabric.Image) => {
          // Add custom properties to the fabric object
          (img as any).customName = name;
          (img as any).customMetadata = metadata || {};
          
          img.set({
            left: 100,
            top: 100,
          });
          
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          
          // Track asset usage
          const asset = uiStore.assets.images.find(a => a.url === url);
          if (asset) {
            uiStore.incrementAssetUsage(asset.id);
          }
        });
      }
    },

    addText: ({ content, font = 'Inter', size = 32, color = '#111827' }) => {
      const canvas = designStore.canvasState.canvas;
      if (canvas) {
        const text = new fabric.Text(content, {
          left: 100,
          top: 100,
          fontFamily: font,
          fontSize: size,
          fill: color,
        });
        
        // Add custom properties
        (text as any).customName = `Text_${Date.now()}`;
        
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
      }
    },

    addShape: ({ type, props = {} }) => {
      const canvas = designStore.canvasState.canvas;
      if (canvas) {
        let shape: any;
        
        switch (type) {
          case 'rect':
            shape = new fabric.Rect({
              left: 100,
              top: 100,
              width: props.width || 100,
              height: props.height || 100,
              fill: props.fill || '#3B82F6',
              stroke: props.stroke || '#1E40AF',
              strokeWidth: props.strokeWidth || 2,
            });
            break;
            
          case 'circle':
            shape = new fabric.Circle({
              left: 100,
              top: 100,
              radius: props.radius || 50,
              fill: props.fill || '#3B82F6',
              stroke: props.stroke || '#1E40AF',
              strokeWidth: props.strokeWidth || 2,
            });
            break;
            
          case 'line':
            shape = new fabric.Line([0, 0, 100, 0], {
              left: 100,
              top: 100,
              stroke: props.stroke || '#1E40AF',
              strokeWidth: props.strokeWidth || 2,
            });
            break;
            
          case 'star':
            shape = new fabric.Polygon([
              { x: 0, y: -50 },
              { x: 14, y: -20 },
              { x: 47, y: -15 },
              { x: 23, y: 7 },
              { x: 29, y: 40 },
              { x: 0, y: 25 },
              { x: -29, y: 40 },
              { x: -23, y: 7 },
              { x: -47, y: -15 },
              { x: -14, y: -20 }
            ], {
              left: 100,
              top: 100,
              fill: props.fill || '#3B82F6',
              stroke: props.stroke || '#1E40AF',
              strokeWidth: props.strokeWidth || 2,
            });
            break;
            
          default:
            console.warn(`Unknown shape type: ${type}`);
            return;
        }
        
        // Add custom properties
        (shape as any).customName = `${type.charAt(0).toUpperCase() + type.slice(1)}_${Date.now()}`;
        
        canvas.add(shape);
        canvas.setActiveObject(shape);
        canvas.renderAll();
      }
    },

    applyColor: ({ role, color }) => {
      const canvas = designStore.canvasState.canvas;
      const activeObject = canvas?.getActiveObject();
      
      if (activeObject) {
        const { r, g, b, a, hex } = color;
        const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        
        switch (role) {
          case 'fill':
            activeObject.set('fill', rgbaColor);
            break;
          case 'stroke':
            activeObject.set('stroke', rgbaColor);
            break;
          case 'text':
            if (activeObject.type === 'text') {
              activeObject.set('fill', rgbaColor);
            }
            break;
        }
        
        canvas?.renderAll();
        
        // Add to recent colors
        uiStore.addRecentColor({ hex, rgb: { r, g, b }, alpha: a });
      }
    },

    applyFilter: ({ type, value }) => {
      const canvas = designStore.canvasState.canvas;
      const activeObject = canvas?.getActiveObject();
      
      if (activeObject && activeObject.type === 'image') {
        // Apply filters to image objects
        // This is a simplified implementation - in production you'd want more sophisticated filtering
        switch (type) {
          case 'brightness':
            (activeObject as any).set('brightness', value / 100);
            break;
          case 'contrast':
            (activeObject as any).set('contrast', value / 100);
            break;
          case 'saturation':
            (activeObject as any).set('saturation', value / 100);
            break;
        }
        
        canvas?.renderAll();
      }
    },

    setPersonalizable: (elementId, personalizable) => {
      const canvas = designStore.canvasState.canvas;
      const object = canvas?.getObjects().find(obj => (obj as any).customName === elementId);
      
      if (object) {
        (object as any).customMetadata = {
          ...(object as any).customMetadata,
          personalizable
        };
        canvas?.renderAll();
      }
    },

    getSelection: () => {
      const canvas = designStore.canvasState.canvas;
      const activeObject = canvas?.getActiveObject();
      
      if (!activeObject) {
        return { type: null };
      }
      
      let type: 'text' | 'shape' | 'image' | null = null;
      
      if (activeObject.type === 'text') {
        type = 'text';
      } else if (activeObject.type === 'image') {
        type = 'image';
      } else {
        type = 'shape';
      }
      
      return {
        type,
        id: (activeObject as any).customName || (activeObject as any)._id
      };
    },

    bringForward: (id) => {
      const canvas = designStore.canvasState.canvas;
      const object = canvas?.getObjects().find(obj => (obj as any).customName === id || (obj as any)._id === id);
      
      if (object && canvas) {
        canvas.bringObjectToFront(object);
        canvas.renderAll();
      }
    },

    sendBackward: (id) => {
      const canvas = designStore.canvasState.canvas;
      const object = canvas?.getObjects().find(obj => (obj as any).customName === id || (obj as any)._id === id);
      
      if (object && canvas) {
        canvas.sendObjectToBack(object);
        canvas.renderAll();
      }
    },

    lock: (id) => {
      const canvas = designStore.canvasState.canvas;
      const object = canvas?.getObjects().find(obj => (obj as any).customName === id || (obj as any)._id === id);
      
      if (object) {
        object.set('selectable', false);
        object.set('evented', false);
        canvas?.renderAll();
      }
    },

    unlock: (id) => {
      const canvas = designStore.canvasState.canvas;
      const object = canvas?.getObjects().find(obj => (obj as any).customName === id || (obj as any)._id === id);
      
      if (object) {
        object.set('selectable', true);
        object.set('evented', true);
        canvas?.renderAll();
      }
    },

    toggleVisibility: (id) => {
      const canvas = designStore.canvasState.canvas;
      const object = canvas?.getObjects().find(obj => (obj as any).customName === id || (obj as any)._id === id);
      
      if (object) {
        object.set('visible', !object.visible);
        canvas?.renderAll();
      }
    }
  };
};

// Export a singleton instance for use outside of React components
export const canvasService: CanvasService = {
  addImage: () => console.warn('Canvas service not initialized'),
  addText: () => console.warn('Canvas service not initialized'),
  addShape: () => console.warn('Canvas service not initialized'),
  applyColor: () => console.warn('Canvas service not initialized'),
  applyFilter: () => console.warn('Canvas service not initialized'),
  setPersonalizable: () => console.warn('Canvas service not initialized'),
  getSelection: () => ({ type: null }),
  bringForward: () => console.warn('Canvas service not initialized'),
  sendBackward: () => console.warn('Canvas service not initialized'),
  lock: () => console.warn('Canvas service not initialized'),
  unlock: () => console.warn('Canvas service not initialized'),
  toggleVisibility: () => console.warn('Canvas service not initialized'),
};

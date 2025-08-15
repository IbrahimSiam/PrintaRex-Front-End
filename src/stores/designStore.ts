import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as fabric from 'fabric';

export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  fabricObject: fabric.Object;
  metadata: {
    name: string;
    createdAt: Date;
    lastModified: Date;
  };
}

export interface CanvasState {
  canvas: fabric.Canvas | null;
  selectedObject: fabric.Object | null;
  zoom: number;
  pan: { x: number; y: number };
}

export interface DesignState {
  // Core state
  productId: string | null;
  canvasJSON: string | null;
  previewDataURL: string | null;
  elements: DesignElement[];
  canvasState: CanvasState;
  
  // Multi-side support
  activeSide: 'front' | 'back';
  frontCanvasJSON: string | null;
  backCanvasJSON: string | null;
  frontElements: DesignElement[];
  backElements: DesignElement[];
  
  // UI state
  selectedTool: 'select' | 'text' | 'image' | 'shape' | 'align' | 'layers';
  textPresets: {
    headline: { fontSize: 48, fontWeight: 'bold', fontFamily: 'Arial' };
    subtitle: { fontSize: 24, fontWeight: 'normal', fontFamily: 'Arial' };
    body: { fontSize: 16, fontWeight: 'normal', fontFamily: 'Arial' };
  };
  
  // Design settings
  printArea: { x: number; y: number; width: number; height: number };
  safeArea: { x: number; y: number; width: number; height: number };
  snapToGrid: boolean;
  snapToCenter: boolean;
  showGuides: boolean;
}

export interface DesignActions {
  // Canvas management
  initializeCanvas: (canvasElement: HTMLCanvasElement) => void;
  destroyCanvas: () => void;
  
  // Element management
  addText: (text: string, preset?: keyof DesignState['textPresets']) => void;
  addImage: (file: File) => void;
  addShape: (type: 'rect' | 'circle') => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  
  // Selection and editing
  selectObject: (object: fabric.Object | null) => void;
  updateSelectedObject: (updates: Partial<fabric.Object>) => void;
  
  // Alignment and layers
  alignLeft: () => void;
  alignCenter: () => void;
  alignRight: () => void;
  centerHorizontally: () => void;
  centerVertically: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  
  // Canvas operations
  setZoom: (zoom: number) => void;
  resetZoom: () => void;
  fitToScreen: () => void;
  centerCanvas: () => void;
  
        // Design persistence
      saveDesign: (name: string) => void;
      loadDesign: (designId: string) => void;
      renderPreview: () => Promise<string>;
      clear: () => void;
      exportCanvas: (format: 'png' | 'svg' | 'json') => void;
      
  // UI actions
  setSelectedTool: (tool: DesignState['selectedTool']) => void;
  toggleSnapToGrid: () => void;
  toggleSnapToCenter: () => void;
  toggleGuides: () => void;
  
  // Multi-side actions
  switchSide: (side: 'front' | 'back') => void;
  saveCurrentSide: () => void;
  loadSide: (side: 'front' | 'back') => void;
  getCurrentElements: () => DesignElement[];
  
  // Keyboard shortcuts
  handleKeyDown: (event: KeyboardEvent) => void;
      
      // Enhanced persistence
      getSavedDesigns: () => any[];
      deleteSavedDesign: (designId: string) => void;
}

export type DesignStore = DesignState & DesignActions;

export const useDesignStore = create<DesignStore>()(
  persist(
    (set, get) => ({
      // Initial state
      productId: null,
      canvasJSON: null,
      previewDataURL: null,
      elements: [],
      canvasState: { canvas: null, selectedObject: null, zoom: 1, pan: { x: 0, y: 0 } },
      activeSide: 'front',
      frontCanvasJSON: null,
      backCanvasJSON: null,
      frontElements: [],
      backElements: [],
      selectedTool: 'select',
      textPresets: {
        headline: { fontSize: 48, fontWeight: 'bold', fontFamily: 'Arial' },
        subtitle: { fontSize: 24, fontWeight: 'normal', fontFamily: 'Arial' },
        body: { fontSize: 16, fontWeight: 'normal', fontFamily: 'Arial' },
      },
      
      printArea: { x: 100, y: 100, width: 300, height: 400 },
      safeArea: { x: 120, y: 120, width: 260, height: 360 },
      snapToGrid: true,
      snapToCenter: true,
      showGuides: true,

      // Canvas management
      initializeCanvas: (canvasElement: HTMLCanvasElement) => {
        const canvas = new fabric.Canvas(canvasElement, {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff',
          selection: true,
          preserveObjectStacking: true,
        });

        // Set up canvas events
        canvas.on('selection:created', (e) => {
          set({ canvasState: { ...get().canvasState, selectedObject: e.selected?.[0] || null } });
        });

        canvas.on('selection:updated', (e) => {
          set({ canvasState: { ...get().canvasState, selectedObject: e.selected?.[0] || null } });
        });

        canvas.on('selection:cleared', () => {
          set({ canvasState: { ...get().canvasState, selectedObject: null } });
        });

        canvas.on('object:modified', () => {
          const { canvas } = get().canvasState;
          if (canvas) {
            set({ canvasJSON: JSON.stringify(canvas.toJSON()) });
          }
        });

        // Add print area and safe area guides
        const printArea = new fabric.Rect({
          left: get().printArea.x,
          top: get().printArea.y,
          width: get().printArea.width,
          height: get().printArea.height,
          fill: 'transparent',
          stroke: '#1976d2',
          strokeWidth: 2,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
        });

        const safeArea = new fabric.Rect({
          left: get().safeArea.x,
          top: get().safeArea.y,
          width: get().safeArea.width,
          height: get().safeArea.height,
          fill: 'transparent',
          stroke: '#ff9800',
          strokeWidth: 1,
          strokeDashArray: [3, 3],
          selectable: false,
          evented: false,
        });

        canvas.add(printArea);
        canvas.add(safeArea);
        canvas.renderAll();

        set({ 
          canvasState: { ...get().canvasState, canvas },
          canvasJSON: JSON.stringify(canvas.toJSON())
        });
      },

      destroyCanvas: () => {
        const { canvas } = get().canvasState;
        if (canvas) {
          canvas.dispose();
        }
        set({ 
          canvasState: { canvas: null, selectedObject: null, zoom: 1, pan: { x: 0, y: 0 } },
          elements: [],
          canvasJSON: null
        });
      },

      // Element management
      addText: (text: string, preset: keyof DesignState['textPresets'] = 'body') => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        const presetStyles = get().textPresets[preset];
        const textObject = new fabric.Text(text, {
          left: 200,
          top: 200,
          ...presetStyles,
          fill: '#000000',
          selectable: true,
          editable: true,
        });

        const element: DesignElement = {
          id: `text_${Date.now()}`,
          type: 'text',
          fabricObject: textObject,
          metadata: {
            name: `Text ${text.substring(0, 20)}`,
            createdAt: new Date(),
            lastModified: new Date(),
          },
        };

        canvas.add(textObject);
        canvas.setActiveObject(textObject);
        canvas.renderAll();

        const { activeSide } = get();
        const currentElements = get()[`${activeSide}Elements`];
        
        set({ 
          [`${activeSide}Elements`]: [...currentElements, element],
          [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON())
        });
      },

      addImage: (file: File) => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const fabricImage = new fabric.Image(img, {
              left: 200,
              top: 200,
              selectable: true,
              scaleX: 0.5,
              scaleY: 0.5,
            });

            const element: DesignElement = {
              id: `image_${Date.now()}`,
              type: 'image',
              fabricObject: fabricImage,
              metadata: {
                name: file.name,
                createdAt: new Date(),
                lastModified: new Date(),
              },
            };

            canvas.add(fabricImage);
            canvas.setActiveObject(fabricImage);
            canvas.renderAll();

            const { activeSide } = get();
            const currentElements = get()[`${activeSide}Elements`];
            
            set({ 
              [`${activeSide}Elements`]: [...currentElements, element],
              [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON())
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      },

      addShape: (type: 'rect' | 'circle') => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        let shapeObject: fabric.Object;
        
        if (type === 'rect') {
          shapeObject = new fabric.Rect({
            left: 200,
            top: 200,
            width: 100,
            height: 100,
            fill: '#1976d2',
            selectable: true,
          });
        } else {
          shapeObject = new fabric.Circle({
            left: 200,
            top: 200,
            radius: 50,
            fill: '#1976d2',
            selectable: true,
          });
        }

        const element: DesignElement = {
          id: `shape_${Date.now()}`,
          type: 'shape',
          fabricObject: shapeObject,
          metadata: {
            name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
            createdAt: new Date(),
            lastModified: new Date(),
          },
        };

        canvas.add(shapeObject);
        canvas.setActiveObject(shapeObject);
        canvas.renderAll();

        const { activeSide } = get();
        const currentElements = get()[`${activeSide}Elements`];
        
        set({ 
          [`${activeSide}Elements`]: [...currentElements, element],
          [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON())
        });
      },

      deleteSelected: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        canvas.remove(selectedObject);
        canvas.renderAll();
        
        const { activeSide } = get();
        const currentElements = get()[`${activeSide}Elements`];
        const updatedElements = currentElements.filter(el => el.fabricObject !== selectedObject);
        
        set({ 
          canvasState: { ...get().canvasState, selectedObject: null },
          [`${activeSide}Elements`]: updatedElements,
          [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON())
        });
      },

      duplicateSelected: async () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        try {
          const cloned = await selectedObject.clone();
          if (cloned) {
            cloned.set({
              left: (selectedObject.left || 0) + 20,
              top: (selectedObject.top || 0) + 20,
            });

            const element: DesignElement = {
              id: `${cloned.type}_${Date.now()}`,
              type: cloned.type === 'i-text' ? 'text' : cloned.type === 'image' ? 'image' : 'shape',
              fabricObject: cloned,
              metadata: {
                name: `Copy of ${get()[`${get().activeSide}Elements`].find(el => el.fabricObject === selectedObject)?.metadata.name || 'Object'}`,
                createdAt: new Date(),
                lastModified: new Date(),
              },
            };

            canvas.add(cloned);
            canvas.setActiveObject(cloned);
            canvas.renderAll();

            const { activeSide } = get();
            const currentElements = get()[`${activeSide}Elements`];
            
            set({ 
              [`${activeSide}Elements`]: [...currentElements, element],
              [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON())
            });
          }
        } catch (error) {
          console.error('Error duplicating object:', error);
        }
      },

      // Selection and editing
      selectObject: (object: fabric.Object | null) => {
        set({ canvasState: { ...get().canvasState, selectedObject: object } });
      },

      updateSelectedObject: (updates: Partial<fabric.Object>) => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        selectedObject.set(updates);
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      // Alignment and layers
      alignLeft: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        selectedObject.set({ left: get().printArea.x });
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      alignCenter: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        const centerX = get().printArea.x + get().printArea.width / 2;
        selectedObject.set({ left: centerX - (selectedObject.width || 0) / 2 });
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      alignRight: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        const rightX = get().printArea.x + get().printArea.width;
        selectedObject.set({ left: rightX - (selectedObject.width || 0) });
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      centerHorizontally: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        const centerX = get().printArea.x + get().printArea.width / 2;
        selectedObject.set({ left: centerX - (selectedObject.width || 0) / 2 });
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      centerVertically: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        const centerY = get().printArea.y + get().printArea.height / 2;
        selectedObject.set({ top: centerY - (selectedObject.height || 0) / 2 });
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      bringForward: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        canvas.bringObjectForward(selectedObject);
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      sendBackward: () => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        canvas.sendObjectBackwards(selectedObject);
        canvas.renderAll();
        
        const { activeSide } = get();
        set({ [`${activeSide}CanvasJSON`]: JSON.stringify(canvas.toJSON()) });
      },

      // Canvas operations
      setZoom: (zoom: number) => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        canvas.setZoom(zoom);
        set({ canvasState: { ...get().canvasState, zoom } });
      },

      resetZoom: () => {
        get().setZoom(1);
      },

      fitToScreen: () => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const containerWidth = canvas.getElement().parentElement?.clientWidth || canvasWidth;
        const containerHeight = canvas.getElement().parentElement?.clientHeight || canvasHeight;

        const scaleX = containerWidth / canvasWidth;
        const scaleY = containerHeight / canvasHeight;
        const scale = Math.min(scaleX, scaleY, 1);

        get().setZoom(scale);
      },

      centerCanvas: () => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        set({ canvasState: { ...get().canvasState, pan: { x: 0, y: 0 } } });
      },

      // Design persistence
      saveDesign: () => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        const designData = {
          id: Date.now().toString(),
          productId: get().productId,
          canvasJSON: JSON.stringify(canvas.toJSON()),
          frontCanvasJSON: get().frontCanvasJSON,
          backCanvasJSON: get().backCanvasJSON,
          frontElements: get().frontElements,
          backElements: get().backElements,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem(`design_${designData.id}`, JSON.stringify(designData));
        console.log('Design saved:', designData.id);
      },

      loadDesign: (designId: string) => {
        const designData = localStorage.getItem(`design_${designId}`);
        if (!designData) return;

        const design = JSON.parse(designData);
        const { canvas } = get().canvasState;
        if (!canvas) return;

        try {
          // Load the current active side
          const currentSide = get().activeSide;
          const sideCanvasJSON = design[`${currentSide}CanvasJSON`] || design.canvasJSON;
          
          canvas.loadFromJSON(sideCanvasJSON, () => {
            canvas.renderAll();
            
            // Update the current side's data
            const sideElements = design[`${currentSide}Elements`] || design.elements || [];
            set({ 
              productId: design.productId,
              [`${currentSide}CanvasJSON`]: sideCanvasJSON,
              [`${currentSide}Elements`]: sideElements,
              // Also update the legacy fields for compatibility
              canvasJSON: design.canvasJSON,
              elements: sideElements,
            });
          });
        } catch (error) {
          console.error('Error loading design:', error);
        }
      },

      renderPreview: async () => {
        const { canvas } = get().canvasState;
        if (!canvas) return '';

        return new Promise((resolve) => {
          canvas.renderAll();
          const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 1,
          });
          resolve(dataURL);
        });
      },

      clear: () => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        canvas.clear();
        const { activeSide } = get();
        
        set({ 
          [`${activeSide}Elements`]: [],
          [`${activeSide}CanvasJSON`]: null,
          previewDataURL: null,
        });
      },

      exportCanvas: (format: 'png' | 'svg' | 'json') => {
        const { canvas } = get().canvasState;
        if (!canvas) return;

        switch (format) {
          case 'png':
            const dataURL = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 });
            const link = document.createElement('a');
            link.download = 'design.png';
            link.href = dataURL;
            link.click();
            break;
          case 'svg':
            const svg = canvas.toSVG();
            const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const svgLink = document.createElement('a');
            svgLink.download = 'design.svg';
            svgLink.href = svgUrl;
            svgLink.click();
            break;
          case 'json':
            const json = JSON.stringify(canvas.toJSON(), null, 2);
            const jsonBlob = new Blob([json], { type: 'application/json' });
            const jsonUrl = URL.createObjectURL(jsonBlob);
            const jsonLink = document.createElement('a');
            jsonLink.download = 'design.json';
            jsonLink.href = jsonUrl;
            jsonLink.click();
            break;
        }
      },

      // UI actions
      setSelectedTool: (tool: DesignState['selectedTool']) => {
        set({ selectedTool: tool });
      },

      toggleSnapToGrid: () => {
        set({ snapToGrid: !get().snapToGrid });
      },

      toggleSnapToCenter: () => {
        set({ snapToCenter: !get().snapToCenter });
      },

      toggleGuides: () => {
        set({ showGuides: !get().showGuides });
      },

      // Multi-side actions
      switchSide: (side: 'front' | 'back') => {
        const { canvas } = get().canvasState;
        if (!canvas) return;
        
        // Save current side before switching
        const currentSide = get().activeSide;
        const currentCanvasJSON = JSON.stringify(canvas.toJSON());
        const currentElements = get()[`${currentSide}Elements`];
        
        // Save current side data
        set({
          [`${currentSide}CanvasJSON`]: currentCanvasJSON,
          [`${currentSide}Elements`]: currentElements,
        });
        
        // Switch to new side
        set({ activeSide: side });
        
        // Load the new side's data
        const newSideCanvasJSON = get()[`${side}CanvasJSON`];
        const newSideElements = get()[`${side}Elements`];
        
        if (newSideCanvasJSON) {
          try {
            canvas.loadFromJSON(newSideCanvasJSON, () => {
              canvas.renderAll();
              // Update elements to match the loaded canvas
              const canvasObjects = canvas.getObjects();
              const updatedElements: DesignElement[] = canvasObjects.map((obj, index) => ({
                id: newSideElements[index]?.id || `obj_${Date.now()}_${index}`,
                type: obj.type === 'i-text' ? 'text' : obj.type === 'image' ? 'image' : 'shape',
                fabricObject: obj,
                metadata: newSideElements[index]?.metadata || {
                  name: `Object ${index + 1}`,
                  createdAt: new Date(),
                  lastModified: new Date(),
                },
              }));
              
              set({
                [`${side}Elements`]: updatedElements,
                canvasState: { ...get().canvasState, selectedObject: null },
              });
            });
          } catch (error) {
            console.error('Error loading side data:', error);
            // If loading fails, clear the canvas
            canvas.clear();
            set({
              [`${side}Elements`]: [],
              [`${side}CanvasJSON`]: null,
              canvasState: { ...get().canvasState, selectedObject: null },
            });
          }
        } else {
          // New side, clear canvas
          canvas.clear();
          set({
            [`${side}Elements`]: [],
            [`${side}CanvasJSON`]: null,
            canvasState: { ...get().canvasState, selectedObject: null },
          });
        }
      },

      saveCurrentSide: () => {
        const { canvas } = get().canvasState;
        const { activeSide } = get();
        if (!canvas) return;

        const sideData = {
          id: `${activeSide}_${Date.now()}`,
          canvasJSON: JSON.stringify(canvas.toJSON()),
          elements: get()[`${activeSide}Elements`],
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem(`${activeSide}_design_${sideData.id}`, JSON.stringify(sideData));
        console.log(`${activeSide} design saved:`, sideData.id);
      },

      loadSide: (side: 'front' | 'back') => {
        const sideData = localStorage.getItem(`${side}_design_${get().activeSide}_${Date.now()}`);
        if (!sideData) return;

        const design = JSON.parse(sideData);
        const { canvas } = get().canvasState;
        if (!canvas) return;

        try {
          canvas.loadFromJSON(design.canvasJSON, () => {
            canvas.renderAll();
            set({ 
              [`${side}Elements`]: design.elements || [],
              [`${side}CanvasJSON`]: design.canvasJSON,
            });
          });
        } catch (error) {
          console.error('Error loading side design:', error);
        }
      },

      getCurrentElements: () => {
        const { activeSide } = get();
        return get()[`${activeSide}Elements`];
      },

      // Keyboard shortcuts
      handleKeyDown: (event: KeyboardEvent) => {
        const { canvas, selectedObject } = get().canvasState;
        if (!canvas || !selectedObject) return;

        const moveAmount = event.shiftKey ? 10 : 1;

        switch (event.key) {
          case 'Delete':
          case 'Backspace':
            event.preventDefault();
            get().deleteSelected();
            break;
          case 'd':
            if (event.ctrlKey || event.metaKey) {
              event.preventDefault();
              get().duplicateSelected();
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            selectedObject.set({ top: (selectedObject.top || 0) - moveAmount });
            break;
          case 'ArrowDown':
            event.preventDefault();
            selectedObject.set({ top: (selectedObject.top || 0) + moveAmount });
            break;
          case 'ArrowLeft':
            event.preventDefault();
            selectedObject.set({ left: (selectedObject.left || 0) - moveAmount });
            break;
          case 'ArrowRight':
            event.preventDefault();
            selectedObject.set({ left: (selectedObject.left || 0) + moveAmount });
            break;
        }

        canvas.renderAll();
        set({ canvasJSON: JSON.stringify(canvas.toJSON()) });
      },

      // Enhanced persistence
      getSavedDesigns: () => {
        try {
          const designsJson = localStorage.getItem('printarex_designs');
          if (!designsJson) return [];
          
          const designs = JSON.parse(designsJson);
          return Array.isArray(designs) ? designs : [];
        } catch (error) {
          console.error('Error getting designs from storage:', error);
          return [];
        }
      },

      deleteSavedDesign: (designId: string) => {
        try {
          const designs = get().getSavedDesigns();
          const filteredDesigns = designs.filter((d: any) => d.id !== designId);
          localStorage.setItem('printarex_designs', JSON.stringify(filteredDesigns));
          console.log('Design deleted from storage:', designId);
        } catch (error) {
          console.error('Error deleting design from storage:', error);
          throw error;
        }
      },
    }),
    {
      name: 'design-store',
      partialize: (state) => ({
        productId: state.productId,
        canvasJSON: state.canvasJSON,
        elements: state.elements,
        printArea: state.printArea,
        safeArea: state.safeArea,
        snapToGrid: state.snapToGrid,
        snapToCenter: state.snapToCenter,
        showGuides: state.showGuides,
      }),
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PrintView = 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'innerNeck' | 'outerNeck';

export type DesignerStep = 'design' | 'mockups' | 'details' | 'prices' | 'review';

export type ObjectType = 'text' | 'image' | 'shape';

export interface BaseObject {
  id: string;
  type: ObjectType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  opacity?: number;
  locked?: boolean;
  visible?: boolean;
  zIndex?: number;
}

export interface TextObject extends BaseObject {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;      // text color
  align: 'left' | 'center' | 'right';
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bold italic';
}

export interface ImageObject extends BaseObject {
  type: 'image';
  src: string;        // URL or data URI
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface ShapeObject extends BaseObject {
  type: 'shape';
  shape: 'rect' | 'circle' | 'triangle' | 'line';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number; // for rect
}

export type SceneObject = TextObject | ImageObject | ShapeObject;

export interface ProductAsset {
  view: PrintView;
  // absolute URL to the mockup base image for this view/color
  src: string;
  // print area in image pixel coordinates (x,y,w,h) relative to mockup
  printArea: { x: number; y: number; width: number; height: number };
}

export interface ProductData {
  productId: string;
  productName: string;
  color: string; // selected color name/key
  sizeRange: string[]; // S..5XL etc (not critical for canvas)
  technology: 'DTG' | 'DyeSub' | string;
  assetsByColor: Record<string, ProductAsset[]>; // color -> array of per-view assets
  initialView: PrintView; // which view to start on (front)
}

export interface Scene {
  view: PrintView;          // current view
  color: string;            // current color
  objects: SceneObject[];   // design nodes on this view
  printArea: { x: number; y: number; width: number; height: number };
  mockupSrc: string;        // base mockup for current view/color
}

export interface DesignerState {
  productData?: ProductData;
  scene: Scene;
  selection: string[]; // selected object IDs (support multi-select)
  history: { past: Scene[]; future: Scene[] };
  scenesByView: Record<PrintView, Scene>; // store scenes for each view
  
  // Step management (for backward compatibility)
  activeStep: DesignerStep;
  setActiveStep: (step: DesignerStep) => void;
  
  // Step validation and navigation
  stepValidation: Record<DesignerStep, boolean>;
  canNavigateToStep: (step: DesignerStep) => boolean;
  nextStep: () => void;
  previousStep: () => void;
  
  // Legacy properties for backward compatibility
  details: {
    title: string;
    description: string;
    tags: string[];
    careInstructions: {
      washing: string;
      drying: string;
      ironing: string;
      additional: string;
    };
  };
  updateDetails: (updates: Partial<DesignerState['details']>) => void;
  
  mockups: Array<{
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    isPrimary: boolean;
    tags: string[];
  }>;
  setPrimaryMockup: (mockupId: string) => void;
  
  pricing: {
    currency: string;
    variants: Array<{
      id: string;
      size: string;
      retailPrice: number;
      productCost: number;
      shipping: number;
      estimatedProfit: number;
    }>;
  };
  updatePricing: (updates: Partial<DesignerState['pricing']>) => void;
  updateVariantPrice: (size: string, field: keyof DesignerState['pricing']['variants'][0], value: number) => void;

  // actions
  initFromProduct(productData: ProductData): void;
  setView(view: PrintView): void;
  setColor(color: string): void;
  addText(payload?: Partial<TextObject>): void;
  addImage(payload: { src: string; width?: number; height?: number }): Promise<void>;
  addShape(payload: Partial<ShapeObject> & { shape: ShapeObject['shape'] }): void;
  updateObject(id: string, patch: Partial<SceneObject>): void;
  removeObject(id: string): void;
  reorder(id: string, direction: 'forward' | 'back' | 'front' | 'backward'): void;
  setSelection(ids: string[]): void;

  // Multi-select helpers
  addToSelection(id: string): void;
  removeFromSelection(id: string): void;
  clearSelection(): void;

  // keep objects constrained to print area (called on drag/transform end)
  clampToPrintArea(id: string): void;

  // undo / redo
  undo(): void;
  redo(): void;

  // serialization
  toJSON(): string;
  fromJSON(json: string): void;
  
  // Legacy actions for backward compatibility
  saveTemplate: () => void;
  addToStore: () => void;
  placeOrder: () => void;
}

const createEmptyScene = (view: PrintView, color: string): Scene => ({
  view,
  color,
  objects: [],
  printArea: { x: 0, y: 0, width: 1000, height: 1000 },
  mockupSrc: ''
});

const createDefaultTextObject = (printArea: { x: number; y: number; width: number; height: number }): TextObject => ({
  id: `text_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type: 'text',
  text: 'Your text',
  fontFamily: 'Inter',
  fontSize: 48,
  fill: '#000000',
  align: 'center',
  fontStyle: 'normal',
  x: printArea.x + printArea.width / 2,
  y: printArea.y + printArea.height / 2,
  width: 200,
  height: 60,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  opacity: 1,
  locked: false,
  visible: true,
  zIndex: 1
});

export const useDesignerStore = create<DesignerState>()(
  persist(
    (set, get) => ({
      productData: undefined,
      scene: createEmptyScene('front', 'black'),
      selection: [],
      history: { past: [], future: [] },
      scenesByView: {
        front: createEmptyScene('front', 'black'),
        back: createEmptyScene('back', 'black'),
        leftSleeve: createEmptyScene('leftSleeve', 'black'),
        rightSleeve: createEmptyScene('rightSleeve', 'black'),
        innerNeck: createEmptyScene('innerNeck', 'black'),
        outerNeck: createEmptyScene('outerNeck', 'black')
      },
      
      // Step management (for backward compatibility)
      activeStep: 'design' as const,
      setActiveStep: (step: DesignerStep) => set({ activeStep: step }),
      
      // Step validation and navigation
      stepValidation: {
        design: true,
        mockups: true,
        details: false,
        prices: true,
        review: true,
      },
      canNavigateToStep: (step: DesignerStep) => {
        const state = get();
        const stepOrder: DesignerStep[] = ['design', 'mockups', 'details', 'prices', 'review'];
        const currentIndex = stepOrder.indexOf(state.activeStep);
        const targetIndex = stepOrder.indexOf(step);
        
        if (targetIndex > currentIndex) {
          return state.stepValidation[state.activeStep];
        }
        return true;
      },
      nextStep: () => {
        const state = get();
        const stepOrder: DesignerStep[] = ['design', 'mockups', 'details', 'prices', 'review'];
        const currentIndex = stepOrder.indexOf(state.activeStep);
        
        if (currentIndex < stepOrder.length - 1 && state.stepValidation[state.activeStep]) {
          set({ activeStep: stepOrder[currentIndex + 1] });
        }
      },
      previousStep: () => {
        const state = get();
        const stepOrder: DesignerStep[] = ['design', 'mockups', 'details', 'prices', 'review'];
        const currentIndex = stepOrder.indexOf(state.activeStep);
        
        if (currentIndex > 0) {
          set({ activeStep: stepOrder[currentIndex - 1] });
        }
      },
      
      // Legacy properties for backward compatibility
      details: {
        title: 'Custom Short Sleeve T-Shirt',
        description: 'High-quality custom t-shirt with your unique design. Perfect for personal use, gifts, or business branding.',
        tags: ['custom', 't-shirt', 'print-on-demand'],
        careInstructions: {
          washing: 'Machine wash cold, gentle cycle',
          drying: 'Tumble dry low, or air dry',
          ironing: 'Iron on low heat if needed',
          additional: 'Do not bleach. Wash with similar colors.',
        },
      },
      updateDetails: (updates) => set((state) => ({
        details: { ...state.details, ...updates }
      })),
      
      mockups: [
        { 
          id: '1', 
          name: 'Front View', 
          imageUrl: '/assets/img/tee.jpg', 
          description: 'Classic front view of the t-shirt',
          isPrimary: true,
          tags: ['front', 'classic']
        },
        { 
          id: '2', 
          name: 'Back View', 
          imageUrl: '/assets/img/tee-back.jpg', 
          description: 'Back view showing the design',
          isPrimary: false,
          tags: ['back', 'design']
        },
        { 
          id: '3', 
          name: 'Side View', 
          imageUrl: '/assets/img/tee-side1.jpg', 
          description: 'Side profile of the t-shirt',
          isPrimary: false,
          tags: ['side', 'profile']
        },
        { 
          id: '4', 
          name: 'Lifestyle', 
          imageUrl: '/assets/img/tee-side2.jpg', 
          description: 'Lifestyle shot in context',
          isPrimary: false,
          tags: ['lifestyle', 'context']
        },
      ],
      setPrimaryMockup: (mockupId) => set((state) => ({
        mockups: state.mockups.map(mockup => ({
          ...mockup,
          isPrimary: mockup.id === mockupId
        }))
      })),
      
      pricing: {
        currency: 'USD',
        variants: [
          { id: 's', size: 'S', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
          { id: 'm', size: 'M', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
          { id: 'l', size: 'L', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
          { id: 'xl', size: 'XL', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
          { id: 'xxl', size: 'XXL', retailPrice: 32.99, productCost: 13.50, shipping: 5.99, estimatedProfit: 13.50 },
        ],
      },
      updatePricing: (updates) => set((state) => ({
        pricing: { ...state.pricing, ...updates }
      })),
      updateVariantPrice: (size, field, value) => set((state) => ({
        pricing: {
          ...state.pricing,
          variants: state.pricing.variants.map(variant => {
            if (variant.size === size) {
              const updated = { ...variant, [field]: value };
              if (field === 'retailPrice' || field === 'productCost' || field === 'shipping') {
                updated.estimatedProfit = updated.retailPrice - updated.productCost - updated.shipping;
              }
              return updated;
            }
            return variant;
          })
        }
      })),

      initFromProduct: (productData: ProductData) => {
        console.log('initFromProduct called with:', productData);
        const { color, initialView, assetsByColor } = productData;
        console.log('color:', color, 'initialView:', initialView);
        console.log('assetsByColor:', assetsByColor);
        
        const colorAssets = assetsByColor[color] || [];
        console.log('colorAssets for', color, ':', colorAssets);
        
        const initialAsset = colorAssets.find(asset => asset.view === initialView);
        console.log('initialAsset found:', initialAsset);
        
        if (initialAsset) {
          const newScene: Scene = {
            view: initialView,
            color,
            objects: [],
            printArea: initialAsset.printArea,
            mockupSrc: initialAsset.src
          };
          console.log('Creating new scene:', newScene);

          set({
            productData,
            scene: newScene,
            scenesByView: {
              ...get().scenesByView,
              [initialView]: newScene
            }
          });
        } else {
          console.error('No initial asset found for view:', initialView, 'in color:', color);
        }
      },

      setView: (view: PrintView) => {
        const state = get();
        const { scene } = state;
        const color = scene.color;
        const scenesByView = state.scenesByView;
        
        // Save current scene to scenesByView
        const updatedScenesByView = {
          ...scenesByView,
          [scene.view]: scene
        };

        // Load scene for new view, or create empty one
        let newScene = scenesByView[view];
        if (!newScene) {
          newScene = createEmptyScene(view, color);
        }

        // Update product data if available
        if (state.productData) {
          const colorAssets = state.productData.assetsByColor[color] || [];
          const asset = colorAssets.find(a => a.view === view);
          if (asset) {
            newScene = {
              ...newScene,
              printArea: asset.printArea,
              mockupSrc: asset.src
            };
          }
        }

        set({
          scene: newScene,
          scenesByView: updatedScenesByView,
          selection: []
        });
      },

      setColor: (color: string) => {
        const state = get();
        const { scene } = state;
        const view = scene.view;
        const scenesByView = state.scenesByView;
        
        // Save current scene
        const updatedScenesByView = {
          ...scenesByView,
          [view]: scene
        };

        // Load scene for new color, or create empty one
        let newScene = scenesByView[view];
        if (!newScene) {
          newScene = createEmptyScene(view, color);
        }

        // Update product data if available
        if (state.productData) {
          const colorAssets = state.productData.assetsByColor[color] || [];
          const asset = colorAssets.find(a => a.view === view);
          if (asset) {
            newScene = {
              ...newScene,
              printArea: asset.printArea,
              mockupSrc: asset.src
            };
          }
        }

        set({
          scene: newScene,
          scenesByView: updatedScenesByView,
          selection: []
        });
      },

      addText: (payload: Partial<TextObject> = {}) => {
        const state = get();
        const { scene } = state;
        const textObject = createDefaultTextObject(scene.printArea);
        
        const newObject: TextObject = { ...textObject, ...payload };
        const newScene: Scene = {
          view: scene.view,
          color: scene.color,
          objects: [...scene.objects, newObject],
          printArea: scene.printArea,
          mockupSrc: scene.mockupSrc
        };

        // Save to history
        const newHistory = {
          past: [...state.history.past, scene],
          future: []
        };

        set({
          scene: newScene,
          history: newHistory,
          selection: [newObject.id]
        });
      },

      addImage: async (payload: { src: string; width?: number; height?: number }) => {
        const state = get();
        const { scene } = state;
        
        // Load image to get natural dimensions
        const img = new Image();
        img.src = payload.src;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const { width = img.naturalWidth, height = img.naturalHeight } = payload;
        
        // Scale image to fit print area if it's too large
        const maxWidth = scene.printArea.width * 0.8;
        const maxHeight = scene.printArea.height * 0.8;
        
        let finalWidth = width;
        let finalHeight = height;
        
        if (width > maxWidth || height > maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          finalWidth = width * scale;
          finalHeight = height * scale;
        }

        const imageObject: ImageObject = {
          id: `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'image',
          src: payload.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          x: scene.printArea.x + (scene.printArea.width - finalWidth) / 2,
          y: scene.printArea.y + (scene.printArea.height - finalHeight) / 2,
          width: finalWidth,
          height: finalHeight,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          locked: false,
          visible: true,
          zIndex: 1
        };

        const newScene: Scene = {
          view: scene.view,
          color: scene.color,
          objects: [...scene.objects, imageObject],
          printArea: scene.printArea,
          mockupSrc: scene.mockupSrc
        };

        // Save to history
        const newHistory = {
          past: [...state.history.past, scene],
          future: []
        };

        set({
          scene: newScene,
          history: newHistory,
          selection: [imageObject.id]
        });
      },

      addShape: (payload: Partial<ShapeObject> & { shape: ShapeObject['shape'] }) => {
        const state = get();
        const { scene } = state;
        
        const defaultShape: ShapeObject = {
          id: `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'shape',
          shape: payload.shape,
          fill: payload.fill || '#00000010',
          stroke: payload.stroke || '#333333',
          strokeWidth: payload.strokeWidth || 2,
          x: scene.printArea.x + scene.printArea.width / 2,
          y: scene.printArea.y + scene.printArea.height / 2,
          width: payload.width || 300,
          height: payload.height || 150,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          locked: false,
          visible: true,
          zIndex: 1
        };

        const newObject = { ...defaultShape, ...payload };
        const newScene: Scene = {
          view: scene.view,
          color: scene.color,
          objects: [...scene.objects, newObject],
          printArea: scene.printArea,
          mockupSrc: scene.mockupSrc
        };

        // Save to history
        const newHistory = {
          past: [...state.history.past, scene],
          future: []
        };

        set({
          scene: newScene,
          history: newHistory,
          selection: [newObject.id]
        });
      },

      updateObject: (id: string, patch: Partial<SceneObject>) => {
        const state = get();
        const { scene } = state;
        
        const newObjects: SceneObject[] = scene.objects.map((obj): SceneObject => {
          if (obj.id === id) {
            // Type-safe merge based on object type
            if (obj.type === 'text') {
              return { ...obj, ...patch } as TextObject;
            } else if (obj.type === 'image') {
              return { ...obj, ...patch } as ImageObject;
            } else if (obj.type === 'shape') {
              return { ...obj, ...patch } as ShapeObject;
            }
          }
          return obj;
        });

        const newScene: Scene = {
          view: scene.view,
          color: scene.color,
          objects: newObjects,
          printArea: scene.printArea,
          mockupSrc: scene.mockupSrc
        };

        // Save to history
        const newHistory = {
          past: [...state.history.past, scene],
          future: []
        };

        set({
          scene: newScene,
          history: newHistory
        });
      },

      removeObject: (id: string) => {
        const state = get();
        const { scene } = state;
        
        const newObjects: SceneObject[] = scene.objects.filter(obj => obj.id !== id);
        const newScene: Scene = {
          view: scene.view,
          color: scene.color,
          objects: newObjects,
          printArea: scene.printArea,
          mockupSrc: scene.mockupSrc
        };

        // Save to history
        const newHistory = {
          past: [...state.history.past, scene],
          future: []
        };

        set({
          scene: newScene,
          history: newHistory,
          selection: state.selection.filter(selectedId => selectedId !== id)
        });
      },

      reorder: (id: string, direction: 'forward' | 'back' | 'front' | 'backward') => {
        const state = get();
        const { scene } = state;
        const { objects } = scene;
        
        const currentIndex = objects.findIndex(obj => obj.id === id);
        if (currentIndex === -1) return;

        let newIndex: number;
        switch (direction) {
          case 'forward':
            newIndex = Math.min(currentIndex + 1, objects.length - 1);
            break;
          case 'backward':
            newIndex = Math.max(currentIndex - 1, 0);
            break;
          case 'front':
            newIndex = objects.length - 1;
            break;
          case 'back':
            newIndex = 0;
            break;
        }

        if (newIndex === currentIndex) return;

        const newObjects: SceneObject[] = [...objects];
        const [movedObject] = newObjects.splice(currentIndex, 1);
        newObjects.splice(newIndex, 0, movedObject);

        // Update zIndex values
        newObjects.forEach((obj, index) => {
          obj.zIndex = index + 1;
        });

        const newScene: Scene = {
          view: scene.view,
          color: scene.color,
          objects: newObjects,
          printArea: scene.printArea,
          mockupSrc: scene.mockupSrc
        };

        // Save to history
        const newHistory = {
          past: [...state.history.past, scene],
          future: []
        };

        set({
          scene: newScene,
          history: newHistory
        });
      },

      setSelection: (ids: string[]) => {
        set({ selection: ids });
      },

      addToSelection: (id: string) => {
        const state = get();
        set({ selection: [...new Set([...state.selection, id])] });
      },

      removeFromSelection: (id: string) => {
        const state = get();
        set({ selection: state.selection.filter(x => x !== id) });
      },

      clearSelection: () => {
        set({ selection: [] });
      },

      clampToPrintArea: (id: string) => {
        const state = get();
        const { scene } = state;
        const { printArea } = scene;
        
        const object = scene.objects.find(obj => obj.id === id);
        if (!object) return;

        let needsUpdate = false;
        const updates: Partial<SceneObject> = {};

        // Clamp position
        if (object.x < printArea.x) {
          updates.x = printArea.x;
          needsUpdate = true;
        } else if (object.x + (object.width || 0) > printArea.x + printArea.width) {
          updates.x = printArea.x + printArea.width - (object.width || 0);
          needsUpdate = true;
        }

        if (object.y < printArea.y) {
          updates.y = printArea.y;
          needsUpdate = true;
        } else if (object.y + (object.height || 0) > printArea.y + printArea.height) {
          updates.y = printArea.y + printArea.height - (object.height || 0);
          needsUpdate = true;
        }

        if (needsUpdate) {
          state.updateObject(id, updates);
        }
      },

      undo: () => {
        const state = get();
        const { history } = state;
        
        if (history.past.length === 0) return;

        const previous = history.past[history.past.length - 1];
        const newPast = history.past.slice(0, -1);
        const newFuture = [state.scene, ...history.future];

        set({
          scene: previous,
          history: {
            past: newPast,
            future: newFuture
          },
          selection: []
        });
      },

      redo: () => {
        const state = get();
        const { history } = state;
        
        if (history.future.length === 0) return;

        const next = history.future[0];
        const newFuture = history.future.slice(1);
        const newPast = [...history.past, state.scene];

        set({
          scene: next,
          history: {
            past: newPast,
            future: newFuture
          },
          selection: []
        });
      },

      toJSON: () => {
        const state = get();
        const { productData, scenesByView } = state;
        
        const data = {
          productId: productData?.productId,
          color: state.scene.color,
          scenesByView,
          updatedAt: new Date().toISOString()
        };
        
        return JSON.stringify(data);
      },

      fromJSON: (json: string) => {
        try {
          const data = JSON.parse(json);
          const { scenesByView, color } = data;
          
          // Find the current view from the loaded data
          const currentView = Object.keys(scenesByView).find(view => 
            scenesByView[view as PrintView]?.color === color
          ) as PrintView || 'front';
          
          const currentScene = scenesByView[currentView];
          
          set({
            scenesByView,
            scene: currentScene,
            selection: []
          });
        } catch (error) {
          console.error('Failed to parse design JSON:', error);
        }
      },
      
      // Legacy actions for backward compatibility
      saveTemplate: () => {
        console.log('Saving template...');
        // Implementation for saving template
      },
      
      addToStore: () => {
        console.log('Adding to store...');
        // Implementation for adding to store
      },
      
      placeOrder: () => {
        console.log('Placing order...');
        // Implementation for placing order
      }
    }),
    {
      name: 'designer-store',
      partialize: (state) => ({
        scene: state.scene,
        scenesByView: state.scenesByView,
        history: state.history
      }),
    }
  )
);

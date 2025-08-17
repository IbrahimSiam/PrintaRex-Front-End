import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ToolId = 
  | 'product' | 'files' 
  | 'text' | 'templates' | 'graphics' | 'personalize' | 'layers' | 'layouts' 
  | 'stock' | 'shapes' | 'effects' | 'brushes' | 'palette' 
  | 'settings' | 'help';

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'vector' | 'pdf';
  url: string;
  createdAt: Date;
  tags: string[];
  usedCount: number;
  size: number;
  width?: number;
  height?: number;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: Array<{
    hex: string;
    rgb: { r: number; g: number; b: number };
    alpha: number;
  }>;
  isBrand: boolean;
}

export interface DesignerUIState {
  // Sidebar state
  sidebar: {
    isCollapsed: boolean;
    activeToolId: ToolId | null;
  };
  
  // Panel state
  panels: {
    tool: ToolId | null;
    payload?: any;
  };
  
  // Assets management
  assets: {
    images: Asset[];
    palettes: ColorPalette[];
    recentColors: Array<{
      hex: string;
      rgb: { r: number; g: number; b: number };
      alpha: number;
    }>;
  };
  
  // Actions
  setActiveTool: (toolId: ToolId | null) => void;
  toggleSidebar: () => void;
  openPanel: (toolId: ToolId, payload?: any) => void;
  closePanel: () => void;
  
  // Asset actions
  addAsset: (asset: Omit<Asset, 'id' | 'createdAt' | 'usedCount'>) => void;
  removeAsset: (assetId: string) => void;
  updateAsset: (assetId: string, updates: Partial<Asset>) => void;
  incrementAssetUsage: (assetId: string) => void;
  
  // Color actions
  addColorToPalette: (paletteId: string, color: { hex: string; rgb: { r: number; g: number; b: number }; alpha: number }) => void;
  removeColorFromPalette: (paletteId: string, colorIndex: number) => void;
  addRecentColor: (color: { hex: string; rgb: { r: number; g: number; b: number }; alpha: number }) => void;
  createPalette: (name: string, colors?: Array<{ hex: string; rgb: { r: number; g: number; b: number }; alpha: number }>) => void;
  removePalette: (paletteId: string) => void;
}

const INITIAL_PALETTES: ColorPalette[] = [
  {
    id: 'default',
    name: 'Default',
    colors: [
      { hex: '#000000', rgb: { r: 0, g: 0, b: 0 }, alpha: 1 },
      { hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 }, alpha: 1 },
      { hex: '#FF0000', rgb: { r: 255, g: 0, b: 0 }, alpha: 1 },
      { hex: '#00FF00', rgb: { r: 0, g: 255, b: 0 }, alpha: 1 },
      { hex: '#0000FF', rgb: { r: 0, g: 0, b: 255 }, alpha: 1 },
    ],
    isBrand: false
  },
  {
    id: 'brand',
    name: 'Brand Colors',
    colors: [
      { hex: '#2563EB', rgb: { r: 37, g: 99, b: 235 }, alpha: 1 },
      { hex: '#1E40AF', rgb: { r: 30, g: 64, b: 175 }, alpha: 1 },
      { hex: '#3B82F6', rgb: { r: 59, g: 130, b: 246 }, alpha: 1 },
      { hex: '#60A5FA', rgb: { r: 96, g: 165, b: 250 }, alpha: 1 },
      { hex: '#DBEAFE', rgb: { r: 219, g: 234, b: 254 }, alpha: 1 },
    ],
    isBrand: true
  }
];

export const useDesignerUIStore = create<DesignerUIState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebar: {
        isCollapsed: false,
        activeToolId: null,
      },
      
      panels: {
        tool: null,
        payload: undefined,
      },
      
      assets: {
        images: [],
        palettes: INITIAL_PALETTES,
        recentColors: [],
      },
      
      // Sidebar actions
      setActiveTool: (toolId) => {
        const currentTool = get().sidebar.activeToolId;
        if (currentTool === toolId) {
          // If clicking the same tool, close it
          set((state) => ({
            sidebar: { ...state.sidebar, activeToolId: null },
            panels: { tool: null, payload: undefined }
          }));
        } else {
          // Open new tool
          set((state) => ({
            sidebar: { ...state.sidebar, activeToolId: toolId },
            panels: { tool: toolId, payload: undefined }
          }));
        }
      },
      
      toggleSidebar: () => {
        set((state) => ({
          sidebar: { ...state.sidebar, isCollapsed: !state.sidebar.isCollapsed }
        }));
      },
      
      openPanel: (toolId, payload) => {
        set((state) => ({
          sidebar: { ...state.sidebar, activeToolId: toolId },
          panels: { tool: toolId, payload }
        }));
      },
      
      closePanel: () => {
        set((state) => ({
          sidebar: { ...state.sidebar, activeToolId: null },
          panels: { tool: null, payload: undefined }
        }));
      },
      
      // Asset actions
      addAsset: (assetData) => {
        const newAsset: Asset = {
          ...assetData,
          id: `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          usedCount: 0,
        };
        
        set((state) => ({
          assets: {
            ...state.assets,
            images: [...state.assets.images, newAsset]
          }
        }));
      },
      
      removeAsset: (assetId) => {
        set((state) => ({
          assets: {
            ...state.assets,
            images: state.assets.images.filter(asset => asset.id !== assetId)
          }
        }));
      },
      
      updateAsset: (assetId, updates) => {
        set((state) => ({
          assets: {
            ...state.assets,
            images: state.assets.images.map(asset => 
              asset.id === assetId ? { ...asset, ...updates } : asset
            )
          }
        }));
      },
      
      incrementAssetUsage: (assetId) => {
        set((state) => ({
          assets: {
            ...state.assets,
            images: state.assets.images.map(asset => 
              asset.id === assetId ? { ...asset, usedCount: asset.usedCount + 1 } : asset
            )
          }
        }));
      },
      
      // Color actions
      addColorToPalette: (paletteId, color) => {
        set((state) => ({
          assets: {
            ...state.assets,
            palettes: state.assets.palettes.map(palette =>
              palette.id === paletteId 
                ? { ...palette, colors: [...palette.colors, color] }
                : palette
            )
          }
        }));
      },
      
      removeColorFromPalette: (paletteId, colorIndex) => {
        set((state) => ({
          assets: {
            ...state.assets,
            palettes: state.assets.palettes.map(palette =>
              palette.id === paletteId 
                ? { ...palette, colors: palette.colors.filter((_, index) => index !== colorIndex) }
                : palette
            )
          }
        }));
      },
      
      addRecentColor: (color) => {
        set((state) => {
          const existingIndex = state.assets.recentColors.findIndex(
            c => c.hex === color.hex && c.alpha === color.alpha
          );
          
          let newRecentColors = [...state.assets.recentColors];
          if (existingIndex !== -1) {
            // Remove existing color
            newRecentColors.splice(existingIndex, 1);
          }
          
          // Add to beginning and limit to 12
          newRecentColors = [color, ...newRecentColors].slice(0, 12);
          
          return {
            assets: {
              ...state.assets,
              recentColors: newRecentColors
            }
          };
        });
      },
      
      createPalette: (name, colors = []) => {
        const newPalette: ColorPalette = {
          id: `palette_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name,
          colors,
          isBrand: false
        };
        
        set((state) => ({
          assets: {
            ...state.assets,
            palettes: [...state.assets.palettes, newPalette]
          }
        }));
      },
      
      removePalette: (paletteId) => {
        set((state) => ({
          assets: {
            ...state.assets,
            palettes: state.assets.palettes.filter(palette => palette.id !== paletteId)
          }
        }));
      },
    }),
    {
      name: 'designer-ui-storage',
      partialize: (state) => ({
        sidebar: state.sidebar,
        assets: state.assets,
      }),
    }
  )
);

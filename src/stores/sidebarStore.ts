import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RailState = 'expanded' | 'mini' | 'auto';

interface SidebarState {
  // Tool selection
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  
  // Rail state and behavior
  railState: RailState;
  setRailState: (state: RailState) => void;
  
  // Rail dimensions
  railWidth: number;
  setRailWidth: (width: number) => void;
  
  // Hover state for auto mode
  isHoverExpanded: boolean;
  setIsHoverExpanded: (expanded: boolean) => void;
  
  // Labels visibility (only for expanded state)
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  
  // Auto-collapse on mobile
  autoCollapseOnMobile: boolean;
  setAutoCollapseOnMobile: (enabled: boolean) => void;
  
  // Toast notification state
  hasShownCollapseToast: boolean;
  setHasShownCollapseToast: (shown: boolean) => void;
  
  // Reset state
  resetSidebar: () => void;
  
  // Computed values
  getEffectiveWidth: () => number;
  getEffectiveState: () => 'expanded' | 'mini';
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      // Tool selection
      activeTool: null,
      setActiveTool: (tool) => set({ activeTool: tool }),
      
      // Rail state and behavior
      railState: 'mini',
      setRailState: (state) => set({ railState: state }),
      
      // Rail dimensions
      railWidth: 280,
      setRailWidth: (width) => set({ railWidth: Math.max(240, Math.min(360, width)) }),
      
      // Hover state for auto mode
      isHoverExpanded: false,
      setIsHoverExpanded: (expanded) => set({ isHoverExpanded: expanded }),
      
      // Labels visibility (only for expanded state)
      showLabels: true,
      setShowLabels: (show) => set({ showLabels: show }),
      
      // Auto-collapse on mobile
      autoCollapseOnMobile: true,
      setAutoCollapseOnMobile: (enabled) => set({ autoCollapseOnMobile: enabled }),
      
      // Toast notification state
      hasShownCollapseToast: false,
      setHasShownCollapseToast: (shown) => set({ hasShownCollapseToast: shown }),
      
      // Reset state
      resetSidebar: () => set({
        activeTool: null,
        railState: 'mini',
        railWidth: 280,
        isHoverExpanded: false,
        showLabels: true,
        autoCollapseOnMobile: true,
        hasShownCollapseToast: false
      }),
      
      // Computed values
      getEffectiveWidth: () => {
        const { railState, railWidth, isHoverExpanded } = get();
        if (railState === 'expanded' || (railState === 'auto' && isHoverExpanded)) {
          return railWidth;
        }
        return 64; // mini width
      },
      
      getEffectiveState: () => {
        const { railState, isHoverExpanded } = get();
        if (railState === 'expanded' || (railState === 'auto' && isHoverExpanded)) {
          return 'expanded';
        }
        return 'mini';
      }
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({
        railState: state.railState,
        railWidth: state.railWidth,
        showLabels: state.showLabels,
        autoCollapseOnMobile: state.autoCollapseOnMobile,
        hasShownCollapseToast: state.hasShownCollapseToast
      }),
    }
  )
);

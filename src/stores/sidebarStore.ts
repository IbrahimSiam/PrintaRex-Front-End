import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  // Tool selection
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  
  // Sidebar state
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  
  // Pin functionality
  isPinned: boolean;
  setIsPinned: (pinned: boolean) => void;
  
  // Labels visibility
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  
  // Auto-collapse on mobile
  autoCollapseOnMobile: boolean;
  setAutoCollapseOnMobile: (enabled: boolean) => void;
  
  // Reset state
  resetSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      // Tool selection
      activeTool: null,
      setActiveTool: (tool) => set({ activeTool: tool }),
      
      // Sidebar state
      isCollapsed: false,
      setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      
      // Pin functionality
      isPinned: false,
      setIsPinned: (pinned) => set({ isPinned: pinned }),
      
      // Labels visibility
      showLabels: true,
      setShowLabels: (show) => set({ showLabels: show }),
      
      // Auto-collapse on mobile
      autoCollapseOnMobile: true,
      setAutoCollapseOnMobile: (enabled) => set({ autoCollapseOnMobile: enabled }),
      
      // Reset state
      resetSidebar: () => set({
        activeTool: null,
        isCollapsed: false,
        isPinned: false,
        showLabels: true,
        autoCollapseOnMobile: true
      }),
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({
        isCollapsed: state.isCollapsed,
        isPinned: state.isPinned,
        showLabels: state.showLabels,
        autoCollapseOnMobile: state.autoCollapseOnMobile
      }),
    }
  )
);

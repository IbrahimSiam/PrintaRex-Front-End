import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SidebarMode = 'expanded' | 'collapsed' | 'hidden';
export type SidebarTool = 'product' | 'files' | 'text' | 'templates' | 'graphics' | 'layers' | 'personalize' | 'collections' | 'layouts' | 'shapes' | 'settings';

export interface SidebarState {
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
  autoCollapse: boolean;
  setAutoCollapse: (enabled: boolean) => void;
  autoCollapseDelay: number; // in milliseconds
  setAutoCollapseDelay: (delay: number) => void;
  activeTool: SidebarTool | null; // null means no panel is open
  setActiveTool: (tool: SidebarTool | null) => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
  resetAutoCollapseTimer: () => void;
  toggleMode: () => void;
  expand: () => void;
  collapse: () => void;
  hide: () => void;
  getResponsiveMode: () => SidebarMode;
  closePanel: () => void;
  togglePanel: (tool: SidebarTool) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      mode: 'collapsed', // Start collapsed for professional look
      setMode: (mode: SidebarMode) => set({ mode }),
      autoCollapse: false,
      setAutoCollapse: (enabled: boolean) => set({ autoCollapse: enabled }),
      autoCollapseDelay: 30000, // 30 seconds
      setAutoCollapseDelay: (delay: number) => set({ autoCollapseDelay: delay }),
      activeTool: null, // Start with no panel open
      setActiveTool: (tool: SidebarTool | null) => set({ activeTool: tool }),
      isMobile: false,
      setIsMobile: (mobile: boolean) => set({ isMobile: mobile }),
      resetAutoCollapseTimer: () => {
        const { autoCollapse, autoCollapseDelay } = get();
        if (autoCollapse) {
          setTimeout(() => {
            const currentState = get();
            if (currentState.activeTool !== null) {
              set({ activeTool: null });
            }
          }, autoCollapseDelay);
        }
      },
      toggleMode: () => {
        const { mode } = get();
        if (mode === 'expanded') {
          set({ mode: 'collapsed' });
        } else if (mode === 'collapsed') {
          set({ mode: 'expanded' });
        } else {
          set({ mode: 'collapsed' });
        }
      },
      expand: () => set({ mode: 'expanded' }),
      collapse: () => set({ mode: 'collapsed' }),
      hide: () => set({ mode: 'hidden' }),
      getResponsiveMode: () => {
        const { isMobile } = get();
        if (isMobile) return 'hidden';
        return 'collapsed'; // Default to collapsed for professional look
      },
      closePanel: () => set({ activeTool: null }),
      togglePanel: (tool: SidebarTool) => {
        const { activeTool } = get();
        if (activeTool === tool) {
          set({ activeTool: null }); // Close if same tool clicked
        } else {
          set({ activeTool: tool }); // Open new tool panel
        }
      },
    }),
    {
      name: 'sidebar-store',
      partialize: (state) => ({
        mode: state.mode,
        autoCollapse: state.autoCollapse,
        autoCollapseDelay: state.autoCollapseDelay,
        activeTool: state.activeTool,
      }),
    }
  )
);

import { create } from 'zustand';

interface sideBarState {
  sidebarVisibility: boolean;
  toggleSidebarVisibility: (check: boolean) => void;
}

export const useSidebarStore = create<sideBarState>()((set) => ({
  sidebarVisibility: false,
  toggleSidebarVisibility: (check) =>
    set((state) => ({ sidebarVisibility: !state.sidebarVisibility })),
}));

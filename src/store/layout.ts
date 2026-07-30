import { create } from 'zustand';

interface LayoutState {
  openSidebar: boolean;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
  openCartDrawer: boolean;
  handleOpenCartDrawer: () => void;
  handleCloseCartDrawer: () => void;
}

export const useLayout = create<LayoutState>()((set) => ({
  openSidebar: false,
  handleOpenSidebar: () => set(() => ({ openSidebar: true })),
  handleCloseSidebar: () => set(() => ({ openSidebar: false })),
  openCartDrawer: false,
  handleOpenCartDrawer: () => set(() => ({ openCartDrawer: true })),
  handleCloseCartDrawer: () => set(() => ({ openCartDrawer: false })),
}));

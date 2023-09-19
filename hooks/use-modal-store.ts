import { create } from 'zustand';

export type ModelType = 'createServer';

interface ModalStore {
  type: ModelType | null;
  isOpen: boolean;
  onOpen: (type: ModelType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));

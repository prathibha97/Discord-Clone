import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModelType = 'createServer' | 'invite';

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModelType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModelType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true , data}),
  onClose: () => set({ type: null, isOpen: false }),
}));

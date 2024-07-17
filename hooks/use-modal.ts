import { ProductsColumn } from "@/components/table/ProductTable";
import { create } from "zustand";

export type ModalType = "addProduct" | "editProduct";

interface ModalData {
  product?: ProductsColumn;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface Modal {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<Modal>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

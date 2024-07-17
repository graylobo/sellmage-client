import { create } from "zustand";

export type ButtonDirection = "vertical" | "horizontal" | undefined;

export interface ModalState {
  title?: string;
  buttonDirection?: ButtonDirection;
  isOpen?: boolean;
  element?: JSX.Element | null;
  handleConfirm?: (...args: any[]) => any;
  data?: any; // stack내 각 modal별로 가지는 data
}

interface ModalStore {
  modalStack: ModalState[];
  globalModalData: any;
  addModal: (modal: ModalState) => void;
  removeModal: () => void;
  setGlobalModalData: (data: any) => void;
  updateCurrentModalData: (data: any) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalStack: [],
  globalModalData: {},
  addModal: (modal) =>
    set((state) => ({ modalStack: [...state.modalStack, modal] })),
  removeModal: () =>
    set((state) => ({ modalStack: state.modalStack.slice(0, -1) })),
  setGlobalModalData: (data) => set(() => ({ globalModalData: data })),
  updateCurrentModalData: (data) =>
    set((state) => ({
      modalStack: state.modalStack.map((modal, index) =>
        index === state.modalStack.length - 1 ? { ...modal, data } : modal
      ),
    })),
}));

import { ModalState, useModalStore } from "src/store/modal/store";

export function useModalStack() {
  const {
    modalStack,
    addModal,
    removeModal,
    globalModalData,
    setGlobalModalData,
    updateCurrentModalData,
  } = useModalStore();

  const openModal = (modalConfig: ModalState) => {
    addModal({ ...modalConfig, isOpen: true });
  };

  const closeModal = () => {
    removeModal();
  };

  /** 현재 stack내에서 활성화된 modal에 data 설정 */
  const setCurrentModalData = (data: any) => {
    updateCurrentModalData(data);
  };

  /** 현재 stack내에서 활성화된 modal */
  const currentModal = modalStack[modalStack.length - 1];

  console.log("currentModal", currentModal);
  console.log("mocalstack", modalStack);

  return {
    openModal,
    closeModal,
    modalStack,
    setGlobalModalData,
    setCurrentModalData,
    globalModalData,
    currentModal,
  };
}

import { useEffect, useState } from "react";
import { Button } from "antd";
import { useModalStack } from "src/hooks/useModalStack";
import { useStyles } from "src/components/common/modal/base-modal/style";

function BaseModal() {
  const { closeModal, currentModal, modalStack } = useModalStack();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { styles } = useStyles();

  useEffect(() => {
    setIsModalOpen(modalStack.some((modal) => modal.isOpen));
  }, [modalStack]);

  if (!currentModal || !currentModal.isOpen) return null;

  function handleClose() {
    closeModal();
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.defaultLayout} custom-scroll`}>
        {currentModal.title && (
          <div className={styles.top}>
            {currentModal.title && (
              <h3 className={styles.title}>{currentModal.title}</h3>
            )}
            <Button color="gray" onClick={handleClose}>
              닫기
            </Button>
          </div>
        )}

        <div className={styles.componentSection}>{currentModal.element}</div>
      </div>
      {isModalOpen && <style>{styles.globalStyle}</style>}
    </div>
  );
}

export default BaseModal;

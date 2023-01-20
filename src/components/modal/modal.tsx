import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.scss";

type ModalProps = {
  children?: ReactNode;
  modalHeading?: string;
  showModal: boolean;
  onClose: () => void;
};

const modalRoot = document.getElementById("modal-root") as HTMLElement,
  body = document.querySelector("body") as HTMLElement;

const Modal = ({ children, modalHeading, showModal, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  showModal && body.classList.add("modal-open");

  if (!showModal) {
    body.classList.remove("modal-open");
    return null;
  }

  return createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div className={`${styles.body} px-10 py-15`}>
          <div className={`${styles.header}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {modalHeading}
            </h3>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

export { Modal };

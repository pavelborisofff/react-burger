import { useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.scss";


const modalRoot = document.getElementById("modal-root") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;

export type ModalProps = {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Modal = ({title, onClose, children}:ModalProps) => {
  const onCloseCommon = () => {
    onClose && onClose();
    body.classList.remove("modal-open")
  };

  useEffect(() => {
    body.classList.add("modal-open")
    
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" ? onCloseCommon() : null;
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // TODO: if add onClose to the dependencies it causes an infinite loop

  return createPortal(
    <>
      <ModalOverlay onClose={onCloseCommon}>
        <div className={`${styles.body} px-10 py-15`} data-testid='modal'>
          <div className={`${styles.header}`}>
            {title && <h3 className={`${styles.title} text text_type_main-medium`}>
              {title}
            </h3>}
            <div data-testid="modal-close">
              <CloseIcon type="primary" onClick={onCloseCommon}/>
            </div>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>
  , modalRoot)
};

export { Modal };



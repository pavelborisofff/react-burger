import { useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.scss";
import { useDispatch } from 'react-redux';
import { MODAL_CLOSE, MODAL_OPEN } from '../../services/actions/modalActions';


const modalRoot = document.getElementById("modal-root") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;

export type ModalProps = {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Modal = ({title, onClose, children}:ModalProps) => {
  const dispatch = useDispatch()

  const onCloseCommon = () => {
    onClose && onClose();
    body.classList.remove("modal-open")
    dispatch({ type: MODAL_CLOSE });
  };

  useEffect(() => {
    body.classList.add("modal-open")
    
    dispatch({ type: MODAL_OPEN });
    
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
        <div className={`${styles.body} px-10 py-15`}>
          <div className={`${styles.header}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {title}
            </h3>
            <CloseIcon type="primary" onClick={onCloseCommon} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>
  , modalRoot)
};

export { Modal };



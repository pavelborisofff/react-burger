import { useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { MODAL_CLOSE } from '../../services/actions/modalActions';


const modalRoot = document.getElementById("modal-root") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;


const Modal = () => {
  const dispatch = useDispatch()
  const { payload } = useSelector((store: RootState) => store.modal);

  
  const onClose = () => {
    dispatch({ type: MODAL_CLOSE })
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" ? onClose() : null;
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // TODO: if add onClose to the dependencies it causes an infinite loop

  useEffect(() => {
    payload ? body.classList.add("modal-open") : body.classList.remove("modal-open");
  }, [payload]);

  return createPortal(
    <>
      {!!payload && 
      <ModalOverlay onClose={onClose}>
        <div className={`${styles.body} px-10 py-15`}>
          <div className={`${styles.header}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {payload.heading}
            </h3>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {payload.content}
        </div>
      </ModalOverlay>
      }
    </>
  , modalRoot)
};

export { Modal };



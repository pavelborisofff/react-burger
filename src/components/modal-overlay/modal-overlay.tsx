import { useRef } from "react";

import { ModalOverlayProps } from "../../types/types";

import styles from "./modal-overlay.module.scss";

const ModalOverlay = ({ onClose, children }: ModalOverlayProps) => {
  const ref = useRef(null);

  const handlerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.target === ref.current && onClose();
  };

  return (
    <div
      className={`${styles.overlay} modal-overlay`}
      onClick={handlerClick}
      ref={ref}
      data-testid="modal-overlay"
    >
      {children}
    </div>
  );
};

export { ModalOverlay };

import { useRef } from 'react';
import styles from './modal-overlay.module.css';


type ModalOverlayProps = {
  onClose: () => void;
  children?: React.ReactNode;
};


const ModalOverlay = ({ onClose, children }:ModalOverlayProps) => {
  const ref = useRef(null);

  const handlerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ref здесь исключительно ради интереса, проще было бы написать e.target === e.currentTarget
    if (e.target === ref.current) {
      onClose();
    }
  };

  return (
    <div className={`${styles.overlay} modal-overlay`} onClick={handlerClick} ref={ref}>
      { children }
    </div>
  );
}


export { ModalOverlay };
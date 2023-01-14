import { ReactNode, useEffect }  from  'react' ;
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
// import { useModalControl } from '../../utils/modal-control'


type ModalProps = {
  children?: ReactNode;
  heading?: string;
  showModal?: boolean;
  onClose: () => void;
};


const modalRoot = document.getElementById('modal-root') as HTMLElement,
      body = document.querySelector('body') as HTMLElement;

const Modal = ({children, heading, showModal = false, onClose}:ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  body.classList.add('modal-open');

  if (!showModal) {
    body.classList.remove('modal-open'); 
    return null; 
  }

  return createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div className={`${styles.body} px-10`}>
          <div className={`${styles.header}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>{heading}</h3>
            <CloseIcon type='primary' onClick={onClose} />
          </div>
          <div className={`${styles.content}`}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    </>
  , modalRoot);
};

  
  // useEffect(() => {
  //   const handleEsc = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') {
  //       onClose();
  //     }
  //   };
    
  //   document.addEventListener('keydown', handleEsc);
    
  //   return () => {
  //     document.removeEventListener('keydown', handleEsc);
  //   };
  // }, [onClose]);


//   return display && createPortal(
//   <>
//     {/* <ModalOverlay onClose={onClose}/> */}
//     <div className={`${styles.body} modal-body`}>
//       <div className={`${styles.header}`}>
//         <h3 className={`${styles.title} text text_type_main-large`}>{heading || '--->'}</h3>
//         <CloseIcon type="primary" onClick={() => onClose}/>
//       </div>
//       <div className={`${styles.content}`}>
//         {children}
//       </div>
//     </div>
//   </>, modalRoot);
// };

export { Modal };

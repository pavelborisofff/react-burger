import { useState, useCallback } from 'react';

// type ModalProps = {
//   heading?: string;
//   display: boolean;
//   onClose: () => void;
// };


// const useModalControl = ({heading}:ModalProps) => {
const useModalControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  // const open = useCallback(() => {
  //   console.log('open');
  //   return setIsOpen(true);
  // }, []);
  // const close = useCallback(() => setIsOpen(false), []);

  return [isOpen, setIsOpen, toggle];
}

export { useModalControl };
import { useState, useCallback } from 'react';


const useModalControl = () => {
  const [ showModal, setShowModal ] = useState<boolean>(false);

  // TODO: есть ли смысл мемоизировать данную функцию? 
  const handleToggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  // TODO: я так понимаю, 
  // всё же лучше использовать явные хендлеры handleOpen и handleClose для того, 
  // чтобы открыть и чтобы закрыть модалку, верно?
  // Во избежание неоднозначностей и путаниц с состоянием showModal.
  // Или же в данном случае это не имеет значения?

  // const handleOpen = useCallback(() => {
  //   setShowModal(true);
  // }, []);

  // const handleClose = useCallback(() => {
  //   setShowModal(false);
  // }, []);

  return { showModal, handleToggle };
};

export { useModalControl };
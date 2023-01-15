import { useState, useCallback, ReactNode } from 'react';


const useModalControl = () => {
  const [ showModal, setShowModal ] = useState<boolean>(false),
        [ modalHeading, setModalHeading ] = useState<string>(''),
        [ modalContent, setModalContent ] = useState<ReactNode | null>();

  // TODO: есть ли смысл мемоизировать данную функцию? 
  const handleToggle = () => {
    setShowModal(!showModal);
  };

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

  // Это на случай, если модалка вызывается из одного компонента, но с разными заголовками.
  const handleHeading = useCallback((heading: string) => {
    setModalHeading(heading);
  }, []);


  return { showModal, handleToggle, handleHeading, modalHeading, modalContent, setModalContent };
};

export { useModalControl };
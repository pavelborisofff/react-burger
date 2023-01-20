import { useState, useCallback, ReactNode } from "react";

const useModalControl = () => {
  const [showModal, setShowModal] = useState<boolean>(false),
    [modalHeading, setModalHeading] = useState<string>(""),
    [modalContent, setModalContent] = useState<ReactNode | null>();

  const handleToggle = (flag: boolean) => {
    setShowModal(flag);
  };

  const handleHeading = useCallback((heading: string) => {
    setModalHeading(heading);
  }, []);

  return {
    showModal,
    handleToggle,
    handleHeading,
    modalHeading,
    modalContent,
    setModalContent,
  };
};

export { useModalControl };

import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);

  const showModal = (modal) => {
    if (!modalStack.find((m) => m.modalType === modal.modalType)) {
      setModalStack([...modalStack, modal]);
    }
  };

  const hideModal = () => {
    setModalStack(modalStack.slice(0, -1));
  };

  const resetModalStack = () => {
    setModalStack([]);
  };

  const removeModal = (modalType) => {
    setModalStack(modalStack.filter((modal) => modal.modalType !== modalType));
  };

  return (
    <ModalContext.Provider
      value={{ modalStack, showModal, hideModal, resetModalStack, removeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

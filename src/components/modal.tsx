import React from 'react';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-background-gradient flex items-center justify-center">
      <div className="bg-neutral-800 p-6 rounded-lg w-[90%] h-[90%] max-w-[800px] shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  imageUrl?: string;
}

const Modal = ({ children, imageUrl }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-background-gradient flex items-center justify-center">
      <div className="bg-neutral-800 rounded-lg w-[90%] h-[95%] max-w-[800px] max-h-[90vh] overflow-y-auto shadow-md flex flex-col">
        {imageUrl && (
          <div className="w-full h-[25%]">
            <img
              src={imageUrl}
              alt="Top Image"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
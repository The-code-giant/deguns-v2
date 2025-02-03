'use client'
import React, { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

export interface ModalProps {
  open?: boolean;
  children?: React.ReactElement;
  onClose?: () => void;
  isBgBlur?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose, isBgBlur = false }) => {
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleBackdropClick = () => {
    if (onClose) onClose();
  };

  if (globalThis.document && open) {
    let modal = document.querySelector('#modal-root');

    if (!modal) {
      modal = document.createElement('div');
      modal.setAttribute('id', 'modal-root');
      document.body.appendChild(modal);
    }

    return createPortal(
      <div
        className={twMerge(
          'fixed inset-0 h-full bg-black/40 z-[999]',
          'flex flex-col items-center',
          isBgBlur ? 'backdrop-blur-sm' : ''
        )}
        onClick={handleBackdropClick}
      >
        <div className="relative w-[70%] top-1/2 -translate-y-1/2 overflow-auto bg-transparent scrollbar-hide md:w-[95%]">
          <div className="flex justify-center m-2">
            {cloneElement(children, {
              onClick: handleModalContentClick,
            })}
          </div>
        </div>
      </div>,
      modal
    );
  }
  
  return null;
};

export default Modal;
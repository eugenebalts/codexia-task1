import { useEffect } from 'react';
import './modal.css';

const Modal = ({ isOpen, children, onClose, autoClose = undefined }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';

      let autoCloseTimeout;

      if (autoClose) {
        autoCloseTimeout = setTimeout(() => {
          onClose();
        }, autoClose);
      }

      return () => {
        document.body.style.overflowY = 'auto';

        if (autoCloseTimeout) {
          clearTimeout(autoCloseTimeout);
        }
      };
    }
  }, [isOpen]);

  const handleClose = ({ target, currentTarget }) => {
    if (target instanceof HTMLElement) {
      if (
        target === currentTarget ||
        target.className === 'modal__close-button'
      ) {
        onClose();

        return;
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal' onClick={handleClose}>
      <div className='modal__content'>
        <button className='modal__close-button'>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

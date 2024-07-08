import { useEffect } from 'react';
import './modal.css';

const Modal = ({ children, onClose, autoClose = undefined }) => {
  useEffect(() => {
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
  }, []);
  // We could make 2 different handlers. 1st for HandleCloseBtn and 2nd for HandleClickAway

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

import './modal.css';

const Modal = ({ children, onClose }) => {
  const handleClickAway = ({ target, currentTarget }) => {
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
    <div className='modal' onClick={handleClickAway}>
      <div className='modal__content'>
        <button className='modal__close-button'>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

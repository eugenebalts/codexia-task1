import { useState } from 'react';
import Container from '../Container/Container';
import Modal from '../Modal/Modal';
import './header.css';

const Header = () => {
  const [isModal, setIsModal] = useState(false);

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleOpenModal = () => {
    setIsModal(true);
  };

  return (
    <header className='header'>
      <Container>
        <h1>CODEXICA</h1>
        <Modal autoClose={3000} onClose={handleCloseModal} isOpen={isModal}>
          <p>Will close in 3 sec</p>
        </Modal>
        <button onClick={handleOpenModal}>Open modal</button>
      </Container>
    </header>
  );
};

export default Header;

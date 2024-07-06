import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import Layout from '../layout/Layout';

const MainPage = () => {
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    console.log('closing modal');
    setIsModal(false);
  };

  return (
    <Layout>
      <div className='main-page'>
        <button onClick={handleOpenModal}>Open Modal</button>
        {isModal && (
          <Modal onClose={handleCloseModal}>THIS IS COEXICA BABY</Modal>
        )}
      </div>
    </Layout>
  );
};

export default MainPage;

import './App.css';
import ChickenList from './component/ChickenList';
import ChickenForm from './component/ChickenForm';
import Modal from './component/Modal';
import { useState } from 'react';

const MainRouter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const 에서 동작하는 기능이 1개일 경우 {} 중괄호 생략 가능
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-container">
      <h1>치킨 가게 메뉴 관리</h1>
      <button onClick={openModal} className='chicken-register-button'>메뉴 등록하기</button>
      <ChickenList />
      
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ChickenForm />
      </Modal>
    </div>
  );
}

export default MainRouter;

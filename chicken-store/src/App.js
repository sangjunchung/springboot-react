import logo from './logo.svg';
import './App.css';
import ChickenList from './component/ChickenList';
import ChickenForm from './component/ChickenForm';
import Modal from './component/Modal';
import { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const 에서 동작하는 기능이 1개일 경우 {} 중괄호 생략 가능
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app=container">
      <ChickenList />
      
      <button onClick={openModal}>메뉴 등록하기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ChickenForm />
      </Modal>
    </div>
  );
}

export default App;

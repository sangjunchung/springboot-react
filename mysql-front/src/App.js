import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserTable from './component/UserTable';
import UserForm from './component/UserForm';

function App() {
  const [users, setUsers] = useState([]); // 유저 목록이 담길 빈 배열 생성
  // useEffect는 버튼이나 특정값을 클릭하지 않아도 자동 실행
  // App.js가 실행되면 적용할 효과 만약 특정 변수명이 없다면 최초 1회만 실행
  // 특정 변수명이 존재한다면 특정 변수명에 변화가 있을 때마다 기능이 실행
  // useEffect(() => {기능}, [특정변수명]);

  useEffect(() => {
    showAllUser(); // 홈페이지 들어오면 최초 1회로 유저들이 보이고,
  },[]); // [] 비어있기 때문에 홈페이지가 보일 때 딱 한 번만 실행 

  /* const showAllUser = () => {
    // axios를 이용해서 모든 유저를 보겠다.
    axios.get("/users") // controller GetMapping에서 /users 라는 주소를 바라보기 때문에 users 적어준것
    // 응답을 무사히 가져왔을 때
    .then(response => { // Java를 통해 전달받은 DB의 내용을 가져와 알려줌
      setUsers(response.data); // 응답 결과로 Users를 변경
    })
    // 응답을 가져오지 못했을 때, 문제가 생겼을 때
    .catch(err => {
      alert("가져오지 못했습니다."); // 주로 alert보다 console.log로 작성해서 개발자가 에러로 볼 수 있게함
    })
  }*/
  /*
  // 1. axios 성공과 실패에 대한 결과를 처리하는 버전
  const showAllUser = () => {
    axios.get("/users") 
    .then(response => { 
      setUsers(response.data); 
    })
    .catch(err => {
      alert("가져오지 못했습니다."); 
    })
  }
  // 2. axios 성공에 대한 결과만 보여주는 버전 async await
  // async = 기능 실행 , await = 대기
  const showAllUser2 = async () => {
    const response = await axios.get("/users"); // controller 에 있는 uesrs 주소에 방문에서 데이터 가져옴
    // 가져오기 성공하면 가져온 데이터로 유저목록을 만들어줌
    setUsers(response.data); 
  }*/
  
  // async await 버전 사용
  const showAllUser = async () => {
    const response = await axios.get("/users");
    setUsers(response.data);
  }

  // async await 사용해서 유저 추가하기 addUser에서 가져온 user 한 명을 넣어주기
  const addUser = async (user) => {
    const res = await axios.post('/users', user); // controller postMapping으로 전달하는 유저 정보
    // ...users 기존에 작성한 유저목록에 유저 데이터 하나를 추가
    setUsers([...users], res.data);
  }

  return (
    <div className="App">
      <h1>유저 관리하기</h1>
      <UserForm addUser={addUser} />
      <UserTable users={users} />
    </div>
  );
}

export default App;

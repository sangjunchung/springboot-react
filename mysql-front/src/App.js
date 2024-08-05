import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserTable from './component/UserTable';
import UserForm from './component/UserForm';
import EditUserFrom from './component/EditUserFrom';

function App() {
  const [users, setUsers] = useState([]); // 유저 목록이 담길 빈 배열 생성

  // 수정한 유저 정보를 잠시 담고 있을 변수 생성
  const [userToEdit, setUserToEdit] = useState(null);

  // useEffect는 버튼이나 특정값을 클릭하지 않아도 자동 실행
  // App.js가 실행되면 적용할 효과 만약 특정 변수명이 없다면 최초 1회만 실행
  // 특정 변수명이 존재한다면 특정 변수명에 변화가 있을 때마다 기능이 실행
  // useEffect(() => {기능}, [특정변수명]);

  useEffect(() => {
    showAllUser(); // 홈페이지 들어오면 최초 1회로 유저들이 보이고,
  },[users]); // [] 비어있기 때문에 홈페이지가 보일 때 딱 한 번만 실행 

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
  
  /** 모든 유저 조회 기능 **/
  // async await 버전 사용
  const showAllUser = async () => {
    const response = await axios.get("/users");
    setUsers(response.data);
  }
  
  /** 유저 추가 버튼 **/
  // async await 사용해서 유저 추가하기 addUser에서 가져온 user 한 명을 넣어주기
  const addUser = async (user) => {
    let check = true;
    const res = await axios.post('/users', user)
    .catch(e => {
      alert("이메일 중복");
      check = false;
    }); // controller postMapping으로 전달하는 유저 정보
    // ...users 기존에 작성한 유저목록에 유저 데이터 하나를 추가
    if(check) setUsers([...users], res.data);
  }

  /** 유저 삭제 버튼 **/
  
  const deleteUser2 = async (id) => {
    /*
    "" '' = 모두 글자 취급
    `` = 글자 안에 특정 값을 변수명으로 취급해야할 때
         `` 안에서 변수명을 처리해야하는 값은 ${} 사용한 다음
         ${변수명} 작성
    */
    await axios.delete(`/users?id=${id}`);
    /*
      자바 컨트롤러에서 @DeleteMapping("/{id}") 
      매개변수 = 파라미터에 (@PathVariable int id)
      리액트 axios에서 id=${id} 이다.
      await axios.delete(`/users?id=${id}`);
      나중에 주소값에 id 대신 삭제할 번호가 들어갈 수 있도록 설정
      
      자바 컨트롤러에서 @DeleteMapping() 에 특정 id 값을 설정하지 않을 경우
      매개변수 = 파라미터에 (@RequestParam int id)
      params : {id}
      await axios.delete('/users', {params:{id}});
    */
   /*
   setUsers(users.filter(user => user.id !== id));
    users = 현재 저장되어 있는 유저들 리스트
    user.id !== id => user.id 유저 아이디와 id(입력받은 삭제를 원하는 유저 아이디)가
      일치하지 않으면 setUsers(새로운 유저목록)에 포함시킴

    filter = 조건대로 배열을 재생성
    */
    setUsers(users.filter(user => user.id !== id));
  }

  /** 유저 수정 버튼 **/
  const updateUser = async (user) => {
    await axios.put('/users', user); // PutMapping /users 로 주소값이 설정된 수정하는 주소 연결
    setUsers(users.map(u => (u.id === user.id ? user : u)))
    // 수정한 유저의 id 값이 일치하는지 확인하고, id 값이 일치하지 않다면 기존에 있던 유저정보로 수정하지 않고 전달
  }
  /** 수정하기 버튼 있다면 수정 취소 및 확인 버튼 **/
  const cancelEdit = () => {
    setUserToEdit(null); // 유저정보 수정 취소 할 때 null 빈 값으로 변경하는 트릭
  }

  const editUser = (user) => {
    setUserToEdit(user);
  }

  return (
    <div className="App">
      <h1>유저 관리하기</h1>
      <UserForm addUser={addUser} />
      <UserTable users={users} deleteUser2={deleteUser2} editUser={editUser} />
      {userToEdit && (
        <EditUserFrom
          userToEdit={userToEdit}
          updateUser={updateUser}
          cancelEdit={cancelEdit}
        />
      )}
    </div>
  );
}

export default App;

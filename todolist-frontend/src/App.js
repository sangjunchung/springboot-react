import React, {useState} from "react";
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoList from './components/TodoList';
import LoginContext from "./components/LoginContext";

function App() {
  const [loginMember, setLoginMember] = useState(null);
  const [signUpView, setSignUpView] = useState(false);

  return (
    <LoginContext.Provider value={[loginMember, setLoginMember]}>
      <button onClick={()=>{setSignUpView(!signUpView)}}>
        {signUpView ? ('회원 가입 닫기'):('회원 가입 열기')}
      </button>
      <div className="signup-wrapper">
        {signUpView === true && (<SignUp />)}
      </div>
      <h1>Todo List</h1>
      <Login />
      <hr />
      {loginMember && (<TodoList />)}
    </LoginContext.Provider>
  );
}

export default App;

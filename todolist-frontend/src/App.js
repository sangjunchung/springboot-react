import React, {useState} from "react";
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoList from './components/TodoList';
import TodoListContext from "./components/TodoListContext";


function App() {
  const [loginMember, setLoginMember] = useState(null);
  const [signUpView, setSignUpView] = useState(false);
  const [todoList, setTodoList] = useState([]);

  return (
    <TodoListContext.Provider value={{loginMember, setLoginMember, todoList, setTodoList}}>
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
    </TodoListContext.Provider>
  );
}

export default App;

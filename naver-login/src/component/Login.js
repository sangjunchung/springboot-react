import { useState } from "react";
import "../css/Login.css";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginFunc = () => {
    axios.post("/login", null, {
        params : {
            id : id,
            password : password
        }
    })
    .then(response => {
        setMessage(response.data);
    })
    .catch(error => {
        console.log("에러 발생 : " + error);
        setMessage(error.response.data);
    })
  }

  return (
    <div className="login-container">
      <h3>로그인하기</h3>
      <div>
        <label>
          아이디 :
          <input 
            type="text" placeholder="아이디를 입력하세요." 
            value={id} onChange={e => setId(e.target.value)}
          />
        </label>
        <label>
          비밀번호 :
          <input 
            type="password" placeholder="비밀번호를 입력하세요." 
            value={password} onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button onClick={loginFunc}>로그인하기</button>
        <div>{message}</div>
        <div className="find-sign-buttons">
          <button>아이디찾기</button>
          <button>비밀번호찾기</button>
          <button>회원가입하기</button>
        </div>
      </div>
      <label>
        sns로 로그인하기 :
        <img
          src="/naver_image/btnG_iconCircle.png"
          className="naver-logo-img"
        />
      </label>
      {/* 
      <button className="naver-login-button">
        <img src="/naver_image/btnG_iconCircle.png" />
        네이버로 회원가입하기
      </button>
      */}
    </div>
  );
};

export default Login;

import React, {useState} from "react";

const SignUp = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [name, setName] = useState('');
    const [result, setResult] = useState('');

    const [idValidation, setIdValidation] = useState(false);

    const idDupCheck = (eventId) => {
        setId(eventId);

        if(eventId.trim().length < 4){
            setIdValidation(false);
            return;
        }

        fetch("/idCheck?id="+eventId)
        .then(reponse => reponse.text())
        .then(result => {
            if(Number(result) === 0){
                setIdValidation(true);
            } else {
                setIdValidation(false);
            }
        })
    }

    const signUpBtn = () => {
        if(idValidation === false){
            alert('아이디가 유효하지 않습니다.');
            return;
        }

        if(pw !== pw2){
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const inputValues = {};
        inputValues.id = id;
        inputValues.pw = pw;
        inputValues.name = name;

        fetch('/signup', {
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(inputValues)
        })
        .then(response => response.text())
        .then(result => {
            if(Number(result) > 0){
                setResult('회원가입 성공');
                setId('');
                setPw('');
                setPw2('');
                setName('');
            } else {
                setResult('회원가입 실패');
            }
        })
    }

    return (
        <div className="signup-container">
            <label>
                ID :
                <input type="text"
                    onChange={e=>idDupCheck(e.target.value)}
                    value={id}
                    className={idValidation ? '':'id-err'}
                />
            </label>
            <label>
                PW :
                <input type="password" 
                    onChange={e=>{setPw(e.target.value)}}
                    value={pw}
                />
            </label>
            <label>
                PW CHECK :
                <input type="password" 
                    onChange={e=>{setPw2(e.target.value)}}
                    value={pw2}
                />
            </label>
            <label>
                NAME :
                <input type="text" 
                    onChange={e=>{setName(e.target.value)}}
                    value={name}
                />
            </label>
            <button onClick={signUpBtn}>가입하기</button>
            <hr />
            <h3>{result}</h3>
        </div>
    )
}

export default SignUp;
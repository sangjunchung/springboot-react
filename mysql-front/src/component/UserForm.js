import React, {useState} from "react";

const UserForm = ({addUser}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 잠시 제출 방지

        addUser({name, email});
        setName("");
        setEmail("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름 :</label>
                    <input type="text" value={name} 
                    onChange={e => setName(e.target.value)}
                    required />
                </div>
                <div>
                    <label>이메일 :</label>
                    <input type="email" value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required />
                </div>
                <button>유저 추가하기</button>
                <br/><br />
                <button>네이버 로그인</button>
            </form>
        </div>
    )
}

export default UserForm;
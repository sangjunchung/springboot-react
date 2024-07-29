import React, {useState, useEffect} from "react";

const EditUserFrom = ({userToEdit, updateUser, cancelEdit}) => {
    // 기존이름과 변경할 이름 이메일 변경할 이메일을 담을 변수명 설정
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if(userToEdit){
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        }
    },[userToEdit])

    return(
        <div>
            {/* 
            만약에 유저 수정을 진행한다면 수정하기 위한 form을 보여주고
            수정하지 않는다면 form을 보여주지 않음
            */}
            {userToEdit ? (
                <form>
                    <h2>유저 정보 수정하기</h2>
                    <label>
                        이름 : 
                        <input type="text" value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        이메일 : 
                        <input type="email" value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <button onClick={e => updateUser({user : {name:name, email:email}})}>저장하기</button>
                    <button onClick={e => cancelEdit}>취소하기</button>
                </form>
            ) : null}
        </div>
    )
}

export default EditUserFrom;
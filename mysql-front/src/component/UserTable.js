import React from 'react';
import axios from 'axios';

/*
const 컴포넌트명 = () = > {}
 -> 어떤 값도 받지 않고, 단독으로 기능을 진행할 때 사용
 -> 특정 상태나 값을 다른 곳에서 전달 받고, 전달 받은 값에 의해 변화가 필요하지 않은 경우 사용

const 컴포넌트명 = ({특정값}) = > {}
 -> 특정 값의 영향을 받아 기능이 변화할 때 사용
*/
// UserTable 컴포넌트는 사이트에 회원가입한 유저들의 정보를 보는 공간
// App.js 전달받은 User 값들을 받아와 유저 정보를 보여줄 것
const deleteUser = (id) => {
    axios.delete('/users/delete', {data:{id:id}})
    .then(result => {
        if(result.data === ''){
            alert("삭제 성공");
        } else {
            alert("삭제 실패");
        }
    })
    .catch(error => {
        if (error.response) {
            console.log('Error status code:', error.response.status);
            console.log('Error response data:', error.response.data);
        } else {
            console.log('Error message:', error.message);
        }
    })
}

const UserTable = ({users, deleteUser2}) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>Email</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button type='button' onClick={e => deleteUser(user.id)}>유저 삭제하기</button>
                        </td>
                        <td> 
                            <button type='button' onClick={e => deleteUser2(user.id)}>유저 삭제하기2</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserTable;
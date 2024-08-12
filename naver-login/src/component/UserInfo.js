import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom"; // 버튼 클릭 없이 위치 설정
/*
 useLocation : URL 의 정보를 포함한 객체
               경로, 해시, 문자열값 등을 가지고 온 객체
*/

function UserInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    // 어떤 클릭이 없어도 UserInfo 페이지 들어오면 자동으로 실행되는 효과
    const [userPw, setUserPw] = useState(null);

    useEffect(() => {
        // URLSearchParams : URL ? 뒤에 붙는 키-벨류 값을 가져옴
        // String redirectUrl = "http://localhost:3000/userInfo?access_token=" + accessToken;
        // userInfo? 뒤에 붙는 access_token에 있는 데이터를 포함
        const a = new URLSearchParams(location.search);
        const accessToken = a.get('access_token'); 
        console.log("토큰 확인 : "+accessToken);
        // URLSearchParams 로 가져온 수많은 값 중에서 키 이름이 access_token인 값만 가져오겠다.
        
        // get을 이용해서 userInfo 정보 가져오기
        // 자바에서는 userInfo?access_token=" 뒤에 + 를 붙여 변수를 사용했지만
        // 자바스크립트에서는 ``를 사용해서 가져옴

        // 만약에 accessToken 값이 존재하면 axios 발동
        if(accessToken){
            axios.get(`/userInfo?access_token=${accessToken}`)
            // .then((res) => {}) res 를 () 로 막아버리면 => 이후로는 res 는 선언되지 않은 
            // 지역변수명이 되기 때문에 res를 찾을수 없게됨
            .then(res => {
                console.log(res);
                setUserInfo(res.data);
                setLoading(false);
            }).catch(err => {
                alert("에러 발생 !");
            })
        }
    }, [location.search]); // location.search 로 검색된 키-값 중 access_token = abc123
    // access_token 값을 가져오면 useEffect를 사용하겠다.

    const handleSignUpUser = () => {
        if(!userPw) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const signUpUserData = {
            id : userInfo.response.id,
            email : userInfo.response.email,
            name : userInfo.response.name,
            nickname : userInfo.response.nickname,
            password : userPw,
            profileImage : userInfo.response.profile_image
        };

        axios.post('/naverAPI/register', signUpUserData)
        .then(response => {
            console.log(response.data);
            alert("회원가입이 완료되었습니다.");
        })
        .catch(err => {
            console.error("개발자가 에러 확인하는 공간 : ", err);
            alert("회원가입에 실패하였습니다.");
        });

        setUserPw('');
    }

    if(loading) {
        return <div>데이터 로딩 중...</div>
    }

    return (
        <>
        <h1>유저정보</h1>
        {userInfo ? (
            <div>
                <input type="text" value={userInfo.response.id} disabled />
                <input type="email" value={userInfo.response.email} disabled />
                <input type="email" value={userInfo.response.nickname} disabled />
                <input type="text" value={userInfo.response.name} disabled />
                <input type="text" value={userInfo.response.gender==='M' ? ('남자'):('여자')} disabled />
                <img src={userInfo.response.profile_image} disabled alt="프로필 이미지" />
                {/* 네이버에서 가져온 id 값을 input에 넣어주고 수정하지 못하게 막음처리 */}
            </div>
        ) : (<p>유저를 찾을 수 없습니다.</p>)}

        <div>
            <h2>회원가입에 필요한 아이디 및 비밀번호 작성하기</h2>
            <label>PW 
                <input type="password" value={userPw}
                    onChange={e => setUserPw(e.target.value)}
                />
            </label>
            <button onClick={handleSignUpUser}>회원 가입</button>
        </div>
        </>
    )
}

export default UserInfo;
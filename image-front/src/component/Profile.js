import React, { useEffect, useRef, useState } from "react";
import '../css/Profile.css';
import axios from 'axios';

const Profile = () => {
    const [files, setFiles] = useState([]);
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState([]);
    const fileRef = useRef(null);
    const [userId, setUserId] = useState(null);

    const watchAPI = "http://localhost:9007/profile/watching";
    const uploadAPI = "http://localhost:9007/profile/upload";

    const fileChangeFunc = (e) => {
        // 파일을 변경했을 때 프로필 썸네일에 이미지들 주소가 넘어갈 수 있도록 설정
        const selectedFile = Array.from(e.target.files);
        console.log("선택한파일들", selectedFile);
        setFiles(selectedFile);
    }

    // 1. fetch 버전 = 설치가 필요없는 리액트에서 제공하는 java 백엔드와 통신하는 기능
    const imageUpload1 = () => {
        const formData = new FormData(); // files 이미지 파일이 여러개이기 때문에 묶어서 보내기 위해
        Array.from(files).forEach(file => {
            formData.append("files", file);
        })

        formData.append("username", username);

        fetch(uploadAPI, {
            method: "POST", // DB에 값을 저장하기 위해 Post 사용
            //headers: { 'Content-Type' : "multipart/form-data" }, // 데이터에 파일(이미지)이 포함됨을 자바에 알려줌
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // DB에 저장된 프로필 사진과 닉네임을 보여주기
            // 업로드하고 사용자들이 눈치 모채게 새로고침하기
            pageRefresh();
        });

        fileRef.current.value='';
        setFiles([]);
        setUsername('');
    }

    // 2. axios async await 버전 = 3번의 업그레이드 버전 try / catch 를 사용해서 오류 처리
    const imageUpload2 = async () => {
        const formData = new FormData(); 
        Array.from(files).forEach(file => {
            formData.append("files", file);
        })

        formData.append("username", username);

        await axios.post(uploadAPI, formData)
        .then(response => {
            const data = response.data;
            pageRefresh();
        });
    }

    // 3. axios then 버전
    const imageUpload3 = () => {
        const formData = new FormData(); 
        Array.from(files).forEach(file => {
            formData.append("files", file);
        })

        formData.append("username", username);

        // 삼항 연사자를 이용하여 수정기능을 위한 url과 새 프로필을 저장할 url 설정

        axios.post(uploadAPI, formData)
        .then(response => {
            const data = response.data;
            pageRefresh();
        });
    }
    
    // 페이지 새로고침해서 0.00001초 전에 업로드한 파일 사용자 눈에 보여주기
    const pageRefresh = async () => {
        await axios.get(watchAPI)
        .then(response => {
            setProfile(response.data);
        });
    }

    useEffect(() => {
        pageRefresh();
    }, [profile]);

    const editFunc = (p) => {
        setUserId(p.userId); // 수정할 사용자 ID 설정
        setUsername(p.username);
    }

    return (
        <div>
            <div className="profile-thumbnail">
                {files.length > 0 && files.map((file, index) => (
                    <div key={index}>
                        <img src={URL.createObjectURL(file)} />
                    </div>
                ))}    
            </div>
            <h1>프로필 이미지 업로드</h1>
            <input type="file" onChange={e => fileChangeFunc(e)} ref={fileRef}/>
            <input type="text" placeholder="닉네임을 입력하세요." value={username}
                onChange={e => setUsername(e.target.value)} />
            <button onClick={imageUpload1}>프로필 저장</button>
            <hr />
            <h3>프로필 상세 페이지</h3>
            <div>
                {profile && profile.map(p => (
                    <div key={p.userId}>
                        <p>{p.username}</p>
                        <p>{p.createdAt}</p>
                        {p.profileImageUrl && p.profileImageUrl.split(",").map(image => (
                            <img key={image} src={`http://localhost:9007/images/${image}`} />
                        ))}
                        <button>프로필 수정하기</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile;
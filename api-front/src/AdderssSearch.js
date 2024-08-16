import { useEffect, useState } from "react";
import axios from 'axios';

const AddressSearch = () => {
  const [address, setAddress] = useState("");
  const [addAddress, setAddAddress] = useState("");
  const [finalAddress, setFinalAddress] = useState('');

  // 백엔드 api url 주소를 /api/addUser 로 Restful 연결을 하려한다.
  // Restful 연결 = 자바 컨트롤러로 연결해서 DB 에 값 넣는다
  // 1. fetch 버전 then catch O , async await X

  const toBackendFetch = (finalAddress) => {
    fetch('/api/addUser', {
        method: "POST",
        headers: {
            "Content-Type" : "Application/json"
        },
        body: JSON.stringify({finalAddress : finalAddress})
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
    })
    .catch(error => {
        console.log("에러 발생 : " + error);
    })
  }

  const toBackendAxios = (finalAddress) => {
    axios.post('/api/addUser', {finalAddress : finalAddress})
    .then(response => {
        alert(response.data);
    })
    .catch(error => {
        console.log("에러 발생 : " + error);
    })
  }

  // 주소 검색을 완료하고 사용자가 검색한 데이터를 가져와서 기능 실행
  const handleComplete = (data) => {
    // 사용자가 선택한 기본 주소를 fullAddress 주소에 저장
    let fullAddress = data.address; // 기본 주소 (몇번길 이나 번지까지)
    let extraAddress = ""; // 나머지 상세 주소(몇동 몇호까지)

    // R = Road 도로명 주소 J = Jibeon 지번주소
    if (data.addressType === "R") {
      // 주소 타입이 도로명 주소일 경우
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 완성된 주소
    setAddress(fullAddress);
  };

  // 주소검색 버튼을 누를 경우 openPostcode 실행
  const openPostcode = () => {
    // new Window.daum
    // new 새로운 , Window 창에서 , daum 서비스를 실행
    new window.daum.Postcode({
      // oncomplete : 사용자가 주소 검색을 완료했을 때 호출하는 함수 지정
      // 호출하는 함수 = 주소 검색을 완료하고 나서 실행할 기능 선택
      // oncomplete 다음에서 제공 , handleComplete 개발자가 만든 기능
      oncomplete: handleComplete,
    }).open(); // 실행하기
  };

  // use 이펙트 활용해서 최종주소 추가
  useEffect(() => {
    setFinalAddress(`${address} ${addAddress}`);
  }, [address, addAddress])

  return (
    <div>
      <button onClick={openPostcode}>주소 검색</button>
      {address && (
        <div>
          <input
            type="text"
            placeholder="추가 주소 입력 (예 : 아파트 동 / 호수)"
            value={addAddress}
            onChange={(e) => setAddAddress(e.target.value)}
          />
          <div>선택한 주소: {address}</div>
        </div>
      )}
      {address && addAddress && (
        <>
          <p>최종 추가 주소</p>
          {/* 
            나중에 value 값으로 최종주소를 DB에 넣어야할 때 사용, 
            주로 최종 input 은 hidden으로 해서 소비자 눈에 보이지 않게 해놀고 DB에 넣어줌
          */}
          <input type="text" value={finalAddress} />
        </>
      )}
    </div>
  );
};

export default AddressSearch;

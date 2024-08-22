import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ChickenList.css";
import { useNavigate } from "react-router-dom";

const ChickenList = () => {
  const [chickens, setChickens] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/chicken")
      .then((Response) => setChickens(Response.data))
      .catch((err) => alert("불러오는데 문제 발생했습니다."));
  }, [chickens]);

  return (
    <div className="chicken-container">
      <h1>치킨 메뉴</h1>
      <ul>
        {chickens.length === 0 ? (
          <p>현재 메뉴가 비어있습니다. 치킨을 등록해주세요.</p>
        ) : (
          <div>
            {chickens.map((menu) => (
              <li key={menu.id} className="chicken-item">
                  <div className="chicken-name">{menu.chickenName}</div>
                  <div className="chicken-description">{menu.description}</div>
                  <div className="chicken-price">￦{menu.price}</div>
                  <button className="detail-button" onClick={() => navigator(`/chicken-detail/${menu.id}`)}>상세보기</button>
                  
                  {/* navigate와 Link 사용에 있어 태그를 사용하느냐, 기능을 사용하느냐 차이 사용법만 다를 뿐 큰 차이는 없음
                  <button className="detail-button" onClick={() => navigator(`/chicken-detail/${menu.id}`)}>상세보기</button>
                  <button className="detail-button"><Link to={`/chicken-detail/${menu.id}`}>상세보기</Link></button>
                  */}
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ChickenList;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ChickenHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navi = useNavigate();

  const handleSearch = () => {
    navi(`/search?query=${searchTerm}`);
  };

  return (
    <div className="app-container">
      <h1>치킨 가게 메뉴 관리</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="검색하고 싶은 치킨 메뉴를 작성해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default ChickenHeader;

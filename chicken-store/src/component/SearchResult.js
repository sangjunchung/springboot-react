import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../css/SearchResult.css";
import ChickenHeader from "./ChickenHeader";

const SearchResult = () => {
  const [chickens, setChickens] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:9090/api/chicken/search?query=${query}`)
        .then((response) => setChickens(response.data))
        .catch((error) =>
          console.error("문제가 발생하여 검색을 가져오지 못합니다.", error)
        );
    }
  }, [query]);

  return (
    <div>
      <ChickenHeader />
      <div className="chicken-list">
        <h2>검색 결과 : "{query}"</h2>
        {chickens.length > 0 ? (
          chickens.map((chicken) => (
            <div key={chicken.id} className="chicken-item">
              <h3>{chicken.chickenName}</h3>
              <p>{chicken.description}</p>
              <p>{chicken.price}원</p>
            </div>
          ))
        ) : (
          <div>
            <p className="no-results">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

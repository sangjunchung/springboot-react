import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ChickenDetail.css";

const ChickenDetail = () => {
  const { id } = useParams();
  const [chicken, setChicken] = useState(null);
  const [editData, setEditData] = useState({
    chickenName: "",
    description: "",
    price: "",
  });

  const [isEdit, setisEdit] = useState(false);
  const navi = useNavigate();
  // navigate = 기능 작성에서 이동할 때 주로 사용 const 기능 () => {} / useEffect 안에 작성
  // 이동하는 동작이 소비자들 눈에 직접적을 보이지 않음, 개발자가 암묵적으로 이동
  // Link = 태그에서 직접적으로 주소 이동을 작성해줄 때 사용

  useEffect(() => {
    axios
      .get(`/api/chicken/${id}`)
      .then((response) => {
        setChicken(response.data);
        setEditData({
          chickenName: response.data.chickenName,
          description: response.data.description,
          price: response.data.price,
        });
      })
      .catch((err) => alert("불러오는데 문제가 발생했습니다."));
  }, []);

  const showEdit = () => {
    setEditData({ ...chicken });
    setisEdit(true);
  };

  const handleEdit = () => {
    axios
      .put(`/api/chicken/${id}`, editData)
      .then((response) => {
        setChicken(response.data);
        setisEdit(false);
      })
      .catch((err) => alert("수정하는 도중 문제가 발생했습니다."));
  };

  const delMenu = (id) => {
    axios
      .delete("http://localhost:9090/api/chicken?id=" + id)
      .then((response) => {
        alert("해당 메뉴를 삭제하였습니다.");
        navi('/');
      })
      .catch((err) => alert("해당 메뉴 삭제 중 에러가 발생하였습니다."));
  };

  if (!chicken) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="chicken-detail-container">
      {isEdit ? (
        <div>
          <input
            type="text"
            name="chickenName"
            value={editData.chickenName}
            onChange={(e) =>
              setEditData({ ...editData, chickenName: e.target.value })
            }
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            value={editData.price}
            onChange={(e) =>
              setEditData({ ...editData, price: e.target.value })
            }
          />
          <button onClick={handleEdit}>수정완료</button>
          <button onClick={(e) => setisEdit(false)}>돌아가기</button>
        </div>
      ) : (
        <div>
          <h1>{chicken.chickenName}</h1>
          <p>{chicken.description}</p>
          <p>{chicken.price}원</p>
          <button onClick={showEdit}>수정하기</button>
          <button onClick={(e) => delMenu(chicken.id)}>삭제하기</button>
        </div>
      )}
    </div>
  );
};

export default ChickenDetail;

import React, {useState, useEffect} from "react";
import axios from "axios";
import '../css/ChickenForm.css';

const ChickenForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const submitBtn = () => {
        axios.post("http://localhost:9090/api/chicken", {
            chickenName : name,
            description : description,
            price : price
        })
        .then(response => {
            alert(response.data.chickenName +", 해당 상품이 정상적으로 등록되었습니다.")
        })
        .catch(err => alert("치킨 등록 중 문제가 발생했습니다." + err));

        setName('');
        setDescription('');
        setPrice('');
    }

    return (
        <div className="chickenform-container">
            <label>메뉴 이름 : 
                <input 
                    type="text" value={name} 
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>메뉴 설명 : 
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
            </label>
            <label>메뉴 가격 : 
                <input 
                    type="number" value={price}
                    onChange={e => setPrice(e.target.value)} 
                />
            </label>
            <button onClick={submitBtn}>등록하기</button>
            <button>메인으로</button>
        </div>
    )
}

export default ChickenForm;
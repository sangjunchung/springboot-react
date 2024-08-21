import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../css/ChickenDetail.css';

const ChickenDetail = () => {
    const {id} = useParams();
    const [chicken, setChicken] = useState(null);

    useEffect(()=> {
        axios.get(`/api/chicken/${id}`)
        .then(response => {
            setChicken(response.data);
        })
        .catch(err => alert("불러오는데 문제가 발생했습니다."))
    },[])

    if(!chicken) {
        return (
            <div>
                로딩 중...
            </div>
        )
    }

    return (
        <div className="chicken-detail-container">
            <h1>{chicken.chickenName}</h1>
            <p>{chicken.description}</p>
            <p>{chicken.price}</p>
        </div>
    )
}

export default ChickenDetail;
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ChickenList = () => {
    const [chickens, setChickens] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:9090/api/chicken')
        .then(Response => setChickens(Response.data))
        .catch(err => alert("불러오는데 문제 발생했습니다."));
    }, [chickens])

    return(
        <div className='chicken-container'>
            <h1>치킨 메뉴</h1>
            <ul>
            {chickens.length === 0 ? (
                <p>현재 메뉴가 비어있습니다. 치킨을 등록해주세요.</p>
            ) : (
                <div>
                    {chickens.map(menu => (
                        <li key={menu.id}>
                            {menu.chickenName} - {menu.description} - ￦{menu.price}
                        </li>
                    ))}
                </div>
            )}
            </ul>
        </div>
    )
}

export default ChickenList;
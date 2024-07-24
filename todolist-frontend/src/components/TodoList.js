import React, {useState, useContext} from "react";
import TodoListContext from './TodoListContext';

function TodoList(){
    const {todoList, setTodoList, loginMember} = useContext(TodoListContext);
    const [inputTodo, setInputTodo] = useState('');
    let keyIndex = 0;

    const addTodoBtn = () => {
        if(inputTodo.trim().length === 0 ){
            alert('할 일을 입력해주세요.');
            return;
        }

        fetch('/todo', {
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                title:inputTodo,
                todoMemberNo:loginMember.todoMemberNo
            })
        })
        .then(response => response.text())
        .then(todoNo => {
            if(Number(todoNo) === 0){
                return;
            }
            /*
             기존 todoList + 새로 추가된 Todo를 이용해 새 배열을 만들어 todoList 대입 
            */
           //새로 추가된 Todo 만들기
           const newTodo = {
            todoNo:todoNo,
            title:inputTodo,
            isDone:'O',
            todoMemberNo:loginMember.todoMemberNo
           };
           // 기존 TodoList + newTodo 를 이용해서 새로운 할 일 목록을 만들기
           const newTodoList = [...todoList, newTodo];
           setTodoList(newTodoList);
           setInputTodo('');
        })
        .catch(
            e => console.log(e)
        );
    }

    // O,X 업데이트 / 할 일을 완료하면 X 버튼, 안했으면 O
    // 할 일을 처음부터 끝까지 모두 완료 미완료 처리하는 것이 아니라
    // 특정 할 일과 그 할일의 번호를 받아 특정 할 일만 수정
    const toggleTodo = (todo, index) => {
        console.log("todo : ", todo);
        console.log("index : ", index);

        fetch("/todo",{
            method:'put',
            // 전달하는 데이터 형식(JSON) 명시
            headers:{"Content-Type":"application/json"},
            // 객체나 배열을 JSON 문자열로 변경
            body: JSON.stringify({
                todoNo:todo.todoNo,
                isDone:todo.isDone === 'O' ? 'X' : 'O'
                /*
                만약에 할 일 완료 여부에 O 면 X로 변경, X 면 O로 변경
                */
            })
        })
        .then(response => response.text())
        .then(result => {
            if(result === '0'){
                alert('할 일 수정에 실패했습니다.');
                return;
            }

            const newTodoList = [...todoList];
            newTodoList[index].isDone = newTodoList[index].isDone === 'O' ? 'X' : 'O';

            setTodoList(newTodoList);
        })
        . catch(
            e => console.log(e)
        );
    }

    const deleteTodo = (todoNo, index) => {
        fetch("/todo", {
            method:'delete',
            headers:{'ContentType':'application/json'},
            body:{todoNo:todoNo}
        })
        .then(response => response.text()) // 응답 결과를 글자형식으로 가져옴
        .then(result => {
            if(result === '0'){
                alert('할 일 삭제에 실패했습니다.');
                return;
            }

            const newTodoList = [...todoList]; // 배열 복사

            // 배열.splice(인덱스, 몇칸)
            // -> 배열의 인덱스 몇 번째 태그부터 몇 칸을 잘라내서 반환할지 지정
            newTodoList.splice(index, 1);

            setTodoList(newTodoList);
        })
        .catch(e=>console.log(e));
    }

    return (
        <div>
            <h1>{loginMember.name}의 Todo List</h1>
            <div className="todo-container">
                <h3>할 일(Todo) 입력</h3>
                <div>
                    <input type="text" value={inputTodo}
                        onChange={e => setInputTodo(e.target.value)}
                    />
                    <button onClick={addTodoBtn}>할일 추가하기</button>
                </div>
                <ul>
                    {/*배열.map : 기존 배열을 이용해서 새로운 배열 만들기 */}
                    {todoList.map((todo, index) => (
                        <li key={keyIndex++}>
                            <div>
                                <span className={todo.isDone === 'X' ? 'todo-compleate':''}>
                                    {todo.title}    
                                </span> 
                                <span>
                                    <button onClick={()=> {toggleTodo(todo, index)}}>
                                        {todo.isDone}
                                    </button>
                                    <button onClick={()=>{deleteTodo(todo.todoNo, index)}}>
                                        삭제
                                    </button>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default TodoList;
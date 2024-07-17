package todo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import todo.dto.Todo;
import todo.dto.TodoMember;
import todo.mapper.TodoMapper;

@Service
public class TodoServiceImpl implements TodoService {

	@Autowired
	private TodoMapper todoMapper;
	
	@Override
	public int idCheck(String id) {
		return todoMapper.idCheck(id);
	}

	@Override
	public int singup(TodoMember member) {
		return todoMapper.singup(member);
	}

	@Override
	public Map<String, Object> login(TodoMember member) {
		Map<String, Object> map = new HashMap<>();
		
		TodoMember loginMember = todoMapper.login(member);
		
		map.put("loginMember", loginMember);
		
		if(loginMember != null) {
			List<Todo> todoList = todoMapper.todoListSelect(loginMember.getTodoMemberNo());
			map.put("todoList", todoList);
		}
		
		return map;
	}

	@Override
	public int todoInsert(Todo todo) {
		int result = todoMapper.todoInsert(todo);
		
		return result > 0 ? todo.getTodoNo() : 0;
	}

	@Override
	public int todoUpdate(Todo todo) {
		return todoMapper.todoUpdate(todo);
	}

	@Override
	public int todoDelete(int todoNo) {
		return todoMapper.todoDelete(todoNo);
	}
	
	// react -> map key value 형태로 키 이름과 키에 해당하는 값이 들어올 것
}

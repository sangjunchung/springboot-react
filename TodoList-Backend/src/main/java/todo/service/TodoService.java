package todo.service;

import java.util.Map;

import todo.dto.Todo;
import todo.dto.TodoMember;

public interface TodoService {
	int idCheck(String id);
	int singup(TodoMember member);
	Map<String, Object> login(TodoMember member);
	
	int todoInsert(Todo todo);
	int todoUpdate(Todo todo);
	int todoDelete(int todoNo);
}

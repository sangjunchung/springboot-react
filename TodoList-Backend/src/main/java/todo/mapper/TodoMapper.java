package todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import todo.dto.Todo;
import todo.dto.TodoMember;

@Mapper
public interface TodoMapper {
	int idCheck(String id);
	int singup(TodoMember member);
	TodoMember login(TodoMember member);
	
	List<Todo> todoListSelect(int todoMemberNo);
	int todoInsert(Todo todo);
	int todoUpdate(Todo todo);
	int todoDelete(int todoNo);
}

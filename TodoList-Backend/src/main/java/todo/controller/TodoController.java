package todo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import todo.dto.Todo;
import todo.dto.TodoMember;
import todo.service.TodoService;

@RestController
public class TodoController {
	@Autowired
	private TodoService todoService;
	
	/** 아이디 중복 검사
	 *  @Param id
	 *  @Return 중복 : 1, 사용가능 : 0
	 */
	
	@GetMapping("/idCheck")
	public int idCheck(@RequestParam("id") String id) {
		return todoService.idCheck(id);
	}
	
	/** 회원가입
	 * @Param member
	 * @Return 성공 : 1, 실패 : 0
	 */
	
	@PostMapping("/signup")
	public int signup(@RequestBody TodoMember member) {
		return todoService.singup(member);
	}
	
	/** 로그인
	 * @Param member
	 * @Return 성공 : 회원정보 /todoList, 실패 : null
	 */
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody TodoMember member){
		return todoService.login(member);
	}
	
	/** 할 일 추가
	 * @param todo
	 * @return 성공 : 1, 실패 : 0
	 */
	
	@PostMapping("/todo")
	public int todoInsert(@RequestBody Todo todo) {
		return todoService.todoInsert(todo);		
	}

	/** 할 일 수정
	 * @param todo
	 * @return 성공 : 1, 실패 : 0
	 * update 수정 @PutMapping 사용
	 * @PostMapping 을 사용해도 되지만, @PutMapping 이 좀더 직관적임
	 */
	
	@PutMapping("/todo")
	public int todoUpdate(@RequestBody Todo todo) {
		return todoService.todoUpdate(todo);		
	}

	/** 할 일 삭제
	 * @param todoNo
	 * @return 성공 : 1, 실패 : 0
	 * delete 삭제의 경우 @DeleteMapping 사용
	 * @PostMapping 을 사용해도 문제는 없음
	 */
	
	@DeleteMapping("/todo")
	public int todoDelete(@RequestParam("todoNo") int todoNo) {
		return todoService.todoDelete(todoNo);		
	}
	
	/** RestAPI 테스트
	 * @Return 100
	 */
	@GetMapping("/test")
	public int test() {
		return 100;
	}
	
	
	/*
		CRUD : DataBase 에서 데이터 조작의 기본적인 네 가지 작업
		Create : 새로운 데이터를 생성
		Read : 데이터 읽고 조회
		Update : 데이터 수정
		Delete : 데이터 삭제
		
		Insert Select Update Delete : 데이터 베이스 DML
		
		HTTP Method(웹 주소에서 사용되는 기능 명칭) : GET POST PUT DELETE
		HTTP Method : http(인터넷=웹)에서 사용자(소비자)가 서버에 회원가입이나 로그인과
					  같은 요청을 보낼 때 사용하는 기능 명칭 나타내고, http method는
					  CRUD 작업과 연결돼서 사용
		
		GET : 서버로부터 데이터를 조회하기 위한 요청, CRUD 에서는 Read
		Get /users = 모든 사용자 목록을 조회하는 주소
		
		POST : 클라이언트가 서버에 새로운 데이터를 생성해달라고 요청, CRUD 에서는 Create
		Post /user = 새로운 사용자를 생성 body에 사용자의 정보가 포함돼서 DB에 전송
		
		PUT : 클라이언트가 서버에 존재하는 데이터를 본인의 취지에 맞게 업데이트 해달라고 요청, CRUD에서는 Update
		Put /mypage = 기존에 존재하는 사용자가 자신의 정보를 수정해달라고 서버에 요청, DB가 수정됨 
		
		DELETE : 클라이언트가 서버에 존재하는 데이터를 삭제하기 위한 요청, CRUD 에서는 DELETE
		Delete /user/1 = 회원번호가 1인 사용자를 삭제
	*/
}

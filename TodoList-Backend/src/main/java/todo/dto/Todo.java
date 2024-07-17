package todo.dto;

import lombok.*;

// VO = DataBase 까지는 가지 않고 읽기 전용
// DTO = DataBase에 값을 연동해서 사용
// Entity = JPA / DataBase Oracle에 테이블을 만드지 않아도 알아서 테이블 만들어주고
// 			컬럼 지정해주고 컬럼 값 설정


@Getter
@Setter
@ToString
public class Todo {
	private int todoNo;
	private String title;
	private char isDone;
	private int todoMemberNo;
}

package com.kh.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NaverUser {
	// id ~ profileImage 까지는 네이버에서 저장된 값을 가져와서 DB에 저장
	private String id;
	private String email;
	private String nickname;
	private String name;
	private String gender;
	private String profileImage;
	// password 는 사용자가 작성한 비밀번호를 가져와서 DB에 저장
	private String password;
}


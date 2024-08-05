package com.kh.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
	private String id;
	private String email;
	private String name;
	private String password;
	private String profileImage;
}

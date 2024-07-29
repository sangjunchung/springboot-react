package com.kh.service;

import java.util.List;

import com.kh.dto.User;

// 서비스 목록 리스트, 여기는 목록만 작성해주고 impl에 오버라이드해서 각 환경에 맞게 재사용
// 기능을 작성하기 전에 상세하게 작성할 기능 목록을 구성
public interface UserService {
	List<User> findAll();
	void insertUser(User user);
	void deleteUser(User user);
	void deleteUser2(int id);
	void updateUser(User user);
}

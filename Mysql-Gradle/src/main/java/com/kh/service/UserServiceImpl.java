package com.kh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dto.User;
import com.kh.mapper.UserMapper;
/*
implements로 상속받는 인터페이스 서비스는
기능에 대한 목록이 작성이 되어있을 뿐이지
상세한 기능에 대해서 작성이 된 것이 아님
상속을 받은 클래스는 적어놓은 각각의 목록들의
기능을 설정해줘야하기 때문에 설정이 안된 목록이 있으면
빨간 엑스박스가 뜸0
*/
@Service // 서비스 기능을 상세하게 작성해주는 공간
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public List<User> findAll() {
		return userMapper.findAll();
	}

	@Override
	public void insertUser(User user) {
		userMapper.insertUser(user);
	}

	@Override
	public void deleteUser(User user) {
		userMapper.deleteUser(user.getId());
	}

	@Override
	public void deleteUser2(int id) {
		userMapper.deleteUser(id);
	}
}

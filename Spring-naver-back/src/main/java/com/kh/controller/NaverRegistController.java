package com.kh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.dto.NaverUser;
import com.kh.service.NaverUserService;

// 네이버로 회원가입 후 DB에 회원가입 정보를 등록하는 컨트롤러

@RestController
public class NaverRegistController {
	@Autowired
	private NaverUserService naverUserService;
	
	// 회원가입을 위한 Post Mapping 작성
	@PostMapping("/naverAPI/register")
	public String insertNaverUser(@RequestBody NaverUser naverUser) {
		// DB에 React 로 가져온 naverUser 정보를 큰 수정 없이 전체 다 넣겠다.
		naverUserService.insertNaverUser(naverUser);
		
		// naverUserService.insertNaverUser(null);
		// null 이 들어갈 자리에는 React 에서 받아온 값을 넣어주는 공간
		// 처음에는 Java 에서 어떤 값을 넣어줘야 할지 모르기 때문에 null 로 설정이 되어있는 것
		// null 자리에는 @RequestBody 나 @RequestParam 으로 가져온 값을 작성
		// @RequestBody = 전체, @RequestParam = 하나
		
		return "Naver API를 활용한 회원가입 성공!";
	}
}

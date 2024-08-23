package com.kh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.dto.Chicken;

// mybatis - mapper 이 두가지를 설정
// @Repository @Mapper 는 interface로 시작
@Repository
public interface ChickenRepository extends JpaRepository<Chicken, Integer> {
	List<Chicken> findByChickenNameContainingIgnoreCase(String query);
	/*
		findByChickenName = 어떤컴럼에서 검색 where chickenName = "?"
		Containing = 부분 일치 허용 Like %...% 해당
		IgnoreCase = 대소문자 상관없이 찾음
	*/
	
	// 전체보기 전체넣기 전체수정하기 전체삭제하기 와 같은 기본 기능은
	// JpaRepository 안에 모두 들어있음
	
	// select * from chicken
	
	// 특정 값을 찾을 때 쓰는 기능
	// findById(Integer id); -> where 대신 find
	// 만약에 where 이메일 = '' 비밀번호 = '' 로그인을 한다
	// 레포지토리에 findby
}

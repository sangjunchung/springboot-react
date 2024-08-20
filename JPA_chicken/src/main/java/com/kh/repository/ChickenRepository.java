package com.kh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.dto.Chicken;

// mybatis - mapper 이 두가지를 설정
// @Repository @Mapper 는 interface로 시작
@Repository
public interface ChickenRepository extends JpaRepository<Chicken, Integer> {
	// 전체보기 전체넣기 전체수정하기 전체삭제하기 와 같은 기본 기능은
	// JpaRepository 안에 모두 들어있음
	
	// select * from chicken
}

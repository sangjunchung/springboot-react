package com.kh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dto.Chicken;
import com.kh.repository.ChickenRepository;

@Service
public class ChickenService {
	
	@Autowired
	private ChickenRepository chickenRepository;
	
	// 치킨테이블 모두 보기 List 목록으로 전체보기 어떤 목록을 전체볼거니?
	// List<Chicken> 목록<주제>
	public List<Chicken> getAllChickens() {
		return chickenRepository.findAll(); // 모두찾기
	}
	
	// 치킨 메뉴 추가하기
	public Chicken createChicken(Chicken chicken) {
		return chickenRepository.save(chicken); // 치킨에 대해서 DTO 에 작성된 컬럼들에 모두 삽입
	}
	
	public void deleteChicken(int id) {
		chickenRepository.deleteById(id);
	}
	
	public Chicken findById(Integer id) {
		return chickenRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("일치하는 정보를 찾을 수 없습니다."));
	}
	
	// findById 를 작성해줄 때는 아이디를 찾지 못할 예외사항을 필수로 작성해줘야함
	// .orElseThrow() 예외사항 작성
	
	public Chicken updateChicken(Integer id, Chicken uc) {
		Chicken chicken = chickenRepository.findById(id)
						  .orElseThrow(() -> new RuntimeException("치킨을 찾을 수 없습니다."));
		
		chicken.setChickenName(uc.getChickenName());
		chicken.setDescription(uc.getDescription());
		chicken.setPrice(uc.getPrice());
		
		return chickenRepository.save(chicken);
	}
	
	public List<Chicken> searchChickens(String query) {
		return chickenRepository.findByChickenNameContainingIgnoreCase(query);
	}
}

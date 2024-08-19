package com.kh.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 공공데이터 api 를 이용한 api url 주소값 한번 더 확인
// http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty

// http://apis.data.go.kr/ - 공공데이터 주소 -> react env 로 80 처리를 한 주소
// http://localhost:포트번호/ - 내 컴퓨터 주소 -> react env 로 80 처리를 안 한 주소

@RequestMapping("/B552584/ArpltnInforInqireSvc") // 공공데이터에서 대기오염 서비스 공통 주소
// 만약에 대기오염서비스가 아니라 수질오염서비스 주소를 이용해야한다면
// RequestMapping에 /수질오염서비스api 를 작성해주면 됨
@RestController
public class APISController {
	
	@GetMapping("/getCtprvnRltmMesureDnsty") // 시도별 실시간 측정 정보 조회 api 주소
	public String get실시간측정정보() {
		return "측정결과전달하기";
	}
	
	@GetMapping("/getMsrstnAcctoRltmMesureDnsty") // 측정소별 실시간 측정정보 조회
	public String get측정소별실시간측정정보() {
		return "측정결과전달하기";
	}
	
	@GetMapping("/getUnityAirEnvrnIdexSnstiveAboveMsrstnList") // 통합대기환경지수 나쁨 이상 측정소 목록조회
	public String get대기나쁨이상측정소() {
		return "측정결과전달하기";
	}
	
	@GetMapping("/getMinuDustFrcstDspth") // 대기질 예보통보 조회
	public void get대기질예보통보() {
		System.out.println("측정 결과 전달하기");
	}
	
	@GetMapping("/getMinuDustWeekFrcstDspth") // 초미세먼지 주간예보 조회
	public void get초미세먼지() {
		System.out.println("측정 결과 전달하기");
	}
}


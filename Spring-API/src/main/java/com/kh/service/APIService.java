package com.kh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class APIService {
	// @Value 활용해서 application.properties 에 작성한 값 가져오기
	
	@Value("${api.base-url}")
	private String apiBaseUrl;
	
	@Value("${api.key}")
	private String apiKey;
	
	@Value("${api.content-type}")
	private String apiContentType;
	
	@Autowired
	private RestTemplate restTemplate;
	
	// 공공 데이터를 가져오기 위한 환경설정 서비스
	public String getApiData(String endpoint) {
		// url = 시작주소 + 상세주소
		String url = apiBaseUrl + endpoint; // 시작 주소와 api가 끝나는 지점(endpoint)
		
		HttpHeaders header = new HttpHeaders();
		header.set("Content-Type", apiContentType);
		header.set("Authorization", "Bearer "+apiKey);
		
		HttpEntity<String> entity = new HttpEntity<>(header);
		
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
		
		return response.getBody();
	}
}

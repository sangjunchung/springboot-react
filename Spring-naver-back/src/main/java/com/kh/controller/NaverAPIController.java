package com.kh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.dto.User;
import com.kh.service.UserService;
/*
24-07-31 리액트와 스프링 프레임워크 연동을 위한 컨트롤러
리액트와 네이버 로그인과 최종 연동된 컨트롤러
*/
@RestController
public class NaverRegistController {
	
	@Autowired
	private UserService userService;
	
	@Value("${naver.client_id}")
	private String clientId;
	
	@Value("${naver.client_secret}")
	private String clientSecret;
	
	@Value("${naver.redirect_uri}")
	private String redirectURI;
	
	@Value("${naver.state}")
	private String state;

	@GetMapping("/naverLogin")
	   public String naverLogin() {
		   String api_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectURI + "&state=" + state;
		   
	       return "<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>";
	}
	
	@GetMapping("/callback") 
	public ResponseEntity<String> callback(@RequestParam("code") String code, @RequestParam("state") String state) {
		
		String api_url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="
			     + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectURI + "&code=" + code + "&state=" + state;
		
		RestTemplate restTemplate = new RestTemplate();
	
		String responseResult = restTemplate.getForObject(api_url, String.class);
		
		System.out.println("응답결과 : "+responseResult);
		
		String accessToken = getToken(responseResult); // 위 주소에서 작성한 토큰을 가져오겠다.
		
		// 여기서 응답에 대한 결과를 전달 -> 나중에 프로젝트 합칠 때 지울 주소
		String redirectUrl = "http://localhost:3000/userInfo?access_token=" + accessToken;
		
		HttpHeaders header = new HttpHeaders();
		header.add("Location", redirectUrl);
		
		return new ResponseEntity<>(header, HttpStatus.FOUND); // 프론트에 제대로 전달했는지 체크
	}
	
	// 보호 개인적으로 인증받은 토큰가지고 전달하는 기능
	private String getToken(String res) { // extractAccessToken 기능 이름 설정해주는 것이 좋음
		ObjectMapper om = new ObjectMapper();
		JsonNode jsonNode;
		try {
			jsonNode = om.readTree(res);
			return jsonNode.get("access_token").asText(); // 네이버에서 가져온 토큰을 글자처리
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} // Node Tree
	}
	
	// 나중에 callback에서 가져온 유저정보가 보이는 주소
	@GetMapping("/userInfo")
	public ResponseEntity<String> getUserInfo(@RequestParam("access_token") String accessToken) {
		String apiURL = "https://openapi.naver.com/v1/nid/me"; // 유저 정보가 담긴 url
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+ accessToken);
		headers.set("Accept", "application/json"); // 가져온 데이터를 json 글자 데이터로 전달
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		// entity까지 무사히 넘어오는지 확인
		System.out.println("Entity : "+entity);
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> res = restTemplate.exchange(apiURL, HttpMethod.GET, entity, String.class);
		
		System.out.println("Response Status Code : "+res.getStatusCode()); // 네이버 로그인에서 로그인 성공/실패 여부
		System.out.println("Response Headers : "+res.getHeaders()); // 네이버 로그인할 때 자격 인증이 어떻게 들어갔는지
		System.out.println("Response Body : "+res.getBody()); // 네이버 로그인해서 가져온 로그인 정보 출력
		
		// 만약에 성공적으로 넘어갔다면 성공적으로 넘어갔다는 표시가 있지만
		// 성공적으로 넘어가지 않았다면 넘어가지 않은 이유 출력
		if(!res.getStatusCode().is2xxSuccessful()) {
			System.err.println("fail Status code : " + res.getStatusCode());
		}
		
		return res;
	}
	
	@PostMapping("/signUpUser")
	public void signUpUser(@RequestBody User user) {
		System.out.println(user);
		userService.signUpUser(user);
	}
}

package com.kh.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpSession;
//import javax. ; javax 는 구버전
// import jakarta. ; jakarta가 신버전으로 import 할 때 javax 하게되면 에러 발생

/*
24-07-30 NaverLogin을 한 후 로그인한 내용을 React에서 볼 수 있도록
NaverLoginContorller.java 파일을 수정
NaverLoginContorller.java 주소(api url) 충돌을 막기 위해
@RequestMapping("/api")를 제거함 
*/
@RestController
@RequestMapping("/naver") // NaverRegist 와 주소 충돌을 방지하기 위해 임의로 작성
public class OAuthController {
	
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
	public String callback(@RequestParam String code, @RequestParam String state, HttpSession session) {
		String api_url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="
			     + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectURI + "&code=" + code + "&state=" + state;

		RestTemplate restTemplate = new RestTemplate();
		// String, Object 앞의 값은 키이름이기 때문에 String
		// 키이름에 담긴 값은 String이라는 확정을 지을 수 없으므로 Object로 가져옴
		Map<String, Object> responseResult = restTemplate.getForObject(api_url, Map.class);
		
		System.out.println("Token response : " + responseResult);
		
		// token 인증받은 값을 가져오는데 Bearer access_token 사용
		// 가져온 토큰 데이터를 문자열로 변환해서 글자처럼 사용
		String accessToken = (String) responseResult.get("access_token"); 
		// 네이버 개발자 문서에 보면 access_token 으로 로그인 허용된 값을 가져가라 작성 
		
		String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
		// import org.springframework.http.HttpHeaders;
		HttpHeaders headers = new HttpHeaders();
		// 네이버 개발자에서 제공한 작성 양식
		headers.set("Authorization", "Bearer "+ accessToken);
		
		HttpEntity<String> entity = new HttpEntity<>("", headers);
		// HttpEntity = 응답, 요청 모두 있음 상세한 기능 x
		// ResponseEntity = 응답만 있음 상세한 기능 O
		// RequestEntity = 요청만 있음 상세한 기능 O
		
		ResponseEntity<Map> userInfoRes = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
		Map<String, Object> userInfo = userInfoRes.getBody();
		session.setAttribute("userInfo", userInfo); // session에 로그인 정보를 담겠다.
		
		/*
		 HttpHeaders 에 인증에 대한 값을 Bearer 가져오기
		 인증을 위해 서버에서 제공되는 보안 토큰
		 주로 사용자가 인증을 받고나서 api 요청을 할때 사용
		 
		 예를 들어, 네이버에 로그인을 하고 나면 Naver 사용자에게 로그인됐다는 토큰 발급
		 추후 네이버에 로그인이 된 기록을 가지고 어떤 요청을 하면
		 요청을 할 때 헤더에 Authorization:Bearer{} " 작성하고 요청을 해야함
		 
		 Bearer = 소지자, 보유자
		 Authorization = 권한 부여
		 
		 Authorization:Bearer{}
		 권한 부여 : 권한을 가지고 있는 사람{"권한을 가지고 있는 번호"}
		*/
		return "redirect:";
	}
		
	// 가져온 네이버 정보를 리액트로 전달할 GetMapping
	@GetMapping("/userInfo")
	// import jakarta.servlet.http.HttpSession;
	public Map<String, Object> userInfo(HttpSession session){
		// HttpSession 을 Map으로 형변환
		Map<String,Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
		return userInfo;
	}
}

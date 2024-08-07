package com.kh.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.dto.Post;
import com.kh.mapper.PostMapper;

@Service
public class PostServiceImpl implements PostService{

	@Autowired
	private PostMapper postMapper;
	
	// import org.springframework.beans.factory.annotation.Value;
	@Value("${file.upload-dir}")
	private String uploadDir; 	// application.properties 에서 설정 이름 가져와
	// file.upload-dir=C:/Users/user1/Desktop/saveImage 경로 넣어서 사용
	
	@Override
	public List<Post> findAll() {
		return postMapper.findAll();
	}

	@Override
	public void insertPost(Post post) {
		postMapper.insertPost(post);
	}

	@Override
	public void uploadImages(MultipartFile[] files, String title, String content) {
		// 1. 바탕화면에 이미지 저장하고 불러올 폴더가 존재하는지 확인하고 없으면 폴더 생성
		File uploadDirFile = new File(uploadDir);
		
		if(!uploadDirFile.exists()) {
			if(!uploadDirFile.mkdirs()) {
				throw new RuntimeException("폴더 생성 실패하였습니다.");
			}
		}
		// UUID 이미지 이름 저장 중복 없이 저장할 수 있도록 설정
		List<String> fileNames = null; 
		// 파일명이 1개일 수 있고, 여러 이름이 들어올 수 있기 때문에
		// fileNames = 파일 이름들 리스트로 글자 목록이 작성
		
		try {
			// List.of(files) files = 파일들 배열을 리스트(목록)로 변환
			// .stream() = 리스트나 배열과 같은 데이터를 하나씩 처리하는 기능
			// .collect(Collectors.toList()); stream으로 가져온 이미지 데이터를 리스트로 정렬
			// 이미지들 이미지를 한개씩 담아오기 map -> 이미지를 하나씩 가져올 때 stream을 이용해서 가져오기
			// 스트림을 이용해서 가져온 이미지를 collect를 이용해서 리스트로 모음, 한번 더 리스트로 목록 변환
			fileNames = List.of(files).stream().map(file -> {
				// 파일을 폴더에 저장, 폴더에 파일을 저장할 때 이미지에 랜덤으로 이름을 부여해서 저장
				// UUID를 이용해서 저장
				String fileName1 = UUID.randomUUID().toString();
				
				// 랜덤으로 작성한 이름 뒤에 원본 이름을 붙이고 싶을 때
				// file.getOriginalFilename() 를 붙여주면됨
				String fileName2 = UUID.randomUUID().toString()+file.getOriginalFilename();

				// 랜덤으로 작성한 이름 _ 원본이름 _ 로 랜덤이름과 원본이름 구분짓고 싶을 때
				String fileName3 = UUID.randomUUID().toString()+"_"+file.getOriginalFilename();
				
				// 폴더 안에 이미지들 저장하기 완성
				// File.separator = 경로구분  window(\, /) 랑 맥북(/) 모두 경로를 알아서 잡아줌
				File df = new File(uploadDir + File.separator + fileName3);
				
				try {
					file.transferTo(df);
				} catch (IOException e) {
					throw new RuntimeException("파일 업로드 실패", e);
				}
				
				return fileName3;
			}).collect(Collectors.toList());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// 이미지 이름 설정과 이미지 경로 생성한 것을 바탕으로 DB 넣어주기
		Post post = new Post();
		post.setTitle(title);
		post.setContent(content);
		post.setImageUrl(String.join(",", fileNames));
		
		insertPost(post);
	}
}

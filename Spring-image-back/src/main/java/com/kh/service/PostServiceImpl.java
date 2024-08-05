package com.kh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.dto.Image;
import com.kh.dto.Post;
import com.kh.mapper.PostMapper;

@Service
public class PostServiceImpl implements PostService{

	@Autowired
	private PostMapper postMapper;
	
	@Override
	public List<Post> findAll() {
		return postMapper.findAll();
	}

	@Override
	public void insertPost(Post post) {
		postMapper.insertPost(post);
	}

	@Override
	public void insertImage(Image image) {
		postMapper.insertImage(image);
	}
}

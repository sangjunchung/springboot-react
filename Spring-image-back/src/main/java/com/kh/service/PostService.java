package com.kh.service;

import java.util.List;

import com.kh.dto.Image;
import com.kh.dto.Post;

public interface PostService {
	List<Post> findAll();
	void insertPost(Post post);
	void insertImage(Image image);
}

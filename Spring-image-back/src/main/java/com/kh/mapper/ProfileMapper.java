package com.kh.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.dto.UserProfile;

@Mapper
public interface ProfileMapper {
	List<UserProfile> getProfile();
	void insertProfile(UserProfile userProfile);
}

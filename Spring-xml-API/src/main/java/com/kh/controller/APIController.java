package com.kh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.service.APIService;

@RestController
@RequestMapping("/api")
public class APIController {
	
	@Autowired
	private APIService apiService;
	
	@GetMapping("/air-pollution")
	public String getAirData() throws Exception {
		return apiService.getAirDate();
	}
}

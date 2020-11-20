package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.MessgeVO;
import com.example.mapper.MessgeMapper;

@RestController
public class MessgeController {
	@Autowired
	MessgeMapper mapper;
	
	@RequestMapping(value="insert",method=RequestMethod.POST)
	public void insert(MessgeVO vo) {
		mapper.insert(vo);
	}
	@RequestMapping(value="sendList")
	public List<MessgeVO> sendList(String sender) {
		return mapper.sendList(sender);
	}
	@RequestMapping(value="delete",method=RequestMethod.POST)
	public void delete(int mid) {
		mapper.delete(mid);
	}
}

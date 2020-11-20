package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.domain.Criteria;
import com.example.domain.ReplyVO;
import com.example.mapper_oracle.ReplyMapper;

@Controller
@RequestMapping(value="/reply") 
public class ReplyController {
	@Autowired
	ReplyMapper mapper;
	
	@RequestMapping("/list")
	@ResponseBody
	public List<ReplyVO>list(int bno,int page){
		Criteria cri=new Criteria();
		cri.setPage(page);
		return mapper.list(bno,cri);
	}
	@RequestMapping(value="/")
	public String reply(){
		
		return "reply";
	}
	@RequestMapping(value="/insert",method=RequestMethod.POST) 
	@ResponseBody
	public void insert(ReplyVO vo){
		mapper.insert(vo);
	}
	@RequestMapping(value="/delete",method=RequestMethod.POST) 
	@ResponseBody
	public void deletePost(int rno){
		mapper.delete(rno);
	}
}

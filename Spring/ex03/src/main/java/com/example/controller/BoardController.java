package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.domain.BoardVO;
import com.example.domain.Criteria;
import com.example.domain.PageMaker;
import com.example.mapper.BoardMapper;

@Controller
public class BoardController {
	@Autowired
	BoardMapper mapper;
	
	@RequestMapping(value="/list") 
	public String list(Model model , Criteria cri){
		model.addAttribute("list",mapper.list(cri));
		
		
		PageMaker pm=new PageMaker();
		pm.setCri(cri);
		pm.setTotalCount(mapper.totalCount(cri));
		model.addAttribute("pm",pm);
		return "list";
	}
	@RequestMapping(value="/insert") 
	public void insert(){
	
	}
	@RequestMapping(value="/insert",method=RequestMethod.POST) 
	public String insertPost(BoardVO vo){
		mapper.insert(vo);
		return "redirect:list";
	}
	@RequestMapping(value="/read") 
	public void read(int bno, Model model){
		model.addAttribute("vo",mapper.read(bno));
	}
	@RequestMapping(value="/update",method=RequestMethod.POST) 
	public String updatePost(BoardVO vo){
		mapper.update(vo);
		return "redirect:list";
	}
	@RequestMapping(value="/delete",method=RequestMethod.POST) 
	public String deletePost(int bno){
		mapper.delete(bno);
		return "redirect:list";
	}
}

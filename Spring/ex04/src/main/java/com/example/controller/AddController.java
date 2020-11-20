package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.domain.AddVO;
import com.example.domain.Criteria;
import com.example.domain.PageMaker;
import com.example.mapper.AddMapper;

@Controller
public class AddController {
	@Autowired
	AddMapper mapper;
	
	
	@RequestMapping(value="/list") //redirect 에서 list.jsp 로 바로 돌아가지 않고,
	public String list(Model model,  Criteria cri ){
		model.addAttribute("list",mapper.list(cri)); //여기서 model 을 거쳐서 Attribute 작업 후에
		
		
		PageMaker pm=new PageMaker();
		pm.setCri(cri);
		pm.setTotalCount(mapper.totalCount(cri));
		model.addAttribute("pm",pm);
		return "list"; //list.jsp 로 간다.
	}
	
	@RequestMapping("/insert")
	public void insert(){
		
	}
	
	@RequestMapping("/read")
	public String read(int ano, Model model){
		model.addAttribute("vo", mapper.read(ano));
		return "read";
	}
	
	@RequestMapping("/delete")
	public String delete(int ano){
		mapper.delete(ano);
		return "redirect:list";
	}
	
	@RequestMapping(value="/insert", method=RequestMethod.POST)
	public String insertPost(AddVO vo){
		System.out.println(vo.toString());
		mapper.insert(vo);
		return "redirect:list"; // "/list" 로 돌아간다.
	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public String updatePost(AddVO vo){
		System.out.println(vo.toString());
		mapper.update(vo);
		return "redirect:list"; // "/list" 로 돌아간다.
	}
}

package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.domain.Criteria;
import com.example.domain.PageMaker;
import com.example.mapper.BoardMapper;

@Controller
public class BoardController {
	@Autowired
	BoardMapper mapper;
	
	@RequestMapping(value="/list") 
	public String list(Model model , Criteria cri){
		PageMaker pm=new PageMaker();
		pm.setCri(cri);
		pm.setTotalCount(mapper.totalCount(cri));
		model.addAttribute("pm",pm);
		model.addAttribute("list",mapper.list(cri));
		return "list";
	}
	@RequestMapping(value="/read") 
	public void read(int bno, Model model){
		model.addAttribute("vo",mapper.read(bno));
	}
	
}

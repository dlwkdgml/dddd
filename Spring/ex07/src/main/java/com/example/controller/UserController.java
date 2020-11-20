package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.mapper.UserMapper;

@Controller
public class UserController {
	@Autowired
	UserMapper mapper;
	
	@RequestMapping("list")
	public void list(Model model) {
	model.addAttribute("list", mapper.list());
	}
	@RequestMapping("send")
	public void send(Model model , String uid) {
	model.addAttribute("vo", mapper.read(uid));
	model.addAttribute("list",mapper.list());
	}
}

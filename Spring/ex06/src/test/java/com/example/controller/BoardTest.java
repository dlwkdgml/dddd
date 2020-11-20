package com.example.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.example.domain.BoardVO;
import com.example.domain.Criteria;
import com.example.mapper.BoardMapper;

@RunWith(SpringJUnit4ClassRunner.class) //먼저 SpringJUnit4ClassRunner.class import한다.
@ContextConfiguration(locations={"file:src/main/webapp/WEB-INF/spring/**/*.xml"})

public class BoardTest {
	Criteria cri = new Criteria();
	@Autowired
	private BoardMapper mapper;
	
	@Test
	
	public void list() { mapper.list(cri); }
	
	@Test
	public void read() { 
		mapper.read(1); 
		}
	@Test
	public void insert() {
		
		BoardVO vo=new BoardVO();
		vo.setTitle("새글추가");
		vo.setContent("새내용");
		vo.setWriter("newuser");
		mapper.insert(vo);
		mapper.list(cri); }
	@Test
	public void update() {
		BoardVO vo=new BoardVO();
		vo.setTitle("업데이트글");
		vo.setContent("업데이트");
		vo.setWriter("이장희");
		vo.setBno(1);
		mapper.update(vo);
		mapper.read(1); }
	@Test
	public void delete(){
		mapper.delete(1);
		mapper.list(cri);
	}
	
}

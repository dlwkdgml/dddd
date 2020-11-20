package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.ReplyVO;
import com.example.mapper.BoardMapper;
import com.example.mapper.ReplyMapper;

@Service
public class ReplyService {
	@Autowired
	BoardMapper bMapper;
	
	@Autowired
	ReplyMapper rMapper;
	@Transactional
	public void insert(ReplyVO vo){
		rMapper.insert(vo);
		bMapper.updateReply(vo.getBno(), 1);
	}
	@Transactional
	public void delete(int rno){
		ReplyVO vo=rMapper.read(rno);
		rMapper.delete(rno);
		bMapper.updateReply(vo.getBno(), -1);
	}
	
}

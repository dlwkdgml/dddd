package com.example.mapper;

import java.util.List;

import com.example.domain.MessgeVO;

public interface MessgeMapper {
	public void insert(MessgeVO vo);
	public List<MessgeVO> sendList(String sender);
	public void delete(int mid);
}

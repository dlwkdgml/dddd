package com.example.mapper;

import java.util.List;

import com.example.domain.AddVO;
import com.example.domain.Criteria;

public interface AddMapper {
	
	public List<AddVO> list(Criteria cri);
	
	public void insert(AddVO vo);
	
	public AddVO read(int ano);
	
	public void update(AddVO vo);
	
	public void delete(int ano);
	
	public int totalCount(Criteria cri);
}

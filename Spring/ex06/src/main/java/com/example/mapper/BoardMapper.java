package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.domain.BoardVO;
import com.example.domain.Criteria;

public interface BoardMapper {
	public List<BoardVO> list(Criteria cri);
	public BoardVO read(int bno);
	public void insert(BoardVO vo);
	public void delete(int bno);
	public int totalCount(Criteria cri);
	public void update(BoardVO vo);
	public void updateView(int bno);
	public void updateReply(@Param("bno") int bno,@Param("amount") int amount);
}

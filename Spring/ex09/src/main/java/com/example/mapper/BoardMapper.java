package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.domain.BoardVO;
import com.example.domain.Criteria;

public interface BoardMapper {
	public List<BoardVO> list(Criteria cri);
	public int totalCount();
	public BoardVO read(int bno);
	public void addAttach(String fileName);
	public List<String> getAttach(int bno);
	public void insert(BoardVO vo);
	public void deleteAttach(int bno);
	public void replaceAttach(@Param("bno") int bno, @Param("fileName") String fileName);
	public void update(BoardVO vo);
	public void updateView(int bno);
	public void updateReply(@Param("bno") int bno,@Param("amount") int amount);
}

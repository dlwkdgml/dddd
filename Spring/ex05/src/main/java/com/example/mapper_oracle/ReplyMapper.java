package com.example.mapper_oracle;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.domain.Criteria;
import com.example.domain.ReplyVO;

public interface ReplyMapper {
	public List<ReplyVO> list(@Param("bno")int bno ,@Param("cri")Criteria cri);
	public void insert(ReplyVO vo);
	public void delete(int rno);
}

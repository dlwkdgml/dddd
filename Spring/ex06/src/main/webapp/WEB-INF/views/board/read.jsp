<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>글읽기</title>
<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
	<h1>[글읽기]</h1>
	<form action="update" method="post" name="frm">
		<input type="hidden" name="bno" value="${vo.bno}">
		<table border=1>
			<tr>
				<td width=100>Title</td>
				<td width=500><input type="text" name="title" value="${vo.title}"></td>
			</tr>
			<tr>
				<td width=100>Writer</td>
				<td width=500><input type="text" name="writer" value="${vo.writer}"></td>
			</tr>
			<tr>
				<td width=100>Content</td>
				<td width=500>
				<textarea rows="10" cols="50" name="content">${vo.content}</textarea>
				</td>
			</tr>
		</table>
		<input type="submit" value="저장">
		<input type="reset" value="취소">
		<input type="button" value="삭제" id="btnDelete">
		<input type="button" value="목록" onClick="location.href='list'">
	</form>
	<jsp:include page="reply.jsp"></jsp:include>
</body>
<script>
	$("#btnDelete").on("click",function(){
		if(!confirm("삭제허쉴?")) return;
		frm.action="delete";
		frm.submit();
	});

	$(frm).submit(function(e){
		e.preventDefault();
		if($(frm.title).val==""){
			alert("제목을 입력하세요!");
			$(frm.title).focus();
		}else if($(frm.content).val==""){
			alert("내용을 입력하세요!");
			$(frm.content).focus();
		}else{
			if(!confirm("글을 수정하쉴?")) return;
			frm.submit();
		}
	});
</script>
</html>
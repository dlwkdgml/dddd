<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>주소둥록</title>
<link rel="stylesheet" href="../resources/home.css">
</head>
<body>
	<h1>[주소등록]</h1>
	<form action = "insert" method = "post" name="frm">
		<table border=1>
			<tr>
				<td width = 100 class="title">이름:</td>
				<td width = 500><input type = "text" name = "name"></td>
				<!--vo 에  지정된 컬럼과 이름을 일치시키면 vo를 생성하지 않아도 된다.  -->
			</tr>
			<tr>
				<td width = 100 class="title">전화번호:</td>
				<td width = 500><input type = "text" name = "tel"></td>
			</tr>
			<tr>
				<td width = 100 class="title">주소:</td>
				<td width = 500><input type = "text" name = "addr"></td> 
			</tr>
		</table>
		<input type = "submit" value = "저장">
		<input type = "reset" value = "취소">
		<input type = "button" value = "목록" onClick="location.href='list'">
	</form> 
</body>
<script src="../resources/home.js"></script>
</html>
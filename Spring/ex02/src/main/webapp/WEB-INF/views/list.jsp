<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>주소목록</title>
<link rel="stylesheet" href="../resources/home.css">
</head>
<body>
	<h1>[주소목록]</h1>
	<a href="insert">주소입력</a>
	<table border = 1>
	<tr class="title">
		<td width = 30>No.</td>
		<td width = 50>이름</td>
		<td width = 150>전화번호</td>
		<td width = 300>주소</td>
	</tr>
		<c:forEach items = "${list}" var = "vo">
		<tr class="row">
			<td>${vo.ano}</td>
			<td><a href="read?ano=${vo.ano}">${vo.name}</a></td>
			<td>${vo.tel}</td>
			<td>${vo.addr}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>
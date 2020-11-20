<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>사용자 목록</title>
</head>
<body>
	<h1>[사용자 목록]</h1>
	<table border=1>
		<tr>
			<td width=100>아이디</td>
			<td width=100>비밀번호</td>
			<td width=150>성명</td>
			<td width=100>포인트</td>
			<td width=100>보낸메세지</td>
			<td width=100>받은메세지</td>
		</tr>
		<c:forEach items="${list}" var="vo">
		<tr>
			<td width=100>${vo.uid}</td>
			<td width=100>${vo.upw}</td>
			<td width=150>${vo.uname}</td>
			<td width=100>${vo.point}</td>
			<td width=100><button onClick="location.href='send?uid=${vo.uid}'">보낸메세지</button></td>
			<td width=100><button>받은메세지</button></td>
		</tr>		
		</c:forEach>
	</table>
</body>
</html>
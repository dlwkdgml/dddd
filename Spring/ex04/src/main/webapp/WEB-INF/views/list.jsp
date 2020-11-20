<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>주소목록</title>
<link rel="stylesheet" href="../resources/home.css">
<style>
 a{text-decoration:none; color:green;}
 	.active{color:red;}
</style>
</head>
<body>
	<h1>[주소목록]</h1>
	<a href="insert">주소입력</a>
	검색수:${pm.totalCount}
		<form action="list" name="frm">
			<input type="hidden" name="page" value="1">
			<select name="perPageNum">
				<option value=10 <c:out value="${pm.cri.perPageNum==10?'selected':''}"/>>10</option>
				<option value=20 <c:out value="${pm.cri.perPageNum==20?'selected':''}"/>>20</option>
				<option value=30 <c:out value="${pm.cri.perPageNum==30?'selected':''}"/>>30</option>
			</select>
			<select name="searchType">
				<option value="name" 	<c:out value="${pm.cri.searchType=='name'?'selected':''}"/>>Name</option>
				<option value="tel" 	<c:out value="${pm.cri.searchType=='tel'?'selected':''}"/>>Tel</option>
				<option value="addr" 	<c:out value="${pm.cri.searchType=='addr'?'selected':''}"/>>Addr</option>
			</select>
			<input type="text" name="keyword" value="${pm.cri.keyword}">
			<input type="submit" value="검색">
		</form>
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
	<div id="pagination">
      			<c:if test="${pm.prev}">
         			<a href="${pm.startPage-1}">◀</a>
      			</c:if>
      		<c:forEach begin="${pm.startPage}" end="${pm.endPage}" var="i">
         		<c:if test="${pm.cri.page==i}">
            		[<a href="${i}" class="active">${i}</a>]
         	</c:if>   
         		<c:if test="${pm.cri.page!=i}">
            		[<a href="${i}">${i}</a>]
         	</c:if>
      		</c:forEach>
      		<c:if test="${pm.next}">
         		<a href="${pm.endPage+1}">▶</a>
      		</c:if>
   		</div>
</body>
<script>
	$("#pagination a").click(function(e){
		e.preventDefault();
		$(frm.page).val($(this).attr("href"));
		frm.submit();
	});
	$(frm.perPageNum).on("change",function(){
		frm.submit();
	});
	
</script>
</html>
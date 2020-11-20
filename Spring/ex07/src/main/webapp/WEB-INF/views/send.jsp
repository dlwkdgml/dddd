<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.js"></script>
<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>메세지 보내기</title>
</head>
<body>
	<h1>[메세지 보내기]</h1>
    <table border=1>
        <tr>
            <td width=100>보낸이:</td>
            <td width=500>${vo.uname} 포인트:${vo.point}</td>
        </tr>
         <tr>
            <td width=100>받는이:</td>
            <td>
                <select id="receiver">
                    <c:forEach items="${list}" var="v">
                        <c:if test="${vo.uid != v.uid}">
                            <option value="${v.uid}">${v.uname}</option>
                        </c:if>
                    </c:forEach>
                </select>
            </td>
        </tr>
        <tr>
            <td>내용</td>
            <td><input type="text" size=70 id="txtMessge"></td>
        </tr>
    </table>
    <button id="btnSend">보내기</button>
    <h1>[보낸 메세지]</h1>
    <table id="tbl" border=1></table>
    <script id="temp" type="text/x-handlebars-template"> 
		<tr>
			<td width=200>받은이</td>
			<td width=300>내용</td>
			<td width=250>보낸날짜</td>
			<td width=100>수신확인</td>
		</tr>
		{{#each .}}
			<tr>
				<td>{{receiver}}<br>{{uname}}</td>
				<td>{{messge}}</td>
				<td>{{sendDate}}</td>
				<td>{{{confirm readDate}}}</td>
				
			</tr>
			<hr>
		{{/each}}			
	</script>    
	<script>
	Handlebars.refisterHelper("confirm",function(readDate){
		if(!readDate){
			 return "읽지않음"
		}else{return "읽음"};
	});
	</script>
</body>
<script>
	var sender="${vo.uid}";
	getList();
	
	$("tbl").on("click",".row a" , function(e){
		e.preventDefault();
		var mid=$(this).attr("href");
		if(!confirm("삭제하시겠습니까"))return;
		$.ajax({
			type:"post",
			url:"delete",
			data:{"mid":mid},
			success:function(data){
				 var temp = Handlebars.compile($("#temp").html());
	             $("#tbl").html(temp(data));
			}
				
		});
	});
	
	function getList(){
		$.ajax({
			type:"get",
			url:"sendList",
			data:{"sender":sender},
			dataType : "json",
			success:function(data){
				 var temp = Handlebars.compile($("#temp").html());
	             $("#tbl").html(temp(data));
			}
				
		});
	}
	
	$("#btnSend").on("click",function(){
		var receiver=$("#receiver").val();
		var messge=$("#txtMessge").val();
		if(messge==""){
			alert("내용을 입력하시오!");
			return;
		}
		if(!confirm("메세지 보내쉴?"))return;
		$.ajax({
			type:"post",
			url:"insert",
			data:{"sender":sender ,"receiver":receiver,"messge":messge},
			success:function(data){
				alert("메세지 보냈다");
				$("#txtMessge").val("");
				getList();
			}
		});
	});
</script>
</html>
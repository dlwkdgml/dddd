<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>상품등록</title>
	<style>
		#listFile img {width:150px; margin:10px}
	</style>
</head>
<body>
	<h1>[상품등록]</h1>
	<form name ="frm" action="insert" method="post" enctype="multipart/form-data">
		<table border=1>
			<tr>
				<td width=100>상품이름</td>
				<td width=500><input type="text" name="pname" size=50></td>
			</tr>
			<tr>
				<td width=100>상품가격</td>
				<td width=500><input type="text" name="price" size=18>원</td>
			</tr>
			<tr>
				<td width=100>대표이미지</td>
				<td width=500>
					<img src="http://placehold.it/150x120" id="image" width=150>
					<input type="file" name="file">
				</td>
			</tr>
			<tr>
				<td width=100 height=180>
					<input type="button" id="btnImage" value="첨부이미지">
				</td>
				<td>
					<input type="file" name="files" multiple>
					<div id="listFile">
						
					</div>
				</td>
			</tr>
		</table>
		<input type="submit" value="저장"> 
		<input type="reset" value="취소">
	</form>
</body>
<script>
	$(frm.files).hide();
	$(frm.file).hide();
	
	$("#btnImage").on("click",function(){
		$(frm.files).click();
	});
	
	$("#image").on("click",function(){
		$(frm.file).click();
	});
	$(frm.files).on("change",function(){
		var files=$(frm.files)[0].files;
		var str="";
		$.each(files,function(index,file){
			str+= "<img src='" + URL.createObjectURL(file) + "'>";
		});
		$("#listFile").html(str);
	});
	
	
	$(frm.file).on("change",function(){
		var file=$(frm.file)[0].files[0];
		$("#image").attr("src",URL.createObjectURL(file));
	});
</script>
</html>
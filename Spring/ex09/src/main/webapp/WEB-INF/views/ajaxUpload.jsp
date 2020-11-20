<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
    <title>ajaxUpload</title>
</head>
<body>
    <h1>[파일업로드 Ajax]</h1>
    <div id="upload">
        <input type="file" id="file">
    </div>
    <hr>
    <div id="uploaded">
        <ul id="uploadedFiles"></ul>
    </div>
</body>
<script>
   $("#file").on("change", function(){
      var file=$("#file")[0].files[0];
      if(file==null) return;
      
      var formData=new FormData();
      formData.append("file",file);
      
      $.ajax({
         type:"post",
         url:"/uploadFile",
         processData:false,
         contentType:false,
         data:formData,
         success:function(data){
            var str="<li>";
            str +="<img src=/displayFile?fileName=" + data + " width=100 />";
            str += "<input type='text' name='files' value='" + data + "'>";
            str +=" <a href='"+ data +"'>삭제</a>";
            str += "</li>";
            $("#uploadedFiles").append(str);
            
         }
      })
   });
   
   //업로드파일 삭제
   $("#uploadedFiles").on("click", "a", function(e){
      e.preventDefault();
      var fileName=$(this).attr("href");
      var li=$(this).parent();
      $.ajax({
         type:"post",
         url:"/deleteFile",
         data:{"fileName":fileName},
         success:function(){
            li.remove();
         }
      });
   });
</script>
</html>
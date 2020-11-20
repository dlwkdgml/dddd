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
<title>통장 내역</title>
<style>
   .title{background:gray; color:white; text-align:center}
</style>
</head>
<body>
   <h1>[통장 내역]</h1>
   <table border=1>
      <tr>
         <td width=100 class="title">계좌번호</td>
         <td width=100>${vo.ano}</td>
         <td width=200 class="title">성명</td>
         <td width=100>${vo.name}</td>
         <td width=100 class="title">잔액</td>
         <td width=100 id="balance">${vo.balance}원</td>
      </tr>
   </table>
   <div id="divTrade" style="width:720px;margin:10px 0px 10px 0px; border:solid 1px black; padding:10px;">
      계좌번호:
      <select id = "tradeNo">
         <c:forEach items="${list}" var="v">
            <c:if test="${vo.ano != v.ano}">
               <option value="${v.ano}">${v.ano}-${v.name}</option>
            </c:if>
         </c:forEach>
      </select>&nbsp;&nbsp;&nbsp;&nbsp;
      이체금액:
      <input type="text" size=5 id = "amount">원
      <button id = "btnTrade">이체</button>
   </div>
   <h1>[거래 내역]</h1>
   <table id="tbl" border=1></table>
    <script id="temp" type="text/x-handlebars-template">
      {{#each .}}
         <tr class="row" style="{{printStyle type}}">
            <td width=100>{{tradeNo}}</td>
            <td width=100>{{name}}</td>
            <td width=100>{{type}}</td>
            <td width=100>{{amount}}원</td>
            <td width=100>{{tradeDate}}</td>
         </tr>
      {{/each}}
    </script>
    <script>
       Handlebars.registerHelper("printStyle",function(type){
          if(type=="입금") return "color:blue;";
          else return "color:red;";
       });
    </script>   
    <button onClick="location.href='list'">통장목록</button>
</body>
<script>
   var ano="${vo.ano}";
   
   getList();
   
   $("#btnTrade").on("click", function(){
      var amount = $("#amount").val();
      var tradeNo = $("#tradeNo").val();
      if(!confirm(tradeNo + " 에게 " + amount + " 원을 이체하실래요?")) return;
      $.ajax({
        type:"post",
        url:"tradeInsert",
        data:{"ano":ano, "tradeNo":tradeNo, "amount":amount},
        success:function(){
           alert("이체완료");
           getList();
        }
      });
   });
   
 
   
   function getList(){
      $.ajax({
         type:"get",
         url:"tradeList",
         data:{"ano":ano},
         success:function(data){
             var temp = Handlebars.compile($("#temp").html());
                $("#tbl").html(temp(data));
                
                //잔액출력
                $.ajax({
                   type:"get",
                   url:"read.json",
                   data:{"ano":ano},
                   success:function(data){
                      $("#balance").html(data.balance);
                   }
                });
         }
      });
   }
</script>
</html>
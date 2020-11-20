	$(frm).submit(function(e){
		e.preventDefault();
		if($(frm.name).val()==""){
			alert("이름을 입력하세요")
			$(frm.name).focus();
		}else if($(frm.tel).val()==""){
			alert("전화번호를 입력하세요!")
			$(frm.tel).focus();
		}else if($(frm.addr).val()==""){
			alert("주소를 입력하세요")
			$(frm.addr).focus();
		}else{
			if(!confirm("저장하실래요?")) return;
			frm.submit();
		}
	})

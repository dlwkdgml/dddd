var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "ko";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "{0} 항목을 삭제하겠습니까?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "문서 {0}개를 삭제하시겠습니까?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0}개 항목이 삭제 되었습니다.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = '문서 여는 중...';
	this.KEYWORD_ALERT = '알림';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = '내 문서';
		} else if(arguments[0] == 10) {
			str = '최근 문서';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = '최근 문서';
	this.KEYWORD_LASTMODIFIED = '최종 수정한 날짜';
	this.KEYWORD_NOSEARCHRESULT = '검색 결과가 없습니다.';
	this.KEYWORD_CLOSE = '닫기';
	this.KEYWORD_FOLDER = '폴더';
	this.KEYWORD_SUPPORT = '문의하기';
	this.KEYWORD_DELETE = '삭제';
	this.KEYWORD_CONFIRM = '확인';
	this.KEYWORD_COMPLETED = '완료';
	this.KEYWORD_CANCEL = '취소';
	this.DATE_AM = "오전 ";
	this.DATE_PM = "오후 ";
	this.ACCOUNTUPGRAGE = "계정 업그레이드";
	this.PCHOME_LANG = 'ko';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = '{0}님의 내 문서';
		} else if(arguments[1] == 10) {
			str = "{0}'님의  문서";
		} else {
			if(isSotongOffice){
				str = '{0}님의 SOTONG Drive';
			}else{
				str = '{0}님의 Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.ALL = '전체';
	this.OPEN = '열기';
	this.LOCALFILE_DELETE = "최근 문서 목록에서만 삭제됩니다.";
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = "문서가 이 경로에 존재하지 않습니다.";
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = "최근 문서 목록에서 삭제하시겠습니까?";
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = '무료 사용량이 소진되어 이용할 수 없습니다. 지금 계정을 업그레이드하여 이용할 수 있습니다. ';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return '월 사용량이 소진되어 이용할 수 없습니다. 월 사용량은 {0}일 후 충전됩니다. 프로 업그레이드 기능은 향후 제공 예정입니다.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "폴더 {0}개를 삭제하시겠습니까?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "폴더 {0}개와 문서 {1}개를 삭제하시겠습니까?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = '최근 문서 검색';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = '내 문서 검색';
		} else {
			str = 'Polaris Drive 검색';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "'{0}' 검색 결과 <em>{1}</em>건".format(arguments);};
	this.OFFLINE_MSG = "네트워크에 연결돼 있지 않아 사용할 수 없습니다.  ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "네트워크에 연결돼 있지 않아 내 문서를 불러 올 수 없습니다. 컴퓨터의 문서를 여시겠습니까?";
		} else {
			str = "네트워크에 연결돼 있지 않아 Polaris Drive 문서를 불러 올 수 없습니다. 컴퓨터의 문서를 여시겠습니까?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = '여기를 클릭하여 새 문서 작성을 시작해 보세요.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0}개 항목이 삭제되었습니다. {1}개 항목은 오프라인에서 삭제할 수 없습니다.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Polaris Office 2017 사용기간이 {0} 일자로 만료됩니다. 제품 등록을 연장해 주세요.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = '제품 등록 연장하기';
	
	this.PREVPAGE = '뒤로';
	this.SORT = '정렬';
	this.SORT_TIME = '날짜 순';
	this.SORT_TYPE = '형식 순';
	this.SORT_NAME = '이름 순';
	this.SORT_SIZE = '크기 순';
	this.PCHOME_TEMPLATE_SEARCH = '템플릿 검색';
	this.MORE = '더보기';
};
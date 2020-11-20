var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "zhTW";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "要刪除{0}個項目嗎？".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "要刪除{0}份文件嗎？".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "已刪除{0}個項目。".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = '正在開啟文件…';
	this.KEYWORD_ALERT = '注意事項';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = '我的文件';
		} else if(arguments[0] == 10) {
			str = '最近使用文件';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = '最近使用文件';
	this.KEYWORD_LASTMODIFIED = '上次修改日期';
	this.KEYWORD_NOSEARCHRESULT = '無搜尋結果';
	this.KEYWORD_CLOSE = '關閉';
	this.KEYWORD_FOLDER = '資料夾';
	this.KEYWORD_SUPPORT = '聯絡我們';
	this.KEYWORD_DELETE = '刪除';
	this.KEYWORD_CONFIRM = '確定';
	this.KEYWORD_COMPLETED = '完成';
	this.KEYWORD_CANCEL = '取消';
	this.DATE_AM = "上午 ";
	this.DATE_PM = "下午 ";
	this.ACCOUNTUPGRAGE = "升級賬戶";
	this.PCHOME_LANG = 'zhTW';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "{0}的「我的文件」";
		} else if(arguments[1] == 10) {
			str = "{0}的文件";
		} else {
			if(isSotongOffice){
				str = "{0}的SOTONG Drive";
			}else{
				str = "{0}的Polaris Drive";
			}
		}
		return str.format(arguments);
	};
	this.ALL = '全部';
	this.OPEN = '開啟';
	this.LOCALFILE_DELETE = '檔案只會從「最近的文件」中刪除。';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = '文件不存在此路徑。';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = '從「最近的文件」刪除？';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = '您的免費使用權已用盡，您已無法使用。您可以升級賬戶並立即使用。';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return '因為您的每月使用權已用盡，您已無法使用。您的每月使用權將在{0}天後重設。專業升級功能會在未來開放。'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "要刪除{0}個資料夾嗎？".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "要刪除{0}個資料夾和{1}份文件嗎？".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = '搜尋文件';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = '在「我的文件」中搜尋';
		} else {
			str = '搜尋Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "{0} 的搜尋結果 - <em>{1}</em> 個項目".format(arguments);};
	this.OFFLINE_MSG = "您尚未連線至網路。 ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "網路似乎為離線，無法存取「我的文件」。要從電腦開啟文件嗎？";
		} else {
			str = "網路似乎為離線，無法存取「My Polaris Drive」。要從電腦開啟文件嗎？";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = '請按一下此處以建立新文件。';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "已刪除{0}個項目。{1}無法離線刪除項目。".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "您的Polaris Office 2017訂閱將於{0}逾期。請續訂您的賬戶。".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = '續訂您的賬戶';
	
	this.PREVPAGE = '返回';
	this.SORT = '排序方式';
	this.SORT_TIME = '日期';
	this.SORT_TYPE = '類型';
	this.SORT_NAME = '名稱';
	this.SORT_SIZE = '大小';
	this.PCHOME_TEMPLATE_SEARCH = '搜尋範本';
	this.MORE = '更多';
};
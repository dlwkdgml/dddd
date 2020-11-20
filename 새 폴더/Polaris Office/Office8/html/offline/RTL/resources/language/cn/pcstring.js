var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "cn";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "要删除{0}个项目吗？".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "要删除{0}个文档吗？".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "已删除{0}个项目。".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = '正在打开文档…';
	this.KEYWORD_ALERT = '通知';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11) {
			str = '我的文档';
		} else if(arguments[0] == 10) {
			str = '最近使用的文档';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}				
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = '最近使用文档';
	this.KEYWORD_LASTMODIFIED = '上次修改时间';
	this.KEYWORD_NOSEARCHRESULT = '没有搜索结果';
	this.KEYWORD_CLOSE = '关闭';
	this.KEYWORD_FOLDER = '文件夹';
	this.KEYWORD_SUPPORT = '联系我们';
	this.KEYWORD_DELETE = '删除';
	this.KEYWORD_CONFIRM = '确定';
	this.KEYWORD_COMPLETED = '完成';
	this.KEYWORD_CANCEL = '取消';
	this.DATE_AM = "上午";
	this.DATE_PM = "下午";
	this.ACCOUNTUPGRAGE = "升级账户";
	this.PCHOME_LANG = 'zhCN';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11) {
			str = '{0}的“我的文档”';
		} else if(arguments[1] == 10) {
			str = "{0}的文档";
		} else {
			if(isSotongOffice){
				str = '{0}的SOTONG Drive';
			}else{
				str = '{0}的Polaris Drive';
			}	
		}
		return str.format(arguments);
	};
	this.ALL = 'ALL';
	this.OPEN = '打开';
	this.LOCALFILE_DELETE = '将仅从“最近使用文档”中删除文件。';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = '此路径下不存在该文档。';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = '要从“最近使用文档”中删除吗？';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = '您的免费使用量已用完，无法再使用。升级您的账户即可使用。';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return '您的月使用量已用完，无法再使用。您的月使用量将在{0}天后重置。未来将提供专业升级功能。'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "要删除{0}个文件夹吗？".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "要删除{0}个文件夹和{1}个文档吗？".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = '搜索“最近使用文档”';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11) {
			str = '搜索“我的文档”';
		} else {
			str = '搜索Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "针对{0}的搜索结果-<em>{1}</em>个项目".format(arguments);};
	this.OFFLINE_MSG = "您未连接至网络。  ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "由于未连接到网络，无法导入“我的文档”。要打开您电脑上的文档吗？";
		} else {
			str = "由于未连接到网络，无法导入Polaris Drive文档。要打开您电脑上的文档吗？";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = '单击此处创建新文档。';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "已删除{0}个项目。{1}离线状态下无法删除项目。".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "您的Polaris Office 2017订阅将在{0}到期。请续订。".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = '续订';
	
	this.PREVPAGE = '返回';
	this.SORT = '排序标准';
	this.SORT_TIME = '日期';
	this.SORT_TYPE = '类型';
	this.SORT_NAME = '名称';
	this.SORT_SIZE = '大小';
	this.PCHOME_TEMPLATE_SEARCH = '搜索模板';
	this.MORE = '查看更多';
};
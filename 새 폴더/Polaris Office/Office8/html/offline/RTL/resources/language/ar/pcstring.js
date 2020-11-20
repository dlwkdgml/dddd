var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "ar";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "هل تريد حذف {0} من العناصر؟".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "هل تريد حذف {0} من المستندات؟".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "تم حذف {0} من العناصر.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'جارٍ فتح المستند...';
	this.KEYWORD_ALERT = 'الإعلامات';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11) {
			str = 'المستندات';
		} else if(arguments[0] == 10) {
			str = 'المستندات الأخيرة';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}			
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'المستندات الأخيرة';
	this.KEYWORD_LASTMODIFIED = 'تاريخ التعديل الأخير';
	this.KEYWORD_NOSEARCHRESULT = 'لا توجد نتائج للبحث';
	this.KEYWORD_CLOSE = 'إغلاق';
	this.KEYWORD_FOLDER = 'مجلد';
	this.KEYWORD_SUPPORT = 'الاتصال بنا';
	this.KEYWORD_DELETE = 'حذف';
	this.KEYWORD_CONFIRM = 'موافق';
	this.KEYWORD_COMPLETED = 'إكمال';
	this.KEYWORD_CANCEL = 'إلغاء';
	this.DATE_AM = "ص  ";
	this.DATE_PM = "م ";
	this.ACCOUNTUPGRAGE = "ترقية الحساب";
	this.PCHOME_LANG = 'en';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11) {
			str = 'مجلد المستندات الخاص بـ {0}';
		} else if(arguments[1] == 10) {
			str = "مستندات ‏{0}‏";
		} else {
			if(isSotongOffice){
				str = 'SOTONG Drive لـ {0}';
			}else{
				str = 'Polaris Drive لـ {0}';
			}				
		}
		return str.format(arguments);
	};
	this.ALL = 'الكل';
	this.OPEN = 'فتح';
	this.LOCALFILE_DELETE = 'سيتم حذف المستند فقط من "مستندات حديثة".';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'المستند غير موجود في هذا المسار.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'هل تريد الحذف من "مستندات حديثة"؟';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'تم استنفاد فترة السماح المجانية بالكامل، ولا يمكن استخدامها. يمكنك ترقية حسابك لاستخدامه الآن.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'تم استنفاد الحد الشهري بالكامل، ولا يمكن استخدامه. ستتم إعادة تعيين الحد الشهري في غضون {0} من الأيام. ستكون ميزات الترقية Pro متاحة في المستقبل.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "هل تريد حذف {0} من المجلدات؟".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "هل تريد حذف {0} من المجلدات و{1} من المستندات؟".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'بحث في المستندات الأخيرة';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11) {
			str = 'البحث في المستندات';
		} else {
			str = 'بحث في Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "نتائج البحث لـ ‏{0}‏ - <em>‏{1}‏<em/> من العناصر".format(arguments);};
	this.OFFLINE_MSG = "أنت غير متصل بشبكة. يُرجى التحقق من اتصال الشبكة.";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11) {
			str = "يبدو أن الشبكة لديك في وضع غير متصل ولا يمكن الوصول إلى \"My Documents\". هل تريد فتح مستند من جهاز الكمبيوتر لديك؟";
		} else {
			str = "يبدو أن الشبكة لديك في وضع غير متصل ولا يمكن الوصول إلى \"My Polaris Drive\". هل تريد فتح مستند من جهاز الكمبيوتر لديك؟";
		}
		return str.format(arguments);
	};	
	this.GUIDE_TEMPLATE_MSG = 'انقر هنا لإنشاء مستند جديد.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "تم حذف ‏{0}‏ من العناصر. يتعذر حذف ‏{1}‏ من العناصر دون اتصال.".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "سينتهي اشتراك ‏Polaris Office 2017‏ في ‏{0}‏. يرجى إعادة تجديد اشتراكك.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'إعادة تجديد اشتراكك';
	
	this.PREVPAGE = 'السابق';
	this.SORT = 'فرز حسب';
	this.SORT_TIME = 'التاريخ';
	this.SORT_TYPE = 'النوع';
	this.SORT_NAME = 'الاسم';
	this.SORT_SIZE = 'الحجم';
	this.PCHOME_TEMPLATE_SEARCH = 'بحث عن قوالب';
	this.MORE = 'المزيد';
};
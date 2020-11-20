var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "tr";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "{0} öğeyi silmek istiyor musunuz?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "{0} belgeyi silmek istiyor musunuz?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} öğe silindi.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Belge açılıyor...';
	this.KEYWORD_ALERT = 'Bildirimler';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Belgelerim';
		} else if(arguments[0] == 10) {
			str = 'Son Belgeler';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Son Belgeler';
	this.KEYWORD_LASTMODIFIED = 'Son Değiştirme';
	this.KEYWORD_NOSEARCHRESULT = 'Arama sonucu yok';
	this.KEYWORD_CLOSE = 'Kapat';
	this.KEYWORD_FOLDER = 'Klasör';
	this.KEYWORD_SUPPORT = 'Bize ulaşın';
	this.KEYWORD_DELETE = 'Sil';
	this.KEYWORD_CONFIRM = 'Tamam';
	this.KEYWORD_COMPLETED = 'Tamamlandı';
	this.KEYWORD_CANCEL = 'İptal';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Hesabı Yükselt";
	this.PCHOME_LANG = 'tr';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "{0} adlı kişiye ait Belgelerim";
		} else if(arguments[1] == 10) {
			str = "{0} adlı kişinin belgeleri";
		} else {
			if(isSotongOffice){
				str = "{0} adlı kişiye ait SOTONG Drive";
			}else{
				str = "{0} adlı kişiye ait Polaris Drive";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'TÜMÜ';
	this.OPEN = 'Aç';
	this.LOCALFILE_DELETE = 'Dosya yalnızca Son Belgeler\'den silinecek.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'Belge bu yolda yok.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Son Belgeler\'den silinsin mi?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Ücretsiz kullanım hakkınız dolduğu için kullanılamıyor. Şimdi kullanmak için hesabınızı yükseltebilirsiniz.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Aylık kullanım hakkınız dolduğu için kullanılamıyor. Aylık kullanım hakkınız {0} gün sonra sıfırlanacak. Pro Yükseltme özellikleri gelecekte kullanılabilecek.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "{0} klasörü silmek istiyor musunuz?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "{0} klasör ve {1} belgeyi silmek istiyor musunuz?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Son Belgeler\'de Ara';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Belgelerim\'de Ara';
		} else {
			str = 'Polaris Drive\'da Ara';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "{0} - <em>{1}</em> öğe için arama sonuçları".format(arguments);};
	this.OFFLINE_MSG = "Ağa bağlı değilsiniz. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Ağınız çevrimdışı görünüyor ve 'Belgelerim'e erişilemiyor. Bilgisayarınızdan belge açmak istiyor musunuz?";
		} else {
			str = "Ağınız çevrimdışı görünüyor ve 'My Polaris Drive'a erişilemiyor. Bilgisayarınızdan belge açmak istiyor musunuz?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Yeni belge oluşturmak buraya tıklayın.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} öğe silindi. {1} öğe çevrimdışı olarak silinemiyor.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Polaris Office 2017 aboneliğinizin süresi {0} tarihinde sona eriyor. Lütfen aboneliğinizi yenileyin.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Aboneliğinizi Yenileyin';
	
	this.PREVPAGE = 'Geri';
	this.SORT = 'Sıralama ölçütü';
	this.SORT_TIME = 'Tarih';
	this.SORT_TYPE = 'Tür';
	this.SORT_NAME = 'Ad';
	this.SORT_SIZE = 'Boyut';
	this.PCHOME_TEMPLATE_SEARCH = 'Şablonları ara';
	this.MORE = 'Daha fazla';
};
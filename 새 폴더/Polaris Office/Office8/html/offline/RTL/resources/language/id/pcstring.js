var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "id";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Ingin menghapus {0} item?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Apakah Anda ingin menghapus {0} dokumen?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} item telah dihapus.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Membuka dokumen...';
	this.KEYWORD_ALERT = 'Pemberitahuan';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Dokumen Saya';
		} else if(arguments[0] == 10) {
			str = 'Dokumen Terbaru';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Dokumen Terbaru';
	this.KEYWORD_LASTMODIFIED = 'Terakhir Diubah';
	this.KEYWORD_NOSEARCHRESULT = 'Tidak ada hasil pencarian';
	this.KEYWORD_CLOSE = 'Tutup';
	this.KEYWORD_FOLDER = 'Folder';
	this.KEYWORD_SUPPORT = 'Kontak Kami';
	this.KEYWORD_DELETE = 'Hapus';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Selesai';
	this.KEYWORD_CANCEL = 'Batalkan';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Tingkatkan Versi Akun";
	this.PCHOME_LANG = 'id';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "Dokumen Saya milik {0}";
		} else if(arguments[1] == 10) {
			str = "Dokumen {0}";
		} else {
			if(isSotongOffice){
				str = "SOTONG Drive milik {0}";
			}else{
				str = "Polaris Drive milik {0}";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'SEMUA';
	this.OPEN = 'Buka';
	this.LOCALFILE_DELETE = 'File hanya akan dihapus dari Dokumen Terakhir.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'Dokumen tidak ada di jalur ini.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Hapus dari Dokumen Terakhir?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Karena alokasi gratis Anda sudah habis digunakan, alokasi tidak dapat digunakan. Anda dapat memutakhirkan untuk menggunakannya sekarang.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Karena alokasi bulanan Anda telah habis digunakan, alokasi tidak dapat digunakan. Izin bulanan akan diatur ulang dalam {0} hari. Fitur Pemutakhiran Pro akan tersedia di masa mendatang.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Apakah Anda ingin menghapus {0} folder?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Apakah Anda ingin menghapus {0} folder dan {1} dokumen?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Cari di Dokumen Terakhir';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Cari di Dokumen Saya';
		} else {
			str = 'Cari di Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Hasil pencarian untuk {0} - <em>{1}</em> item".format(arguments);};
	this.OFFLINE_MSG = "Anda tidak terhubung ke jaringan. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Jaringan Anda sepertinya offline dan 'Dokumen Saya' tidak dapat diakses. Anda ingin membuka dokumen dari komputer Anda?";
		} else {
			str = "Jaringan Anda sepertinya offline dan 'My Polaris Drive' tidak dapat diakses. Anda ingin membuka dokumen dari komputer Anda?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Klik di sini untuk membuat dokumen baru.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} item telah dihapus. {1} item tidak dapat dihapus secara offline.".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "Langganan Polaris Office 2017 Anda akan berakhir pada {0}. Silakan perpanjang langganan Anda.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Perpanjang Langganan Anda';
	
	this.PREVPAGE = 'Kembali';
	this.SORT = 'Urut berdasarkan';
	this.SORT_TIME = 'Tanggal';
	this.SORT_TYPE = 'Tipe';
	this.SORT_NAME = 'Nama';
	this.SORT_SIZE = 'Ukuran';
	this.PCHOME_TEMPLATE_SEARCH = 'Cari templat';
	this.MORE = 'Lainnya';
};
var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "jp";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "{0}個の項目を削除しますか?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "{0}個のドキュメントを削除しますか?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0}個の項目を削除しました。".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'ドキュメントを開いています...';
	this.KEYWORD_ALERT = 'お知らせ';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'マイドキュメント';
		} else if(arguments[0] == 10) {
			str = '最近文書';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = '最近文書';
	this.KEYWORD_LASTMODIFIED = '最終更新日';
	this.KEYWORD_NOSEARCHRESULT = '検索結果がありません。';
	this.KEYWORD_CLOSE = '閉じる';
	this.KEYWORD_FOLDER = 'フォルダー';
	this.KEYWORD_SUPPORT = 'お問い合わせ';
	this.KEYWORD_DELETE = '削除';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = '完了';
	this.KEYWORD_CANCEL = 'キャンセル';
	this.DATE_AM = "午前 ";
	this.DATE_PM = "午後 ";
	this.ACCOUNTUPGRAGE = "アカウントのアップグレード";
	this.PCHOME_LANG = 'ja';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = '{0} のマイ ドキュメント';
		} else if(arguments[1] == 10) {
			str = "{0} ドキュメント";
		} else {
			if(isSotongOffice){
				str = "{0}さんのSOTONG Drive";
			}else{
				str = "{0}さんのPolaris Drive";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'ALL';
	this.OPEN = '開く';
	this.LOCALFILE_DELETE = 'ファイルは最近使ったドキュメントからのみ削除されます。';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'このパスに指定されたドキュメントは存在しません。';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = '最近使ったドキュメントから削除しますか?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = '無料の使用容量はすべて使用されているため、使用できる容量がありません。アカウントをアップグレードして、今すぐ使用することができます。';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'お客様の1ヵ月分の使用容量はすべて使用されていますので、お使いいただけません。お客様の1ヵ月分の使用容量は{0}日後にリセットされます。Pro Upgrade機能は将来使用可能となります。'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "{0} 個のフォルダーを削除しますか？".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "{0} 個のフォルダーと{1} 個のドキュメントを削除しますか?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = '最近のドキュメントを検索';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'マイ ドキュメントを検索';
		} else {
			str = 'Polaris Drive検索';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "{0}の検索結果－<em>{1}</em>件".format(arguments);};
	this.OFFLINE_MSG = "ネットワークに接続していません。   ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "ネットワークに接続されていないため、マイドキュメントを読み込むことができません。PCのドキュメントを開きますか?";
		} else {
			str = "ネットワークに接続されていないため、Polaris Driveドキュメントを読み込むことができません。PCのドキュメントを開きますか?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = '新しいドキュメントを作成するには、ここをクリックしてください。';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0}個のアイテムが削除されました。{1}アイテムはオフラインで削除できません。".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "Polaris Office 2017は{0}に期限が切れます。サブスクリプションを更新してください。".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'サブスクリプションの更新';
	
	this.PREVPAGE = '前に戻る';
	this.SORT = '整列';
	this.SORT_TIME = '日付';
	this.SORT_TYPE = '種類';
	this.SORT_NAME = '名前';
	this.SORT_SIZE = 'サイズ';
	this.PCHOME_TEMPLATE_SEARCH = 'テンプレート検索';
	this.MORE = 'もっと見る';
};
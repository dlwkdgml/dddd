var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "de";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Möchten Sie {0} Elemente löschen?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Möchten Sie {0} Dokumente löschen?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} Elemente wurden gelöscht.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Abrindo documento...';
	this.KEYWORD_ALERT = 'Hinweise';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Eigene Dokumente';
		} else if(arguments[0] == 10) {
			str = 'Aktuelle Dokumente';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Aktuelle Dokumente';
	this.KEYWORD_LASTMODIFIED = 'Letzte Änderung';
	this.KEYWORD_NOSEARCHRESULT = 'Keine Suchergebnisse';
	this.KEYWORD_CLOSE = 'Schließen';
	this.KEYWORD_FOLDER = 'Ordner';
	this.KEYWORD_SUPPORT = 'Kontaktieren Sie uns';
	this.KEYWORD_DELETE = 'Löschen';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Abschließen';
	this.KEYWORD_CANCEL = 'Abbrechen';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Konto-Upgrade durchführen";
	this.PCHOME_LANG = 'de';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "„Eigene Dokumente“ von {0}";
		} else if(arguments[1] == 10) {
			str = "Dokumente von {0}";
		} else {
			if(isSotongOffice){
				str = "SOTONG Drive von {0}";
			}else{
				str = "Polaris Drive von {0}";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'ALLE';
	this.OPEN = 'Öffnen';
	this.LOCALFILE_DELETE = 'Die Datei wird nur aus „Aktuelle Dok.“ gelöscht.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'Das Dokument ist unter diesem Pfad nicht vorhanden.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Aus „Aktuelle Dok.“ löschen?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Da Ihr kostenloses Nutzungsvolumen aufgebraucht ist, kann es nicht verwendet werden. Führen Sie jetzt ein Konto-Upgrade durch, um es verwenden zu können.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Da Ihr monatliches Nutzungsvolumen aufgebraucht ist, kann es nicht verwendet werden. Ihr monatliches Nutzungsvolumen wird in {0} Tag(en) zurückgesetzt. Zukünftig stehen Pro Upgrade-Funktionen zur Verfügung.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Möchten Sie {0} Ordner löschen?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Möchten Sie {0} Ordner und {1} Dokumente löschen?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'In „Aktuelle Dok.“ suchen';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'In „Eigene Dokumente“ suchen';
		} else {
			str = 'In Polaris Drive suchen';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Suchergebnisse für {0} - <em>{1}</em> Element(e)".format(arguments);};
	this.OFFLINE_MSG = "Sie sind mit keinem Netzwerk verbunden.";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Ihr Netzwerk ist offenbar offline und auf „Eigene Dokumente“ kann nicht zugegriffen werden. Möchten Sie ein Dokument von Ihrem Computer öffnen?";
		} else {
			str = "Ihr Netzwerk ist offenbar offline und auf „My Polaris Drive“ kann nicht zugegriffen werden. Möchten Sie ein Dokument von Ihrem Computer öffnen?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Klicken Sie hier, um ein neues Dokument zu erstellen.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} Elemente wurden gelöscht. {1} Elemente können nicht offline gelöscht werden.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Ihr Abonnement von Polaris Office 2017 läuft am {0} ab. Bitte verlängern Sie Ihr Abonnement.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Abonnement verlängern';
	
	this.PREVPAGE = 'Zurück';
	this.SORT = 'Sortieren nach';
	this.SORT_TIME = 'Datum';
	this.SORT_TYPE = 'Typ';
	this.SORT_NAME = 'Name';
	this.SORT_SIZE = 'Größe';
	this.PCHOME_TEMPLATE_SEARCH = 'Vorlagen suchen';
	this.MORE = 'Mehr';
};
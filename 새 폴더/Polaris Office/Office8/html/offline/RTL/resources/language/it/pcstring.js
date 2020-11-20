var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "it";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Eliminare {0} elementi?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Eliminare {0} documenti?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "'{0}' elementi sono stati eliminati.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Apertura documento in corso...';
	this.KEYWORD_ALERT = 'Avvisi';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Documenti';
		} else if(arguments[0] == "ORANGEPRO") {
			str = 'Documenti recenti';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Documenti recenti';
	this.KEYWORD_LASTMODIFIED = 'Ultima modifica';
	this.KEYWORD_NOSEARCHRESULT = 'Nessun risultato della ricerca';
	this.KEYWORD_CLOSE = 'Chiudi';
	this.KEYWORD_FOLDER = 'Cartella';
	this.KEYWORD_SUPPORT = 'Contattaci';
	this.KEYWORD_DELETE = 'Elimina';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Completato';
	this.KEYWORD_CANCEL = 'Annulla';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Aggiorna Account";
	this.PCHOME_LANG = 'it';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "Documenti di {0}";
		} else if(arguments[1] == "ORANGEPRO") {
			str = "Documenti di {0}";
		} else {
			if(isSotongOffice){
				str = "SOTONG Drive di {0}";
			}else{
				str = "Polaris Drive di {0}";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'TUTTO';
	this.OPEN = 'Apri';
	this.LOCALFILE_DELETE = 'Il file verrà eliminato solo da Doc recenti.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'Documento inesistente in questo percorso.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Eliminare da Doc recenti?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'La quota di utilizzo gratuita è esaurita, quindi non può essere utilizzata. È possibile aggiornare l\'account per utilizzarla subito.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'La quota di utilizzo mensile è esaurita, quindi non può essere utilizzata. La quota di utilizzo mensile sarà ripristinata tra {0} giorno/i. Le funzionalità dell\'aggiornamento a Pro saranno disponibili prossimamente.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Eliminare {0} cartelle?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Eliminare {0} cartelle e {1} documenti?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Cerca in Doc recenti';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Cerca in Documenti';
		} else {
			str = 'Cerca in Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Risultati di ricerca per {0} - <em>{1}</em> elemento/i".format(arguments);};
	this.OFFLINE_MSG = "Connessione di rete assente. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "La rete risulta offline e non è possibile accedere a 'Documenti'. Aprire un documento dal computer?";
		} else {
			str = "La rete risulta offline e non è possibile accedere a 'My Polaris Drive'. Aprire un documento dal computer?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Fare clic qui per creare un nuovo documento.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "'{0}' elementi sono stati eliminati. Impossibile eliminare in offline '{1}' elementi.".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "L'abbonamento Polaris Office 2017 scadrà il {0}. Rinnovare l'abbonamento.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Rinnova l\'abbonamento';
	
	this.PREVPAGE = 'Indietro';
	this.SORT = 'Ordina per';
	this.SORT_TIME = 'Data';
	this.SORT_TYPE = 'Tipo';
	this.SORT_NAME = 'Nome';
	this.SORT_SIZE = 'Dimensioni';
	this.PCHOME_TEMPLATE_SEARCH = 'Cerca template';
	this.MORE = 'Altro';
};
var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "pl";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Czy chcesz usunąć elementy ({0})?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Czy chcesz usunąć dokumenty ({0})?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "Liczba usuniętych elementów: {0}.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Trwa otwieranie dokumentu…';
	this.KEYWORD_ALERT = 'Powiadomienia';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Moje dokumenty';
		} else if(arguments[0] == 10) {
			str = 'Ostatnie dokumenty';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Ostatnie dokumenty';
	this.KEYWORD_LASTMODIFIED = 'Ostatnia modyfikacja';
	this.KEYWORD_NOSEARCHRESULT = 'Brak wyników wyszukiwania';
	this.KEYWORD_CLOSE = 'Zamknij';
	this.KEYWORD_FOLDER = 'Folder';
	this.KEYWORD_SUPPORT = 'Skontaktuj się z nami';
	this.KEYWORD_DELETE = 'Usuń';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Zakończono';
	this.KEYWORD_CANCEL = 'Anuluj';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Zmień plan konta na wyższy";
	this.PCHOME_LANG = 'pl';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "Moje dokumenty ({0})";
		} else if(arguments[1] == 10) {
			str = "Dokumenty {0}";
		} else {
			if(isSotongOffice){
				str = "Dysk SOTONG Drive ({0})";
			}else{
				str = "Dysk Polaris Drive ({0})";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'WSZYSTKIE';
	this.OPEN = 'Otwórz';
	this.LOCALFILE_DELETE = 'Plik zostanie usunięty tylko z listy Ostatnie dokumenty.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'Dokument nie istnieje w tej ścieżce.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Czy usunąć z listy Ostatnie dokumenty?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Nie można używać pakietu, ponieważ bezpłatny limit został wykorzystany. Aby nadal korzystać z pakietu, zmień plan konta na wyższy.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Nie można używać pakietu, ponieważ bezpłatny limit miesięczny został wykorzystany. Zostanie wyzerowany za {0} dni. Wkrótce będzie można skorzystać z funkcji zmiany planu na Pro.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Czy chcesz usunąć foldery ({0})?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Czy chcesz usunąć foldery ({0}) i dokumenty ({1})?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Wyszukaj ostatnie dokumenty';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Wyszukaj w folderze Moje dokumenty';
		} else {
			str = 'Wyszukaj na dysku Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Wyniki wyszukiwania dla {0} – <em>{1}</em> elementu/-ów".format(arguments);};
	this.OFFLINE_MSG = "Brak połączenia z siecią.  ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Nie można zaimportować Moich dokumentów, ponieważ brak połączenia z siecią. Czy chcesz otworzyć dokument na komputerze?";
		} else {
			str = "Nie można zaimportować dokumentów na dysku Polaris Drive, ponieważ nie ma połączenia z siecią. Czy chcesz otworzyć dokument na komputerze?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Kliknij tutaj, aby utworzyć nowy dokument.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "Liczba usuniętych elementów: {0}. Liczba elementów, których nie można usunąć w trybie offline: {1}.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Subskrypcja Polaris Office 2017 wygaśnie dnia {0}. Ponów subskrypcję.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Ponów subskrypcję';
	
	this.PREVPAGE = 'Wstecz';
	this.SORT = 'Sortuj wg';
	this.SORT_TIME = 'Data';
	this.SORT_TYPE = 'Typ';
	this.SORT_NAME = 'Nazwa';
	this.SORT_SIZE = 'Rozmiar';
	this.PCHOME_TEMPLATE_SEARCH = 'Wyszukaj szablony';
	this.MORE = 'Więcej';
};

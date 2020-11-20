var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "en";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Do you want to delete {0} items?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Do you want to delete {0} documents?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} items have been deleted.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Opening document...';
	this.KEYWORD_ALERT = 'Notices';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'My Documents';
		} else if(arguments[0] == 10) {
			str = 'Recent Documents';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Recent Documents';
	this.KEYWORD_LASTMODIFIED = 'Last Modified';
	this.KEYWORD_NOSEARCHRESULT = 'No search results';
	this.KEYWORD_CLOSE = 'Close';
	this.KEYWORD_FOLDER = 'Folder';
	this.KEYWORD_SUPPORT = 'Contact us';
	this.KEYWORD_DELETE = 'Delete';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Complete';
	this.KEYWORD_CANCEL = 'Cancel';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Upgrade Account";
	this.PCHOME_LANG = 'en';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "{0}'s My Documents";
		} else if(arguments[1] == 10) {
			str = "{0}'s documents";
		} else {
			if(isSotongOffice){
				str = "{0}'s SOTONG Drive";
			}else{
				str = "{0}'s Polaris Drive";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'ALL';
	this.OPEN = 'Open';
	this.LOCALFILE_DELETE = 'The file will only be deleted from the Recent Docs.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'The document does not exist in this path.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Delete from the Recent Docs?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'As your free allowance has been used up, it cannot be used. You can upgrade your account to use it now.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'As your monthly allowance has been used up, it cannot be used. Your monthly allowance will be reset in {0} day(s). Pro Upgrade features will be available in the future.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Do you want to delete {0} folders?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Do you want to delete {0} folders and {1} documents?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Search in Recent Docs';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Search in My Documents';
		} else {
			str = 'Search in Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Search results for {0} - <em>{1}</em> item(s)".format(arguments);};
	this.OFFLINE_MSG = "You're not connected to a network. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Your network appears to be offline and 'My Documents' cannot be accessed. Do you want to open a document from your computer?";
		} else {
			str = "Your network appears to be offline and 'My Polaris Drive' cannot be accessed. Do you want to open a document from your computer?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Click here to create a new document.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} items have been deleted. {1} items cannot be deleted offline.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Your Polaris Office 2017 subscription will expire on {0}. Please renew your subscription.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Renew Your Subscription';
	
	this.PREVPAGE = 'Back';
	this.SORT = 'Sort by';
	this.SORT_TIME = 'Date';
	this.SORT_TYPE = 'Type';
	this.SORT_NAME = 'Name';
	this.SORT_SIZE = 'Size';
	this.PCHOME_TEMPLATE_SEARCH = 'Search for templates';
	this.MORE = 'More';
}

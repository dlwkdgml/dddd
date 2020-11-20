var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "fr";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Voulez-vous supprimer {0} éléments ?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Voulez-vous supprimer {0} documents ?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} éléments ont été supprimés.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Ouverture du document...';
	this.KEYWORD_ALERT = 'Remarques';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Mes Documents';
		} else if(arguments[0] == 10) {
			str = 'Documents récents';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Documents récents';
	this.KEYWORD_LASTMODIFIED = 'Modifié le';
	this.KEYWORD_NOSEARCHRESULT = 'Aucun résultat de la recherche';
	this.KEYWORD_CLOSE = 'Fermer';
	this.KEYWORD_FOLDER = 'Dossier';
	this.KEYWORD_SUPPORT = 'Nous contacter';
	this.KEYWORD_DELETE = 'Supprimer';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Terminer';
	this.KEYWORD_CANCEL = 'Annuler';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Mettre le compte à niveau";
	this.PCHOME_LANG = 'en';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = 'Dossier Mes Documents de {0}';
		} else if(arguments[1] == 10) {
			str = "Documents de {0}";
		} else {
			if(isSotongOffice){
				str = 'SOTONG Drive de {0}';
			}else{
				str = 'Polaris Drive de {0}';
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'Tout';
	this.OPEN = 'Ouvrir';
	this.LOCALFILE_DELETE = "Le fichier sera uniquement supprimé des documents récents.";
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = "Le document n'existe pas à ce chemin.";
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = "Supprimer des documents récents ?";
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = "Votre abonnement gratuit ayant expiré, il ne peut plus être utilisé. Pour pouvoir l'utiliser, mettez votre compte à niveau dès maintenant.";
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Votre abonnement mensuel ayant expiré, il ne peut plus être utilisé. Votre abonnement mensuel sera réinitialisé dans {0} jour(s). La mise à niveau Pro sera disponible dans le futur. '.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Voulez-vous supprimer {0} dossiers ?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Voulez-vous supprimer {0} dossiers et {1} documents ?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Rechercher dans Docs récents';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Rechercher dans Mes Documents';
		} else {
			str = 'Rechercher dans Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Résultats de recherche pour {0} - <em>{1}</em> élément(s)".format(arguments);};
	this.OFFLINE_MSG = "Vous n'êtes pas connecté à un réseau. Veuillez vérifier ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Votre réseau semble être hors ligne et 'My Documents' n'est pas accessible. Voulez-vous ouvrir un document à partir de votre ordinateur ?";
		} else {
			str = "Votre réseau semble être hors ligne et 'My Polaris Drive' n'est pas accessible. Voulez-vous ouvrir un document à partir de votre ordinateur ?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Cliquez ici pour créer un nouveau document.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} éléments ont été supprimés. {1} éléments n'ont pas pu être supprimés hors ligne.".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "Votre abonnement Polaris Office 2017 expirera le {0}. Veuillez renouveler votre abonnement.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Renouveler votre abonnement';
	
	this.PREVPAGE = 'Retour';
	this.SORT = 'Trier par';
	this.SORT_TIME = 'Date';
	this.SORT_TYPE = 'Type';
	this.SORT_NAME = 'Nom';
	this.SORT_SIZE = 'Taille';
	this.PCHOME_TEMPLATE_SEARCH = 'Rechercher des modèles';
	this.MORE = 'Plus';
};
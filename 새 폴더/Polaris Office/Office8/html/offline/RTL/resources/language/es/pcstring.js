var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "es";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "¿Desea eliminar {0} elementos?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "¿Desea eliminar {0} documentos?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "Se han eliminado {0} elementos.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Trwa otwieranie dokumentu…';
	this.KEYWORD_ALERT = 'Avisos';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Mis documentos';
		} else if(arguments[0] == 10) {
			str = 'Documentos recientes';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Documentos recientes';
	this.KEYWORD_LASTMODIFIED = 'Última modificación';
	this.KEYWORD_NOSEARCHRESULT = 'No hay resultados de búsqueda';
	this.KEYWORD_CLOSE = 'Cerrar';
	this.KEYWORD_FOLDER = 'Carpeta';
	this.KEYWORD_SUPPORT = 'Contacto';
	this.KEYWORD_DELETE = 'Eliminar';
	this.KEYWORD_CONFIRM = 'Aceptar';
	this.KEYWORD_COMPLETED = 'Completar';
	this.KEYWORD_CANCEL = 'Cancelar';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Actualizar cuenta";
	this.PCHOME_LANG = 'es';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "Mis documentos de {0}";
		} else if(arguments[1] == 10) {
			str = "Documentos de {0}";
		} else {
			if(isSotongOffice){
				str = "SOTONG Drive de {0}";
			}else{
				str = "Polaris Drive de {0}";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'TODO';
	this.OPEN = 'Abrir';
	this.LOCALFILE_DELETE = 'El archivo solo se eliminará de los documentos recientes.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'El documento no existe en esta ruta.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = '¿Eliminar de los documentos recientes?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Dado que ha alcanzado el límite de uso gratuito, no puede seguir utilizándolo. Podrá actualizar su cuenta para utilizarla ahora.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Dado que ha alcanzado el límite de uso mensual, no puede seguir utilizándolo. Su límite de uso mensual se restablecerá en {0} días. Las funciones de actualización de la versión Pro estarán disponibles en el futuro.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "¿Desea eliminar {0} carpetas?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "¿Desea eliminar {0} carpetas y {1} documentos?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Buscar en Doc. recientes';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Buscar en Mis documentos';
		} else {
			str = 'Buscar en Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Resultados de búsqueda de {0} - <em>{1}</em> elementos".format(arguments);};
	this.OFFLINE_MSG = "No está conectado a ninguna red.  ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "No es posible importar Mis documentos porque no está conectado a ninguna red. ¿Desea abrir el documento en su ordenador?";
		} else {
			str = "No es posible importar los documentos de Polaris Drive porque no está conectado a ninguna red. ¿Desea abrir el documento en su ordenador?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Haga clic aquí para crear un documento nuevo.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "Se han eliminado {0} elementos. No es posible eliminar {1} elementos sin conexión.".format(arguments); };		
	this.EXPIRING_LICENSE_CAUTION = function() { return "Su suscripción de Polaris Office 2017 caducará el {0}. Renueve su suscripción.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Renueve su suscripción';
	
	this.PREVPAGE = 'Atrás';
	this.SORT = 'Ordenar por';
	this.SORT_TIME = 'Fecha';
	this.SORT_TYPE = 'Tipo';
	this.SORT_NAME = 'Nombre';
	this.SORT_SIZE = 'Tamaño';
	this.PCHOME_TEMPLATE_SEARCH = 'Buscar plantillas';
	this.MORE = 'Más';
};

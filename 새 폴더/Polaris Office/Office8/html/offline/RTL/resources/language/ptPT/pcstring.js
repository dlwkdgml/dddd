var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "ptPT";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Pretende eliminar {0} itens?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Pretende eliminar {0} documentos?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} itens foram eliminados.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'A abrir documento...';
	this.KEYWORD_ALERT = 'Avisos';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Os meus documentos';
		} else if(arguments[0] == 10) {
			str = 'Documentos recentes';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Documentos recentes';
	this.KEYWORD_LASTMODIFIED = 'Última modificação';
	this.KEYWORD_NOSEARCHRESULT = 'Nenhum resultado de pesquisa';
	this.KEYWORD_CLOSE = 'Fechar';
	this.KEYWORD_FOLDER = 'Pasta';
	this.KEYWORD_SUPPORT = 'Contacte-nos';
	this.KEYWORD_DELETE = 'Eliminar';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Concluído';
	this.KEYWORD_CANCEL = 'Cancelar';
	this.DATE_AM = "Manhã ";
	this.DATE_PM = "Tarde ";
	this.ACCOUNTUPGRAGE = "Atualizar conta";
	this.PCHOME_LANG = 'ptPT';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = '"Os meus documentos" de {0}';
		} else if(arguments[1] == 10) {
			str = "{0} documentos";
		} else {
			if(isSotongOffice){
				str = "SOTONG Drive de {0}";
			}else{
				str = "Polaris Drive de {0}";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'TUDO';
	this.OPEN = 'Abrir';
	this.LOCALFILE_DELETE = 'O ficheiro só será eliminado dos "Doc. recentes".';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'O documento não existe neste caminho.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Eliminar dos "Doc. recentes"?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Dado que o seu limite de utilização gratuita foi atingido, já não o pode utilizar. Pode atualizar a sua conta para poder utilizá-lo agora.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Dado que o seu limite de utilização mensal foi atingido, já não o pode utilizar. O seu limite de utilização mensal será reposto dentro de {0} dia(s). No futuro, estarão disponíveis funcionalidades Pro Upgrade.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Pretende eliminar {0} pastas?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Pretende eliminar {0} pastas e {1} documentos?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Procurar em Doc. recentes';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Procurar em Os meus documentos';
		} else {
			str = 'Procurar na Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Resultados da pesquisa para {0} - <em>{1}</em> item(s)".format(arguments);};
	this.OFFLINE_MSG = "Não está ligado a uma rede. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "A sua rede parece estar offline, pelo que não é possível aceder ao Os meus documentos. Quer abrir um documento a partir do seu computador?";
		} else {
			str = "A sua rede parece estar offline, pelo que não é possível aceder ao My Polaris Drive. Quer abrir um documento a partir do seu computador?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Clique aqui para criar um novo documento.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} itens foram eliminados. {1} itens não podem ser eliminados offline.".format(arguments); };	
	this.EXPIRING_LICENSE_CAUTION = function() { return "A sua subscrição do Polaris Office 2017 irá expirar em {0}. Renove a sua subscrição.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Renovar subscrição';
	
	this.PREVPAGE = 'Anterior';
	this.SORT = 'Ordenar por';
	this.SORT_TIME = 'Data';
	this.SORT_TYPE = 'Tipo';
	this.SORT_NAME = 'Nome';
	this.SORT_SIZE = 'Tamanho';
	this.PCHOME_TEMPLATE_SEARCH = 'Procurar modelos';
	this.MORE = 'Mais';
};
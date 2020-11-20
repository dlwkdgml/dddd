var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "ptBR";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Deseja excluir {0} itens?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Deseja excluir {0} documentos?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "{0} itens foram excluídos.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Abrindo documento...';
	this.KEYWORD_ALERT = 'Avisos';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Meus documentos';
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
	this.KEYWORD_SUPPORT = 'Entre em contato';
	this.KEYWORD_DELETE = 'Excluir';
	this.KEYWORD_CONFIRM = 'OK';
	this.KEYWORD_COMPLETED = 'Concluído';
	this.KEYWORD_CANCEL = 'Cancelar';
	this.DATE_AM = "AM ";
	this.DATE_PM = "PM ";
	this.ACCOUNTUPGRAGE = "Atualizar conta";
	this.PCHOME_LANG = 'ptBR';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = "Meus documentos de {0}";
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
	this.ALL = 'TODAS';
	this.OPEN = 'Abrir';
	this.LOCALFILE_DELETE = 'O arquivo será excluído somente de Doc. recentes.';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'O documento não existe neste caminho.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Excluir de Doc. recentes?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Como sua provisão gratuita terminou, ela não poderá ser usada. Você pode atualizar sua conta para usá-la agora.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Como sua provisão mensal terminou, ela não pode ser usada. Sua provisão mensal será redefinida em {0} dia(s). Os recursos de atualização do Pro estarão disponíveis no futuro.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Deseja excluir {0} pastas?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Deseja excluir {0} pastas e {1} documentos?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Pesquisar em Doc. recentes';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == "ORANGEFREE" || arguments[0] == "ORANGEPREMIUM" || arguments[0] == "UCCPREMIUM"){
			str = 'Pesquisar em Meus documentos';
		} else {
			str = 'Pesquisar no Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Resultados da procura {0} - <em>{1}</em> item(s)".format(arguments);};
	this.OFFLINE_MSG = "Você não está conectado a uma rede. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Sua rede parece estar offline, e o 'Meus documentos' não pode ser acessado. Deseja abrir um documento do seu computador?";
		} else {
			str = "Sua rede parece estar offline, e o 'My Polaris Drive' não pode ser acessado. Deseja abrir um documento do seu computador?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Clique aqui para criar um novo documento.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "{0} itens foram excluídos. {1} itens não podem ser excluídos offline.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Sua assinatura do Polaris Office 2017 irá expirar em {0}. Renove sua assinatura.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Renovar a sua assinatura';
	
	this.PREVPAGE = 'Voltar';
	this.SORT = 'Classificar por';
	this.SORT_TIME = 'Data';
	this.SORT_TYPE = 'Tipo';
	this.SORT_NAME = 'Nome';
	this.SORT_SIZE = 'Tamanho';
	this.PCHOME_TEMPLATE_SEARCH = 'Pesquisar modelos';
	this.MORE = 'Mais';
};
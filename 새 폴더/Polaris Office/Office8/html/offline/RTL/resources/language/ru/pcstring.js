var LanguagePack = new function() {
	String.prototype.format = function() {
	    var formatted = this;
	    var arguments2 = arguments[0];
	    for(var i=0; i< arguments2.length; i++) {
	    	formatted = formatted.replace("{" + i + "}", arguments2[i]);
	    }
	    return formatted;
	};
	this.CURRENT_LAN = "ru";
	this.POPUP_CONFIRMDELETE_SELECTEDITEM = function() {
		return "Удалить {0} элемента(ов)?".format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N = function() {
		return "Удалить {0} документа(ов)?".format(arguments);
	};
	this.TOAST_DELETESELECTEDFILE_N = function() {
		return "Элементов удалено: {0}.".format(arguments);
	};
	this.TOAST_FILEOPENPROGRESS = 'Открытие документа...';
	this.KEYWORD_ALERT = 'Уведомления';
	this.KEYWORD_DRIVE = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Мои документы';
		} else if(arguments[0] == 10) {
			str = 'Недавние документы';
		} else {
			if(isSotongOffice){
				str = 'My SOTONG Drive';
			}else{
				str = 'My Polaris Drive';
			}
		}
		return str.format(arguments);
	};
	this.KEYWORD_RECENT = 'Недавние документы';
	this.KEYWORD_LASTMODIFIED = 'Последнее изменение';
	this.KEYWORD_NOSEARCHRESULT = 'Поиск не дал результатов';
	this.KEYWORD_CLOSE = 'Закрыть';
	this.KEYWORD_FOLDER = 'Папка';
	this.KEYWORD_SUPPORT = 'Свяжитесь с нами';
	this.KEYWORD_DELETE = 'Удалить';
	this.KEYWORD_CONFIRM = 'ОК';
	this.KEYWORD_COMPLETED = 'Завершено';
	this.KEYWORD_CANCEL = 'Отмена';
	this.DATE_AM = "ДП ";
	this.DATE_PM = "ПП ";
	this.ACCOUNTUPGRAGE = "Обновить учетную запись";
	this.PCHOME_LANG = 'ru';
	this.PCHOME_NOT_MYFILE = function(){
		var str = null;
		if(arguments[1] == 6 || arguments[1] == 7 || arguments[1] == 11){
			str = 'Папка "Мои документы" пользователя {0}';
		} else if(arguments[1] == 10) {
			str = "Документы {0}";
		} else {
			if(isSotongOffice){
				str = "SOTONG Drive пользователя {0}";
			}else{
				str = "Polaris Drive пользователя {0}";
			}
		}
		return str.format(arguments);
	};
	this.ALL = 'ВСЕ';
	this.OPEN = 'Открыть';
	this.LOCALFILE_DELETE = 'Файл будет удален только из папки "Недавние документы".';
	this.LOCALFILE_UPLOAD_FALIL_MSG1 = 'Нет документа по такому пути.';
	this.LOCALFILE_UPLOAD_FALIL_MSG2 = 'Удалить из папки "Недавние документы"?';
	this.NOT_CREATE_BASIC_NEWDOCUMENT_MSG = 'Невозможно использовать бесплатную квоту, поскольку она исчерпана. Вы можете воспользоваться учетной записью, улучшив ее.';
	this.NOT_CREATE_SMART_NEWDOCUMENT_MSG = function() {
		return 'Загрузка была остановлена, поскольку ежемесячная квота исчерпана. Осталось дней до обнуления ежемесячной квоты: {0}. Функции улучшения Pro будут доступны в будущем.'.format(arguments);
	};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER = function() {return "Удалить папки {0}?".format(arguments);};
	this.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE = function() {return "Удалить папки {0} и документы {1}?".format(arguments);};
	this.PCHOME_DOC_SEARCH_ORANGEPRO = 'Поиск документов';
	this.PCHOME_DOC_SEARCH = function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = 'Поиск в папке "Мои документы"';
		} else {
			str = 'Поиск в Polaris Drive';
		}
		return str.format(arguments);
	};
	this.SEARCH_RESULT = function(){ return "Результаты поиска для {0} - <em>{1}</em> элемент(-ов)".format(arguments);};
	this.OFFLINE_MSG = "Вы не подключены к сети. ";
	this.OFFLINE_COMPUTER_MSG =  function(){
		var str = null;
		if(arguments[0] == 6 || arguments[0] == 7 || arguments[0] == 11){
			str = "Сеть недоступна, из-за чего невозможно получить доступ к папке 'Мои документы'. Открыть документ с компьютера?";
		} else {
			str = "Сеть недоступна, из-за чего невозможно получить доступ к папке 'My Polaris Drive'. Открыть документ с компьютера?";
		}
		return str.format(arguments);
	};
	this.GUIDE_TEMPLATE_MSG = 'Нажмите здесь, чтобы создать новый документ.';
	this.TOAST_RESTOREITEM_N_OFFLINE = function() { return "Элементов удалено: {0}. {1} элементов невозможно удалить в автономном режиме.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION = function() { return "Срок действия подписки Polaris Office 2017 истекает {0}. Продлите вашу подписку.".format(arguments); };
	this.EXPIRING_LICENSE_CAUTION_BUTTON = 'Продлить подписку';
	
	this.PREVPAGE = 'Назад';
	this.SORT = 'Сортировать по';
	this.SORT_TIME = 'Дата';
	this.SORT_TYPE = 'Тип';
	this.SORT_NAME = 'Имя';
	this.SORT_SIZE = 'Размер';
	this.PCHOME_TEMPLATE_SEARCH = 'Поиск шаблонов';
	this.MORE = 'Дополнительно';
};
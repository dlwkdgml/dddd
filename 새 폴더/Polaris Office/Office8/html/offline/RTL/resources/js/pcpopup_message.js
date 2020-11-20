$(document).ready(function() {
	//alert('document loaded');
});

var PopupMessage = function(popupType, buttonType, title, data, confirmCb, cancelCb, closeCb) {
	// **************************************************
	// Description: PopuMessage Private API - (Util)
	// **************************************************
	var getView = function(selector/*child*/, parent) {		
		var view = null;
		if (parent == undefined || parent ==  null) {
			view = $(selector);
			return view;
		}
		
		view = parent.children(selector);
		return view;
	};
	
	var getPopupMessageBoxCount = function() {
		isPopupTreeFolder = false; 
		var view = getView(PopupViewClass.OTHER_POPUP_BOX);
		for (var i = 0; i < view.length; i++) {
			if ($(view[i]).css('display') == 'block') {	// View Code
				isPopupTreeFolder = true;
				break;
			}			
		}
		if(!isPopupTreeFolder) {
			view = getView(PopupViewClass.OTHER_POPUP_BOX2);
			for (var i = 0; i < view.length; i++) {
				if ($(view[i]).css('display') == 'block') {	// View Code
					isPopupTreeFolder = true;
					break;
				}			
			}
		}
		
		view = getView(PopupViewClass.VIEW_ALIGN);
		if (isPopupTreeFolder == true)
			return view.length;			
		
		return view.length - 1;
	};
	
	var findView = function(selector) {
		// **************************************************
		// Description: need to change how to find views
		// **************************************************
		var view = null;
		switch (selector) {
		case PopupViewClass.VIEW_ALIGN:
			{
				view = getView(selector);
				if (index == 0 || (isPopupTreeFolder == true && index == 1))
					return view;
				
				if (isPopupTreeFolder == false)
					return $(view[index]);
				
				return $(view[index - 1]);
			}
		case PopupViewID.VIEW_BOX:
			{
				view = getView(selector, targetViewAlign);
				return view;
			}
		case PopupViewID.TITLE:
		case PopupViewID.CONTENT_BOX:
		case PopupViewID.BUTTON_BOX:
			{
				if (targetForm == null) {
					view = getView(selector,targetView);
					return view;
				}
				
				view = getView(selector, targetForm);
				return view;
			}
		case PopupViewID.CONFIRM_BUTTON:
		case PopupViewID.CANCEL_BUTTON:
			{
				view = getView(selector, targetButton);
				return view;
			}
		case PopupViewID.CLOSE_BUTTON:
			{
				view = getView(selector, getView(PopupViewClass.CLOSE_BUTTON /*last-child*/, targetView));
				return view;
			}
		case PopupViewID.FORM:
			{
				view = getView(selector, targetView);
				return view;
			}
		case PopupViewID.MESSAGE:
		{
			view = getView(PopupViewClass.MESSAGE /*'first-child'*/, targetContent);
			return view;
		}
		default:
			;
		}
	};
	
	(function() {
		$(PopupBoxUI.BOX).appendTo('body');
	})();
	
	// **************************************************
	// Description: constructor parameters
	// **************************************************
	var isPopupTreeFolder = false;
	var index = getPopupMessageBoxCount();
	var popup = this;
	var data = data;
	var popupType = popupType;
	var confirmCallback = confirmCb;
	var cancelCallback = cancelCb;
	var closeCallback = closeCb;
	var buttonType = buttonType;
	var title = title;
	
	// **************************************************
	// Description: UI container boxes 
	// **************************************************
	var targetViewAlign = findView(PopupViewClass.VIEW_ALIGN);
	var targetView = findView(PopupViewID.VIEW_BOX);
	var targetTitle = findView(PopupViewID.TITLE);
	var targetForm = null;
	var targetContent = findView(PopupViewID.CONTENT_BOX);
	var targetButton = findView(PopupViewID.BUTTON_BOX);
	
	// **************************************************
	// Description: UI buttons
	// **************************************************
	var confirmButton = null;
	var cancelButton = null;
	var closeButton = findView(PopupViewID.CLOSE_BUTTON);
	
	// **************************************************
	// Description: PopuMessage API - (Basic)
	// **************************************************
	this.create = function() {
		function adjustZIndex() {
			if (index > 0) {
				targetView.css('z-index', 10 + index);
				targetViewAlign.css('z-index', 10 + index);
			}
		};
		
		PopupManagement.pushPopup(popup);
		adjustZIndex();
		appendDimWindow();
		
		this.setTitle((title != null) ? title : PopupTitleText.DEFAULT);
		appendContentUI(PopupContentUI.DEFAULT);
		if (buttonType != undefined) {
			var buttonUI = null;
			if(buttonType == ButtonType.CONFIRM)
				buttonUI = PopupButtonUI.CONFIRM;
			else if(buttonType == ButtonType.CANCEL)
				buttonUI = PopupButtonUI.CANCEL;
			else if(buttonType == ButtonType.CONFIRM_CANCEL)
				buttonUI = PopupButtonUI.CONFIRM_CANCEL;
			appendButtonUI(buttonUI);
		}
		else
			appendButtonUI(PopupButtonUI.CONFIRM_CANCEL);
		
		buttonType = ButtonType.CONFIRM_CANCEL;
		
		this.complete();
	};
	
	this.destroy = function() {
		this.hide();
		finalize();
		PopupManagement.removePopup();
	};
	
	// **************************************************
	// Description: PopuMessage API - (Basic)
	// **************************************************	
	this.removeBtns = function(){
		$(PopupViewID.BUTTON_BOX).remove();
		$(PopupViewID.CONTENT_BOX).addClass('nobtn');
	}
	this.show = function() {
		appendDimWindow();
		targetViewAlign.show();
		targetView.show();
		alignCenter();
	};
	
	this.hide = function() {
		targetView.hide();
		targetViewAlign.hide();
		removeDimWindow();
	};
	
	this.changebutton = function(data) {
		if(data.confirm) {
			confirmButton = findView(PopupViewID.CONFIRM_BUTTON);	
			confirmButton.text(data.confirm);
		}
		if(data.cancel) {
			cancelButton = findView(PopupViewID.CANCEL_BUTTON);
			cancelButton.text(data.cancel);
		}
	}
	// **************************************************
	// Description: PopuMessage API - (Extras)
	// **************************************************
	this.setTitle = function(text) {
		title = text;
		targetTitle.text(title);
	};
	
	// **************************************************
	// Description: PopuMessage API - (Events)
	// **************************************************
	this.addEventConfirm = function(confirmCb) {
		confirmCallback = confirmCb;		
		confirmButton.bind('click', {param: null}, confirmHandler);
	};
	
	this.addEventCancel = function(cancelCb) {
		cancelCallback = cancelCb;		
		cancelButton.bind('click', {param: null}, cancelHandler);
	};
	
	this.addEventClose = function(closeCb) {
		closeCallback = closeCb;		
		closeButton.bind('click', {param: null}, closeHandler);
	};
	
	// **************************************************
	// Description: PopuMessage API - (Must be PRIVATE METHODS)
	// **************************************************
	this.complete = function() {
		this.setButtonEvents();
	};	
	
	this.setButtonEvents = function() {
		if (buttonType == null || buttonType == undefined)
			return;
		
		if (closeCallback != undefined && closeCallback != null)
			this.addEventClose(closeCb);
		
		if (buttonType == ButtonType.CONFIRM) {
			confirmButton = findView(PopupViewID.CONFIRM_BUTTON);
			if (confirmCallback != undefined && confirmCallback != null)
				this.addEventConfirm(confirmCb);
			
			return;
		}
		
		if (buttonType == ButtonType.CANCEL) {
			cancelButton = findView(PopupViewID.CANCEL_BUTTON);
			if (cancelCallback != undefined && cancelCallback != null)
				this.addEventCancel(cancelCb);
			
			return;
		}
		
		confirmButton = findView(PopupViewID.CONFIRM_BUTTON);
		cancelButton = findView(PopupViewID.CANCEL_BUTTON);
		if (confirmCallback != undefined && confirmCallback != null)
			this.addEventConfirm(confirmCallback);
		if (cancelCallback != undefined && cancelCallback != null)
			this.addEventCancel(cancelCallback);		
	};
	
	// **************************************************
	// Description: PopuMessage Private API - (Basic)
	// **************************************************
	
	var appendContentUI = function(contentUI) {
		function appendMesage() {
			var messages = data[PopupDataKey.POPUP_MESSAGE];
			if(messages.length) {
				for (var i = 0; i < messages.length; i++) {
					findView(PopupViewID.MESSAGE).append(messages[i] + '<br />');
				}
			} else {
				findView(PopupViewID.MESSAGE).removeAttr('Class').addClass('txt_0line')
			}
		}
		
		targetContent.append(contentUI);
		
		if (popupType == PopupType.DEFAULT) {
			appendMesage();
		}
	};
		
	var appendButtonUI = function(buttonUI) {
		targetButton.append(buttonUI);
	};
	
	var finalize = function() {
		// finalize properties
		(function() {
			index = undefined;
			popup = null;
			data = null;
			popupType = null;
			confirmCallback = null;
			cancelCallback = null;
			closeCallback = null;
			buttonType = null;
			title = null;
		})();		
		
		// finalize view
		targetViewAlign.remove();
		targetForm = null;
		
		// finalize events
		if (confirmButton != null) {
			confirmButton.unbind();
			confirmButton = null;
		}
		if (cancelButton != null) {
			cancelButton.unbind();
			cancelButton = null;
		}
		
		closeButton.unbind();
		closeButton = null;
	};

	// **************************************************
	// Description: PopuMessage Private API - (Handler: confirm, cancel, close)
	// **************************************************	
	var confirmHandler = function(event) {
		event.data.param = {
				popup: popup,
				popupType: popupType,
				userData: data[PopupDataKey.USER_DATA]
			};
			confirmCallback(event);
			return;
	};
	
	var cancelHandler = function(event) {
		event.data.param = {
			popup:popup,
			userData: data[PopupDataKey.USER_DATA]
		};
		cancelCallback(event);
	};
	
	var closeHandler = function(event) {
		event.data.param = {
			popup:popup,
			userData: data[PopupDataKey.USER_DATA]
		};
		closeCallback(event);
	};
	
	// **************************************************
	// Description: They are common function or method - (Must be in common.js)
	// **************************************************	
	var appendDimWindow = function() {
		if (!$('#dim').length) {
			$('body').append('<div id="dim" class="dim"></div>');
			return;
		}
		
		$('#dim').css('z-index', 9 + index);	// View Code
	};
	
	var removeDimWindow = function() {
		if (index == 0) {
			$('#dim').remove();
			return;
		}
		
		$('#dim').css('z-index', 9 + index - 1); 	// View Code
	};
	
	var alignCenter = function() {
		var pixel = '-' + targetView.outerHeight(false) / 2 + 'px';
		targetViewAlign.css('margin-top', pixel);	// View Code
	}
};

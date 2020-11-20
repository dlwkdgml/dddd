var PopupManagement = new function() {
	var popupBox = null;
	var stack = new Array();

	this.getCurrentPopup = function() {
		return popupBox;
	};
	
	this.pushPopup = function(popupObj) {
		popupBox = popupObj;
		stack.push(popupBox);
	};
	
	this.removePopup = function() {		
		if (stack.length == 0) {
			popupBox = null;
			return popupBox;
		}
		
		var popupObj = stack.pop();
		if (stack.length == 0)
			popupBox = null;
		else
			popupBox = stack[0];
		
		return popupObj;
	};	
}

var PopupViewID = new function() {
	this.VIEW_ALIGN_BOX = '#popup_message_view_align';
	this.VIEW_BOX = '#popup_message_view';
	this.TITLE = '#popup_message_title';
	this.CONTENT_BOX = '#popup_message_content';
	this.BUTTON_BOX = '#popup_message_button';
	this.CONFIRM_BUTTON = '#popup_confirm_btn';
	this.CANCEL_BUTTON = '#popup_cancel_btn';
	this.CLOSE_BUTTON = '#popup_close_btn';
	this.MESSAGE = '#popup_message_default_message';
};

var PopupViewClass = new function() {
	this.OTHER_POPUP_BOX = '.popup.other';
	this.OTHER_POPUP_BOX2 = '.popup2.other';
	this.VIEW_ALIGN = '.popup_message_view_align';
	this.CLOSE_BUTTON = '.btn_close';
	this.SYNC_BOX = '.bx_sync';
	this.MESSAGE = '.txt_3line';
};

var PopupDataKey = new function() {
	this.POPUP = 'popup';
	this.POPUP_TYPE = 'popupType';
	this.POPUP_MESSAGE = 'popupMessage';
	this.POPUP_BUBBLE_MESSAGE = 'popupBubbleMessage';
	this.USER_DATA = 'userData';
};

var PopupType = new function() {
	this.DEFAULT = 0;
};

var ButtonType = new function() {	
	this.CONFIRM = 0;
	this.CANCEL = 1;
	this.CLOSE = 2;
	this.CONFIRM_CANCEL = 3;
};

var PopupTitleText = new function() {
	this.DEFAULT = LanguagePack.KEYWORD_ALERT;
};

var PopupBoxUI = new function() {
	this.BOX =
			'<div class="popup_message_view_align" style="position:fixed;width:100%;height:50%;top:50%;display:none;z-index:10">' +
			'	<div id="popup_message_view" class="popup" style="display:none;">' +
			'		<h1 id="popup_message_title"></h1>' +
			'		<div id="popup_message_content" class="popup_content"></div>' +
			'		<div id="popup_message_button" class="bx_btn"></div>' +
			'		<span class="btn_close">' + 
			'			<a id="popup_close_btn" href="" alt="' + LanguagePack.KEYWORD_CLOSE + '"><img src="../../resources/image/Polaris/new/popup_button_close.png" /></a>' +
			'		</span>' +
			'	</div>' +
			'</div>';
};

var PopupContentUI = new function() {
	this.DEFAULT = '<p id="popup_message_default_message" class="txt_3line"></p>';
};

var PopupButtonUI = new function() {	
	this.CONFIRM =
			'<a id="popup_confirm_btn" class="btn" href="">' + LanguagePack.KEYWORD_CONFIRM + '</a>';
	this.COMPLITE =
		'<a id="popup_confirm_btn" class="btn" href="">' + LanguagePack.KEYWORD_COMPLETED +'</a>';
	this.CANCEL =
			'<a id="popup_cancel_btn" class="btn" href="">' + LanguagePack.KEYWORD_CANCEL + '</a>';
	
	this.CLOSE =
			'<a class="btn" href="">' + LanguagePack.KEYWORD_CLOSE + '</a>';
	this.COMPLETE_CLOSE =
		'<a id="popup_confirm_btn" class="btn" href="">' + LanguagePack.KEYWORD_CLOSE +'</a>';
	
	this.CONFIRM_CANCEL =
			'<a id="popup_confirm_btn" class="btn" href="">' + LanguagePack.KEYWORD_CONFIRM + '</a> ' +
			'<a id="popup_cancel_btn" class="btn" href="">' + LanguagePack.KEYWORD_CANCEL + '</a>';
};


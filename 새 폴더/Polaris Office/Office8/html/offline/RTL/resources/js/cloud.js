var isSotongOffice = false;

function pcOfficeData() {
	this.json = {'local_recent' : [-2], 'new_recent' : [-2], 'sharedFolderInfos' : [], 'templates' : [-2]};
	this.info = {
			'init' : false,
			'fullName' : 'test',
			'email' : 'test@gmail.com',
			'level' : 1,
			'portrait' : '',
			'limitUsage' : -1,
			'currentUsage' : -1,
			'daysLeft' : -1,
			'userType' : '2'
	},
	this.currentView = 'doc_list';
	this.type = null;
	this.coution = '';
	this.defaultTemplate = ['full', 'word', 'sheet', 'slide', 'hwp', 'odt'];
	this.wordTemplate = ['full', 'word', 'hwp', 'odt'];
	this.odtTemplate = ['odt'];
	this.macTemplate = ['full', 'word', 'sheet', 'slide', 'hwp'];
	this.template = this.defaultTemplate.slice();
	this.layout;
}

var isPCHOME = true;
var officeType = 'windows';
var clickCountCheck = 0;
var $templeteTypes;
var isLogout = true;
var isSAMode = false;
var poProductType;
var isServiceMode = true;
var isTemplateMode = false;

pcOfficeData.prototype = {
		'getTypeImage':function(doctype){
			var index = (""+doctype).lastIndexOf(".");
			var type = (""+doctype).substring(index + 1).toLowerCase();
			switch (type) {
			case "doc":
			case "docx":
			case "pdf":
			case "hwp":
			case "xls":
			case "xlsx":
			case "ppt":
			case "pptx":
			case "pps":
			case "ppsx":
			case "odt":
			case "txt":
			case "zip":
			case "word":
			case "sheet":
			case "slide":
			/* AOM-7556 */
			/*case "ods":
			case "odp":*/
			case "csv":
				/* AOM-7534 */
			case "odt":
				return  "../../resources/image/Polaris/new/img/" + type + ".png";
			default:
				return  null;
			}
		},
		'setJson' : function(key, value) {
			if(key == "init"){
				this.json = {};
				return;
			}
			this.json[key] = value;
		},
		'getJson' : function(key) {
			return this.json[key];
		},
		'getFilename' : function(fileName) {
			var name =  (""+fileName);
			var index = (""+fileName).lastIndexOf(".");
			var type = (""+fileName).substring(index + 1).toLowerCase();
			if(type == 'slide' || type == 'sheet' || type == 'word') {
				name = name.substr(0, index);
			}
			return name;
		},
		'insertHighlight': function(fileName){
			var searchKey = $('#search').val().toLowerCase();
			var output = fileName;
			fileName = fileName.toLowerCase();
			var index = fileName.indexOf(searchKey);
			if(index < 0)
				return output;
			return output.substring(0,index) + '<em>' + output.substring(index,index + searchKey.length)
			+ '</em>' + output.substring(index + searchKey.length);
		},
		'getTagInfo': function(dl){
			if($pcOfficeData.currentView == "share_list") {
				dl = $('#shared_list dl.share_doc.select');
			} else if($pcOfficeData.currentView == "doc_list") {
				dl = $('#doc_list dl.recent_doc.select');
			} else if($pcOfficeData.currentView == "star_list") {
				dl = $('#star_list dl.favorite_doc.select');
			}
			return dl;
		}
}

$pcOfficeData = new pcOfficeData();

//AOM-9249
var licenseInfo = {
		'isLicenseUser' : false,
		'expiredTime': null,
		'isImpressionsOfLicenseExpirationBanner' : false,
		'poIntroduceDocTime' : null,
		'isDeletedPOIntroduceDoc' : 0,
		'sampleDocumentInfo' : []
};


function showPopupOffline(e) {
	if(e.stopPropagation) e.stopPropagation();
	if(e.preventDefault) e.preventDefault();

	var popupMessage = new Array();
	popupMessage[0] = LanguagePack.OFFLINE_MSG;
	var popup = new PopupMessage(PopupType.DEFAULT, ButtonType.CONFIRM, null, {popupMessage:popupMessage}, defaultAlertCB, defaultAlertCB, defaultAlertCB);
	popup.create();
	popup.show();
}

function showPopupComputerOpen(e) {
	if(e.stopPropagation) e.stopPropagation();
	if(e.preventDefault) e.preventDefault();

	if(isSAMode
		//|| (officeType == 'windows' && ($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1'))
		|| ($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1')
		|| !isServiceMode){
		document.getElementById('open_explorer').click();
	} else {
		var popupMessage = new Array();
		popupMessage[0] = LanguagePack.OFFLINE_COMPUTER_MSG($pcOfficeData.info.level);
		var result = function(e) {
			defaultAlertCB(e);
			document.getElementById('open_explorer').click();
		};
		var popup = new PopupMessage(PopupType.DEFAULT, null, null, {popupMessage:popupMessage}, result, defaultAlertCB, defaultAlertCB);
		popup.create();
		popup.show();
	}

}

function showPopupExpireUsed(e) {
	if(e.stopPropagation) e.stopPropagation();
	if(e.preventDefault) e.preventDefault();

	var popupMessage = new Array();
	var btnText = '';
	if($pcOfficeData.info.level == 1) {
		popupMessage[0] = LanguagePack.NOT_CREATE_BASIC_NEWDOCUMENT_MSG;
		btnText = LanguagePack.ACCOUNTUPGRAGE;
	} else if($pcOfficeData.info.level == 3) {
		var datadiff = $pcOfficeData.info.daysLeft;
		if($pcOfficeData.info.daysLeft == 0) {
			datadiff = 1;
		}
		popupMessage[0] = LanguagePack.NOT_CREATE_LGPLAN_NEWDOCUMENT_MSG(datadiff);
		btnText = LanguagePack.ACCOUNTUPGRAGE;
	} else {
		var datadiff = $pcOfficeData.info.daysLeft;
		if($pcOfficeData.info.daysLeft == 0) {
			datadiff = 1;
		}
		popupMessage[0] = LanguagePack.NOT_CREATE_SMART_NEWDOCUMENT_MSG(datadiff);
		btnText = LanguagePack.KEYWORD_SUPPORT;
	}

	var result = function(e) {
		defaultAlertCB(e);
		showPopupOffline(e);
	};
	var popup = new PopupMessage(PopupType.DEFAULT, ButtonType.CONFIRM, null, {popupMessage:popupMessage}, result, defaultAlertCB, defaultAlertCB);
	popup.create();
	popup.changebutton({confirm : btnText})
	popup.show();
}

var allowSize = {"home":"272","sm":"82"};

$(function() {
	$('body').append('<p id="toastpop" class="try" style="display: none;"><span></span></p>');

	$(document).bind("contextmenu", function(e){
	    return false;
	});

	$('#search_btn').bind('click', function(e) {
		var $this = $(this);
		if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
			document.getElementById('pchome_loginType1').click();
		} else {
			showPopupOffline(e);
		}
	});

	var isSearchClick = false;
	$('#search').bind('focus click', function(e) {
		var $this = $(this);
		$this.blur();
		if(isSearchClick) {
			return;
		}
		isSearchClick = true;
		setTimeout(function() {
			if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
				document.getElementById('pchome_loginType1').click();
			} else {
				showPopupOffline(e);
			}
			isSearchClick = false;
		}, 200);
	});

	$('#pchomeoff_notice, #pchomeoff_appdown, #pchomeoff_setting, #pchomeoff_account, #pchomeoff_logout, #pchomeoff_feedback').bind('click', function(e){
		showPopupOffline(e);
	});

	/*$('#pchomeoff_open, h2.title a.pchome_alldoc').bind('click', function(e){
		showPopupComputerOpen(e);
	});*/

	$('#pchomeoff_hwp, #pchomeoff_slide, #pchomeoff_sheet, #pchomeoff_word').bind('click', function(e) {
		$('dl.floating a.close').trigger('click');
		if(licenseInfo.isLicenseUser) {

		} else {
			if($pcOfficeData.info.limitUsage != -1 && $pcOfficeData.info.currentUsage/$pcOfficeData.info.limitUsage * 100 >= 100) {
				showPopupExpireUsed(e);
			}
		}
	});

	$('body').css('overflow-y','scroll');

	$(window).scroll(function() {
    	if($pcOfficeData.currentView == "share_list" || $pcOfficeData.currentView == "doc_list"  || $pcOfficeData.currentView == "star_list") {
    		var allowSize = 272;
        	if($('#cloud .header').hasClass("sm")) {
        		allowSize = 72;
        	}

            if ($(this).scrollTop() > allowSize) {
            	$('#cloud .header fieldset p.txt').hide();
                $('#cloud .header').addClass('sm');
    			$('#cloud section.cloud_contents').addClass('sm');
                $('#cloud.templete .header').removeClass('sm');
                changeSearchTextSize();

            } else {
            	if($('#cloud .header.sm').hasClass('searchResult')){
            		return;
            	}
                $('div.header').removeClass('sm');
                $('#cloud section.cloud_contents').removeClass('sm');
                changeSearchTextSize();
            };
    	}
    });

	changeSearchTextSize();
    $(window).resize(function() {
    	changeSearchTextSize();
    });

    $('div.header h1').bind('click', refreshTabList);

    $('#pchome_open2, h2.title.bottom .mydoc, h2.title a.pchome_alldoc, #pchomeoff_open').bind('click', function(e) {
    	if(e.preventDefault) e.preventDefault();
		showPopupComputerOpen(e);
    });
    $('a.login').bind('click', function(e) {
    	if(e.preventDefault) e.preventDefault();

		//if(officeType == 'windows' && ($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1')) {
    	if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
			document.getElementById('pchome_loginType1').click();
		} else {
			showPopupOffline(e);
		}
    });

	var layout = {
			'recent' : {
				'create':function(){
					var arg = arguments
					var fileList = arg[1];

					if(arg[0].children('.recent_doc').length) {
						arg[0].children('.recent_doc').remove();
					}

					var len = fileList.length;
					var $homeTemplates = $('.home_list div.templates');
					var $newhomeTemplates = $('.home_list.newtemplates .thum');
					if(isSAMode == true || isTemplateMode == true || poProductType == 'mac_guest'){
						if(poProductType == 'odt') {
							arg[0].show();
							$homeTemplates.remove();
						} else {
							if($homeTemplates.hasClass('init')) {
								$('dl.floating a.template').trigger('click', ["homeTemplates"]);

								if(len < 10) {
									arg[0].hide();
									$homeTemplates.show();
								} else {
									arg[0].show();
									$homeTemplates.hide();
								}
							}
						}
						var vlength = $newhomeTemplates.children('dl.templates:visible').length;
						if(vlength / 6 % 1 == 0) {
							if(!$newhomeTemplates.hasClass('col6')) {
								$newhomeTemplates.addClass('col6');
							}
						} else {
							if($newhomeTemplates.hasClass('col6')) {
								$newhomeTemplates.removeClass('col6');
							}
						}
					} else {
						arg[0].show();
						$homeTemplates.remove();
					}

					if(fileList.length) {
						$('div.offline.no_doc').hide();

						for(var i = 0; i < fileList.length; i++) {
							var data = fileList[i];

							if(data.file.sharedFolderId) {
								if(arg[2].sharedFolderInfos) {
									for(var j = 0; j < arg[2].sharedFolderInfos.length; j++) {
										if(arg[2].sharedFolderInfos[j].sourceFolder.fileId == data.file.sharedFolderId) {
											if(data.file.sharedFolderId == data.file.parentId) {
												data.file.parentId = arg[2].sharedFolderInfos[j].sharedFolder.fileId;
											}
											if(arg[2].sharedFolderInfos[j].sharedFolder)
												data.file.changePath = arg[2].sharedFolderInfos[j].sharedFolder.path + data.file.path.replace(arg[2].sharedFolderInfos[j].sourceFolder.path + arg[2].sharedFolderInfos[j].sourceFolder.fileName, arg[2].sharedFolderInfos[j].sharedFolder.fileName);
											else
												data.file.changePath = "";
											break;
										}
									}
								}

							}
							var $dl = $('<dl />', {
								'click' : events.showView,
								'contextmenu' : events.context.show,
								'class' : 'recent_doc',
								'id' : data.fileId
							});

							var img = '<img src="' + $pcOfficeData.getTypeImage(data.fileName) +'">';
							var $dt = $('<dt />' , {
								'html' : img
							});
							var time = covertunixTime8(data.lastAccessTime);
							if(data.file.changePath) {
								data.file.path = data.file.changePath;
								data.myFile = true;
							}
							var path = '';
							if(data.fileId) {
								path = createTrSubPath(data.file.path);
							} else {
								var patharr= data.file.path.split('\\');
								path = '';
								for(var j=0; j< patharr.length; j++) {
									/*if(j==0) {
										path += patharr[j].substr(0, patharr[j].length-1);
									} else {
										path += patharr[j];
									}*/
									if (patharr[j] != '') {
										path += patharr[j];
										path += ' > ';
									}
								}
								path = path.substr(0, path.length-3);
							}
							var context_str = '';
							if(!data.myFile) {
								path = LanguagePack.PCHOME_NOT_MYFILE(data.fullName, $pcOfficeData.info.level);
							}

							context_str = '<li class="open"><a href="#">'+ LanguagePack.OPEN + '</a></li>'
							+ '<li class="del"><a href="#">'+ LanguagePack.KEYWORD_DELETE + '</a></li>';

							var $icons = '<span class="img">';
							if(data.shared) {
								$icons += '<em class="share"></em>';
							}
							var starred = (data.myFile) ? data.file.starred : data.starred;
							if(starred) {
								$icons += '<em class="favorite"></em>';
							}
							$icons += '</span>';

							var fileName = $pcOfficeData.getFilename(data.fileName);
							var fileinfo = '<strong>'
										 + '<div class="tit" title="' + fileName +'">' + fileName + $icons + '</div>'
										 + '</strong>'
										 + '<span class="location" title="' + path + '">' + path + '</span>'
										 + '<span class="date">' + time + '</span>'
										 + '<div class="menu">'
										 + '<a href="#" class="menu_open">' + 'Menu' + '</a>'
										 + '<ul>'
										 + context_str
										 + '</ul>'
										 + '</div>';


							var $dd = $('<dd />', {
								'html' : fileinfo
							});

							if(data.shared) {
								$dl.addClass('share');
							}
							$dl.data('data', data);
							arg[0].append($dl.append($dt).append($dd));

							var $menu = $dd.children('.menu').children('ul');
							$menu.children('.open').bind('click', events.context.open);
							$menu.children('.del').bind('click', events.context.deleted);

							$dd.children('.menu').children('.menu_open').click(function(e){
								if(e.stopPropagation) e.stopPropagation();
								if(e.preventDefault) e.preventDefault();
								$('body').trigger('click');

								var $this =  $(this);
								var $ul = $this.next('ul');
								var $dl2 = $ul.closest('dl');

								if($ul.is(':visible')) {
									$ul.hide();
								} else {
									$dl2.addClass('select');
									$ul.show();
									$('body').one('click', function() {
										$ul.hide();
										$dl2.removeClass('select');
									});
								}
							});
						}
						sorttype = 'sort_accesstime';
						common.sort('recent');

						arg[0].append(arg[0].children('p'));
					} else {
						$('div.offline.no_doc').show();
						return;
					}
				}
			},
			'template' : {
				'create' : function(){
					var templateType = $pcOfficeData.template.slice(1);
					var templateTypeLen = templateType.length;
					for(var i = 0; i < templateTypeLen; i++){
						var templates = templateList[templateType[i]];
						if(templates == null)
							continue;
						var copy = templates.slice();
						for(var j = 0; j < templates.length; j++){
							var data = copy.shift();
							var id = '#' + data.documentType.toLowerCase();
							var searchText = data.name.toLowerCase();
							var $dl = $('<dl />', {
								'click' : events.showView,
								'class' : 'templates',
								'name' : searchText
							});
							var $dt = $('<dt />');
							var $img = $('<img />' ,{
								'src' : data.imagePath
							});
							var $dd = $('<dd />');
							var $span = $('<span />', {
								'text' : data.name
							});

							data.type = data.documentType;
							$dl.data('data', data);
							$dl.append($dt.append($img)).append($dd.append($span));

							$(id).append($dl);

							var $homeTemplates = $('.home_list div.templates .thum.' + data.documentType.toLowerCase());
							if($homeTemplates.children('dl').length < 5) {
								$homeTemplates.append($dl.clone(true));
							}
						}

					}
				},
				'odtCreate' : function(){
					var $newhomeTemplates = $('.home_list.newtemplates .thum');
					var $templateMore = $newhomeTemplates.children('dl.templates.template');
					$templateMore.find('dd > span').text(LanguagePack.MORE);

					var templates = templateList['odt'];
					var copy = templates.slice();
					for(var j = 0; j < templates.length; j++){
						var data = copy.shift();
						var id = '#' + data.documentType.toLowerCase();
						var searchText = data.name.toLowerCase();
						var $dl = $('<dl />', {
							'click' : events.showView,
							'class' : 'templates',
							'name' : searchText
						});
						var $dt = $('<dt />');
						var $img = $('<img />' ,{
							'src' : data.imagePath
						});
						var $dd = $('<dd />');
						var $span = $('<span />', {
							'text' : data.name
						});

						data.type = data.documentType;
						$dl.data('data', data);
						$dl.append($dt.append($img)).append($dd.append($span));

						$(id).append($dl);

						if($newhomeTemplates.children('dl.templates:visible').length < 6) {
							$templateMore.before($dl.clone(true));
						}
					}
				}
			},
			'changeLayout' : function() {
				var $this = $('#search_template');

				$('#homeList, #template_list, #search_template, #mydoc, #shared_list, #star_list').hide();
				$('#cloud .header').removeClass('sm');
				$('#cloud section.cloud_contents').removeClass('sm');
				$('body').css('overflow-y','hidden');
				$('#cloud .header fieldset p.search a.del').removeClass('loading');
				$this.show();
			},
	}
	$pcOfficeData.layout = layout;

	var events = {
			'showView' : function(e) {
				commonPreventEvent(e);
				var $this = $(this);
				var data = $this.data('data');
				setFileInfo(data);
				var name = $this.attr('class').split(' ');
				switch(name[0]) {
				case 'recent_doc':
					if(data.fileId) {
						showPopupOffline(e);
						return;
					} else if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
						showPopupOffline(e);
						return;
					}
					document.getElementById('pchomeoff_doc').click();
					break;
				case 'search_doc':
					document.getElementById('pchome_search').click();
					break;
				case 'templates':
					if(data.type == 'HWP' && officeType == 'mac' && $pcOfficeData.info.level == 1 && !licenseInfo.isLicenseUser){
						// CAM-5103 [Web] HWP 유료 시나리오를 적용합니다.
						//$('#machome_hwp_check').trigger('click');
						var popupMessage = new Array();
						popupMessage[0] = LanguagePack.OFFLINE_MSG;
						var popup = new PopupMessage(PopupType.DEFAULT, ButtonType.CONFIRM, null, {popupMessage:popupMessage}, defaultAlertCB, defaultAlertCB, defaultAlertCB);
						popup.create();
						popup.show();
						return;
					}
					toastMessage(LanguagePack.TOAST_FILEOPENPROGRESS);
					document.getElementById('pchome_openLocalTemplateDoc').click();
					break;
				case 'share':
					document.getElementById('pchome_share').click();
					break;
				}
		},
		'context' : {
			'open' : function(e) {
				if(e.preventDefault) e.preventDefault();
				if(e.stopPropagation) e.stopPropagation();

				var $dl;
				$dl = $pcOfficeData.getTagInfo($dl);
				if($dl.length == 0) {
					$('body').trigger('click');
					return;
				}
				var data = $dl.data('data');
				setFileInfo(data);

				if($pcOfficeData.currentView == "share_list") {
					document.getElementById('pchome_share').click();
				} else if($pcOfficeData.currentView == "doc_list") {
					/*if(data.fileId) {
						document.getElementById('pchome_doc_offine').click();
					} else {
						showLocalUploadPopup('open');
					}*/
					if(data.fileId) {
						showPopupOffline(e);
						return;
					} else if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
						showPopupOffline(e);
						return;
					}
					document.getElementById('pchomeoff_doc').click();
				} else if($pcOfficeData.currentView == "star_list") {
					document.getElementById('pchome_favorite').click();
				}
				$('body').trigger('click');
			},
			'deleted' : function(e) {
				if(e.preventDefault) e.preventDefault();
				if(e.stopPropagation) e.stopPropagation();

				var $dl;
				$dl = $pcOfficeData.getTagInfo($dl);
				if($dl.length == 0) {
					$('body').trigger('click');
					return;
				}
				var data = $dl.data('data');
				$('body').trigger('click');

				var popupMessage = new Array();

				var name = data.file.fileName;
				var index = name.lastIndexOf(".");
				var type = name.substring(index + 1).toLowerCase();
				if(type == 'slide' || type == 'sheet' || type == 'word') {
					name = name.substr(0, index);
				}

				var arr = [];
				var result;
				arr.push(data);
				setFileInfo(arr);

				if(!data.fileId) {
					if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
						var popupMessage = new Array();

						var name = data.file.fileName;
						var index = name.lastIndexOf(".");
						var type = name.substring(index + 1).toLowerCase();
						if(type == 'slide' || type == 'sheet' || type == 'word') {
							name = name.substr(0, index);
						}
						popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM(contraction(name));
						popupMessage[1] = LanguagePack.LOCALFILE_DELETE;
						var result = function(e) {
							$pcOfficeData.type = 'delete';
							document.getElementById('deleteLocalFile').click();
							defaultAlertCB(e);
						};
						var popup = new PopupMessage(PopupType.DEFAULT, null, null, {popupMessage:popupMessage}, result, defaultAlertCB, defaultAlertCB);
						popup.create();
						popup.changebutton({confirm : LanguagePack.KEYWORD_DELETED});
						popup.show();
					} else {
						document.getElementById('predeleteLocalFile').click();
						return;
					}
				} else {
					showPopupOffline(e);
				}
			},
			'show' : function(e) {
				if(e.preventDefault) e.preventDefault();
				if(e.stopPropagation) e.stopPropagation();
				$('body').trigger('click');

				var $this = $(this);
				$this.addClass('select');
				var $contextmenu = $('body').children('.context_menu');
				var data = $this.data('data');
				var name;
				var myFile = true;

				name = data.file.fileName;
				if(!data.myFile) {
					myFile = false;
				}

				var index = name.lastIndexOf(".");
				var type = name.substring(index + 1).toLowerCase();

				$contextmenu.data('data', data);

				if(!$contextmenu.is(':visible')) {
					$('body').one('click', function() {
						$contextmenu.hide();
						$this.removeClass('select');
					});
				}

				if (e.clientX || e.clientY) {
					x = e.clientX;
					y = e.clientY;
				}
				var context_height = $contextmenu.outerHeight(true);
				var context_width = $contextmenu.outerWidth(true);

				var visibleHeight = $(window).height();
				var visibleWidth = $(window).width();

				if(x + context_width > visibleWidth ) {
					x = x -( x + context_width - (visibleWidth)) - 10;
				}
				var left = $(window).scrollLeft();
				if(left) {
					x += left;
				}
				if(y + context_height > visibleHeight) {
					y = y -( y + context_height - (visibleHeight) ) - 10;
				}
				var top = $(window).scrollTop();
				if(top) {
					y += top;
				}
				$contextmenu.css('left', x + 'px');
				$contextmenu.css('top', y  + 'px');

				$contextmenu.show();

				return false;
			}
		},
		'changeTemplate' : function(e, param) {
			commonPreventEvent(e);
			var $this = $(this);
			var id = $this.attr('class').split(' ');

			if(id[0] == 'hwp' && officeType == 'mac' && $pcOfficeData.info.level == 1 && !licenseInfo.isLicenseUser){
				// CAM-5103 [Web] HWP 유료 시나리오를 적용합니다.
				//$('#machome_hwp_check').trigger('click');
				var popupMessage = new Array();
				popupMessage[0] = LanguagePack.OFFLINE_MSG;
				var popup = new PopupMessage(PopupType.DEFAULT, ButtonType.CONFIRM, null, {popupMessage:popupMessage}, defaultAlertCB, defaultAlertCB, defaultAlertCB);
				popup.create();
				popup.show();
				return;
			}
			if(param && param == 'show') {
				common.showRecentList('template_list');
				pushStateId('te');
			}
			var len = $pcOfficeData.template.length;
			$('#cloud .header').removeClass('sm');
			$('#cloud section.cloud_contents').removeClass('sm');
			$('#template_list ul li a').removeClass('on');
			$('.list_box').scrollTop(0);

			if(id[0] == 'full') {
				$('a.full').addClass('on');
				$('div.thum').removeClass('select').show();
				$('#template_list .share_header h3').text(LanguagePack.ALL);
				return;
			}

			for(var i = 1; i < len; i++) {
				var targetA = '#template_list ul li a.' + $pcOfficeData.template[i] ;
				var targetDiv = '#' + $pcOfficeData.template[i];
				if($pcOfficeData.template[i] == id[0]){
					$(targetA).addClass('on');
					$(targetDiv).addClass('select').show();
					$('#template_list .share_header h3').text($(targetDiv).children('h2').text());
				}else{
					$(targetDiv).hide();
				}
			}
		},
		'showTemplate' : function(e, param) {
			if(isHwpShow == -1) {
				getNativeLanguage('FALSE');
			}

			if(e) {
				commonPreventEvent(e);
			}
			var $homeTemplates = $('.home_list div.templates');

			showAllTemplate = true;

			$('#cloud .header').removeClass('sm');
			$('#cloud section.cloud_contents').removeClass('sm');
			$('#cloud.templete .header, #cloud .header').removeClass('searchResult');
			$('dl.floating a.close').trigger('click');

			if(!param) {
				common.showRecentList('template_list');
				pushStateId('te');
			}
			$('#cloud .blind').fadeOut();
			changeSearchTextSize();

			if($homeTemplates.hasClass('init')){
				layout.template.create();
				$homeTemplates.removeClass('init');
			}
		},
		'showSearchTemplate' : function(e){
			commonPreventEvent(e);
			var $this = $(this);
			var type = $this.attr('class');
			var $div = $('#search_template section.templete div.thum');
			var $nodoc = $('#search_template section.templete section.no_doc');
			var className = '.' + type;
			var len = 0;
			if(type == "all"){
				len = $div.children().length;
			} else {
				len = $div.children(className).length;
			}


			if(type.indexOf('on') > -1){
				return;
			} else {
				$('#search_template section.share_header h3 em').text(len);
				$('#search_template dl.tree_folder dd#tree ul li a').removeClass('on');
				$this.addClass('on');

				if(len == 0){
					$div.hide();
					$('#search_template section.templete section.no_doc').show();
					return;
				}

				if(type == 'all'){
					$div.children().show();
					if($div.css('display') == "none"){
						$div.show();
						$nodoc.hide();
					}
				} else {
					$div.children().hide();
					$div.children(className).show();
					if($div.css('display') == "none"){
						$div.show();
						$nodoc.hide();
					}
				}
			}
		},
		'reset' : function(){
			pushStateId('h');
			common.showRecentList('doc_list');
			$('a.full').trigger('click');
			changeSearchTextSize();
		}
	}

	var common = {
		'initSearch' : function(type) {
			var text = $('#search').val();
			if(text){
				$('#search').val("");
				$('a.del').hide();
				showLabel($('p.search label'), true);
			}

			if(type == 'doc'){
				$('p.search label').text(LanguagePack.PCHOME_DOC_SEARCH_ORANGEPRO);
				$('#search_btn').removeClass().addClass('doc');
				$pcOfficeData.searchText = '';
			} else {
				$('p.search label').text(LanguagePack.PCHOME_TEMPLATE_SEARCH);
				$('#search_btn').removeClass().addClass('template');
			}
		},
			'sort' : function(listType) {
				var $this = null, $list = null;

				if(listType == 'recent'){
					$this = $('#doc_list');
					$list = $('#doc_list dl.recent_doc');
				} else if (listType == 'search'){
					$this = $('#search_list');
					$list = $('#search_list dl.search_doc');
				} else if (listType == 'share'){
					$this = $('#shared_list section.doc_list.share');
					$list = $this.children();
				}

				$list.sort(function(a,b){
					var cur = $(a).data('data');
					var next = $(b).data('data');
					var valA = 0, valB = 0, index = 0;
					var bSortOrder = true;

					if(listType == 'share'){
						if(sorttype == 'sort_sharetime'){
							valA = cur.updateTime;
							valB = next.updateTime;
							bSortOrder = false;
						} else if (sorttype == 'sort_name'){
							valA = cur.fileInfo.name.toLowerCase();
							valB = next.fileInfo.name.toLowerCase();
						} else if (sorttype == 'sort_type'){
							valA = cur.fileInfo.name.toUpperCase();
							index = valA.lastIndexOf(".");
							valA = valA.substr(index, valA.length);

							valB = next.fileInfo.name.toUpperCase();
							index = valB.lastIndexOf(".");
							valB = valB.substr(index, valB.length);
						} else if (sorttype == 'sort_owner'){
							valA = cur.fileInfo.ownerName;
							valB = next.fileInfo.ownerName;
						}
					} else {
						if(sorttype == 'sort_type'){
							valA = cur.fileName.toUpperCase();
							index = valA.lastIndexOf(".");
							valA = valA.substr(index, valA.length);

							valB = next.fileName.toUpperCase();
							index = valB.lastIndexOf(".");
							valB = valB.substr(index, valB.length);
						}else if(sorttype == 'sort_name'){
							valA = cur.fileName.toLowerCase();
							valB = next.fileName.toLowerCase();
						}else if(sorttype == 'sort_modify'){
							valA = cur.lastModified;
							valB = next.lastModified;
							bSortOrder = false;
						}else if(sorttype == 'sort_accesstime'){
							valA = cur.lastAccessTime;
							valB = next.lastAccessTime;
							bSortOrder = false;
						}
					}

					if(bSortOrder){
						if (valA == valB) {
							return 0;
						} else if (valA > valB) {
							return 1;
						} else {
							return -1;
						}
					} else {
						if (valA == valB) {
							return 0;
						} else if (valA < valB) {
							return 1;
						} else {
							return -1;
						}
					}

				});

				$this.append($list);
			},
			'showRecentList': function(id){
				$('div.try_search').hide();
				switch(id){
				case 'doc_list':
					common.initSearch('doc');
					$pcOfficeData.currentView = 'doc_list';
					$('#search_list, #template_list, #search_template, #mydoc, #shared_list, #star_list').hide();
					$('#homeList').show();
					$('#cloud .header ul.util_cloud li.open').show();
					$('body').css('overflow-y','scroll');
					break;
				case 'template_list':
					$pcOfficeData.currentView = 'template_list';
					common.initSearch('template');
					$('#homeList, #search_list, #search_template, #mydoc').hide();
					$('#template_list').show();
					$('#cloud .header ul.util_cloud li.open').show();
					$('body').css('overflow-y','hidden');
					break;
				case 'search_template':
					$('#homeList, #search_list, #template_list, #mydoc, #shared_list, #star_list').hide();
					$('#cloud .header ul.util_cloud li.open').show();
					$('#search_template').show();
					break;
				case 'mydoc':
					common.initSearch('doc');
					$pcOfficeData.currentView = 'mydoc';
					$('#homeList, #search_list, #template_list, #search_template, #shared_list, #star_list').hide();
					$('#mydoc').show();
					$('body').css('overflow-y','hidden');
					$('#cloud .header ul.util_cloud li.open').hide();
					break;
				case 'search_list':
					$('#cloud').addClass('templete');
					$('#homeList, #template_list, #search_template, #mydoc, #shared_list, #star_list').hide();
					$('#search_list').show();
					$('body').css('overflow-y','hidden');
					break;
				}
				$(window).scrollTop(0);
		}
	}

	$('body').append('<div id="reload_local_home"></div>');
	$('#cloud section.shareList#template_list section.tree li.lnb a').bind('click', events.changeTemplate);
	$('.home_list .thum a.more').bind('click', showTemplate2);
	$('#cloud section.shareList#search_template section.tree li.lnb a').bind('click', events.showSearchTemplate);
	$('dl.floating a.template, dl.templates.template').bind('click', events.showTemplate); /* AOM-7534 */
	$('#pchome_main').bind('click', events.reset);
	$('dl.floating a.open').click(function(){
		if(isHwpShow == -1) {
			getNativeLanguage('FALSE');
		}
		var speed = 100;
		for(var i=0; i< $templeteTypes.length; i++) {
			$templeteTypes.eq(i).fadeIn(speed);
			speed = speed - 100;
		}

		$('dl.floating a.close').css({'display':'block'});
		$('dl.floating a.open').hide();

		var $this = $(this);
		if($this.hasClass('guestinit')) {
    		$this.removeClass('guestinit').children('span.guest').remove();
    	}
	});
	$('dl.floating a.close').click(function(){
		var speed = 100;
		for(var i=0; i< $templeteTypes.length; i++) {
			$templeteTypes.eq(i).fadeOut(speed);
			speed = speed + 100;
		}
		$('dl.floating a.close').hide();
		$('dl.floating a.open').show();
	});

	$('h2.title.bottom .recent').bind('click', function(e) {
		if(e.preventDefault) e.preventDefault();
		var $this = $(this);
		$(this).hide();
		var $homelist = $this.closest('.home_list');
		$homelist.children('div.templates').hide();
		$homelist.children('#doc_list').show();
	});

	$('#pchome_userinfo').bind('click', function(e) {
		commonPreventEvent(e);
		commonStopPropagation(e);

		if($('.conPop').is(":visible")) {
			$('.conPop').hide();
		} else {
			if(!$pcOfficeData.info.init) {
				$pcOfficeData.info.init = true;

				var $user = $('div.conPop.user .box dl');
				$user.children('dd').children('strong').text($pcOfficeData.info.fullName);
				$user.children('dd').children('span.mail').text($pcOfficeData.info.email);

				if($pcOfficeData.info.portrait.length) {
					$('#cloud .header div.conPop.user dt img').attr('src', $pcOfficeData.info.portrait);
				}

			}


			$('div.conPop.user').show();
			$("body").one('click',function() {
				$('div.conPop').hide();
			});
		}
	});

	$('#reload_local_home').bind('click', function() {
		layout.recent.create($('#doc_list'), $pcOfficeData.getJson('local_recent'), $pcOfficeData.getJson('sharedFolderInfos'));
	});

	var $context = $('<div />',{
		'class' : 'context_menu',
		'css' : {
			'display' : 'none'
		}
	});
	var $context_ul = $('<ul />');

	var $context_open =  $('<li />',{
		'class' : 'open'
	});
	var $context_open_a =  $('<a />',{
		'href' : '#',
		'class' : 'menu_08',
		'text' : LanguagePack.OPEN,
		'click' : events.context.open
	});
	$context_open.append($context_open_a);

	var $context_delete =  $('<li />',{
		'class' : 'delete'
	});
	var $context_delete_a =  $('<a />',{
		'href' : '#',
		'class' : 'menu_07',
		'text' : LanguagePack.KEYWORD_DELETE,
		'click' : events.context.deleted
	});
	$context_delete.append($context_delete_a);

	$context.append($context_ul
			.append($context_open)
			.append($context_delete)
			);

	$('body').append($context);
	//context init end

	function requestLocalRecent() {
		document.getElementById('getLocaRecentList').click();
	}

	$('.pchome_recent2, #doc_list h2.title a.refresh').bind('click', requestLocalRecent);

	setTimeout(function() {
		document.getElementById('pchome_IsEmptyNetworkSession').click();
		document.getElementById('pchome_getGovernmentType').click();
		document.getElementById('pchome_getPOProductType').click();
		document.getElementById('pc_check_License').click();
		document.getElementById('getServiceType').click();
		document.getElementById('pc_check_userType').click();
		document.getElementById('layoutcomplete').click();
		document.getElementById('setVersion').click();
		document.getElementById('getNativeLanguage').click();
	}, 200);
});

function commonPreventEvent(e) {
	if (e.preventDefault) {
	    e.preventDefault();
	} else {
	    e.returnValue = false;
	}
}

function commonStopPropagation(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

function getSeletor(e) {
	return (e.currentTarget) ? $(e.currentTarget) : $(e.srcElement);
}

function defaultAlertCB(e) {
	if (e.preventDefault) e.preventDefault();
	if (e.stopPropagation) e.stopPropagation();

	var popup = e.data.param[PopupDataKey.POPUP];
	popup.destroy();
}

var pchome_fileInfo = {'fileInfo' : null};
var pchome_filePath = {'filePath' : null};
var pchome_errorMsg = null;
var test_timer = null;

function setFileInfo(info) {
	$('body').addClass('progress');
	if(test_timer) {
		clearTimeout(test_timer);
	}
	test_timer =setTimeout(function() {
		$('body').removeClass('progress');
		test_timer = null;
	},2000);
	pchome_fileInfo['fileInfo'] = info;
}

function setFilePath(path){
	pchome_filePath['filePath'] = path;
}

function getFileInfo(){
	return JSON.stringify(pchome_fileInfo);
}
function getFilePath(){
	return JSON.stringify(pchome_filePath);
}

function createTrSubPath(fullPath) {
	var totalPath = "";
	if(!fullPath || fullPath.length == 0) {
		return "";
	}
	var path = fullPath.substr(7, fullPath.length);
	var pathArray = path.split('/');
	for ( var i = 0; i < pathArray.length - 2; i++) {
		if (i==0 && pathArray[i] == "drive")
		{
			totalPath += LanguagePack.KEYWORD_DRIVE($pcOfficeData.info.level);
		} else {
			totalPath += pathArray[i];
		}
		totalPath += " > ";
	}
	var lastPath = pathArray[pathArray.length - 2];
	if(pathArray.length == 2 && lastPath == "drive") {
		lastPath = LanguagePack.KEYWORD_DRIVE($pcOfficeData.info.level);
	}
	totalPath += lastPath;
	return totalPath;
}

function covertunixTime8(time) {
	if(typeof ischina!='undefined' && ischina=='true') {
		return covertunixTimeCN(time);
	}
	var theDate = new Date(time * 1000);
	var dateString = null;

	switch(LanguagePack.CURRENT_LAN) {
	case "en":
		if(isPCHOME) {
			dateString = poLocal.getDateFormat(theDate,"MM/DD/YYYY h:mm AP");
		} else {
			if(dateFormatType == 0) {
				dateString = poLocal.getDateFormat(theDate,"MM/DD/YYYY h:mm AP");
			} else if (dateFormatType == 1){
				dateString = poLocal.getDateFormat(theDate,"MM/DD/YYYY h:mm AP");
			} else if (dateFormatType == 2) {
				dateString = poLocal.getDateFormat(theDate,"DD/MM/YYYY h:mm AP");
			} else {
				dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD h:mm AP");
			}
		}
		break;
	case "ko":
		if(isPCHOME) {
			dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD AP h:mm");
		} else {
			if(dateFormatType == 0) {
				dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD AP h:mm");
			} else if (dateFormatType == 1){
				dateString = poLocal.getDateFormat(theDate,"MM/DD/YYYY AP h:mm");
			} else if (dateFormatType == 2) {
				dateString = poLocal.getDateFormat(theDate,"DD/MM/YYYY AP h:mm");
			} else {
				dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD AP h:mm");
			}
		}
		break;
	case "jp":
	case "cn":
		if(isPCHOME) {
			dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD h:mm");
		} else {
			if(dateFormatType == 0) {
				dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD h:mm");
			} else if (dateFormatType == 1){
				dateString = poLocal.getDateFormat(theDate,"MM/DD/YYYY h:mm");
			} else if (dateFormatType == 2) {
				dateString = poLocal.getDateFormat(theDate,"DD/MM/YYYY h:mm");
			} else {
				dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD h:mm");
			}
		}
		break;
	case "fr":
		if(isPCHOME) {
			dateString = poLocal.getDateFormat(theDate,"DD/MM/YYYY h:mm");
		} else {
			if(dateFormatType == 0) {
				dateString = poLocal.getDateFormat(theDate,"DD/MM/YYYY h:mm");
			} else if (dateFormatType == 1){
				dateString = poLocal.getDateFormat(theDate,"MM/DD/YYYY h:mm");
			} else if (dateFormatType == 2) {
				dateString = poLocal.getDateFormat(theDate,"DD/MM/YYYY h:mm");
			} else {
				dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD h:mm");
			}
		}
		break;
	case "ar":
		if(isPCHOME) {
			dateString = poLocal.getDateFormat(theDate,"AP h:mm DD/MM/YYYY");
		} else {
			if(dateFormatType == 0) {
				dateString = poLocal.getDateFormat(theDate,"AP h:mm DD/MM/YYYY");
			} else if (dateFormatType == 1){
				dateString = poLocal.getDateFormat(theDate,"AP h:mm MM/DD/YYYY");
			} else if (dateFormatType == 2) {
				dateString = poLocal.getDateFormat(theDate,"AP h:mm DD/MM/YYYY");
			} else {
				dateString = poLocal.getDateFormat(theDate,"AP h:mm YYYY/MM/DD");
			}
		}
		break;
	default:
		dateString = poLocal.getDateFormat(theDate,"YYYY/MM/DD AP h:mm");
		break;
	}

	return dateString;
}

var pchomeVersion = 0;
function setVersion(ver) {
	pchomeVersion = ver;
}

function setListFromLocal(type, list) {
	$('#cloud section.doc_list h2 a.loading').hide();
	var data;


	if(typeof list === 'string') {
		data = JSON.parse(list);
	} else {
		data = list;
	}

	var arr = [];
	/*if(licenseInfo.isLicenseUser) {
		var arr = [];
		try {
			//샘플 문서 등록
			if(licenseInfo.isDeletedPOIntroduceDoc == 0 && licenseInfo.sampleDocumentInfo.length) {
				for(var i=0; i < licenseInfo.sampleDocumentInfo.length; i++) {
					arr.push(licenseInfo.sampleDocumentInfo[i]);
				}
			}
		} catch(err) {}
	} else {
		if($pcOfficeData.info.userType == '0') {
			arr.push({
	         	file : {
	         			deletedTime : 0,
	         			fileId : '22',
		            	fileName : 'Welcome to Polaris Office.ppsx',
		            	fileRevision : 0,
		            	fileType : 'File',
		            	path : "PATH://drive/",
		            	lastAccessTime : trialStartTime,
		            	lastModified : trialStartTime,
		            	lastModifiedRevision : 0,
		            	lastRevision : 0
	         	},
	         	deletedTime : 0,
	         	fileId : '22',
	         	fileName : 'Welcome to Polaris Office.ppsx',
	         	fileRevision : 0,
	         	myFile : true,
	         	fileType : 'File',
	         	path : "PATH://drive/",
	         	lastAccessTime : trialStartTime,
	         	lastModified : trialStartTime,
	         	lastModifiedRevision : 0,
	         	lastRevision : 0
	         });
		}
	}*/

	if(data.localRecentList) {
		for(var i=0; i < data.localRecentList.length; i++) {
			arr.push(data.localRecentList[i]);
		}
	}

	if(data.recentList) {
		for(var i=0; i < data.recentList.length; i++) {
			arr.push(data.recentList[i]);
		}
	}

	if($pcOfficeData.type == 'delete') {
		var info = JSON.parse(getFileInfo());
		toastMessage(LanguagePack.TOAST_DELETESELECTEDFILE_N(info.fileInfo.length));
		$pcOfficeData.type = '';
	}

	if(type == 'recent') {
		$pcOfficeData.setJson('new_recent', arr);

		if(data.sharedFolderInfos) {
			$pcOfficeData.setJson('sharedFolderInfos', data.sharedFolderInfos);
		}

		if($('#cloud section#search_list').is(':visible')) {
			$('#search_list').searchdoc({'type' : 'ALL', 'init' : true});
		} else if($pcOfficeData.currentView == "doc_list") {
			if(JSON.stringify(arr) !== JSON.stringify($pcOfficeData.getJson('local_recent'))) {
				$pcOfficeData.setJson('local_recent', arr);
				document.getElementById('reload_local_home').click();
			}
		}
	}
}
function setUserInfo(info) {
	var data;
	if(typeof info === 'string') {
		data = JSON.parse(info);
	} else {
		data = info;
	}
	$pcOfficeData.info.fullName = data.fullName;
	$pcOfficeData.info.email = data.email;
	$pcOfficeData.info.level = data.level;
	if(data.portrait.length) {
		var img = new Image();
		img.src = data.portrait;

		img.onload = function() {
			$pcOfficeData.info.portrait = data.portrait;
			$('#pchome_userinfo').children('img').attr('src', $pcOfficeData.info.portrait);
   		};
	}
	if(typeof data.limitUsage != "undefined") {
		$pcOfficeData.info.limitUsage = data.limitUsage;
	}
	if(typeof data.currentUsage != "undefined") {
		$pcOfficeData.info.currentUsage = data.currentUsage;
	}
	if(typeof data.daysLeft != "undefined") {
		$pcOfficeData.info.daysLeft = data.daysLeft;
	}

	if($pcOfficeData.info.level == 10){
		$('.util_cloud .notice').hide();
	}
	$('p.search label').text(LanguagePack.PCHOME_DOC_SEARCH($pcOfficeData.info.level));
}

if(!Array.isArray) {
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}

function preDeleteFailLocalFile() {
	var popupMessage = new Array();

	popupMessage[0] = LanguagePack.LOCALFILE_UPLOAD_FALIL_MSG1;
	popupMessage[1] = LanguagePack.LOCALFILE_UPLOAD_FALIL_MSG2;

	var result = function(e) {
		defaultAlertCB(e);

		var info = JSON.parse(getFileInfo());
		if(!Array.isArray(info.fileInfo)) {
			var delarr = [];
			delarr.push(info.fileInfo);
			pchome_fileInfo['fileInfo'] = delarr;
		}
		$pcOfficeData.type = 'delete';
		document.getElementById('deleteLocalFile').click();
	};
	var popup = new PopupMessage(PopupType.DEFAULT, null, LanguagePack.KEYWORD_CONFIRM, {popupMessage:popupMessage}, result, defaultAlertCB, defaultAlertCB);
	popup.create();
	popup.show();
}

function IsExistLocalFile(isExist) {
	var popupMessage = new Array();
	if(isExist == 'TRUE') {
		var info = JSON.parse(getFileInfo());

		if(info.fileInfo.length > 1) {
			popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM_N(info.fileInfo.length);
		} else {
			var data = info.fileInfo[0];
			var name = data.file.fileName;
			var index = name.lastIndexOf(".");
			var type = name.substring(index + 1).toLowerCase();
			if(type == 'slide' || type == 'sheet' || type == 'word') {
				name = name.substr(0, index);
			}
			popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM(contraction(name));
		}
		popupMessage[1] = LanguagePack.LOCALFILE_DELETE;
	} else {
		popupMessage[0] = LanguagePack.LOCALFILE_UPLOAD_FALIL_MSG1;
		popupMessage[1] = LanguagePack.LOCALFILE_UPLOAD_FALIL_MSG2;
	}
	var result = function(e) {
		defaultAlertCB(e);

		var info = JSON.parse(getFileInfo());
		if(!Array.isArray(info.fileInfo)) {
			var delarr = [];
			delarr.push(info.fileInfo);
			pchome_fileInfo['fileInfo'] = delarr;
		}
		$pcOfficeData.type = 'delete';
		document.getElementById('deleteLocalFile').click();
	};

	var popup = new PopupMessage(PopupType.DEFAULT, null, LanguagePack.KEYWORD_CONFIRM, {popupMessage:popupMessage}, result, defaultAlertCB, defaultAlertCB);
	popup.create();
	popup.show();
}

function refreshTabList() {
	//$('#doc_list h2.title a.refresh').trigger('click');
	$('.pchome_recent2').trigger('click');
}

function contraction(name) {
	var str = name;
	return str;
}

function toastMessage(text, successCB) {
	var popup = $("#toastpop");
	popup.children("span").html(text);
	popup.fadeIn('fast');
	setTimeout(function(){ popup.fadeOut('slow', function() {
		if (successCB) {
			successCB();
		}
	  });},3000);
}

var toastMgsObj = {
	'show': function(_text){
		var arg = arguments;
		var popup = $("#toastpop");
		popup.children("span").html(_text);
		popup.fadeIn('fast');
		this.timer = setInterval(function (){
			if( $("#toastpop").is(":visible"))
				$("#toastpop").fadeOut("fast"); // fadeIn();
			else
				$("#toastpop").fadeIn("fast"); // fadeOut();
			}
		, 1000);
	},
	'hide': function(){
		clearInterval(this.timer);
		$("#toastpop").hide();
	}
};

function GetUserType(guestType) {
	//if(!$('body').hasClass('mac')) { // CAM-3989 Mac 게스트,오프라인 검색 비활성화
		var arr = [
				   '../../resources/js/lib/jquery.ba-hashchange.min.js',
				   '../../resources/js/lib/jquery-ui-1.9.2.custom.min.js',
				   '../../resources/js/mydoc.js'
				  ];
		loadScriptFile(arr);
		/*var head = document.getElementsByTagName("head")[0];

		for(var i=0; i< arr.length; i++) {
			var script = document.createElement("script");
			script.src = arr[i];
			script.type = 'text/javascript';
			head.appendChild(script);
		}*/
	//}

	if(isSAMode){
		$('.pchome_recent2').trigger('click');
		return;
	}

	if(guestType == '2') {
		if(isServiceMode == false)
		$('.util_cloud.fr.account li.user, .util_cloud.fr.account li.app, .util_cloud.fr.account li.notice').remove();

		$('.util_cloud.fr.guest').remove();
		$('.util_cloud.fr.account').show();
		$('#offline_guest_list').remove();

		document.getElementById('pchome_set_userinfo').click();
	} else {
	//if(guestType == '0' || guestType == '1' || (licenseInfo.isLicenseUser && isLogout)) {
		if(isServiceMode == false)
			$('.util_cloud.fr.guest li.login').remove();
		$('.util_cloud.fr.guest').show();
		$('.util_cloud.fr.account').remove();
		$('#offline_list').remove();

		if(guestType == '0') {
			document.getElementById('pc_get_trial_starttime').click();
		}
		document.getElementById('getDocumentGuide').click();
	//} else {

	}
	$pcOfficeData.info.userType = guestType;

	$('.pchome_recent2').trigger('click');

	if($('body').hasClass('sotong')) {
		$('.util_cloud .app').hide();
	}
}

function getDocumentGuide(isGuide) {
	if(isGuide == 'FALSE') {
		$('dl.floating a.open').addClass('guestinit').append('<span class="guest"><em>' + LanguagePack.GUIDE_TEMPLATE_MSG + '</em></span>');
		document.getElementById('setDocumentGuide').click();
	}
}

var trialStartTime;
function GetTrialStartTime(time) {
	trialStartTime = time;
}

function setOfficeType(type) {
	officeType = type;
	if(officeType == 'mac') {
		$('body').addClass('mac');
		$('#cloud .header ul.util_cloud .feedback').show();
		//$('#fodt, #newodt').remove();
	}
}

var changeSearchTextSize = function() {
	var width = $('#cloud .header fieldset').width();
	var removeSize = 300 + $('ul.util_cloud.fr').outerWidth();
	if($('#cloud').hasClass('templete') || $('#cloud .header').hasClass('sm')) {
		var newwidth = $(window).width() - removeSize;
		if(width != newwidth) {
			$('#cloud .header fieldset').css('width' ,  newwidth );
		}
	} else {
		$('#cloud .header fieldset').css('width' ,  'auto');
	}
}
function keyupPlaceHolderEvent(e) {};
function showLabel(seletor, show) {}
function pushStateId(id) {}

/*AOM-8195*/
/*
 * isHwpShow
 * -1 : not check, 0 : not show, 1 : show
*/
var isHwpShow = -1;
function getNativeLanguage(isKr) {
	if((isKr == 'TRUE' || LanguagePack.PCHOME_LANG == 'ko')
		&& checkFunctionEnable(pchomeVersion, 'hwp') == true) {
		isHwpShow = 1;
	} else {
		isHwpShow = 0;
	}

	var isMacOffice = (officeType == 'mac') ? true : false;
	if(!isMacOffice || (isMacOffice && ($pcOfficeData.info.level != 1 || licenseInfo.isLicenseUser))){
		$('.upgrade').hide();
	}

	if(!isHwpShow) { /*AOM-8195*/
		/* AOM-7534 */
		$('dl.floating dd a.hwp, #cloud section.templete #hwp, #cloud section.templete div.tab li .hwp, section.tree ul li.temp_hwp, .home_list div.thum dl.templates.hwp, .home_list div.templates .thum.hwp').remove();
		var removeItem = 'hwp';
		$pcOfficeData.template = jQuery.grep($pcOfficeData.template, function(value) {
			return value != removeItem;
		});
	}

	/* AOM-7534 */
	$templeteTypes = $('dl.floating dd a');
	for(var i=0; i< $templeteTypes.length; i++) {
		$templeteTypes[i].className = $templeteTypes[i].className.replace(/\bmenu_.*?\b/g, '');
		$templeteTypes.eq(i).addClass('menu_0' + ($templeteTypes.length-i));
	}

	if (typeof poProductType == 'undefined') {
		showPOProductTypeView();
	}
}

function IsEmptyNetworkSession(status) {
	if(status != '1') {
		isLogout = false; // 1 : logout, etc : etc(login)
	}
}

function GetLicenseRegistrationStatus(type) {
	if(type ==  "1") {
		setLicenseInfo({'isLicenseUser' : true});
		document.getElementById('getLicenseInfo').click();
	} else {
		setLicenseInfo({'isLicenseUser' : false});
	}
}

function GetLicenseInfo(info) {
	if(typeof info === 'string') {
		info = JSON.parse(info);
	}
	var expiredTime = 0;
	var isLicenseUser = false;
	var isImpressionsOfLicenseExpirationBanner = false;
	var poIntroduceDocTime = null;
	var isDeletedPOIntroduceDoc = 1;

	if(info.strLicenseType) {
		switch(info.strLicenseType) {
		case "A1":
		case "A2":
		case "A3":
			isLicenseUser = true;
		break;
		}
	}
	if(isLicenseUser) {
		if(parseInt(info.ImpressionsOfLicenseExpirationBanner) < 2) {
			isImpressionsOfLicenseExpirationBanner = true;
		}
		poIntroduceDocTime = info.POIntroduceDocTime;

		expiredTime = info.expiredTime;
		try {
			if(isLogout) {
				isDeletedPOIntroduceDoc = info.strWhetherDeletedPOIntroduceDoc;
			}
		} catch(err) {

		}
	}


	setLicenseInfo({
		'isLicenseUser' : isLicenseUser,
		'expiredTime' : expiredTime,
		'isImpressionsOfLicenseExpirationBanner' : isImpressionsOfLicenseExpirationBanner,
		'poIntroduceDocTime' : poIntroduceDocTime,
		'isDeletedPOIntroduceDoc' : isDeletedPOIntroduceDoc
	});
}

function setLicenseInfo(data) {
	if("isLicenseUser" in data) {
		licenseInfo.isLicenseUser = data.isLicenseUser;
	}
	if("expiredTime" in data) {
		licenseInfo.expiredTime = data.expiredTime;
	}
	if("isImpressionsOfLicenseExpirationBanner" in data) {
		licenseInfo.isImpressionsOfLicenseExpirationBanner = data.isImpressionsOfLicenseExpirationBanner;
	}
	if("poIntroduceDocTime" in data) {
		licenseInfo.poIntroduceDocTime = data.poIntroduceDocTime;
	}

	if("isDeletedPOIntroduceDoc" in data) {
		licenseInfo.isDeletedPOIntroduceDoc = data.isDeletedPOIntroduceDoc;
		if(licenseInfo.isDeletedPOIntroduceDoc == 0) {
			//sample 파일 정보 얻어오기

			var jsonData = {
					'fileId' : '11111111',
					'fileName' : 'Welcome to Polaris Office.slide',
					'myFile' : true,
					'lastAccessTime' : licenseInfo.poIntroduceDocTime,
					'file' : {
						'fileId' : '11111111',
						'fileName' : 'Welcome to Polaris Office.slide',
						'fileType' : 'FILE',
						'lastAccessTime' : licenseInfo.poIntroduceDocTime,
						'isSample' : true,
						'size' : '',
						'path' : ''
					}
			};
			licenseInfo.sampleDocumentInfo.push(jsonData);
			refreshTabList();
		}
	}
	if(officeType != 'mac'){ //#CAM-6692
		showNoti();
	}
}

//AOM-9249 licenseInfo.isLicenseUser
function showNoti() {
	var type = 'open';
	var text = '';
	var btntype = '';
	var isVisible = false;

	if(licenseInfo.isLicenseUser && licenseInfo.isImpressionsOfLicenseExpirationBanner) {
		var today = new Date();
		today.setHours(0,0,0,0);
		var expiredTime = licenseInfo.expiredTime;
		expiredTime = expiredTime.replace(/\./gi, "-");

		var endDate = new Date(expiredTime);
		endDate.setHours(0,0,0,0);
		var diff = Math.ceil((endDate.getTime() - today.getTime()) / 1000 / 60 / 60 / 24);

		if(diff < 14) {
			text = LanguagePack.EXPIRING_LICENSE_CAUTION(licenseInfo.expiredTime);
			isVisible = true;
			$pcOfficeData.coution = 'extensionLicense';
			btntype = 'extensionLicense';
			type = 'open';
		}
	}

	if(isVisible) {
		$('#caution_home').removeClass('no_btn');
		if(btntype == 'extensionLicense') {
			$('#caution_first').hide().next().show();
			$('#caution_second').attr("href",'extensionLicense').text(LanguagePack.EXPIRING_LICENSE_CAUTION_BUTTON);
		}
		$('#caution_text').html(text);
		showPopNoticeHome();
	} else {
		if($('#caution_home').length) {
			hidePopNoticeHome();
		}
	}
}

function showPopNoticeHome() {
	$('#caution_home').show();
	$('#cloud .header fieldset p.txt').hide();
}

function hidePopNoticeHome() {
	$('#caution_home').hide();
}

function checkalaram(event){
	var $noti =  $('#caution_second');

	if($noti.attr("href") == "extensionLicense") {
		//AOM-9249 licenseInfo.isLicenseUser
		if(event) {
			commonPreventEvent(event);
		}
		try {
			document.getElementById('extensionLicense').click();
		} catch(err) {}
	}
}

function closeNotiPopup(e) {
	if(e) {
		commonPreventEvent(e);
	}
	if($pcOfficeData.coution == 'extensionLicense') {
		//AOM-9249 licenseInfo.isLicenseUser
		try {
			licenseInfo.isImpressionsOfLicenseExpirationBanner = false;
			document.getElementById('close_license_expiration_banner').click();
		} catch(err) {}
	}
	showNoti();
}

function checkFunctionEnable(version, keyword) {
	if(typeof version == 'undefined' || typeof keyword == 'undefined') {
		return;
	}

	var isMacOffice = (officeType == 'mac') ? true : false;

	var convert_version = '';
	version = version.toString().split('.');
	depth = (version.length > 3) ? 3 : version.length;
	for(var i=0; i < depth; i++) {
		if(i == 0) {
			convert_version += version[i];
		} else {
			if(version[i].length == 1) {
				convert_version += ('00' + version[i]);
			} else if(version[i].length == 2) {
				convert_version += ('0' + version[i]);
			} else {
				convert_version += version[i];
			}
		}
	}
	convert_version = parseInt(convert_version);

	if(keyword == 'hwp') {
		if(isMacOffice == true) {
			if(convert_version >= 8000013) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}

function showTemplate(param) {
	$('dl.floating a.template').trigger('click', [param]); /* AOM-7534 */
}

function showTemplate2(e) {
	var param;
	if(e) {
		if(e.preventDefault) e.preventDefault();
	}
	var id = $(this).attr('class').split(' ');
	$('#cloud section.shareList#template_list section.tree li.lnb a.' + id[0]).trigger('click', ["show"]);
}

function GetPOProductType(productType){

	switch(productType){
	case '1':	// ePT_POLARIS_OFFICE = "1"
		isSAMode = true;
		poProductType = 'office';
		$('#not_office').hide();
		break;
	case '2':	// ePT_POLARIS_WORD = "2"
		isSAMode = true;
		poProductType = 'word';
		$('#not_office').show();
		$pcOfficeData.template = $pcOfficeData.wordTemplate.slice();
		break;
	case '5':	// ePT_POLARIS_ODT = "5"
		isSAMode = true;
		poProductType = 'odt';
		$('#not_office').show();
		$pcOfficeData.template = $pcOfficeData.odtTemplate.slice();
		break;
	case '10' :
		isSAMode = false;
		isTemplateMode = true;
		poProductType = 'integrated';
		$('#not_office').show();
		break;
	case '20' : // for mac 무료체험
		isSAMode = false;
		poProductType = 'mac_guest';
		$('#not_office').show();
		break;
	default:	// ePT_POLARIS_SERVICE = "0"
		isSAMode = false;
		poProductType = 'service';
		$('#not_office').show();
		break;
	}

	if(officeType == 'mac'){
		$pcOfficeData.template = $pcOfficeData.macTemplate.slice();
		showPOProductTypeView();
	} else {
		document.getElementById('getTemplateType').click();
	}
}

function getTemplateType(templateType, templates){
	if(templateType != null){
		templateType = templateType.replace(/(\s*)/g, '');
		var arr = templateType.split(',');
		$pcOfficeData.template = arr.slice();
	}

	if(templates != null){
		if(typeof templates === 'string') {
			templateList = JSON.parse(templates);
		} else {
			templateList = templates;
		}
	}

	showPOProductTypeView();
}

function showPOProductTypeView() {
	/* BI */
	var $pchomeBI = $('#pchome_main');
	if(poProductType == 'word') {
		$pchomeBI.css("background", "url(../../resources/image/Polaris/new/home_bi_pw.png)");
	} else if(poProductType == 'odt') {
		$pchomeBI.css("background", "url(../../resources/image/Polaris/new/home_bi_odt.png)");
	}
	$pchomeBI.removeClass('init');

	/* SA view */
	if (isSAMode) {
		$('.util_cloud.fr.guest').remove();
		$('.util_cloud.fr.account').remove();
		$('#offline_list').remove();
	} else if(isTemplateMode) {
		$('#offline_list').remove();
	} else {
		if(poProductType != 'mac_guest'){
			$('dl.templates.template, dl.floating a.template, div.templates.sa').remove();
			$('home_list.newtemplates dl.templates.template').remove();
		} else {
			$('#offline_list').remove();
		}

	}

	/* floating, templete */
	if(poProductType == 'odt' || poProductType == 'word' || officeType == 'mac' || poProductType == 'integrated') {
		var removeTemplates = removeArrayItems($pcOfficeData.defaultTemplate, $pcOfficeData.template);
		$.each(removeTemplates, function(index, value){
			$('dl.floating dd a.'+value).remove();
			$('#cloud section.templete #'+value).remove();
			$('#cloud section.templete div.tab li .'+value).remove();
			$('section.tree ul li.temp_'+value).remove();
			$('.home_list div.thum dl.templates.'+value).remove();
			$('.home_list div.templates .thum.'+value).remove();
		});
	}

	$templeteTypes = $('dl.floating dd a');
	for(var i=0; i< $templeteTypes.length; i++) {
		$templeteTypes[i].className = $templeteTypes[i].className.replace(/\bmenu_.*?\b/g, '');
		$templeteTypes.eq(i).addClass('menu_0' + ($templeteTypes.length-i));
	}

	/* newhomeTemplates */
	var $newhomeTemplates = $('.home_list.newtemplates .thum');
	for(var i=0; i < $pcOfficeData.template.length; i++) {
		$newhomeTemplates.children('dl.' + $pcOfficeData.template[i]).removeClass('hide');
	}

	if(poProductType == 'odt') {
		$pcOfficeData.layout.template.odtCreate();
	}

	var vlength = $newhomeTemplates.children('dl.templates:visible').length;
	if(vlength == 6) {
		$newhomeTemplates.addClass('col6');
	} else if(vlength == 5){
		$newhomeTemplates.addClass('col5');
	} else if(vlength == 4){
		$newhomeTemplates.addClass('col4');
	} else if(vlength == 3){
		$newhomeTemplates.addClass('col3');
	}

	$newhomeTemplates.removeClass('hide');
}

function removeArrayItems(array, removeItems) {
	var result = $.grep(array, function(value) {
					return ($.inArray(value, removeItems) == -1);
				 });
	return result;
}

function templateBlankClick(e) {
	commonPreventEvent(e);
	var $this = getSeletor(e);
	if(!$this.is('dl')) {
		$this = $this.closest('dl');
	}
	var id = $this.attr('id');

	if(id == "blank_word" || id == "newword" || id == "fword") {
		newDocumentOpen("word");
	} else if(id == "blank_sheet" || id == "newsheet" || id == "fsheet") {
		newDocumentOpen("sheet");
	} else if(id == "blank_slide" || id == "newslide" || id == "fslide") {
		newDocumentOpen("slide");
	} else if(id == "blank_hwp" || id == "newhwp" || id == "fhwp") {
		newDocumentOpen("hwp");
	} else if(id == "blank_odt" || id == "newodt" || id == "fodt") {
		newDocumentOpen("odt");
	}
}

function newDocumentOpen(docType) {
	if(docType == "hwp" &&  officeType == 'mac' && $pcOfficeData.info.level == 1 && !licenseInfo.isLicenseUser){
		// CAM-5103 [Web] HWP 유료 시나리오를 적용합니다.
		//$('#machome_hwp_check').trigger('click');
		var popupMessage = new Array();
		popupMessage[0] = LanguagePack.OFFLINE_MSG;
		var popup = new PopupMessage(PopupType.DEFAULT, ButtonType.CONFIRM, null, {popupMessage:popupMessage}, defaultAlertCB, defaultAlertCB, defaultAlertCB);
		popup.create();
		popup.show();
		return;
	}

	document.getElementById('pchomeoff_' + docType).click();

	$('dl.floating a.close').trigger('click');
}

function pchome(e) {
	commonPreventEvent(e);

	var e = e || window.event;
	var target = e.target || e.srcElement;

	var type = null;
	if(target.className != "") {
		var classNames = target.className.split(' ');
		for(var i=0; i < classNames.length; i++) {
			if(classNames[i].lastIndexOf("menu") == -1 && classNames[i].lastIndexOf("more") == -1) {
				type = classNames[i];
				break;
			}
		}
	}

	if(type == "hwp"
		|| type == "slide"
		|| type == "sheet"
		|| type == "word"
		|| type == "odt") {
		newDocumentOpen(type);
	}
}

function GetGovernmentType(nType) {
	if(nType == '1'){
		isSotongOffice = true;
		$('body').addClass('sotong');
	}
}

function loadScriptFile(arr){
	var head = document.getElementsByTagName("head")[0];

	for(var i=0; i< arr.length; i++) {
		var script = document.createElement("script");
		script.src = arr[i];
		script.type = 'text/javascript';
		head.appendChild(script);
	}
}

function getServiceType(isService){
	isServiceMode = isService;
}

function testLocalFile(type) {
	//pc office web test code 추가
	var test =  {
			'localRecentList' : [
			                     {
			                    	 file : {
			                    		 cloudType : 'GD',
			                    		 cpoid : '25329af5e9384895a91428528b54da64',
			                    		 deletedTime : 0,
			                    		 extFileid : '0B5QIaV23CJ4QUTdCMmtpVkVvUGs',
			                    		 fileId : '',
			                    		 fileName : '구글 문서.txt',
			                    		 fileRevision : 0,
			                    		 fileType : 'File',
			                    		 path : 'Google Drive(송경식)',
			                    		 lastAccessTime : 0,
			                    		 lastModified : 0,
			                    		 lastModifiedRevision : 0,
			                    		 lastRevision : 0
			                    	 },
			                    	 cloudType : 'GD',
			                    	 cpoid : '25329af5e9384895a91428528b54da64',
			                    	 deletedTime : 0,
			                    	 extFileid : '0B5QIaV23CJ4QUTdCMmtpVkVvUGs',
			                    	 fileId : '',
			                    	 fileName : '구글 문서.txt',
			                    	 fileRevision : 0,
			                    	 myFile : true,
			                    	 fileType : 'File',
			                    	 path : 'Google Drive(송경식)',
			                    	 lastAccessTime : 0,
			                    	 lastModified : 0,
			                    	 lastModifiedRevision : 0,
			                    	 lastRevision : 0
			                     },
			                     {
			                    	 file : {
			                    		 cloudType : 'DB',
			                    		 cpoid : '8f1cfcb668c04287ba42a9ce4a7f8ca8',
			                    		 deletedTime : 0,
			                    		 extFileid : 'id:RvlWp-FFgI4AAAAAAAAAYg',
			                    		 fileId : '',
			                    		 fileName : '드랍박스 문서.txt',
			                    		 fileRevision : 0,
			                    		 fileType : 'File',
			                    		 path : 'Drobox(송경식) > 1.4 > 5',
			                    		 lastAccessTime : 0,
			                    		 lastModified : 0,
			                    		 lastModifiedRevision : 0,
			                    		 lastRevision : 0,
										 shared : true
			                    	 },
			                    	 cloudType : 'DB',
			                    	 cpoid : '8f1cfcb668c04287ba42a9ce4a7f8ca8',
			                    	 deletedTime : 0,
			                    	 extFileid : 'id:RvlWp-FFgI4AAAAAAAAAYg',
			                    	 fileId : '',
			                    	 fileName : '드랍박스 문서.txt',
			                    	 fileRevision : 0,
			                    	 myFile : true,
			                    	 lastAccessTime : 0,
			                    	 lastModified : 0,
			                    	 lastModifiedRevision : 0,
			                    	 lastRevision : 0,
									 shared : true
			                     },
			                     {
			                    	 file : {
			                    		 deletedTime : 0,
			                    		 fileId : '',
			                    		 fileName : '로컬 문서.txt',
			                    		 fileRevision : 0,
			                    		 fileType : 'File',
			                    		 path : 'c:\\User\\bakira7\\Downloads',
			                    		 lastAccessTime : 0,
			                    		 lastModified : 0,
			                    		 lastModifiedRevision : 0,
			                    		 lastRevision : 0
			                    	 },
			                    	 deletedTime : 0,
			                    	 fileId : '',
			                    	 fileName : '로컬 문서.txt',
			                    	 fileRevision : 0,
			                    	 myFile : true,
			                    	 lastAccessTime : 0,
			                    	 lastModified : 0,
			                    	 lastModifiedRevision : 0,
			                    	 lastRevision : 0
			                     }
			                     ],
			                     'recentList' : [
			                                    /* {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '1111',
			                                    		 fileName : '내 문서.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '1111',
			                                    	 fileName : '문서.txt',
			                                    	 fileRevision : 0,
			                                    	 myFile : true,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
			                                     {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '22222',
			                                    		 fileName : '남 문서.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '22222',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '33333',
			                                    		 fileName : '내 문서2.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '33333',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '44444',
			                                    		 fileName : '남 문서2.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '44444',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     }, */
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '55555',
			                                    		 fileName : '내 문서3.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '55555',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '66666',
			                                    		 fileName : '남 문서3.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '66666',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '77777',
			                                    		 fileName : '내 문서4.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '77777',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '88888',
			                                    		 fileName : '남 문서4.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '88888',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     },
												 {
			                                    	 file : {
			                                    		 deletedTime : 0,
			                                    		 fileId : '99999',
			                                    		 fileName : '남 문서5.txt',
			                                    		 fileRevision : 0,
			                                    		 fileType : 'File',
			                                    		 path : "PATH://drive/test/",
			                                    		 lastAccessTime : 0,
			                                    		 lastModified : 0,
			                                    		 lastModifiedRevision : 0,
			                                    		 lastRevision : 0
			                                    	 },
			                                    	 deletedTime : 0,
			                                    	 fileId : '99999',
			                                    	 fileName : 'testx.odt',
			                                    	 fileRevision : 0,
			                                    	 myFile : false,
			                                    	 lastAccessTime : 0,
			                                    	 lastModified : 0,
			                                    	 lastModifiedRevision : 0,
			                                    	 lastRevision : 0
			                                     }
			                                     ],
			                                     'sharedFolderInfos' : [],
												 'templateList' : [
												 {
													 documentType : 'word',
													 language : 'ko',
													 name : 'wordtemp',
													 imagePath : '../../resources/image/Polaris/new/temp/149.png'
												 },
												 												 {
													 documentType : 'slide',
													 language : 'ko',
													 name : 'slidetemp',
													 imagePath : '../../resources/image/Polaris/new/temp/149.png'
												 },
												 												 {
													 documentType : 'sheet',
													 language : 'ko',
													 name : 'sheettemp',
													 imagePath : '../../resources/image/Polaris/new/temp/149.png'
												 },
												 												 {
													 documentType : 'odt',
													 language : 'ko',
													 name : 'odttemp',
													 imagePath : '../../resources/image/Polaris/new/temp/149.png'
												 },
												 												 {
													 documentType : 'hwp',
													 language : 'ko',
													 name : 'hwptemp',
													 imagePath : '../../resources/image/Polaris/new/temp/149.png'
												 }
												]
	};

	var testTemplate = {
			   "slide" : [
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Business Plan 1.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Business Plan 1.png",
			                 "index" : 4,
			                 "name" : "Business Plan 1"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Business Plan 2.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Business Plan 2.png",
			                 "index" : 5,
			                 "name" : "Business Plan 2"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Business Plan 3.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Business Plan 3.png",
			                 "index" : 6,
			                 "name" : "Business Plan 3"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Chart style.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Chart style.png",
			                 "index" : 7,
			                 "name" : "Chart style"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Interior.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Interior.png",
			                 "index" : 8,
			                 "name" : "Interior"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Marketing.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Marketing.png",
			                 "index" : 9,
			                 "name" : "Marketing"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Process.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Process.png",
			                 "index" : 10,
			                 "name" : "Process"
			              },
			              {
			                 "documentType" : "slide",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\kor\\Proposal.pptx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\slide\\Proposal.png",
			                 "index" : 11,
			                 "name" : "Proposal"
			              }
			           ],
			           "word" : [
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Flyer.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Flyer.png",
			                 "index" : 1,
			                 "name" : "Flyer"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Invitation 1.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Invitation 1.png",
			                 "index" : 2,
			                 "name" : "Invitation 1"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Invitation 2.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Invitation 2.png",
			                 "index" : 3,
			                 "name" : "Invitation 2"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Invitation 3.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Invitation 3.png",
			                 "index" : 4,
			                 "name" : "Invitation 3"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Letter 1.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Letter 1.png",
			                 "index" : 5,
			                 "name" : "Letter 1"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Letter 2.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Letter 2.png",
			                 "index" : 6,
			                 "name" : "Letter 2"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Minutes.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Minutes.png",
			                 "index" : 7,
			                 "name" : "Minutes"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Newsletter.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Newsletter.png",
			                 "index" : 8,
			                 "name" : "Newsletter"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Official document.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Official document.png",
			                 "index" : 9,
			                 "name" : "Official document"
			              },
			              {
			                 "documentType" : "word",
			                 "filePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Poster.docx",
			                 "imagePath" : "C:\\Office2016(Service)\\Binary\\POTemplate\\docx\\Poster.png",
			                 "index" : 10,
			                 "name" : "Poster"
			              }
			           ]
			        }


	if(type == 1) {
		GetUserType("0");
		getNativeLanguage("FALSE");
		GetTrialStartTime(new Date().getTime());
	} else if(type == 2) {
		GetUserType("0");
		getNativeLanguage("TRUE");
		GetTrialStartTime(new Date().getTime());
	} else if(type == 3) {
		GetUserType("1");
		getNativeLanguage("TRUE");
	} else if(type == 4) {
		GetUserType("1");
		getNativeLanguage("FALSE");
	} else if(type == 5) {
		GetUserType("2");
		getNativeLanguage("TRUE");
	} else if(type == 6) {
		GetUserType("2");
		getNativeLanguage("FALSE");
	} else if(type == 7){
		GetPOProductType("0");
		GetUserType("2");
		getNativeLanguage("TRUE");
	} else if(type == 8){
		GetPOProductType("1");
		GetUserType("0");
		getNativeLanguage("TRUE");
	} else if(type == 9){ // word only
		GetPOProductType("2");
		GetUserType("0");
		getTemplateType("full, word, odt,hwp", testTemplate);
		getNativeLanguage("TRUE");
	} else if(type == 10){
		GetPOProductType("3");
		GetUserType("2");
		getNativeLanguage("TRUE");
	} else if(type == 11){
		GetPOProductType("10");
		getServiceType('1');
		GetUserType("1");
		getTemplateType("full, slide, sheet, odt,hwp", testTemplate);
		getNativeLanguage("TRUE");

	} else if (type == 12){
		GetPOProductType("5");
		getTemplateType();
		getNativeLanguage("TRUE");

	} else {
		setOfficeType('mac');
		GetPOProductType('20');


		GetLicenseRegistrationStatus(1);
		GetLicenseInfo({"expiredTime":"2017.06.29", "ImpressionsOfLicenseExpirationBanner":"0", "POIntroduceDocTime":"1496296119", "strWhetherDeletedPOIntroduceDoc":"0", "strLicenseType":"A3"});
		GetUserType('0');
		GetTrialStartTime(1496299976);
		getDocumentGuide(true);
		setVersion('8.0.44.0');
		getNativeLanguage(true);

//		GetPOProductType('1');
//		setOfficeType('mac');
//
//		GetUserType("0");
//		getNativeLanguage("TRUE");
//		GetLicenseInfo({
//			'ImpressionsOfLicenseExpirationBanner' : 1,
//			'strLicenseType' : 'A1',
//			'POIntroduceDocTime' : '1473490493',
//			'strWhetherDeletedPOIntroduceDoc' : 0,
//			'expiredTime' : '2016.09.12'
//			});
	}

	setListFromLocal('recent', JSON.stringify(test));

	$("#pchomeoff_doc").bind('click', function(e) {
		alert('pchomeoff_doc');
	});

	$("#pchome_file_path").bind('click', function(e) {
		alert('pchome_file_path');
	});

	$("#pchome_loginType1").bind('click', function(e) {
		alert('pchome_loginType1');
	});

}

// $('#cloud section.shareList section.tree li.lnb.temp_slide').append('<img src="../../resources/image/Polaris/new/ic_new.png" style="position:relative;top:2px;">')

$(function() {
	var common = {
			'initSearch' : function(type) {
				var text = $('#search').val();
				if(text){
					$('#search').val("");
					$('a.del').hide();
					showLabel($('p.search label'), true);
				}
			},
			'showRecentList': function(id){
				$('div.try_search').hide();
				switch(id) {
				case 'doc_list':
					common.initSearch('doc');
					$('#search_list, #template_list, #search_template, #mydoc, #shared_list, #star_list').hide();
					$('#homeList').show();
					$('#cloud .header ul.util_cloud li.open').show();
					$('body').css('overflow-y','scroll');
					break;
				case 'search_list':
					$('#cloud').addClass('templete');
					$('#homeList, #template_list, #search_template, #mydoc, #shared_list, #star_list').hide();
					$('#search_list').show();
					$('body').css('overflow-y','hidden');
					break;
				case 'mydoc':
					common.initSearch('doc');
					$('#cloud').addClass('templete');
					$('#homeList, #search_list, #template_list, #search_template, #shared_list, #star_list').hide();
					$('#mydoc').show();
					$('body').css('overflow-y','hidden');
					break;
				case 'search_template':
					$('#homeList, #search_list, #template_list, #mydoc, #shared_list, #star_list').hide();
					$('#cloud .header ul.util_cloud li.open').show();
					$('#search_template').show();
					break;
				case 'template_list':
					$pcOfficeData.currentView = 'template_list';
					common.initSearch('template');
					$('#cloud').addClass('templete');
					$('#homeList, #search_list, #search_template, #mydoc, #shared_list, #star_list').hide();
					$('#template_list').show();
					$('#cloud .header ul.util_cloud li.open').show();
					$('body').css('overflow-y','hidden');
					$('div.inApp').hide();
					break;
				}
				$(window).scrollTop(0);
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
			}
	}
	/*pushstatus */
	if(history.pushState) {
		window.onpopstate = function(event) {
			if(event.state != null) {
				var id = event.state.container;
				if(id) {
					console.log(id);
					if(id == 'h') {
						if($('#search_btn').hasClass('template')) {
							$('section#search_template').hide();
						} else {
							$('section#search_list').hide();
							$('#cloud section.cloud_contents').removeClass('sm');
						}
						$('#cloud .header').removeClass('sm searchResult');
						$pcOfficeData.homeText = [];
						common.showRecentList('doc_list');
						changeSearchTextSize();
						
						refreshTabList();
					} else if(id== 'k_s') {
						
						common.initSearch('doc');
						if(!$('#cloud .header').hasClass('searchResult')) {
							 $('#cloud .header').addClass('searchResult');
							 $('section.cloud_contents').children().hide();
							 
							$('#pchome_open2').hide();
						}
						$('#search_list').show();
						$('#cloud').addClass('templete');	
						$('#pchome_open2').hide();
						changeSearchTextSize();
					} else if(id == 'te') {
						$('#cloud .header fieldset p.txt').hide();
						if($('#search_btn').hasClass('template')) {
							$('section#search_template').hide();
						} else {
							$('section#search_list').hide();
							$('#cloud section.cloud_contents').removeClass('sm');
						}
						$('#cloud .header').removeClass('sm searchResult');
						$('dl.floating a.close').trigger('click');
						common.showRecentList('template_list');
						changeSearchTextSize();
						//템플릿 리스트 가져오기??
					} else if(id== 'k_te') {
						common.initSearch('template');
						if(!$('#cloud .header').hasClass('searchResult')) {
							 $('#cloud .header').addClass('searchResult');
							 $('section.cloud_contents').children().hide();
						}
						$('#template_list').show();
						changeSearchTextSize();
					}
				}
			}
		};
	} else {
		$(window).hashchange();
		var push = false;
		History.prototype.pushState = function(dataObject, key, value) {
			var title = document.title;
			location.hash = value;
			document.title = title;
			push = true;
			checkURL = location.hash;
		};
		$(window).hashchange(function() {
			if(push) {
				push = false;
				return;
			}
			var id = location.hash.split("#")[1];
			if(id) {
				console.log(id);
				if(id == 'h') {
					if($('#search_btn').hasClass('template')) {
						$('section#search_template').hide();
					} else {
						$('section#search_list').hide();
						$('#cloud section.cloud_contents').removeClass('sm');
					}
					$('#cloud .header').removeClass('sm searchResult');
					$pcOfficeData.homeText = [];
					
					common.showRecentList('doc_list');
					changeSearchTextSize();
					
					refreshTabList();
				} else if(id== 'k_s') {
					
					common.initSearch('doc');
					if(!$('#cloud .header').hasClass('searchResult')) {
						 $('#cloud .header').addClass('searchResult');
						 $('section.cloud_contents').children().hide();
					}
					$('#search_list').show();
					$('#cloud').addClass('templete');	
					changeSearchTextSize();
				}
			}
		});
	}
	
	$('p.search').before('<a href="#" class="btn_prev">' + LanguagePack.PREVPAGE + '</a>');
	$('p.search label').text(LanguagePack.PCHOME_DOC_SEARCH_ORANGEPRO);
	$('a.btn_prev').live('click',function(e){
		commonPreventEvent(e); 
		history.back();
	});
	
	pushStateId('h');
	
	$('#search_btn').unbind();
	$('#search').unbind();
	
	var searchString = '<section id="search_list" class="shareList init" style="display:none;">'            
		+ '<section class="tree" style="display:">'
			+ '<dl class="tree_folder">'
			+ '<dt></dt>'
			+ '<dd id="tree">' 
				+ '<table><tbody>'
				+ '<tr><td><ul>'
					+  '<li class="lnb search full on"><a href="#" onclick="showSearchdocList(event, \'ALL\');">' + LanguagePack.ALL + '</a></li>' 
					/*+  '<li class="lnb search folder"><a href="#" onclick="showSearchdocList(event, \'folderName\');">' + LanguagePack.KEYWORD_FOLDER + '</a></li>' */
				+ '</ul></td></tr>' 
				+ '</tbody></table>' 
			+  '</dd>' 
			+ '</dl>' 
		+ '</section>' 
		+ '<div class="resize"></div>' 
		+ '<section class="share_list search_result">' 
			+ '<section class="share_header">' 
				+ '<div class="location_box">' 
					+ '<h3><em></em></h3> ' 
					+ '<ul class="btn">' 
						+ '<li class="context_menu" style="display:none;">' 
							+ '<a class="open" href="#" style="display: none;">' + LanguagePack.OPEN + '</a>' 
							+ '<a class="delete" href="#" style="display: block;">' + LanguagePack.KEYWORD_DELETE + '</a>' 
						+ '</li>' 
						+ '<li class="context_menu_more more2" style="">' 
							+ '<a href="#" class="sort" title="' + LanguagePack.SORT + '">' + LanguagePack.SORT_TIME + '</a>' 
							+ '<div class="context_menu orderby">'           	
								+ '<ul>' 
									+ '<li class="type pointer"><a href="#">' + LanguagePack.SORT_TYPE + '</a></li>' 
									+ '<li class="name pointer"><a href="#">' + LanguagePack.SORT_NAME + '</a></li>' 
									+ '<li class="time pointer"><a href="#" class="on desc">' + LanguagePack.SORT_TIME + '</a></li>' 
									+ '<li class="size pointer"><a href="#">' + LanguagePack.SORT_SIZE + '</a></li>' 
								+ '</ul>'  
							+ '</div>' 
						+ '</li>' 
					+ '</ul>' 
				+ '</div>' 
			+ '</section>' 
			+ '<div class="list">' 
				+ '<div class="list_box nodata">' 
				+ '<section class="loading" style="display:none">' 
					+ '<div class="loading"></div>'   
				+ '</section>' 
				+ '<section class="no_doc" style="">' 
					+ '<dl>' 
						+ '<dt>' + LanguagePack.KEYWORD_NOSEARCHRESULT + '</dt>' 
						+ '<dd></dd>' 
					+ '</dl>' 
				+ '</section>' 
				+ '<div class="ul_list" id="selectable_search">' 
					+ '<table><colgroup><col style="width: 93px;"><col style="width:auto"></colgroup></table>' 
				+ '</div>' 
			+ '</div>' 
		+ '</section></section>';
	
	$('.cloud_contents').append(searchString);
	
	$('#search').keyup(function(e) {
		commonPreventEvent(e);

		var text = $(this).val();
		text = text.replace(/^\s*|\s*$/g, "");
		var direct = false;
		var type = 's';
		if($('#search_btn').attr('class') == 'template') {
			type = 't';
		}

		switch(e.which) 
		{
		case 13: // [enter]	
			direct = true;
			break;
		default:
			break;
		}
		if(text.length) {
			$('#cloud .header fieldset p.search a.del').show();
			if(direct) {
				$pcOfficeData.searchText = text;
				$('#cloud').addClass('templete');	
					if(type == 's') {
						pushStateId('k_s');
					if(!$('#cloud .header').hasClass('searchResult')) {
						$('#cloud .header fieldset p.txt').hide();
						$('#cloud .header').addClass('searchResult');
						$('section.cloud_contents').children().hide();
						$('#cloud .header ul.util_cloud li.open').hide();
						
						$('#search_list').searchdoc({'type' : 'ALL', 'keyword' : text, 'changeLayout' : true});
					} else {
						$('#search_list').searchdoc({'keyword' : text, 'changeLayout' : true});
					}
					$('#search_list').show();
				} else {
					if(!$('#cloud .header').hasClass('searchResult')) {
						$('#cloud .header').addClass('searchResult');
					}
					$('#template_list').show();
					pushStateId('k_te');
					$('#cloud .header fieldset p.search a.del').addClass('loading');
					$('#search_template').searchTemplate();
				}

				
				changeSearchTextSize();
			} 
		} else {
			$('#cloud .header fieldset p.search a.del').hide();
		}

	});
	
	$('#search_btn').bind('click',function(e) {
		if(e.preventDefault) e.preventDefault();

		var $this = $(this);
		var $input = $this.parent().find('input');
		var text = $input.val().replace(/^\s*|\s*$/g, "");

		if(text == "")
			return;

		$pcOfficeData.searchText = text;
		
		$('#cloud').addClass('templete');	
		
		if($this.attr('class') == 'template') {
			if(!$('#cloud .header').hasClass('searchResult')) {
				$('#cloud .header').addClass('searchResult');
			}
			pushStateId('k_te');
			$('#cloud .header fieldset p.search a.del').addClass('loading');
			$('#search_template').searchTemplate();
		} else {
			pushStateId('k_s');
			if(!$('#cloud .header').hasClass('searchResult')) {
				$('#cloud .header fieldset p.txt').hide();
				$('#cloud .header').addClass('searchResult');
				$('section.cloud_contents').children().hide();
				$('#cloud .header ul.util_cloud li.open').hide();
				$('#search_list').searchdoc({'type' : 'ALL', 'keyword' : text, 'changeLayout' : true});
			} else {
				$('#search_list').searchdoc({'keyword' : text, 'changeLayout' : true});
			}
			$('#search_list').show();
		}

		changeSearchTextSize();
	});
	
	$('#search').bind("keyup", keyupPlaceHolderEvent);
	
	$('#search').bind('focus click', function(e) {
		if($('#cloud .header').hasClass('searchResult')) {
			return;
		}
		if($('#cloud .header').hasClass('searchResult')){
			
		} else {
			$('body').trigger('click');
		}
		
		changeSearchTextSize();
	});
});

function keyupPlaceHolderEvent(e) {
	var current = $(this);
	var text = "" + current.val();
	if(text.length == 0) {
		showLabel(current.prev(), true);
	} else {
		showLabel(current.prev(), false);
	}
}

function showLabel(seletor, show) {
	if (show) {
		seletor.removeClass("off");
	} else {
		seletor.addClass("off");
	}
}

var pushTimer = null;
var currentView;
function pushStateId(id) {
	if(pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
	pushTimer = setTimeout(function() {
		if (("#" + id) != document.location.hash) {
	    	if(history.pushState) {
	    		var containerObject = {
	    				container : id
	    		};
	    		var guideAddExtCloud = false;
	    		if (document.location.hash.search('#guideAddExtCloud=true') !== -1 )
	    			guideAddExtCloud = true;
	    		window.history.pushState(containerObject, "title", "#" + id);
	    		if (guideAddExtCloud) {
	    			window.history.pushState(containerObject, 'title', '#guideAddExtCloud=true');
	    		}
	    	}
	    }
		pushTimer = null;
	},100);
}
/// searchdoc start
(function($) {
	var searchdoc = {
		'init' : function(options) {
			$('div.try_search').hide();
			var settings;
			var $this = this; 
			var isChangeSearchType = false;
			if(!$this.length) {
				return;
			}
			if($this.hasClass('init')) { 
				var treefileobj = $('#cloud section#search_list .list_box .box_inner .ul_list');
				if(isPCHOME) treefileobj = $('#cloud section#search_list .list_box .ul_list');
				settings = $.extend({ 
					'selector' : {
						'context' : null,
						'treefile' : treefileobj,
						'checkedAll' : $('#cloud section#search_list .list ul.subject li.form input'),
						'btn' : $('#cloud section#search_list .share_header ul.btn li.context_menu'),
						'searchResult' :  $('#cloud section.shareList#search_list .share_header h3'),
						'tab' : $('#cloud section.shareList#search_list section.tree ul'),
						'loading' : $('#cloud .header fieldset p.search a.del'),
						'loading2' : $('#cloud section#search_list .list_box .box_inner section.loading'),
						'header' : $('#cloud section#search_list .list ul.subject'),
						'btn_more2' : $('#cloud section#search_list .share_header ul.btn li.context_menu_more.more2'),
					},
					'changeLayout' : true,
					'lodingTrueCheck' : true,
					'order' : {
						'type' : '',
						'reverse' : 0
					},
					'rsort' : {
						'type' : '',
						'reverse' : ''
					},
					'searchList' : [],
					'tmpList': [],
					'selectInfo' : [],
					'localInfo' : [],
					'requestcount' : 0, 
					'type' : null,
					'keyword' : null,
					'startPage': 0,
					'resultCount': 20,
					'searchOrderBy' : -1,
					}, options); 
				 
				var handle = {
						'createFile' 	: layout.treeFile.createFile,
						'changeLayout'  : layout.changeLayout,
						'fileSelect' 	: layout.treeFile.select,
						'createContext' : layout.treeFile.createContext,
						'remove'        : layout.treeFile.remove  
				};
				settings.handle = $.extend(settings.handle, handle);
				
				$this.data('settings', settings);
				$this.removeClass('init'); 
				settings.handle.createContext.apply($this);
				settings.selector.loading2.children('.loading').text(LanguagePack.LOADING);
				
				$("#selectable_search").selectable({
//				    filter: 'ul',
					cancel: 'ul,#Cooperation',
				    distance: 30,
				    start: function(event, ui) {
				    	$('body').trigger('click');
				    	var $root = $this;
				    	var settings = $root.data('settings');
				    	var data2 = {
				    			'lists' : settings.selector.treefile.find('tr'),
								'type' : 'ALL',
								'checked' : false
						}
						settings.handle.fileSelect.apply($root, [data2]);
						settings.selectInfo = [];
						isStart = true;
				    },
				    stop : function(event, ui) {
				    	$('body').trigger('click');
				    	
				    	var $root = $this;
				    	var settings = $root.data('settings');
						
				    	if(settings.selector.treefile.find('tr.ui-selected').length) {
				    		var data = {
			    					'list' : settings.selector.treefile.find('tr.ui-selected'),
			    					'type' : 'ADD',
			    					'checked' : true
			    			};
			    			settings.handle.fileSelect.apply($root, [data]);
				    	}
				    }
				});

			}  else {
				settings = $this.data('settings');
				if(options) {
					if(settings.type != options.type)
						isChangeSearchType = true;
					
					if((options.changeLayout || settings.type == options.type) && settings.keyword == options.keyword && settings.requestcount) {
						return;
					} else {
						settings.requestcount = 0;
					}
				}
				
				settings = $.extend(settings, options);
				settings.startPage = 0;
				settings.resultCount = 20;
				settings.searchList = [];
				settings.tmpList = [];
			}
			if(options && (options.init || options.keyword)) {
				settings.selectInfo = [];
				settings.selector.treefile.find('tr').remove();
				settings.selector.treefile.parent().children('.no_doc').hide();
				settings.selector.treefile.parent().children('.limited').hide();
			}
			if(settings.changeLayout) {
				settings.selector.loading.addClass('loading');
			}
			settings.selector.btn_more2.children('.context_menu.orderby').children('ul').children('li.score, li.owner').remove();
			
			var getsearchOrderBy = settings.searchOrderBy;
			
			if( getsearchOrderBy == -1 || isChangeSearchType ){
				$this.searchdoc('initSort');
			}
			
			settings.selector.tab.children('.on').removeClass('on');
			if(settings.type == 'ALL') {
				settings.selector.tab.children('.search.full').addClass('on');
			} /*else if(settings.type == 'folderName') { AOM-8695 요구 사항 삭제로 인한 주석 처리
				webData['obj'].el = 'Body';
				settings.selector.tab.children('.search.folder').addClass('on');
			}*/
			jsonReceive.searchfile.onSuccessCB($pcOfficeData.getJson('new_recent'), $pcOfficeData.getJson('sharedFolderInfos'), $this, settings.keyword, settings.type);
		},
		'checkAll' : function(checked) {
			var $this = $(this);
			if($this.hasClass('init')) {
				return;
			}
			var settings = $this.data('settings');
			var data = {
					'lists' : settings.selector.treefile.find('tr'),
					'type' : 'ALL',
					'checked' : checked
			}
			settings.handle.fileSelect.apply($this, [data]);
		},
		'setSort' : function(type, reverse) {
			var $this = $(this);
			if($this.hasClass('init')) {
				return;
			}
			var settings = $this.data('settings');
			settings.order.type = type;
			settings.order.reverse = reverse;
			
			var sort = { 'type' : settings.order.type, 'reverse' : settings.order.reverse};
			arr2 = common.sort(sort, settings.searchList);
			settings.handle.createFile.apply($this, [arr2]);
		},
		'initSort' : function() {
			var $this = $(this);
			if($this.hasClass('init')) {
				return;
			}
			var settings = $this.data('settings');
			settings.order.type = '';
			settings.order.reverse = 0;
			settings.rsort.type = '';
			settings.rsort.reverse = '';
			
			if(settings.type == 'ALL') {
				settings.order.type = 'time';
				settings.order.reverse = 0;
				settings.rsort.type = 'time';
				settings.rsort.reverse = 'desc';	
			} /*else if(settings.type == 'folderName') { AOM-8695 요구 사항 삭제로 인한 주석 처리
				settings.order.type = 'name';
				settings.rsort.type = 'name';
				settings.rsort.reverse = 'asc';	
			} 	*/	
			if(settings.order.type != '') {
				settings.selector.btn_more2.children('.context_menu.orderby').children('ul').children('li').children('a').removeAttr('Class');
				var $sort = settings.selector.btn_more2.children('.context_menu.orderby').children('ul').children('li.' + settings.order.type);
				var text = $sort.text();
				$sort.children('a').addClass('on ' + settings.rsort.reverse);
				settings.selector.btn_more2.children('a').text(text);
				/*if(settings.type == 'folderName') { AOM-8695 요구 사항 삭제로 인한 주석 처리
					$sort.parent().children('li').hide();
					$sort.show();
				} else */if(settings.type == 'ALL') {
					$sort.parent().children('li').show();
				} 
			}
		},
		'setOrderBy' : function(_this, index) {
			var $this = _this; // anchor
			var $searchdoc =  $('#search_list');
			var settings = $searchdoc.data('settings');
			var initOrders = [
				{'order': 'asc', 'type': 'type', 'tobe': 'desc', 'log_El' : 'SortType'}
				,{'order': 'asc', 'type': 'name', 'tobe': 'desc', 'log_El' : 'SortName'}
				,{'order': 'desc', 'type': 'time', 'tobe': 'asc', 'log_El' : 'SortTime'}
				,{'order': 'desc', 'type': 'size', 'tobe': 'asc', 'log_El' : 'SortSize'}
				,{'order': 'asc', 'type': 'owner', 'tobe': 'desc', 'log_El' : 'SortOwner'}
				,{'order': 'desc', 'type': 'score', 'tobe': 'asc', 'log_El' : 'SortScore'}
			]
			var $li = _this.parent();
			for(var i=0; i < initOrders.length; i++) {
				if($li.hasClass(initOrders[i].type)) {
					index = i;
					break;
				}
			}
			
			//AOM-6088
			settings.searchOrderBy = index;
			
			var type = initOrders[index].type;
			var orderby = initOrders[index].order;
			var reverse = 0;
			if($this.hasClass('on')) {
				if($this.hasClass(orderby)) {
					$this.removeClass(orderby);
					orderby = initOrders[index].tobe;
				} else {
					$this.removeClass(initOrders[index].tobe);
				}
				$this.addClass(orderby);
			} else {
				$this.addClass('on').addClass(orderby);
			}
			if(orderby=='asc') {
				reverse = 1;
			}
			$this.parent().siblings().children('a').removeAttr('class');
			// $this.addClass('on').addClass(orderby);
			settings.order.type = type;
			settings.order.reverse = reverse;
			
			settings.rsort.type = type;
			settings.rsort.reverse = orderby;
			
			var $sort = settings.selector.btn_more2.children('.context_menu.orderby').children('ul').children('li.' + settings.order.type);
			var text = $sort.text();
			settings.selector.btn_more2.children('a').text(text);

			var sort = { 'type' : settings.order.type, 'reverse' : settings.order.reverse};
			arr2 = common.sort(sort, settings.searchList);
			settings.selector.treefile.find('tr').remove();
			settings.handle.createFile.apply($('#search_list'), [arr2]);
		},
		'remove' : function(updateArr) {
			var $this = $(this);
			if($this.hasClass('init')) {
				return;
			}
			var settings = $this.data('settings');
			settings.handle.remove.apply($this, [updateArr]);
			
			var parent;
			var change = false; 
			var index; 
			
			for(var i=0; i< updateArr.length; i++) {
				var data = updateArr[i];
				for(var j = 0; j < settings.workList.length; j++) {
					if(data.id == settings.workList[j].id) {
						settings.workList.splice(j, 1);
						break;
					}
				}
			}
		},
		'changecontext' : function() {
			var $this = $(this);
			if($this.hasClass('init')) {
				return;
			}
			var settings = $this.data('settings');
			var $listbox; 
			if(settings.selector.treefile.hasClass('ul_list')) {
				if(isPCHOME){
  					$listbox = settings.selector.treefile.parent();
  				}else{
  					$listbox = settings.selector.treefile.parent().parent();
  				}
			} else {
				$listbox = settings.selector.treefile;
			}
			var left = parseInt(settings.selector.context.css('left'));
			var right = parseInt(settings.selector.context.css('right'));
			var external = 0;
			var width = settings.selector.context.width();
			
			if(typeof rtl != 'undefined' && rtl) {
				if(right + width + external > $listbox.width()) {
					var left2 = parseInt($listbox.css('right'));
					var visibleWidth = $(window).width(); 
					
					var body = $('body').get(0);
					var scrollLeft2 = body.scrollLeft + body.scrollWidth - body.clientWidth;
					var scrollLeft = Math.abs($('body').scrollLeft());
					
					if(scrollLeft < left2) {
						visibleWidth = visibleWidth - (left2 - scrollLeft);
					}
					var right = $listbox.width() - scrollLeft2;
					
					if(width + external > visibleWidth) { 
						settings.selector.context.css('right', scrollLeft2);
					} else {
						settings.selector.context.css('right', $listbox.width() - (scrollLeft2 + (width + external + 20)));
					}
				}
			} else {
				if(left  + (width + external) > $listbox.width()) {
					var left2 = parseInt($listbox.css('left'));
					var visibleWidth = $(window).width(); 
					var scrollLeft = $('body').scrollLeft();
					
					if(scrollLeft < left2) {
						visibleWidth = visibleWidth - (left2 - scrollLeft);
						scrollLeft = 0;
					} else {
						scrollLeft = scrollLeft - left2;
					}
					if(width + external > visibleWidth) { 
						settings.selector.context.css('left', scrollLeft);
					} else {
						settings.selector.context.css('left', scrollLeft + visibleWidth - (width + external) - 20);
					}
				} 
			}
		},
		'keyevent' : function(type) {
			var $this = $(this);
			if($this.hasClass('init')) {
				return;
			}
			var settings = $this.data('settings');
			
			if(type == 'checked') {
				$this.searchdoc('checkAll', true);
			} else if(type == 'delete') {
				var $selected = settings.selector.treefile.find('.selected');
				if($selected.length) {
					settings.selector.btn.children('.delete').trigger('click');
				}
			} else if(type == 'show') {
				var $selected = settings.selector.treefile.find('.selected');
				if($selected.length == 1) {
					$selected.trigger('dblclick');
				}
			}
		}
	};
	
	var searchTemplate = {
		'init' : function(){
			$('div.try_search').hide();
			var $this = this;
			if(!$this.length) {
				return;
			}
			if($this.hasClass('init')) {

				$this.removeClass('init');
			} else {
				$('#search_template dl.tree_folder dd#tree ul li a').removeClass('on');
				$('#search_template dl.tree_folder dd#tree ul li a.all').addClass('on');
				$('#search_template section.templete div.thum').show().children().remove();
				$('#search_template section.templete section.no_doc').hide();

			}
			var text = $pcOfficeData.searchText.toLowerCase();
			if(text.lastIndexOf('\\') != -1) {
				text = 'errorerrorerror';
			}
			var searchItem = $("#template_list div.thum dl[name*='" + text + "']");
			//layout.template.search(searchItem);
			searchTemplate.search(searchItem, $this);

		},
		'search' : function(){
			var result = arguments[0];
			var len = result.length;
			layout.changeLayout.apply(arguments[1]);
			$('#search_template section.share_header h3 em').text(len);
			/*pushStateId('k_te&val='+ $pcOfficeData.searchText.toLowerCase());*/
			if(len == 0){
				$('#search_template section.templete div.thum').hide();
				$('#search_template section.templete section.no_doc').show();
				return;
			}

			for (var i = 0; i < len; i++){
				var $template1 = $(result[i]);
				var data = $template1.data('data');
				var $template2 = $template1.clone();
				$template2.bind('click',events.showView);
				$template2.data('data', data);
				$template2.addClass(data.type.toLowerCase());

				$template2.appendTo($('#search_template div.thum'));
			}
		}

	};
	
	// ??? list
	var layout = {
			'changeLayout' : function() {
				//var $this = $('#search_template');
				var $this = $(this);

				$('#homeList, #template_list, #search_template, #mydoc, #shared_list, #star_list').hide();
				$('#cloud .header').removeClass('sm');
				$('#cloud section.cloud_contents').removeClass('sm');
				$('body').css('overflow-y','hidden');
				$('#cloud .header fieldset p.search a.del').removeClass('loading');
				$this.show();
			},
			'treeFile' : {
				'createContext' : function() {
					var $this = $(this);
					var settings = $this.data('settings');
					
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
					var $context_open_a =  $('<a />', {
						'href' : '#',
						'class' : 'menu_08',
						'text' : LanguagePack.OPEN,
						'click' :  events.context.open

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
					
					settings.selector.treefile.append($context);
					settings.selector.context = $context; 
					
					var $btn_more1 = settings.selector.btn_more2.children('.context_menu.orderby').children('ul');
					$btn_more1.children('li').children('a').bind('click', function(e){
						var _this = $(this);
						var index = 0;
						index = _this.parent().index();
						$('#search_list').searchdoc('setOrderBy', _this, index);
					});
					
					settings.selector.btn.children('.open').bind('click', events.context.open);
					settings.selector.btn.children('.delete').bind('click', events.context.deleted);
					/*GMX-4894*/
					
					settings.selector.btn_more2.bind('click', function(e) {
						if(e.preventDefault) e.preventDefault();
						if(settings.selector.btn_more2.children('.context_menu.orderby').css('display') == 'block') { 
							settings.selector.btn_more2.children('.context_menu.orderby').hide();
						} else {
							settings.selector.btn_more2.children('.context_menu.orderby').show();
							setTimeout(function(){
								$('body').one('click', function() {
									settings.selector.btn_more2.children('.context_menu.orderby').hide();
								});
							}, 100);
						}
					});
				},
				'createFile' : function(list, sharedFolderInfos) { /* AOM-8197 */
					var $this = this; 
					var settings = $this.data('settings');
					var $popup;
					var id;
					
					settings.selector.treefile.children('tr').remove();
					settings.selector.treefile.parent().children('.no_doc').hide();
					var $first; 
					var error;
					if(list.length == 1 && typeof list[0] !== 'object') {
						settings.selector.treefile.children('.error').show();
						list = [];
						error = true;
					} else {
						settings.selector.treefile.children('.error').hide();
					}
					for(var i=0; i< list.length; i++) {
						var data = list[i];
						var src = '';
						var type = '';
						var name = '';
						var time = '';
						var size = '';
						var starred = data.starred;
						var starredTime = data.starredTime;
						
						name = data.fileName;
						var index = data.fileName.lastIndexOf(".");
						var type = data.fileName.substring(index + 1).toLowerCase();
						var subdata = '';
						
						if(data.file.fileType == 'DIR') {
							shared = false;
							type = 'folder';
							src = '../../resources/image/Polaris/new/img/folder.png';
							if(name.toLowerCase() == 'inbox' && data.parentId == listData.rootid) {
								src = '../../resources/image/Polaris/new/img/inbox.png';
								name = 'Inbox';
							}
							
							time = '';
							size = '';
							data.shared = false;
							data.contents = null;
						} else {
							if(type == 'slide' || type == 'sheet' || type == 'word') {
								var index = data.fileName.lastIndexOf(".");
								var substring = data.fileName.substr(index, data.fileName.length);	
								if(substring.lastIndexOf("<strong>") == -1 && substring.lastIndexOf("</strong>") != -1) {
									name = data.fileName.substr(0, index) + '</strong>';	
								} else {
									name = data.fileName.substr(0, index);	
								}
							}
							src = '../../resources/image/Polaris/new/img/' + type + '.png';

							time = covertunixTime8(data.lastAccessTime);
							size = getSize(3, data.file.size);
							
							subdata = '<var>|</var><span class="date" title="'+LanguagePack.KEYWORD_LASTMODIFIED+' '+time+'">'+time+'</span>'
							+ '<var>|</var><span class="size">'+size+'</span>';
						}
						
						if(data.shared) {
							type = type + ' share';
						}
						time = covertunixTime8(data.lastAccessTime);
						size = getSize(3, data.file.size);	
						
						
						var favoritestr_css = '';
						var shared_check = '';
						
						var id;
						
						/* AOM-8197 */
						if(data.file.sharedFolderId) { 
							if(sharedFolderInfos) {
								for(var j = 0; j < sharedFolderInfos.length; j++) {
									if(sharedFolderInfos[j].sourceFolder.fileId == data.file.sharedFolderId) {
										if(data.file.sharedFolderId == data.file.parentId) {
											data.file.parentId = sharedFolderInfos[j].sharedFolder.fileId;
										}
										if(sharedFolderInfos[j].sharedFolder)
											data.file.changePath = sharedFolderInfos[j].sharedFolder.path + data.file.path.replace(sharedFolderInfos[j].sourceFolder.path + sharedFolderInfos[j].sourceFolder.fileName, sharedFolderInfos[j].sharedFolder.fileName);
										else
											data.file.changePath = "";
										break;
									}
								}
							}
						}
						
						if(data.file.changePath) {
							data.file.path = data.file.changePath;
							data.myFile = true;
						}

						var path = createTrSubPath(data.file.path);
						
						if(!data.myFile) {
							path = LanguagePack.PCHOME_NOT_MYFILE(data.fullName, $pcOfficeData.info.level);
						} else {
							if(data.fileId) {
								if($pcOfficeData.info.level == 'ORANGEPRO') {
									path = LanguagePack.KEYWORD_RECENT;
								}
							} else {
								var newpath = data.file.path;
								if(typeof data.file.cloudType != 'undefined' && data.file.cloudType == 'OD') {
									newpath = newpath.replace('drive/root:/', '');
								}
								var patharr= newpath.split('\\');
								path = '';

								for(var j=0; j< patharr.length; j++) {
									if(patharr[j] == '') {
										continue;
									}
									path += patharr[j];
									path += ' > ';
								}
								path = path.substr(0, path.length-3);
							}
						}
						
						if(data.file.fileId) {
							id = data.file.fileId;
						} else {
							if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
								id = data.file.extFileid;
							} else {
								var find = false; 
								id = '_' + Date.now();
								for(var j=0; j < settings.localInfo.length; j++) {
									if(settings.localInfo[j].fullpath == data.file.path + '_' + data.fileName) {
										find = true;
										id = settings.localInfo[j].id;
										break;
									}
								}
								if(!find) {
									settings.localInfo.push({'id' : id, 'fullpath' : data.file.path + '_' + data.fileName});
								}
							}
						}
						var isltr = '';
						if(typeof rtl != 'undefined' && rtl) {
							if(!isRTL(name)) {
								isltr = 'ltr';
							}
						}
						var overbutton = '';
						
						var $ul = $('<tr id="search_' + id + '" class="file docName ' + type + '">'
								+ '<td class="form">'
									+ '<input type="checkbox">'
									+ '<img src="'+src+'">'
								+ '</td>'
								+ '<td class="name">'
									+ '<div class="tit '+ isltr +'" title="' + name + '">'
									+ $pcOfficeData.insertHighlight(name)
									+ '</div>'
									+ '<div class="etc">'
										+ '<span class="location underlineCheck">' + path + '</span>'
									+ subdata
									+ '</div>'
								+ '</td></tr>');
						
						$ul.data('data', data);
											
						if(!data.file.fileId) {
							if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
								$ul.children('.favorite').remove();
								$ul.children('.favorite_new').hide();
							}
						}
						
						$ul.bind('click', events.showView)
						.bind('contextmenu', events.context.show)
						.bind('selectkeyevent', events.treeFile.select)
						.bind('selectstart', function() {return false;})
						.hover(
								function(e) {
									var $this = $(e.target);
									var starred = '';
									var shared = '';
									var $ul;
									if($this.is('tr')) {
										$ul = $this;
									} else {
										$ul = $this.closest('tr');
									}
									$ul.addClass('hover');
								},
								function(e) {
									var $this = $(e.target);
									var starred = '';
									var shared = '';
									var $ul;
									if($this.is('tr')) {
										$ul = $this;
									} else {
										$ul = $this.closest('tr');
									}
									if($ul.hasClass('hover')) {
										$ul.removeClass('hover');
									}
								}
						)
						
						/* AOM-8197 */
						$ul.children().eq(1).children().eq(1).children('span').eq(0).hover(
								function(e) {
									var $this = $(e.target);
										if($this.hasClass('underlineCheck')){
											$this.css('text-decoration', 'underline');
										}
										if($this.children().hasClass('underlineCheck')){
											$this.children().css('text-decoration', 'underline');
										}
								},
								function(e) {
									var $this = $(e.target);
									var $ul;
									
									if($this.is('tr')) {
										$ul = $this;
									} else {
										$ul = $this.closest('tr');
									}
									$ul.find('.underlineCheck').css('text-decoration', 'none');
								}
						);
						$ul.children('td.form').children('input').bind('click', events.treeFile.select)
						.bind('dblclick', function(e){if(e.stopPropagation) e.stopPropagation();});
						/* AOM-8197 */
						$ul.find('div.etc').children('span.location').bind('click', events.pathMoveView);	
						
						if($first) {
							$first.after($ul);
						} else {
							$first = $ul;
						}						
					}
					
					count = settings.count;
					count = poLocal.localizationNumber(count, LanguagePack.CURRENT_LAN, false);
					
					var $table = settings.selector.treefile.find('table');
					if($first) {
						$table.append($first);
					}
					
					if($table.find('tr').length) {
						var $selected;
						for(var i=0; i< settings.selectInfo.length; i++) {
							var $ul = $table.find('#search_' + settings.selectInfo[i].id);
							if($ul.length) {
								if($selected) {
									$selected = $selected.add($ul);
								} else {
									$selected = $ul;
								}
							}
						}
						if($selected) {
							var data2 = {
									'type' : 'ADD',
									'checked' : true, 
									'list' : $selected
							}
							settings.handle.fileSelect.apply($this, [data2]);
						} else {
							var data2 = {
									'type' : 'ALL',
									'checked' : false
							}
							settings.handle.fileSelect.apply($this, [data2]);
						}
						settings.selector.treefile.parent().children('.no_doc').hide();
						settings.selector.treefile.parent().children('.limited').hide();
						settings.selector.header.show();
						settings.selector.treefile.parent().removeClass('nodata');
						if($pcOfficeData.info.level == 'ORANGEPRO') {
							settings.selector.searchResult.html(LanguagePack.KEYWORD_RECENT + ' > ' +  LanguagePack.SEARCH_RESULT(settings.keyword, count));
						} else {
							settings.selector.searchResult.html(LanguagePack.SEARCH_RESULT(settings.keyword, count));
						}
					} else {
						var data2 = {
								'type' : 'ALL',
								'checked' : false
						}
						settings.handle.fileSelect.apply($this, [data2]);
						
						if(settings.type == 'contents' || settings.type == 'ownerName') {
							if(settings.level == 1) {
								settings.selector.treefile.parent().children('.no_doc').hide();
								settings.selector.treefile.parent().children('.limited').show();
							} else {
								settings.selector.treefile.parent().children('.no_doc').show();
								settings.selector.treefile.parent().children('.limited').hide();
							}
						} else {
							settings.selector.treefile.parent().children('.no_doc').show();
							settings.selector.treefile.parent().children('.limited').hide();
						} 
						settings.selector.header.hide();
						settings.selector.treefile.parent().addClass('nodata');
						if($pcOfficeData.info.level == 'ORANGEPRO') {
							settings.selector.searchResult.html(LanguagePack.KEYWORD_RECENT + ' > ' +  LanguagePack.SEARCH_RESULT(settings.keyword, 0));
						} else {
							settings.selector.searchResult.html(LanguagePack.SEARCH_RESULT(settings.keyword, 0));
						}
					}
					
					settings.selector.btn_more2.show();
				},
				'select' : function(data) {
					// search list
					var $this = this; 
					var settings = $this.data('settings');
					
					if(data.type == 'ALL') {
						if(data.lists) {
							if(data.checked) {
								data.lists.addClass('selected').children('td.form').children('input').attr('checked', true);
							} else {
								data.lists.removeClass('selected').children('td.form').children('input').attr('checked', false);
							}
						}
					} else if(data.type == 'ADD') {
						if(data.checked) {
							data.list.addClass('selected').children('td.form').children('input').attr('checked', true);
						} else {
							data.list.removeClass('selected').children('td.form').children('input').attr('checked', false);
						}
					} else if(data.type == 'ONE') {
						if(data.checked) {
							data.lists.removeClass('selected').children('td.form').children('input').attr('checked', false);
							data.list.addClass('selected').children('td.form').children('input').attr('checked', true);
						} else {
							data.list.removeClass('selected').children('td.form').children('input').attr('checked', false);
						}
					} else if(data.type == 'SHIFT') {
						if(data.checked) {
							if(data.lists.length) {
								var index = data.lists.index(data.list);
								data.lists.removeClass('selected').children('td.form').children('input').attr('checked', false);
								if(index != -1) {
									data.lists.slice(Math.min(0, index), Math.max(0, index)+ 1).addClass('selected').children('td.form').children('input').attr('checked', true);
								} else {
									var $ul = settings.selector.treefile.find('tr');
									var index = $ul.index(data.lists.first()); 
									var index2 = $ul.index(data.lists.last()); 
									var index3 = $ul.index(data.list); 
									if(index > index3) {
										$ul.slice(Math.min(index3, index2), Math.max(index3, index2)+ 1).addClass('selected').children('td.form').children('input').attr('checked', true);
									} else if(index3 > index2) {
										$ul.slice(Math.min(index, index3), Math.max(index, index3)+ 1).addClass('selected').children('td.form').children('input').attr('checked', true);
									} 
								}
							} else {
								data.list.addClass('selected').children('td.form').children('input').attr('checked', true);
							}
						}
					}
					var $selected = settings.selector.treefile.find('.selected');
					
					settings.selectInfo = [];
					
					for(var i=0; i< $selected.length; i++) {
						var data = $selected.eq(i).data('data');
						if(data.fileId) {
							settings.selectInfo.push({'id' : data.fileId});
						} else {
							if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
								id = data.file.extFileid;
							} else {
								id = '_' + Date.now();
								for(var j=0; j < settings.localInfo.length; j++) {
									if(settings.localInfo[j].fullpath == data.file.path + '_' + data.fileName) {
										id = settings.localInfo[j].id;
										break;
									}
								}
							}
							settings.selectInfo.push({'id' : id});
						}
					}
					
					settings.selector.btn.children().hide();
					
					/*AOM-8265*/
					var checkType = {
							'open' : true,
							'drop_box' : false,
							'firstOpen' : false,
							'urlcopy' : false,
							'favorite' : false,
							'download' : false,
							'rename' : false,
							'move' : false,
							'copy' : false,
							'delete' : true,
							'version' : false,
							'share' : false
					}
					
					if($selected.length > 1) {
						checkType.open = false;
					} 
					
					var showcount = 0;
					for (var prop in checkType) {
						if(checkType[prop]) {
							settings.selector.btn.children('.' + prop).show();
							showcount++;
						}
					}
					if($selected.length) {
						if(showcount == 0) {
							settings.selector.btn.hide();
						} else {
							settings.selector.btn.show();
						}
					} else {
						settings.selector.btn.hide();
					}
					
					if($selected.length && $selected.length == settings.selector.treefile.find('tr').length) {
						settings.selector.checkedAll.attr('checked', true).removeClass('check').addClass('checked').addClass('selected');
					} else {
						settings.selector.checkedAll.attr('checked', false).removeClass('checked').addClass('check').removeClass('selected');
					}
				},
				'remove' : function(list) {
					var $this = this; 
					var settings = $this.data('settings');

					for(var i=0; i< list.length; i++) {
						settings.selector.treefile.find('#search_'+ list[i].id).remove();
					}
					if(!settings.selector.treefile.find('tr').length) {
						settings.selector.treefile.children('.no_doc').show();
					}
					var $selected = settings.selector.treefile.find('.selected');
					if($selected.length) {
						settings.selector.btn.show();
						settings.selector.btn_more2.show();
					} else {
						settings.selector.btn.hide();
					}
				}
			},
			'template' : {
				'search' : function(){
					var result = arguments[0];
					var len = result.length;
					layout.changeLayout();
					$('#search_template section.share_header h3 em').text(len);
					/*pushStateId('k_te&val='+ $pcOfficeData.searchText.toLowerCase());*/
					if(len == 0){
						$('#search_template section.templete div.thum').hide();
						$('#search_template section.templete section.no_doc').show();
						return;
					}

					for (var i = 0; i < len; i++){
						var $template1 = $(result[i]);
						var data = $template1.data('data');
						var $template2 = $template1.clone();
						$template2.bind('click',events.showView);
						$template2.data('data', data);
						$template2.addClass(data.type.toLowerCase());

						$template2.appendTo($('#search_template div.thum'));
					}
				}
			}
	};
	
	var events = {
			'context' : {
				'first_open' : function(e){
					if(e.preventDefault) e.preventDefault();
					var $this = $(this);
					var isCheckAlltimePC = false;
					isCheckAlltimePC = showOpenDocInstallPop($this);
				},
				'open' : function(e) {
					if(e.preventDefault) e.preventDefault();
					
					var $root = $('#search_list');
					var settings = $root.data('settings');
					var data = settings.selector.treefile.find('.selected').data('data');
					
					var cloudCheck = false;
					if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
						cloudCheck = true;
					}

					var myfileCheck = data.myFile;
					
					if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
						if(data.file.fileType == 'DIR') {
							if(!cloudCheck && !data.fileId) {
								setFilePath(data.file.path);
								document.getElementById('pchome_file_path').click();
							} else {
								document.getElementById('pchome_loginType1').click();
							} 
						} else {
							if(!cloudCheck && !data.fileId) {
								setTimeout(function(){ clickCountCheck = 0; }, 3000);
								if(clickCountCheck == 0) {
									var name = data.fileName;
									var index = name.lastIndexOf(".");
									var type = name.substring(index + 1).toLowerCase();
									if(type != 'zip') {
										toastMessage(LanguagePack.TOAST_FILEOPENPROGRESS);
									}
									setFileInfo(data);
									document.getElementById('pchomeoff_doc').click();
									clickCountCheck = 1;
								} 
							} else {
								document.getElementById('pchome_loginType1').click();
							}
						}
					} else {
						if(data.file.fileType == 'DIR') {
							if(!cloudCheck && !data.fileId) {
								setFilePath(data.file.path);
								document.getElementById('pchome_file_path').click();
							} else {
								showPopupOffline(e);
							} 
						} else {
							if(!cloudCheck && !data.fileId) {
								setTimeout(function(){ clickCountCheck = 0; }, 3000);
								if(clickCountCheck == 0) {
									var name = data.fileName;
									var index = name.lastIndexOf(".");
									var type = name.substring(index + 1).toLowerCase();
									if(type != 'zip') {
										toastMessage(LanguagePack.TOAST_FILEOPENPROGRESS);
									}
									setFileInfo(data);
									document.getElementById('pchomeoff_doc').click();
									clickCountCheck = 1;
								} 
							} else {
								showPopupOffline(e);
							}
						}
					}
				},
				'deleted' : function(e) {
					if(e.preventDefault) e.preventDefault();
					
					var $this = $(this);
					var $root = $this.parents('#search_list');
					var settings = $root.data('settings');
					
					var $selected = settings.selector.treefile.find('.selected');
					
					var popupMessage = new Array();

					var isServer = false;
					var isLocalFile = false;
					
					var arr = [];
					var cloudArr = [];
					
					for(var i=0; i< $selected.length; i++) {
						var data = $selected.eq(i).data('data');
						if(data.fileId) {
							isServer = true;
							cloudArr.push(data);
						} else {
							isLocalFile = true;
							arr.push(data);
						}
					}
					
					if($selected.length > 1) {
						var filecount = 0;
						var foldercount = 0;
						for(var i=0; i < $selected.length; i++) {
							var data = $selected.eq(i).data('data');
							if(data.file.fileType == 'DIR') {
								foldercount++;
							} else {
								filecount++;
							}
						}
						if(filecount && foldercount) {
							popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER_AND_FILE(foldercount, filecount);
						} else if(filecount) {
							popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM_N(filecount);
						} else {
							popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM_N_FOLDER(foldercount);
						}
					} else {
						var data = $selected.eq(0).data('data');
						var name = data.fileName;
						if(data.file.fileType != 'DIR') {
							var index = name.lastIndexOf(".");
							var type = name.substring(index + 1).toLowerCase(); 
							if(type == 'slide' || type == 'sheet' || type == 'word') {
								name = name.substr(0, index);	
							}
						}
						popupMessage[0] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM(contraction(name));
					}
					if(isServer) {
						/*popupMessage[1] = LanguagePack.POPUP_CONFIRMDELETE_SELECTEDITEM_MSG;*/
					} else {
						popupMessage[1] = LanguagePack.LOCALFILE_DELETE;
					}
					
					var result;
					/*AOM-8265*/
					var predeleteCheck = true;
					if(isLocalFile) {
						setFileInfo(arr);
					}
					
					if(isLocalFile && isServer) {
						predeleteCheck = false;
					}
					
					if(isServer) {
						result = function(e) {
							defaultAlertCB(e);
							
							if(!predeleteCheck) {
								$pcOfficeData.type = 'delete';
								document.getElementById('deleteLocalFile').click();
							}
							
							if(cloudArr.length) {
								var popupMessage = new Array();
								if(arr.length) {
									toastMessage(LanguagePack.TOAST_RESTOREITEM_N_OFFLINE(arr.length, cloudArr.length));
								}
							}
						}; 
						
						if(predeleteCheck) {
							$('body').trigger('click');
							showPopupOffline(e);
							return;
						}
					} else {
						if($selected.length > 1) {
							result = function(e) {
								$pcOfficeData.type = 'delete';
								document.getElementById('deleteLocalFile').click();
								defaultAlertCB(e);
							};
						} else {
							if(isLocalFile) {
								if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
									result = function(e) {
										$pcOfficeData.type = 'delete';
										document.getElementById('deleteLocalFile').click();
										defaultAlertCB(e);
									};
								} else {
									document.getElementById('predeleteLocalFile').click();
									return;
								}
							} 
						}
					}
						
					var popup = new PopupMessage(PopupType.DEFAULT, null, null, {popupMessage:popupMessage}, result, defaultAlertCB, defaultAlertCB);
					popup.create();
					if($pcOfficeData.info.level != 'ORANGEPRO') {
						popup.changebutton({confirm : LanguagePack.KEYWORD_DELETE});
					}
					popup.show();
				},
				'show' : function(e) {
					if(e.preventDefault) e.preventDefault();
					if(e.stopPropagation) e.stopPropagation();
					$('body').trigger('click');
					
					var $this = $(this);
					var $root = $this.parents('#search_list');
					var settings = $root.data('settings');
					
					if(!$this.hasClass('selected')) {
						var data = {
								'lists' : settings.selector.treefile.find('.selected'),
								'list' : $this,
								'type' : 'ONE',
								'checked' : true
						}
						settings.handle.fileSelect.apply($root, [data]);
					}
					
					if(!settings.selector.context.is(':visible')) {
						$('body').one('click', function() {
							settings.selector.context.hide();
							isShowContext = false;
						});
					}
					var $ul = settings.selector.context.children('ul');
					$ul.children().hide();
					
					var $selected = settings.selector.treefile.find('.selected');
					
					/*AOM-8265*/
					var checkType = {
							'open' : true,
							'open2' : false,
							'firstOpen' : false,
							'urlcopy' : false,
							'favorite' : false,
							'download' : false,
							'rename' : false,
							'move' : false,
							'copy' : false,
							'delete' : true,
							'version' : false,
							'send' : false
					}
					
					if($selected.length > 1) {
						checkType.open = false;
					}
					
					var showcount = 0;
					for (var prop in checkType) {
						if(checkType[prop]) {
							$ul.children('.' + prop).show();
							showcount++;
						}
					}
					if(showcount == 0) {
						return;
					}
					
					var $listbox = $this.closest('.list_box');
					var external = 0;
					
					var width = settings.selector.context.width();
					
					if(typeof rtl != 'undefined' && rtl) {
						var left = parseInt(e.clientX);
						var left2 = parseInt($listbox.css('right'));
						var visibleWidth = $(window).width(); 
						
						var body = $('body').get(0);
						var scrollLeft2 = body.scrollLeft + body.scrollWidth - body.clientWidth;
						var scrollLeft = Math.abs($('body').scrollLeft());
						
						left = left + scrollLeft2;
						var right = $listbox.width() - left;
						
						if(scrollLeft < left2) {
							visibleWidth = visibleWidth - (left2 - scrollLeft);
						}
						
						if(width + external > visibleWidth || left - (width + external) - 10  < scrollLeft2) {
							settings.selector.context.css('right', $listbox.width() - (scrollLeft2 + (width + external + 20)));
						} else {
							settings.selector.context.css('right', right);
						}
					} else {
						var left = e.clientX;
						var left2 = parseInt($listbox.css('left'));
						var visibleWidth = $(window).width(); 
						var scrollLeft = $('body').scrollLeft();
						
						if(scrollLeft < left2) {
							visibleWidth = visibleWidth - (left2 - scrollLeft);
							left = left - (left2 - scrollLeft);
							scrollLeft = 0;
						} else {
							scrollLeft = scrollLeft - left2;
							left = left + scrollLeft;
						}
						if(width + external > visibleWidth) { 
							settings.selector.context.css('left', scrollLeft);
						} else {
							if(left + width + external + 10  > scrollLeft + visibleWidth) {
								settings.selector.context.css('left', scrollLeft + visibleWidth - (width + external) - 20);
							} else {
								settings.selector.context.css('left', left);
							}
						}
					}
					
					var top = $this.prop('offsetTop');
					var visibleHeight = $listbox.outerHeight(true);
					var scrollTop = $listbox.scrollTop();
					var height = settings.selector.context.height();
					var height2 = $this.height();
					
					if(top < scrollTop || height > visibleHeight) {
						settings.selector.context.css('top', scrollTop);
					} else {
						if(top + height + height2/2  > scrollTop + visibleHeight) {
							if(top + height2/2 - height > scrollTop) {
								settings.selector.context.css('top', top + height2/2 - height);
							} else {
								settings.selector.context.css('top', scrollTop);
							}
						} else {
							settings.selector.context.css('top', top + height2/2);
						}
					}
					
					settings.selector.context.show();
					return false;	
				}
			},
			'treeFile' : {
				'select' : function(e) {
					if(e.stopPropagation) e.stopPropagation();
					var $this = $(this);
					var $root = $this.parents('#search_list');
					var settings = $root.data('settings');
					var $ul = $this;
					
					var data = {
							'lists' : settings.selector.treefile.find('.selected'),
							'list' : null,
							'type' : 'ONE',
							'checked' : true
					};
					
					if($this.is('input')) {
						$ul = $this.parents('tr');
						data.type = 'ADD';
						data.list = $ul;
						if($ul.hasClass('selected')) {
							data.checked = false;
						} else {
							data.checked = true;
						}
					} else {
						data.list = $ul;
						if($ul.hasClass('selected')) {
							if(e.ctrlKey) {
								data.checked = false;
							} else if(e.shiftKey) {
								data.type = 'SHIFT';
								data.checked = true;
							}
						} else {
							if(e.ctrlKey) {
								data.type = 'ADD';
							} else if(e.shiftKey) {
								data.type = 'SHIFT';
								data.checked = true;
							}
						}
					}
					settings.handle.fileSelect.apply($root, [data]);
					$('body').click();
				}
			},
			'showView' : function(e) {
				if(e.preventDefault) e.preventDefault();
				var $this = $(this);
				if($this.hasClass('templates')){
					var data = $this.data('data');
					setFileInfo(data);
					
					if(data.type == 'HWP' && officeType == 'mac' && gUserLevel == 'FREE'){
						// CAM-5103 [Web] HWP 유료 시나리오를 적용합니다.
						$('#machome_hwp_check').trigger('click');
						return;
					}
					toastMessage(LanguagePack.TOAST_FILEOPENPROGRESS);
					document.getElementById('pchome_openLocalTemplateDoc').click();
				} else {
					var $ul; 
					if($this.is('a')) {
						$ul = $this; 
					} else if($this.is('tr')) {
						$ul = $this; 
					} else {
						$ul = $this.closest('tr');
					}
					if(e.ctrlKey || e.shiftKey) {
						e.type = 'selectkeyevent';
						$ul.trigger(e);
						return;
					}
					var data = $ul.data('data');
					s_time = new Date().getTime();
					
					var cloudCheck = false;
					if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
						cloudCheck = true;
					}

					var myfileCheck = data.myFile;
					
					if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
						if(data.file.fileType == 'DIR') {
							if(!cloudCheck && !data.fileId) {
								setFilePath(data.file.path);
								document.getElementById('pchome_file_path').click();
							} else {
								document.getElementById('pchome_loginType1').click();
							} 
						} else {
							if(!cloudCheck && !data.fileId) {
								setTimeout(function(){ clickCountCheck = 0; }, 3000);
								if(clickCountCheck == 0) {
									var name = data.fileName;
									var index = name.lastIndexOf(".");
									var type = name.substring(index + 1).toLowerCase();
									if(type != 'zip') {
										toastMessage(LanguagePack.TOAST_FILEOPENPROGRESS);
									}
									setFileInfo(data);
									document.getElementById('pchomeoff_doc').click();
									clickCountCheck = 1;
								} 
							} else {
								document.getElementById('pchome_loginType1').click();
							}
						}
					} else {
						if(data.file.fileType == 'DIR') {
							if(!cloudCheck && !data.fileId) {
								setFilePath(data.file.path);
								document.getElementById('pchome_file_path').click();
							} else {
								showPopupOffline(e);
							} 
						} else {
							if(!cloudCheck && !data.fileId) {
								setTimeout(function(){ clickCountCheck = 0; }, 3000);
								if(clickCountCheck == 0) {
									var name = data.fileName;
									var index = name.lastIndexOf(".");
									var type = name.substring(index + 1).toLowerCase();
									if(type != 'zip') {
										toastMessage(LanguagePack.TOAST_FILEOPENPROGRESS);
									}
									setFileInfo(data);
									document.getElementById('pchomeoff_doc').click();
									clickCountCheck = 1;
								} 
							} else {
								showPopupOffline(e);
							}
						}
					}
				}
			},	
			'pathMoveView' : function(e) {
				if(e.preventDefault) e.preventDefault();
				if(e.stopPropagation) e.stopPropagation();
				
				var $this = $(this);
				var $ul = $this.closest('tr'); 
				
				var data = $ul.data('data');
				s_time = new Date().getTime();
				
				var cloudCheck = false;
				if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
					cloudCheck = true;
				}

				var myfileCheck = data.myFile;

				if(data.fileId && !cloudCheck && myfileCheck) {
					if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
						document.getElementById('pchome_loginType1').click();
					} else {
						showPopupOffline(e);
					}
				} else if(data.fileId && !cloudCheck && !myfileCheck) {
					if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
						document.getElementById('pchome_loginType1').click();
					} else {
						showPopupOffline(e);
					}
				} else if(!cloudCheck && !data.fileId) {
					setFilePath(data.file.path);
					document.getElementById('pchome_file_path').click();
				} else if(cloudCheck) {
					if($pcOfficeData.info.userType == '0' || $pcOfficeData.info.userType == '1') {
						document.getElementById('pchome_loginType1').click();
					} else {
						showPopupOffline(e);
					}
				}
				$('body').trigger('click');
			}
	};
	
	var jsonResponse = {
			'hideactivitylist' : function() {
				var arg = arguments;
				var webdata = {
						'idList' : arg[1], 
						'hide': true
				};

				popcorn.hideSharedFile(webdata, function(res) { jsonReceive.deleteactivitylist2.onSuccessCB(res, arg[0], arg[1], arg[2]); } , function(res){});
			},
			'setlastaccess' : function() {
				var arg = arguments;
				var webdata = { 
						recentItemList:arg[1],
						maxRecentItemCount:arg[2]
				};
				
				popcorn.setlastaccess(webdata, function(res) { jsonReceive.setlastaccess.onSuccessCB(res, arg[0], arg[1], arg[3]); } , function(res){});
			},
	};
	var jsonReceive = {
			'searchfile' : {
				'onSuccessCB' : function() {
					/*search.loadingResult(true);*/
					var arg = arguments;
					
					var settings = arg[2].data('settings');
					
					var mytreefile;
					
					if(settings.selector.treefile.hasClass('ul_list')) {
						if(isPCHOME) {
							mytreefile = settings.selector.treefile.parent();
						} else {
							mytreefile = settings.selector.treefile.parent().parent();
						}
					} else {
						mytreefile = settings.selector.treefile;
					}
					
					var arr = []; 
					
					if(typeof arg[0][0] === 'object') {
						for(var i=0; i < arg[0].length; i++) {
							var data = arg[0][i];
							/* AOM-8695 요구 사항 삭제로 인한 주석 처리
							  if(!data.fileId) {
								var newpath = data.file.path;
								if(typeof data.file.cloudType != 'undefined' && data.file.cloudType.length) {
									continue;
								}
								var patharr = newpath.split('\\');
								var path = '';

								for(var j=0; j< patharr.length; j++) {
									if(patharr[j] == '') {
										continue;
									}
									if(j && patharr[j].toLowerCase().lastIndexOf(arg[3].toLowerCase()) != -1) {
										var exixt = false;
										for(var k=0; k < arr.length; k++) {
											if(arr[k].file.fileName == patharr[j]) {
												exixt = true;
												break;
											}
										}
										if(!exixt) {
											var copyData = goclone(data);
											copyData.file.fileType = 'DIR';
											copyData.file.path = path;
											copyData.fileName = patharr[j];
											copyData.file.fileName = patharr[j];
											arr.push(copyData);
										}
										
									}
									path += patharr[j];
									path += '\\';
								}
							} */
							if(arg[4] == 'ALL') {
								if(data.fileName.toLowerCase().lastIndexOf(arg[3].toLowerCase()) != -1) {
									arr.push(data);
								}
							}
						}
					}
					settings.count = arr.length;
					
					if(settings.changeLayout) {
						settings.handle.changeLayout.apply(arg[2], []);
						settings.changeLayout = false;
					}
					if(arr.length == 0) {
						settings.searchList = []; 
						settings.tmpList = [];
						settings.handle.createFile.apply(arg[2], [settings.searchList]);
					} else {
						settings.searchList = $.extend([], arr);
						
						var sharedFolderInfos = null; 
						if(arg[1].length) {
							sharedFolderInfos = arg[1];
						}
						
						var sort = { 'type' : '', 'reverse' : ''};
						if(settings.order.type) {
							sort.type = settings.order.type;
							sort.reverse = settings.order.reverse;
						} else {
							sort.type = 'time';
							sort.reverse = 0;
						}
						var arr2 = common.sort(sort, settings.searchList);
						settings.handle.createFile.apply(arg[2], [arr2, sharedFolderInfos]);
					} 
				},
				'onFailCB' : function() {
					
				}
			},
			'deleteactivitylist2' : {
				'onSuccessCB' : function() {
					var arg = arguments;
					var settings = arg[1].data('settings');
					
					if(CheckResult(null, arg[0])) {
						if(arg[3]) {
							arg[3](arg[2]);
						}
					}
				},
				"onFailCB" : function() {

				}
			},
			'setlastaccess' : {
				'onSuccessCB' : function() {
					var arg = arguments;
					var settings = arg[1].data('settings');
					
					if(CheckResult(null, arg[0])) {
						if(arg[3]) {
							arg[3](arg[2]);
						}
					}
				}
			},
	};
	
	var common = {
			'getImg' : function(type) {
				var str;
				if(type == 'open') {
					str = '../../resources/image/Polaris/new/img/folder_open.png';
				} else if(type == 'close') {
					str = '../../resources/image/Polaris/new/img/folder_close.png';
				} else if(type == 'normal') {
					str = '../../resources/image/Polaris/new/img/pop_folder.png';
				} else if(type == 'topen') {
					str = '../../resources/image/Polaris/new/img/teamFolder_open.png';
				} else if(type == 'tclose') {
					str = '../../resources/image/Polaris/new/img/teamFolder_close.png';
				} else if(type == 'tnormal') {
					str = '../../resources/image/Polaris/new/img/pop_teamFolder.png';
				}  else if(type == 'iopen') {
					str = '../../resources/image/Polaris/new/img/inbox_open.png';
				} else if(type == 'iclose') {
					str = '../../resources/image/Polaris/new/img/inbox_close.png';
				} else if(type == 'inormal') {
					str = '../../resources/image/Polaris/new/img/pop_inbox.png';
				}
				return str;
			},
			'sort' : function(order, object) {
				var newObject = JSON.parse(JSON.stringify(object));
				if(order.type == '') {
					return newObject;
				}
				return newObject.sort(function(a, b) {
					var nameA = a.fileName.toLowerCase();
					var nameB = b.fileName.toLowerCase();
					if(order.type == 'name') {
						if(a.file.fileType == 'DIR' && b.file.fileType == 'DIR') {

						} else if(a.file.fileType == 'DIR') {
							return -1;
						} else if(b.file.fileType == 'DIR') {
							return 1;
						}
						if(order.reverse == 1) {
							if(nameA > nameB) {
								return 1;
							} else {
								return -1;
							}
						} else if(order.reverse == 0) {
							if(nameA > nameB) {
								return -1;
							} else {
								return 1;
							}
						}
					} else if(order.type == 'type') {
						var name1;
						var type1;
						var name2;
						var type2;
						if(a.file.fileType == 'DIR' && b.file.fileType == 'DIR') {
							name1 = nameA;
							type1 = 'DIR';
							name2 = nameB;
							type2 = 'DIR';
						} else if(a.file.fileType == 'DIR') {
							return 1;
						} else if(b.file.fileType == 'DIR') {
							return -1;
						} else {
							var index = nameA.lastIndexOf(".");
							name1 = nameA.substr(0, index);
							type1 = nameA.substr(index+1, nameA.length).toLowerCase();	
							
							var index = nameB.lastIndexOf(".");
							name2 = nameB.substr(0, index);
							type2 = nameB.substr(index+1, nameB.length).toLowerCase();	
						}
						
						if(order.reverse == 1) {
							if(type1 == type2) {
								if(nameA > nameB) {
									return 1;
								} else {
									return -1;
								}
							} else if(type1 > type2) {
								return 1;
							} else {
								return -1;
							}
						} else if(order.reverse == 0) {
							if(type1 == type2) {
								if(nameA > nameB) {
									return -1;
								} else {
									return 1;
								}
							} else if(type1 > type2) {
								return -1;
							} else {
								return 1;
							}
						}
					} else if(order.type == 'time') {
						if(a.file.fileType == 'DIR' && b.file.fileType == 'DIR') {
						
						} else if(a.file.fileType == 'DIR') {
							return -1;
						} else if(b.file.fileType == 'DIR') {
							return 1;
						} 
						if(order.reverse == 1) {
							if(a.lastAccessTime == b.lastAccessTime) {
								if(nameA > nameB) {
									return 1;
								} else {
									return -1;
								}
							} else if(a.lastAccessTime > b.lastAccessTime) {
								return 1;
							} else {
								return -1;
							}
						} else if(order.reverse == 0) {
							if(a.lastAccessTime == b.lastAccessTime) {
								if(nameA > nameB) {
									return -1;
								} else {
									return 1;
								}
							} else if(a.lastAccessTime > b.lastAccessTime) {
								return -1;
							} else {
								return 1;
							}
						}
					} else if(order.type == 'size') {
						if(a.file.fileType == 'DIR' && b.file.fileType == 'DIR') {
							
						} else if(a.file.fileType == 'DIR') {
							return -1;
						} else if(b.file.fileType == 'DIR') {
							return 1;
						}
						if(order.reverse == 1) {
							if(a.file.size == b.file.size) {
								if(nameA > nameB) {
									return 1;
								} else {
									return -1;
								}
							} else if(a.file.size > b.file.size) {
								return 1;
							} else {
								return -1;
							}
						} else if(order.reverse == 0) { 
							if(a.file.size == b.file.size) {
								if(nameA > nameB) {
									return -1;
								} else {
									return 1;
								}
							} else if(a.file.size > b.file.size) {
								return -1;
							} else {
								return 1;
							}
						}
					} else if(order.type == 'owner') {
						if(a.file.fileType == 'DIR' && b.file.fileType == 'DIR') {

						} else if(a.file.fileType == 'DIR') {
							return -1;
						} else if(b.file.fileType == 'DIR') {
							return 1;
						}
						var ownerA = a.ownerName ? a.ownerName : a.nameOwner;
						if(!ownerA) {
							ownerA = $USERINFO.getData('myinfo').name;
						} 
						var ownerB = b.ownerName ? b.ownerName : b.nameOwner;
						if(!ownerB) {
							ownerB = $USERINFO.getData('myinfo').name;
						} 
						if(order.reverse == 1) {
							if(ownerA == ownerB) {
								if(nameA > nameB) {
									return 1;
								} else {
									return -1;
								}
							} else if(ownerA > ownerB) {
								return 1;
							} else {
								return -1;
							}
						} else if(order.reverse == 0) {
							if(ownerA == ownerB) {
								if(nameA > nameB) {
									return -1;
								} else {
									return 1;
								}
							} else if(ownerA > ownerB) {
								return -1;
							} else {
								return 1;
							}
						}
					}
				});
			},
	}
	$.fn.searchdoc = function(method) {
		if (searchdoc[method]) {
			return searchdoc[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return searchdoc.init.apply(this, arguments);
		} else {
			$.error('The method ' + method + ' does not exist in $.searchdoc');
		}
	};
	$.fn.searchTemplate = function(method) {
		if (searchTemplate[method]) {
			return searchTemplate[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return searchTemplate.init.apply(this, arguments);
		} else {
			$.error('The method ' + method + ' does not exist in $.searchTemplate');
		}
	};
})($);
/// searchdoc end

var searchdoc_display_type = '';
var dblclickflag = false;
function showSearchdocList(e, type) {
	commonPreventEvent(e);
	var $this = getSeletor(e);
	if(dblclickflag) {
		return false;
	}
	dblclickflag = true;
	
	document.getElementById('getLocaRecentList').click();
	
	setTimeout(function(){
		dblclickflag = false;
	}, 500);
} 

var searchdoc_sort = ''; 
var searchdoc_order = 0;

function setSearchdocSort(e, type) {
	var $this;
	if($(e.srcElement).is('a')) {
		commonPreventEvent(e);
		$this = $(e.srcElement);
	} else {
		$this = getSeletor(e).children('a');
	}
	
	var order;
	
	if(searchdoc_sort != type) {
		if(searchdoc_order) {
			$this.parents('tr').children('td').children('.up').removeClass('up');
		} else {
			$this.parents('tr').children('td').children('.down').removeClass('down');
		}
		searchdoc_sort = type;
		searchdoc_order = 0;
	}
	searchdoc_order = !searchdoc_order;
	
	if(searchdoc_order) {
		$this.removeClass('down').addClass('up');
	} else {
		$this.removeClass('up').addClass('down');
	}

	$('#search_list').searchdoc('setSort', searchdoc_sort, searchdoc_order);
}

function checkSearchdoc(e) {
	var $this = getSeletor(e);
	if($this.hasClass('checked')) {
		$this.removeClass('checked').addClass('check');
		$('#search_list').searchdoc('checkAll', false);
	} else {
		$this.removeClass('check').addClass('checked');
		$('#search_list').searchdoc('checkAll', true);
	}
}

function getSize(type, size) {
	var value;
	if(type == 1) {
		/* use Size */
		if(!size || size < 0) {
			value = 0.00;
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'KB';
		} else if(size < 1024 * 1023) {
			/* KB */
			value = (Math.ceil(size/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'KB';
		}  else if(size < 1024 * 1024 * 1023) {
			/* MB */
			value = (Math.ceil(size/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'MB';
		} else if(size < 1024 * 1024 * 1024 * 1023) {
			/* GB */
			value = (Math.ceil(size/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'GB';

		} else if(size < 1024 * 1024 * 1024 * 1024 * 1023) {
			/* TB */
			value = (Math.ceil(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'TB';
		} else {
			/* TB */
			value = (Math.ceil(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'TB';
		}
	} else if(type == 2) {
		/* remain Size */
		if(!size || size <= 0) {
			value = 0.00;
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'KB';
		} else if(size < 11) {
			value = 0.01;
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'KB';
		} else if(size < 1024 * 1023) {
			/* KB */
			value = (Math.floor(size/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'KB';
		} else if(size < 1024 * 1024 * 1023) {
			/* MB */
			value = (Math.floor(size/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'MB';
		} else if(size < 1024 * 1024 * 1024 * 1023) {
			/* GB */
			value = (Math.floor(size/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'GB';
		} else if(size < 1024 * 1024 * 1024 * 1024 * 1023) {
			/* TB */
			value = (Math.floor(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'TB';
		} else {
			/* TB */
			value = (Math.floor(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'TB';
		}
	}else if(type == 3) {
		/* use Size */
		if(!size || size <= 0) {
			value = 0.00;
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'MB';
		} else if(size < 11) {
			value = 0.01;
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'KB';
		} else if(size < 1024 * 1023) {
	    	/* KB */
	    	value = (Math.floor(size/1024*100)/100).toFixed(2);
	    	value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
	    	value += 'KB';
		} else if(size < 1024 * 1024 * 1023) {
			/* MB */
			value = (Math.ceil(size/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'MB';
		} else if(size < 1024 * 1024 * 1024 * 1023) {
			/* GB */
			value = (Math.ceil(size/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'GB';
		} else if(size < 1024 * 1024 * 1024 * 1024 * 1023) {
			/* TB */
			value = (Math.ceil(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'TB';
		} else {
			/* TB */
			value = (Math.ceil(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN, true);
			value += 'TB';
		}
	} else if(type == 4) {
		/* remain Size */
		if(!size || size < 0) {
			value = 0.00;
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'MB';
		} else if(size < 1024 * 1024 * 1023) {
			/* MB */
			value = (Math.floor(size/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'MB';
		} else if(size < 1024 * 1024 * 1024 * 1023) {
			/* GB */
			value = (Math.floor(size/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'GB';
		} else if(size < 1024 * 1024 * 1024 * 1024 * 1023) {
			/* TB */
			value = (Math.floor(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'TB';
		} else {
			/* TB */
			value = (Math.floor(size/1024/1024/1024/1024*100)/100).toFixed(2);
			value = poLocal.localizationNumber(value, LanguagePack.CURRENT_LAN);
			value += 'TB';
		}
	}

	return value;
}
/**
 * polaris cloud localization module
 * 폴라리스 클라우드 서비스에 사용되는 지역화 관련 자바스크립트
 */
var poLocal = (function(window, document, undefined) {
  'use strict';

  var _version = "0.0.1";

  if ($.fn.jquery !== '1.8.3') {
    console.warn('this module is depend on jquery 1.8.3');
  }

  if (window.poLocal !== undefined) {
    return window.poLocal;
  }

  /**
   * ex) getDateFormat(new Date(),"YYYY/DD/MM HH:mm:ss AP")<br><br>
   * 대소문자 구별함<br>
   * YY => 2자리 연도<br>
   * YYYY => 4자리 연도<br>
   *
   * M  => 1자리 월<br>
   * MM => 2자리 월 (1 => 01)<br>
   *
   * D  => 1자리 일<br>
   * DD => 2자리 일 (2 => 01)<br>
   *
   * <!-- MMM => 약자로 월 (jan)<br>
   * MMMM => 단어로 월 (january)<br>
   *
   * DDD => 약자로 요일 (mon)<br>
   * DDDD => 단어로 요일 (monday)<br> -->
   *
   * AP => AM/PM<br>
   *
   * h  => 1자리로 시간 (12시간 기준)<br>
   * hh => 2자리로 시간 (12시간 기준)<br>
   *
   * H  => 1자리로 시간 (24시간 기준)<br>
   * HH => 2자리로 시간 (24시간 기준)<br>
   *
   * m  => 1자리로 분<br>
   * mm => 2자리로 분<br>
   *
   * s  => 1자리로 초<br>
   * ss => 2자리로 초<br>
   **/
  function _getDateFormat(theDate,dateFormatString) {
	  if (theDate == null) {
		  return "theDateNull";
	  }
	  if (dateFormatString == null) {
		  dateFormatString = "YYYY/MM/DD hh:mm";
	  }

	  var year = theDate.getFullYear();
	  var shortYear = (''+year).substring(2);

	  var month = theDate.getMonth() + 1;
	  var longMonth = ((''+month).length==1)?'0'+month:month;

	  var date = theDate.getDate();
	  var longDate = ((''+date).length==1)?'0'+date:date;

	  var hours = theDate.getHours();
	  var longHours = ((''+hours).length==1)?'0'+hours:hours;
	  var twelveHours = hours>12 ? hours-12 : (hours==12 ? 12 : hours);
	  var longTwelveHours = ((''+twelveHours).length==1)?'0'+twelveHours:twelveHours;

	  var hoursStr = "";
	  var dateString = null;
	  if(hours < 12) {
		  hoursStr = LanguagePack.DATE_AM;
	  } else {
		  hoursStr = LanguagePack.DATE_PM;
	  }
	  var minutes = theDate.getMinutes();
	  var longMinutes = ((''+minutes).length==1)?'0'+minutes:minutes;

	  var seconds = theDate.getSeconds();
	  var longSeconds = ((''+seconds).length==1)?'0'+seconds:seconds;


	  dateFormatString = dateFormatString.replace("YYYY",year);
	  dateFormatString = dateFormatString.replace("YY",shortYear);
	  //dateFormatString = dateFormatString.replace("MMMM",);
	  //dateFormatString = dateFormatString.replace("MMM",);
	  dateFormatString = dateFormatString.replace("MM",longMonth);
	  dateFormatString = dateFormatString.replace("M",month);
	  //dateFormatString = dateFormatString.replace("DDDD",);
	  //dateFormatString = dateFormatString.replace("DDD",);
	  dateFormatString = dateFormatString.replace("DD",longDate);
	  dateFormatString = dateFormatString.replace("D",date);
	  if(LanguagePack.CURRENT_LAN != 'ar') {
		  dateFormatString = dateFormatString.replace("AP",hoursStr);
	  } else {
		  dateFormatString = dateFormatString.replace("AP",'');
	  }
	  dateFormatString = dateFormatString.replace("HH",longHours);
	  dateFormatString = dateFormatString.replace("H",hours);
	  dateFormatString = dateFormatString.replace("hh",longTwelveHours);
	  if(LanguagePack.CURRENT_LAN == 'ko' || LanguagePack.CURRENT_LAN == 'en') {
		  dateFormatString = dateFormatString.replace("h",twelveHours);
	  } else {
		  dateFormatString = dateFormatString.replace("h",longHours);
	  }
	  dateFormatString = dateFormatString.replace("mm",longMinutes);
	  dateFormatString = dateFormatString.replace("m",minutes);

	  dateFormatString = dateFormatString.replace("ss",longSeconds);
	  dateFormatString = dateFormatString.replace("s",seconds);

	  return dateFormatString;
  }

  /**
   * 숫자 포맷을 변경해주는 Number.prototype의 확장
   * var
   * @param  {int} digitDecimal     소수 자리 갯수
   * @param  {int} digitNature      자연수 자리 갯수
   * @param  {str} delimiterSection 자연수 구분자
   * @param  {str} delimiterDecimal 소수와 자연수 구분자
   */
  var _format = function(data, digitDecimal, digitNature,
                        delimiterSection, delimiterDecimal) {
    var re = '\\d(?=(\\d{' + (digitNature || 3) + '})+' + (digitDecimal > 0 ? '\\D' : '$') + ')';

    var num = 0;
    if (typeof data === 'string') {
      num = Number(data);
    }
    else {
      num = data;
    }
    num = num.toFixed(Math.max(0, ~~digitDecimal));

    return (delimiterDecimal ? num.replace('.', delimiterDecimal) : num)
          .replace(new RegExp(re, 'g'), '$&' + (delimiterSection || ','));
  };


  /**
   * Localization Number
   * @param  {str, number} num 변환할 숫자값
   * @param  {str} locale 지역, ex) ko_KR, fr_FR...
   * @param  {bool} isDecimal 소수값? default) false
   * @return {str}   지역화된 숫자값
   */
  var _localizationNumber = function(num, locale, isDecimal) {
    var number = 0;
    if (isDecimal) {
      number = parseFloat(num);
    }
    else {
      number = parseInt(num);
    }

    var digitDecimal = 0;
    if (isDecimal) {
      switch(locale) {
        case 'ar_AE':
          digitDecimal = 3;
          break;
        default:
          digitDecimal = 2;
      }
    }

    var localization = '';
    switch(locale) {
      case 'ar_AE':
        localization = _format(num, digitDecimal, 3, ',', '.');
        break;
      case 'fr_FR':
        localization = _format(num, digitDecimal, 3, ' ', ','); 
        break;
      default:
        localization = _format(num, digitDecimal, 3, ',', '.');
    }
    return localization;
  };

  return {
    getDateFormat: _getDateFormat,
    localizationNumber: _localizationNumber,
  };

})(window, document);

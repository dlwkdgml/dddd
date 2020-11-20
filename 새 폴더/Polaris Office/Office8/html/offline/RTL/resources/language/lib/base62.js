

function Base62() {
    this.baseDigits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
}
Base62.prototype.decode = function(str) {
    var strType = typeof str;

    // type check
    if (strType !== 'string') {
      throw new TypeError('parameter should be a string: ' + strType);
    }

    // syntax check
    if (!/^-?[\da-zA-Z]+$/.test(str)) {
      throw new Error('parameter is unsupported format: ' + str);
    }

    // convert
    for (decodedNum = 0, i = len = str.length; i--;) {
      decodedNum += this.baseDigits.indexOf(str[i]) * Math.pow(62, len - i - 1);
    }

    return decodedNum;
  };
  
  Base62.prototype.encode = function(num) {
	  	
	  if(isNaN(parseInt(num)) || num === 0){
		  return '0';
	  }
	  else
		  num = parseInt(num);
	  
	  
	    // convert
	    encodedStr = '';
	    while (num > 0) {
	      encodedStr = this.baseDigits.charAt(num % 62) + encodedStr;
	      num = Math.floor(num / 62);
	    }

	    return encodedStr;
	  }; 
	  
	  var obj = new Base62();
	  
(function($) {
	 $.encodeBase62 = function encodeBase62(str) {
	        return obj.encode(str);
	    };


	 $.decodeBase62 = function decodeBase62(str) {
	        return obj.decode(str);
	    };
	 
})(jQuery);
//鏁板瓧婊氬姩
;(function($, window, document) {
    "use strict";
    var defaults = {
        deVal: '?',       //浼犲叆鍊�
        className:'dataNums',   //鏍峰紡鍚嶇О
        digit:''    //榛樿鏄剧ず鍑犱綅鏁板瓧
    };
    function rollNumDaq(obj, options){
        this.obj = obj;
        this.options = $.extend(defaults, options);
        this.init = function(){
             this.initHtml(obj,defaults);
        }
    }
    rollNumDaq.prototype = {
		// 初始化位数
        initHtml: function(obj,options){
            var strHtml = '<ul class="' + options.className + ' inrow">';
            var valLen = options.digit ||  (options.deVal + '').length;
            if(obj.find('.'+options.className).length <= 0){
                for(var i = 0; i<  valLen; i++){
                   // strHtml += '<li class="dataOne "><div class="dataBoc"><div class="tt" t="38"><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span></div></div></li>';
var outstr = '<li class="dataOne ">'+
'<div class="dataBoc">'+
'<div class="tt" t="38">'+
'<span class="num0">0</span>'+ 
'<span class="num1">1</span>'+ 
'<span class="num2">2</span>'+ 
'<span class="num3">3</span>'+ 
'<span class="num4">4</span>'+
'<span class="num5">5</span>'+ 
'<span class="num6">6</span>'+ 
'<span class="num7">7</span>'+ 
'<span class="num8">8</span>'+ 
'<span class="num9">9</span>'+
'<span class="num0">0</span>'+ 
'<span class="num1">1</span>'+ 
'<span class="num2">2</span>'+ 
'<span class="num3">3</span>'+ 
'<span class="num4">4</span>'+
'<span class="num5">5</span>'+ 
'<span class="num6">6</span>'+ 
'<span class="num7">7</span>'+ 
'<span class="num8">8</span>'+ 
'<span class="num9">9</span>'+
'<span class="num0">0</span>'+ 
'<span class="num1">1</span>'+ 
'<span class="num2">2</span>'+ 
'<span class="num3">3</span>'+ 
'<span class="num4">4</span>'+
'<span class="num5">5</span>'+ 
'<span class="num6">6</span>'+ 
'<span class="num7">7</span>'+ 
'<span class="num8">8</span>'+ 
'<span class="num9">9</span>'+
'<span class="num0">0</span>'+ 
'<span class="num1">1</span>'+ 
'<span class="num2">2</span>'+ 
'<span class="num3">3</span>'+ 
'<span class="num4">4</span>'+
'<span class="num5">5</span>'+ 
'<span class="num6">6</span>'+ 
'<span class="num7">7</span>'+ 
'<span class="num8">8</span>'+ 
'<span class="num9">9</span>'+
'<span class="num0">0</span>'+ 
'<span class="num1">1</span>'+ 
'<span class="num2">2</span>'+ 
'<span class="num3">3</span>'+ 
'<span class="num4">4</span>'+
'<span class="num5">5</span>'+ 
'<span class="num6">6</span>'+ 
'<span class="num7">7</span>'+ 
'<span class="num8">8</span>'+ 
'<span class="num9">9</span>'+
'<span class="num0">0</span>'+ 
'<span class="num1">1</span>'+ 
'<span class="num2">2</span>'+ 
'<span class="num3">3</span>'+ 
'<span class="num4">4</span>'+
'<span class="num5">5</span>'+ 
'<span class="num6">6</span>'+ 
'<span class="num7">7</span>'+ 
'<span class="num8">8</span>'+ 
'<span class="num9">9</span>'+
'</div>'+
'</div>'+
'</li>'
strHtml+=outstr
				}
                strHtml += '</ul>';
                obj.html(strHtml);
            }
            this.scroNum(options);
        },
		// 滚动数字
        scroNum: function(options){
            var number = options.deVal;
            var $num_item = $('.' + options.className).find('.tt');
            var h = $('.dataBoc').height();
            $num_item.css('transition','all 6s ease-in-out');
            var numberStr = number.toString();
            if(numberStr.length <= $num_item.length - 1){
                var tempStr = '';
                for(var a = 0; a < $num_item.length - numberStr.length; a++){
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }

            var numberArr = numberStr.split('');
            $num_item.each(function(i, item) {
                setTimeout(function(){
                    $num_item.eq(i).css('top',-parseInt(numberArr[i])*h - h*30 + 'px');
                },i*8000)
            });
        }
    }
    $.fn.rollNumDaq = function(options){
		debugger
        var $that = this;
        var rollNumObj = new rollNumDaq($that, options);
        rollNumObj.init();
    };
})(jQuery, window, document);
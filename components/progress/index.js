/**
 * 进度条
 * 使用方法 progress.init({parmas})
 * params: 1.el 绑定的元素 2.value 当前的进度 3.size 总进度值 4.width 进度条的长度
 * 注： num不能大于toatl 否则按100%来算
 */
var progress = (function () {
    function template(dfts) {
        return '<div class="luochen-progress">'
            + '<div class="luochen-progress-bar" style="width:'+dfts.width+'px">'
            + '<div class="luochen-progress-inner" style="width:'+dfts.inner_width+'px"></div>'
            + '</div>'
            + '<div class="luochen-progress-text">'
            + '<span class="luochen-progress-percentage">'+dfts.value+'</span>'
            + '<span class="luochen-progress-total">'+dfts.size+'</span>'
            + '</div>'
            + '</div>'
    }
    function converDefaults(obj) { //处理参数
        var defaults = {
            el: '',
            value: 0,
            size: 100,
            width: 140,
            inner_width: 0
        };
        if(obj == undefined || obj == {}){
            return defaults;
        }else{
            var res = $.extend({},defaults,obj);
            var value = parseInt(res.value);
            var size = parseInt(res.size);
            var width = parseInt(res.width);
            if(value>=size){
                res.inner_width = width
                res.value = size
            }else{
                res.inner_width = parseInt((value/size)*width);
            }
            return res;
        }
    }
    function init(obj) { //初始化
        var dfts = converDefaults(obj);
        $(dfts.el).html(template(dfts));
    }
    return {
        init: init
    }
})();

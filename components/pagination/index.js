(function($) {
    // 插件定义
    $.fn.pagination = function(options) {

        var opts = handleDefaults(options,this) //参数
        if(opts.total == 0 || opts.total == undefined){
            this.html("");
        }
        var pager = this.find('.pager'); //页面队列
        var currentPage = opts.currentPage; //当前页
        var jump = this.find('.jump'); //跳转GO
        opts.inputCurrent = this.find('input'); //输入框变化
        opts.btnPre = this.find('.btn-pre'); //上一页
        opts.btnNext = this.find('.btn-next'); //下一页
        pager.html('<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>');
        var li = pager.find('li')
        pageHtmlInit(opts,li);
        addActive(li,currentPage);

        if(currentPage>1){
            opts.btnPre.addClass('can-abled')
        }
        if(currentPage<opts.pageCount){
            opts.btnNext.addClass('can-abled')
        }
        opts.btnPre.on('click',function () {
            var num = opts.currentPage;
            if(num == 1){
                return;
            }
            opts.currentPage = num - 1;
            goPage(opts,li);
            opts.change(opts.currentPage);

        });
        opts.inputCurrent.on('input',function () {
           var val = $(this).val();
           if(/(^[1-9]\d*$)/.test(val)){
               opts.inputVal = val;
           }
        });
        jump.on('click',function () {
            if(opts.inputVal<1 || opts.inputVal>opts.pageCount){
                return;
            }
            opts.currentPage = opts.inputVal;
            goPage(opts,li);
        })
        opts.btnNext.on('click',function () {
            var num = parseInt(opts.currentPage);
            if(num == opts.pageCount){
                return;
            }
            opts.currentPage = num + 1;
            goPage(opts,li);
        });
        li.on('click',function () {
            var num = $(this).text();
            opts.currentPage = num;
            goPage(opts,li);
            opts.change(num);
        })
    };
    var watchCanAbled = function (opts) {
        var prevCanAble = opts.btnPre.hasClass('can-abled');
        var nextCanAble = opts.btnNext.hasClass('can-abled');

        if(opts.currentPage == 1){
            opts.btnPre.removeClass('can-abled');
        }else if(!prevCanAble){
            opts.btnPre.addClass('can-abled');
        }
        if(opts.currentPage == opts.pageCount){
            opts.btnNext.removeClass('can-abled');
        }else if(!nextCanAble){
            opts.btnNext.addClass('can-abled');
        }
    };
    var goPage = function (opts,li) {
        watchCanAbled(opts);
        pageHtmlInit(opts,li);
        addActive(li,opts.currentPage);
    };
    // 生成页码数组
    var pageHtmlInit = function (opts,li) {
        li.hide();
        var pager = 8; //页码限制
        var pageCount = opts.pageCount; //总页码
        var currentPage = parseInt(opts.currentPage ) //当前页码
        var showPrevMore = false; //上一页是否存在
        var showNextMore = false;  //下一页是否存在
        var count = 5;  //页码值得数量
        var result = '' //模板字符串

        if(currentPage == 4){
            count = 6
        }else if((currentPage + 3) == pageCount){
            count = 6
        }

        // 上下页判断
        if (currentPage > 5) {
            showPrevMore = true;
        }

        if (currentPage < pageCount - 2) {
            showNextMore = true;
        }
        var array = []; //模板数值数组
        if(pageCount<=pager){
            for(var i = 1;i<=pageCount;i++){
                array.push(i)
            }
        }else{
            //第一种 当前页为前四的时候
            if(currentPage <= 4){
                for(var i = 1;i<=count;i++){
                    array.push(i)
                }
                array.push('...')
                array.push(pageCount)
            }
            //第二种 当前页为前四的时候
            else if((currentPage + 4) > pageCount){
                var start = pageCount - count + 1;
                array.push(1)
                array.push('...')
                for(var i = start;i<=pageCount;i++){
                    array.push(i)
                }
            }
            //第二种 当前页中间的时候
            else{
                var start = currentPage - 2;
                var end = currentPage + 2;
                array.push(1)
                array.push('...')
                for(var i = start;i<=end;i++){
                    array.push(i)
                }
                array.push('...')
                array.push(pageCount)
            }
        }

        li.each(function (index) {
            var num = array[index];
            if(num){
                $(this).show();
                $(this).text(num);
                if(num != '...'){
                    $(this).addClass('number')
                }
            }
        });
        opts.inputCurrent.val(opts.currentPage);
    }
    //整合默认参数和传递过来的参数
    var handleDefaults = function (options) {
        var opts = $.extend(defaults,options);
        opts.pageCount = Math.ceil(opts.total/opts.pageSize); //总页数
        return opts;
    }
    // 页码模板
    var pagerTemplate = function (page) {
        return '<li class="number">'+page+'</li>'
    };
    // 添加选中事件
    var addActive = function (li,num) {
        li.removeClass('active');
        li.each(function () {
            if($(this).text()==num){
                $(this).addClass('active')
            }
        })
    };
    // 插件的默认参数
    var defaults = {
        total: 0,
        pageSize: 20,
        pageCount: '',
        currentPage: 1,
        inputCurrent: '',
        inputVal: 1,
        btnNext: '',
        btnPre: '',
        change: function () {}
    };

})(jQuery)

// 参数
// total 总数
// pageSize 每页显示条数
// pageCount 总页数
// currentPage  当前页数

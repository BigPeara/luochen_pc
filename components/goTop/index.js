//返回顶部
$.extend({
    goTop: function (option) {
        // 默认参数
        var defaults = {
            speed: 200, //移动速度，数值越高，移动越快
            y: 800,  //滚动条距离顶端为此距离，则会显示
            addHtml: null  //是否使用自定义的元素
        };
        var dfts = $.extend({},defaults,option);
        var top  = $(window).scrollTop()
        var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQklEQVRYR+WWX0hTURzHf+dOnX8ScW2jP0LO0NJtFQ3/7qVZsqWS1qMWRA9hEaEg9NB01y1IEFSI6LGIrIfKDOZqZdhDbZVSiW6ToIRWJM6/U+fc2k7s6sSGd3d/cgWdp3Pv+f1+38/9nd/v3IPgLw8UjX5Js/7OHJFQZyJlC5HGiRjgSGu/0uFwaRIT4u69uFxaixDCkUBEBNBrnlDqBqyaKbsTCISgVpb9uELIq44JwFOz7aDHC28BQdx6QQRwslzI6woXIqwM9I/hxMVFmwkhlLWBkJ2FYK8ij/cjHIiwAHpNthsAUEcngDG8rBTxZJsCoLXYJMgLg0zBMeCLlUL+NSY7/3rIGdCabRUIg5YpMAZ4VynkFTLZRQ3QYxwD09cZKs75ciGkp7Kp+f8D8No8Dl/G7dRXVxcLIDUpPrYZoO2EWNVAzAFadZZG8S5um1941DoDE3NO6jE/mw9JbBY1/+nxfqjax5cAhPZvCKkNi5r1R/cLOOSxgswCPwBdFywuuz919gzfN6jlylBakRFAqnyyBxPEoCiTY6kqzMwPESAHe+G48Yq8hwkiKIDk0vM0Ntv7HgCyRJmcgfUAdFuwmoEcjGEJsaDAQMpHgkHQA5CYKPbqnyFAh30BAgHogvoBVnvSiln4gJFUTNPZ0wIUN+kbEYK1ogsEmJxzwoLTTcXN4KZAHIug5r8BrKj2G9Ty0vABmvXtCKDB7xgIwFCEOX4/DNhlVCtWzukNBn0G/nUApiL8wxnAk9K8bd2HxDvPMrXVkttjbn/4cTcgRKU94i0oadaTGIMAEHHXaJnp07bIFNP2Ze28wxWUIYO7ZUDdNVTGZntOYAw1AEhq1MiTw66BQAedearowavP3aPfZrYHIzhXLrx5qijjjN+mRKXnG1rkE1ED+AMMa+pzkReZU/I5kJybRr223R4DjEEnJjsqmLYocJ3xKA50GGprTCEcnu/xW9lp6RU7wD3phFmd7yKMr4tUnRc2HcAnMKJqqAECulKlXHCOzoNrymkDFiERK9utMQGgIFrq1YhFNGEPBgJDWR7Z0ReuuM8+7C1Y62+SJEww+wgheCNUdV6NRDwqAJ/zGHk6UUDeWrmVRDh+Ab+umjDbIuk5AAAAAElFTkSuQmCC";
        var template = '<div id="luochen-returnTop" style="position: fixed;left: 50%; margin-left:560px;bottom: 200px;cursor: pointer">'
            + '<img src='+img+'>'
            +'</div>>';
        var ele = '';
        if(dfts.addHtml == undefined || dfts.addHtml == ''){
            $("body").append(template);
            ele = $('#luochen-returnTop');
        }else{
            ele = $(dfts.addHtml);
        }

        if(top<dfts.y){ //初始化的时候判断是否显示
            ele.hide();
        }else{
            ele.show();
        }

        $(window).on('scroll',function () { //监听window的滚动，判断返回顶端是否显示
            var t  = $(window).scrollTop()
            if(t>dfts.y){
                ele.show();
            }else{
                ele.hide()
            }
        });
        ele.on('click',function () { //返回顶端
            clearInterval(timer);
            var timer = setInterval(function () {
                $(window).scrollTop($(window).scrollTop()-dfts.speed);
                if($(window).scrollTop()<=0){
                    clearInterval(timer)
                }
            },20)
        })
    }
})

// $.goTop({
//     speed: 200,
//     y: 800,
//     addHtml: '.test'
// })
/**
 * 文档
 * speed 默认为200,返回顶部的速度，数值越高，返回顶部速度越快
 * y 默认为800，滚动条距离顶端距离，当大于这个距离时，返回顶部显示
 * addHtml,  默认是个小火箭图标，填写可以绑定自己写的dom元素
 */

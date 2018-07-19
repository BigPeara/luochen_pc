(function () {
    /**
     * $.extend
     * 直接挂载到$对象上
     */
    $.extend({
        // 获取cookie、设置cookie
        cookie: function (name,value,time) {
           if(value == undefined){
               var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
               if(arr=document.cookie.match(reg))
                   return unescape(arr[2]);
               else
                   return null;
           }
           var time = time || 30;
           var exp = new Date();
           exp.setTime(exp.getTime() + time*24*60*60*1000);
           document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },
        //删除cookie
        removeCookie: function (name) {
           var exp = new Date();
           exp.setTime(exp.getTime() - 1);
           var cval=this.cookie(name);
           if(cval!=null)
               document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        },
        //截取字符以...显示
        ellipsis(str,num){
           if(typeof str === 'string' && str.length>num){
               return str.substring(0,num) + '...';
           }
           return str;
        },
        // 删除数组指定元素
        deleteArrayItem(value,array){
            var index = $.inArray(value,array);
            if(index>=0){
                return array.splice(index,1);
            };
            return array;
        },
    });
    /**
     * $.fn
     * 直接针对dom元素进行的拓展
     */
    $.fn.checked = function(isCheck){
        if(isCheck){
            return this.prop('checked',true);
        }else{
            return this.prop('checked',false);
        }
    }
    $.fn.sendCode = function(time){
        var num = time || 60;
        var that = this;
        this.text('已发送')
        var t = setInterval(function () {
            num --;
            if(num == 0){
                that.removeAttr('disabled');
                that.text('重新获取');
                that.css('color','#999999');
                that.css('background','#ffffff');
                clearTimeout(t);
                return;
            }
            that.text(num+'秒后可重新获取')
        },1000)
        this.css('color','#c9c9c9')
        this.css('background','#FBFBFB')
        this.attr('disabled','disabled')
    }

    /**
     * Array
     * 以下为直接对原生js进行拓展
     */
    //重复数据不会push到数组
    Array.prototype.realPush = function (value) {
        var self = this;
        for(var i in self){
            if(self[i]==value){
                return;
            }
        }
        self.push(value)
    }
})()

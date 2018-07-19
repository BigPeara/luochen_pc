## 落尘PC

## 项目布局

```
.
├── common                                    // 每个页面的逻辑js
├── components                                // 组件库
├── pages                                     // 页面
├── service                                   // 数据模型层
├── static                                    // 静态文件层
├── utils                                     // 工具类
│   ├── css                                   // 样式
│   ├── img                                   // 图片
│   ├── icon                                  // 大雪碧图
│   ├── js                                    // js
.
```

## 工具库开发规范

```
(function () {
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
   })
   $.fn.checked = function(isCheck){
       if(isCheck){
           return this.prop('checked',true);
       }else{
           return this.prop('checked',false);
       }
   }
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

```

## 工具库使用文档->utils->index.js

### 工具库三种方式
 1. $.extend  创建无业务逻辑的方法
 2. $.fn  针对dom元素进行的拓展
 3. prototype 针对js原生对象的一些拓展

### 一、$.extend扩展

 cookie

> * 设置cookie $.cookie('name', 'value', 'time');
> * 参数name为名,value为值,time为存储时间;
> * 获取cookie $.cookie('name');
> * 删除cookie $.removeCookie('name');

 ellipsis(str,num)

> *  字符串截取并加...后缀
> * 使用方法：$.ellipsis(str,num)
> * str为截取字符串,num为截取的位数

 deleteArrayItem(value,array)

> * 删除数组的指定元素
> * 使用方法：$.deleteArrayItem(value,array)
> * value为要删除的元素,array为数组

### 二、$.fn扩展

使用方法：$(dom).name

 checked(boole)

> * 针对checkbox表单元素进行选中，取消选中，适用于全选
> * 使用方法： $('input').checked(false) 取消选中; $('input').checked(true) 选中

 sendCode(time)

> * 针对的是验证码发送，不涉及任何业务逻辑，注：载体元素必须为button
> * 使用方法：在发送验证码的事件中,$(dom).sendCode(60)
> * 参数time为时间，多少秒后，button按钮可以重新发送！

### 三、prototype扩展

 realPush(value)

> * 对数组push的修改，使用此方法重复的数据将不会插入数组中
> * 使用方法：array.realPush(value)
> * 参数value 为插入值

### 插件文档

分页


```
<div class="pagination">
    <div class="btn-pre">
        <img src="../static/img/prev.png" alt="">
    </div>
    <ul class="pager clearfix">
    
    </ul>
    <div class="btn-next">
        <img src="../static/img/next.png" alt="">
    </div>
    <div class="jump-number">
        <input type="text" value="1">
    </div>
    <div class="jump">GO</div>
</div>

$('.pagination').pagination({
        total: 11,
        pageSize: 1,
        currentPage: 1,
        change: function (val) {
            console.log("change值：",val)
        }
    })
    
```
> * 四个参数 total、pageSize、currentPage、change
> *  total总页数，整数，大于0
> *  pageSize 每页条数
> *  currentPage 当前页
> *  currentPage  页码变化时候的页码数

 返回顶部
 
```
$.goTop({
    speed: 200,
    y: 800,
    addHtml: '.test'
})
```
 
 > * speed 默认为200,返回顶部的速度，数值越高，返回顶部速度越快
 > * y 默认为800，滚动条距离顶端距离，当大于这个距离时，返回顶部显示
 > * addHtml,  默认是个小火箭图标，填写可以绑定自己写的dom元素
 
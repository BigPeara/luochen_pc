(function() {
    var lcSwipe = function(elem, options) {
        this.elem = document.getElementById(elem); //插入到dom中的位置
        this.options = options || {};
        this.index = 0;
        this.tmlp = "";
        this.getName;
        this.btn;
        this.len;
        this.timer = null;
        this.init();
    }
    lcSwipe.prototype = {
        constructor: lcSwipe,
        init: function() {
            //初始化
            this.render();
            this.autoPlay();
            this.bindEvent();
        },
        render: function() {
            //渲染Dom
            this.tmlp = '<ul class="banner-container">\
        <li class="banner-item"><a href="#"><img src="../static/img/mv.jpg"></a></li>\
        <li class="banner-item"><a href="#"><img src="../static/img/bef.jpg"></a></li>\
        <li class="banner-item"><a href="#"><img src="../static/img/ww.jpg"></a></li>\
        <li class="banner-item"><a href="#"><img src="../static/img/kk.jpg"></a></li>\
    </ul>\
    <ul class="banner-foucs clearfix">\
        <li class="banner-bar banner-cur fleft">我们</li>\
        <li class="banner-bar fleft">我们</li>\
        <li class="banner-bar fleft">我们</li>\
        <li class="banner-bar fleft">我们</li>\
    </ul>';
            this.elem.innerHTML = this.tmlp;
            this.getName = this.getElemName("banner-item")[0];
            this.btn = this.getElemName("banner-bar")[0];
            this.len = this.getName.length;
            this.btnLen = this.btn.length;
        },
        autoPlay: function() {
            var _this = this;
            this.timer = setTimeout(function() {
                if (_this.index == _this.len - 1) {
                    _this.index = 0;
                } else {
                    _this.index++;
                }
                for (var i = 0; i < _this.len; i++) {
                    // debugger
                    if (_this.index == i) {
                        _this.getName[_this.index].style.display = "block";
                        _this.getName[_this.index].classList.add("banner-animat")
                        _this.btn[_this.index].classList.add("banner-cur");
                    } else {
                        _this.getName[i].style.display = "none";
                        _this.getName[i].classList.remove("banner-animat");
                        _this.btn[i].classList.remove("banner-cur");
                    }
                }
                _this.timer = setTimeout(arguments.callee, 4000)
            }, 4000)
        },
        bindEvent: function() {
            //绑定事件操作
            // debugger
            var _this = this;
            this.elem.onmouseover = function() {
                clearTimeout(_this.timer);
                // debugger
            }
            this.elem.onmouseout = function() {
                _this.autoPlay();
            }
            for (var i = 0; i < _this.btnLen; i++) {
                _this.btn[i].curent = i;
                _this.btn[i].onclick = function(e) {
                    _this.index = this.curent;
                    for (var j = 0; j < _this.btnLen; j++) {
                        _this.btn[j].classList.remove("banner-cur");
                        _this.getName[j].style.display = "none";
                    }
                    e.target.classList.add("banner-cur");
                    _this.getName[_this.index].style.display = "block";
                }
            }
        },
        getElemName(elem) {
            //兼容低版本的获取class名
            if (document.getElementsByClassName) {
                var results = [];
                var name = document.getElementsByClassName(elem);
                results.push(name)
            } else {
                var results = results || [];
                var nodes = document.getElementsByTagName("*");
                // 2 遍历
                for (var i = 0; i < nodes.length; i++) {
                    var cNodes = nodes[i];
                    var cNodeClsName = cNodes.className;
                    // debugger
                    var clsNames = cNodeClsName.split(" "); //很重要的一步
                    for (var j = 0; j < clsNames.length; j++) {
                        if (clsNames[j] === classname) {
                            results.push(cNodes);
                        }
                    }

                }
            }
            return results;
        }
    }
    if (!window.lcSwipe) {
        window.lcSwipe = lcSwipe;
    }
}())
(function() {
    var Carousel = function(elem, options) {
        this.elem = document.getElementById(elem);
        this.child = this.elem.children;
        this.options = options || {};
        this.timer = null;
        this.carArr = [];
        this.init();
    }
    Carousel.prototype = {
        constructor: Carousel,
        init: function() {
            this.autoPlay();
            this.render();
            this.bindEvent();
        },
        render: function() {
            //必须保证旋转的图片个数为基数
            if (this.child.length % 2 == 0) {
                var node = this.elem.children[0].cloneNode(true);
                this.elem.appendChild(node);
            }
            for (var j = 0; j < this.child.length; j++) {
                this.carArr.push("carousel-item-" + j + "")
            }
        },
        autoPlay: function() {
            var _this = this;
            if (this.options.autoPlay) {
                if (this.options.times) {
                    this.timer = setTimeout(function() { //通过两个setTimeout模拟setInterval
                        _this.carArr.push(_this.carArr.shift()); //实现旋转木马效果比较关键的一步
                        for (var i = 0; i < _this.child.length; i++) {
                            _this.child[i].className = "carousel-item";
                            _this.child[i].classList.add(_this.carArr[i]);
                        }
                        _this.timer = setTimeout(arguments.callee, _this.options.times)
                    }, _this.options.times)
                } else {
                    this.timer = setTimeout(function() {
                        _this.carArr.push(_this.carArr.shift());
                        for (var i = 0; i < _this.child.length; i++) {
                            _this.child[i].className = "carousel-item";
                            _this.child[i].classList.add(_this.carArr[i]);
                        }
                        this.timer = setTimeout(arguments.callee, 1000)
                    }, 1000)
                }
            }
        },
        bindEvent: function() {
            var _this = this;
            this.elem.onmouseover = function() {
                clearTimeout(_this.timer);
            }
            this.elem.onmouseout = function() {
                _this.autoPlay();
            }
        }
    }
    window["Carousel"] = Carousel;
}());
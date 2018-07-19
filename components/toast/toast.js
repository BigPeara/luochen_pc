(function() {
    var Toast = function(elem, options) {
        this.elem = document.getElementsByClassName(elem)[0]; //需要插入的Dom节点
        this.options = options || {};
        this.init();
    }
    Toast.prototype = {
        constructor: Toast,
        init: function() {
            this.render();
            this.showSeat();
            this.hideModel();
        },
        render: function() {
            this.toast = document.createElement("div");
            this.toast.setAttribute("id", "toast");
            this.toast.style.cssText = "position: absolute;background: rgba(0, 0, 0, 0.5);color: #fff;font-size: 14 px;padding: 10px 20px;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;-ms-border-radius: 4px;"
            this.toast.innerText = this.options.text;
            this.elem.appendChild(this.toast);
        },
        showSeat: function() {
            switch (this.options.position) {
                case "top":
                    this.toast.style.cssText = "position: absolute;left: 50%;top: 0;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-o-transform:translate(-50%,0);background: rgba(0, 0, 0, 0.5);color: #fff;font-size: 14 px;padding: 10px 20px;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;-ms-border-radius: 4px;"
                    break;
                case "middle":
                    this.toast.style.cssText = "position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);background: rgba(0, 0, 0, 0.5);color: #fff;font-size: 14 px;padding: 10px 20px;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;-ms-border-radius: 4px;"
                    break;
                case "bottom":
                    this.toast.style.cssText = "position: absolute;left: 50%;bottom: 0;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-o-transform:translate(-50%,0);background: rgba(0, 0, 0, 0.5);color: #fff;font-size: 14 px;padding: 10px 20px;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;-ms-border-radius: 4px;"
                    break;
            }
        },
        hideModel: function() {
            var _this = this;
            if (!this.options.times) {
                setTimeout(function() {
                    _this.elem.removeChild(_this.toast);
                }, 2000)
            } else {
                setTimeout(function() {
                    _this.elem.removeChild(_this.toast);
                }, _this.options.times)
            }
        }
    }
    window.Toast = Toast;
}())
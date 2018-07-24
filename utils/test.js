
var Page = function (obj) {
    var self = this;
    this.addMethods(obj.methods)
    obj.mounted.apply(self);
};


Page.prototype.addMethods = function(methods){ //将方法挂在到对象上
    var t = methods;
    if (t) for (var e in t) this[e] = this.p(t[e], this)
}

Page.prototype.p = function (t,e) {
    return function(i) {
        var n = arguments.length;
        return n ? n > 1 ? t.apply(e, arguments) : t.call(e, i) : t.call(e)
    }
}

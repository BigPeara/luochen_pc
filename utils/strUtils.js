var strUtils = {
    isPassWord: function(str) {
        var reg = /^(\w){6,20}$/;
        if (!reg.exec(str)) {
            //密码正确
        } else {
            //密码错误
        }
    },
    isEmail: function(str) { //判断邮箱
        var reg = /^[\w-.]+@[\w-]+(\.\w{2,})+$/; //校验邮箱
        if (reg.test(str)) {

        } else {

        }
    },
    isAccountNumber: function(str) { //判断账号
        var re = /^[a-zA-z]\w{3,15}$/; //校验账号
        if (!re.test(str)) {

        } else {

        }
    },
    isPhoneNumber: function(str) { //判断手机号码
        var patrn = /^1\d{10}$/; //校验手机号码
        if (patrn.test(str)) {
            //号码正确
        } else {
            //号码错误
        }
    }
}
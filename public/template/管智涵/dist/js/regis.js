"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    $(".footer").load("../html/foot.html");

    //------引入表单验证插件---------------
    var vali = new Validators();
    $("#btn").bind("click", vali.subByJs);

    //------------提交账户到cookie----------------------------------


    var Submit = function () {
        function Submit() {
            _classCallCheck(this, Submit);

            this.submit = document.querySelector("#submit");
            this.init();
        }

        _createClass(Submit, [{
            key: "init",
            value: function init() {
                this.submit.onclick = function (e) {
                    e.preventDefault();
                    var user = document.querySelector("#userName").value;
                    var psd = document.querySelector("#passWord").value;
                    if (getCookie("account") !== "") {
                        var onoff = true;
                        var account = JSON.parse(getCookie("account"));
                        account.forEach(function (val) {
                            for (var i in val) {
                                if (val.user == user) {
                                    onoff = false;
                                    alert("用户名已被注册");
                                } else if (val.user !== user) {
                                    onoff = true;
                                }
                            }
                        });
                        if (onoff == true) {
                            account.push({
                                user: user,
                                psd: psd
                            });
                            alert("注册成功");
                            location.href = "index.html";
                            account = JSON.stringify(account);
                            setCookie("account", account);
                        }
                    } else {
                        var acVal = [];
                        acVal.push({
                            user: user,
                            psd: psd
                        });
                        alert("注册成功");
                        location.href = "index.html";
                        acVal = JSON.stringify(acVal);
                        setCookie("account", acVal);
                    }
                };
            }
        }]);

        return Submit;
    }();

    new Submit();
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    $(".footer").load("../html/foot.html");

    var Login = function () {
        function Login() {
            _classCallCheck(this, Login);

            this.login = document.querySelector("#login");
            this.init();
        }

        _createClass(Login, [{
            key: "init",
            value: function init() {
                this.login.onclick = function (e) {
                    e.preventDefault();
                    var user = document.querySelector("#userName").value;
                    var psd = document.querySelector("#passWord").value;
                    if (getCookie("account") !== "") {
                        var onoff = false;
                        JSON.parse(getCookie("account")).forEach(function (val) {
                            for (var i in val) {
                                if (val.user == user && val.psd == psd) {
                                    onoff = true;
                                    alert("登录成功");
                                    location.href = "index.html";
                                    break;
                                }
                            }
                        });
                        if (onoff == false) {
                            alert("账号或密码错误");
                            document.querySelector("#userName").value = "";
                            document.querySelector("#passWord").value = "";
                        }
                    } else {
                        alert("账号或密码错误");
                        document.querySelector("#userName").value = "";
                        document.querySelector("#passWord").value = "";
                    }
                };
            }
        }]);

        return Login;
    }();

    new Login();
});
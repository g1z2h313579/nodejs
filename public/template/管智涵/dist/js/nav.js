"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    //-------------------固定顶部导航和动画效果-----------------------------------------
    var FixNav = function () {
        function FixNav() {
            _classCallCheck(this, FixNav);

            this.onoff = false;

            this.init();
        }

        _createClass(FixNav, [{
            key: "init",
            value: function init() {
                var that = this;
                window.onscroll = function () {
                    var scTop = document.documentElement.scrollTop;
                    // console.log(scTop);
                    if (scTop > 218) {
                        that.onoff = true;
                        that.navT = document.querySelector(".nav").offsetHeight;
                        that.nav = document.querySelector(".nav_slider");
                        // console.log(parseInt(getComputedStyle(that.nav).top))
                        if (parseInt(getComputedStyle(that.nav).top) <= -that.navT) {
                            that.NavMoveDown();
                        }
                    } else {
                        that.onoff = false;
                        that.navT = document.querySelector(".nav").offsetHeight;
                        that.nav = document.querySelector(".nav_slider");
                        // console.log(that.nav.style.top);
                        if (that.nav.style.top !== "" && parseInt(that.nav.style.top) > -that.navT) {
                            that.NavMoveUp();
                        }
                    }
                };
            }
            //----------------------导航出现--------------------------------------

        }, {
            key: "NavMoveDown",
            value: function NavMoveDown() {
                var _this = this;

                if (this.onoff === true && parseInt(getComputedStyle(this.nav).top) <= 0) {
                    var timer = setInterval(function () {
                        if (_this.navT <= 0) {
                            _this.nav.style.top = 0;
                            clearInterval(timer);
                        } else {
                            _this.navT -= 5;
                            _this.nav.style.top = -_this.navT + "px";
                        }
                    }, 30);
                }
            }
            //---------------------导航消失---------------------------------------

        }, {
            key: "NavMoveUp",
            value: function NavMoveUp() {
                var _this2 = this;

                if (this.onoff === false) {
                    var timer = setInterval(function () {
                        if (-_this2.navT >= parseInt(_this2.nav.style.top)) {
                            _this2.nav.style.top = -_this2.navT + "px";
                            clearInterval(timer);
                        } else {
                            _this2.nav.style.top = parseInt(_this2.nav.style.top) - 5 + "px";
                        }
                    }, 30);
                }
            }
        }]);

        return FixNav;
    }();

    new FixNav();

    //----------------------点击购物车前往购物车页面--------------------------------------
    document.querySelector("body").addEventListener("click", function (e) {
        // console.log(1);
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.id == "toshopcart") {
            location.href = "shopcart.html";
        }
    });
});
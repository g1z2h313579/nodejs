"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

    //--------------待引入页加载完成后执行内容区--------------------------------------------------------------------
    var wait = new Promise(function (resolve, reject) {
        $(".thead").load("../html/top.html", function () {
            resolve();
        });
        $(".bottom_box").load("../html/bottom.html");
        $(".footer").load("../html/foot.html");

        //--------------------侧边栏回到顶部--------------------------------------------------------------
        $(".sider_box").load("../html/sider.html", function () {
            document.querySelector("body").addEventListener("click", function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.id == "toTop") {
                    var sct = document.documentElement.scrollTop;
                    var timer = setInterval(function () {
                        if (sct <= 0) {
                            document.documentElement.scrollTop = 0;
                            clearInterval(timer);
                        } else {
                            sct -= 200;
                            document.documentElement.scrollTop = sct;
                        }
                    }, 30);
                }
            });
        });
    });

    wait.then(function () {
        //-----------------设置当前----------------------------------------------------------
        document.querySelector("#life_nav").className = "active";
        //-----------------详情页类-------------------------------------------
        new detail();
    });

    var detail = function () {
        function detail() {
            _classCallCheck(this, detail);

            this.init();
        }

        _createClass(detail, [{
            key: "init",
            value: function init() {
                this.cookie = JSON.parse(getCookie("goods"));
                // console.log(this.cookie)
                this.render();
            }
            //---------------动态渲染详情页---------------------------------------------

        }, {
            key: "render",
            value: function render() {
                var detstr = "";
                detstr = "\n                        <div class=\"proImg\">\n                            <div class=\"bigImg\">\n                                <img src=\"" + this.cookie[this.cookie.length - 1].proImg + "\" alt=\"\">\n                            </div>\n                            <div class=\"smImg\">\n                                <ul>\n                                    <li><img src=\"../pro_detail/\u62B1\u67951.jpg\" alt=\"\"></li>\n                                    <li><img src=\"../pro_detail/\u62B1\u67952.jpg\" alt=\"\"></li>\n                                    <li><img src=\"../pro_detail/\u62B1\u67953.jpg\" alt=\"\"></li>\n                                    <li><img src=\"../pro_detail/\u62B1\u67954.png\" alt=\"\"></li>\n                                    <li><img src=\"../pro_detail/\u62B1\u67955.jpg\" alt=\"\"></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class=\"pro_info\">\n                            <h2>" + this.cookie[this.cookie.length - 1].proDec + "</h2>\n                            <span>\u6CA1\u6709\u90A3\u4E48\u591A\u63CF\u8FF0</span>\n                            <div class=\"pro_pri\">\n                                <div class=\"price\">\u552E\u4EF7\uFF1A<span id=\"price\">" + this.cookie[this.cookie.length - 1].price + "</span></div>\n                                <div class=\"serve\">\u670D\u52A1\uFF1A\u5168\u573A\u6EE188\u5305\u90AE\uFF0C\u90E8\u5206\u5730\u533A\u65E0\u6CD5\u914D\u9001</div>\n                            </div>\n                            <div class=\"type\">\n                                \u7C7B\u578B: \n                                <ul>\n                                    <li>\u5355\u53EA</li>\n                                </ul>\n                            </div>\n                            <div class=\"count\">\n                                \u6570\u91CF\uFF1A\n                                <button id=\"redu\"><span class=\"fa fa-minus\"></span></button>\n                                <span id=\"countNum\">1</span>\n                                <button id=\"add\"><span class=\"fa fa-plus\"></span></button>\n                            </div>\n                            <button id=\"buy\">\u7ACB\u5373\u8D2D\u4E70</button>\n                            <button id=\"shopcart\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                            <label for=\"favourite\">\n                                <span class=\"fa fa-heart-o\"></span> \u6536\u85CF\n                                <input type=\"checkbox\" id = \"favourite\">\n                            </label>\n                        </div>\n            ";

                //---------------创建node节点，准备插入页面---------------------------------------------
                this.dif_info = document.createElement("div");
                this.dif_info.className = "infowrap";
                this.dif_info.innerHTML = detstr;
                //---------------------------把this,dif_info插入在父容器pro_detail里，放在.detail_info之前---------------------------------
                document.querySelector(".pro_detail").insertBefore(this.dif_info, document.querySelector(".detail_info"));

                //--------------------绑定事件----------------------------------------
                this.initEvent();
            }
        }, {
            key: "initEvent",
            value: function initEvent() {
                this.redu = document.querySelector("#redu");
                this.add = document.querySelector("#add");
                this.countNum = document.querySelector("#countNum");
                this.count = parseInt(this.countNum.innerHTML);
                this.buy = document.querySelector("#buy");
                this.shopcart = document.querySelector("#shopcart");
                this.cartcookie = [];
                this.addevent();
            }
        }, {
            key: "addevent",
            value: function addevent() {
                var _this = this;

                //----------------设置商品数量事件--------------------------------------------
                this.redu.onclick = function () {
                    if (_this.count > 1) {
                        _this.count--;
                    }
                    _this.countNum.innerHTML = _this.count.toString();
                };
                this.add.onclick = function () {
                    _this.count++;
                    _this.countNum.innerHTML = _this.count.toString();
                };
                //--------------------购买事件----------------------------------------
                this.buy.onclick = function () {
                    _this.saveCookie();
                    location.href = "shopcart.html";
                };
                //-------------------加入购物车-----------------------------------------
                this.shopcart.onclick = function () {
                    _this.saveCookie();
                    document.querySelector(".sucadd").style.display = "flex";
                    setTimeout(function () {
                        document.querySelector(".sucadd").style.display = "none";
                    }, 2000);
                };
            }

            //--------------------存入cookie----------------------------------------

        }, {
            key: "saveCookie",
            value: function saveCookie() {
                if (getCookie("cartcookie") === "") {
                    this.cartcookie.push({
                        proImg: this.cookie[this.cookie.length - 1].proImg,
                        proDec: this.cookie[this.cookie.length - 1].proDec,
                        price: this.cookie[this.cookie.length - 1].price,
                        num: this.count
                    });
                    var cartcookie = JSON.stringify(this.cartcookie);
                    setCookie("cartcookie", cartcookie);
                } else {
                    var _cartcookie = JSON.parse(getCookie("cartcookie"));
                    if (_cartcookie[_cartcookie.length - 1].proImg !== this.cookie[this.cookie.length - 1].proImg) {
                        _cartcookie.push({
                            proImg: this.cookie[this.cookie.length - 1].proImg,
                            proDec: this.cookie[this.cookie.length - 1].proDec,
                            price: this.cookie[this.cookie.length - 1].price,
                            num: this.count
                        });
                        _cartcookie = JSON.stringify(_cartcookie);
                        setCookie("cartcookie", _cartcookie);
                    } else if (_cartcookie[_cartcookie.length - 1].num !== this.count) {
                        var _cartcookie2 = JSON.parse(getCookie("cartcookie"));
                        _cartcookie2[_cartcookie2.length - 1].num = this.count;
                        _cartcookie2 = JSON.stringify(_cartcookie2);
                        setCookie("cartcookie", _cartcookie2);
                    }
                }
            }
        }]);

        return detail;
    }();
});
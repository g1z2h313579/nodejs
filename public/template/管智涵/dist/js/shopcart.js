"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

    var wait = new Promise(function (resolve) {
        $(".thead").load("../html/top.html", function () {
            resolve();
        });
        $(".bottom_box").load("../html/bottom.html");
        $(".footer").load("../html/foot.html");
    });

    wait.then(function () {
        new cart();
    });

    var cart = function () {
        function cart() {
            _classCallCheck(this, cart);

            this.checkNum = 0;
            this.init();
        }

        _createClass(cart, [{
            key: "init",
            value: function init() {
                this.cookie = JSON.parse(getCookie("cartcookie"));
                // console.log(this.cookie)
                this.render();
            }
        }, {
            key: "render",
            value: function render() {
                var str = "";
                for (var i = 0; i < this.cookie.length; i++) {
                    str += "\n                        <ul>\n                            <li>\n                                <label for=\"onoff-" + this.checkNum + "\" class = \"marklabel\"></label>\n                                <input type=\"checkbox\" id = \"onoff-" + this.checkNum + "\">\n                            </li>\n                            <li><img src=\"" + this.cookie[i].proImg + "\" alt=\"\"></li>\n                            <li><p class=\"title\">" + this.cookie[i].proDec + "</p><p class=\"type grey\">\u5355\u53EA</p></li>\n                            <li><span class=\"price\">" + this.cookie[i].price + "</span></li>\n                            <li>\n                                <button class=\"minus\"><span class=\"fa fa-minus\"></span></button>\n                                <span class=\"count\">" + this.cookie[i].num + "</span>\n                                <button class=\"add\"><span class=\"fa fa-plus\"></span></button>\n                            </li>\n                            <li>\n                                <span>" + this.cookie[i].price + "</span>\n                            </li>\n                            <li></li>\n                            <li>\n                                <span class=\"fa fa-trash-o\"></span>\n                            </li>\n                        </ul>\n                ";

                    this.checkNum++;
                }
                this.getdata = document.createElement("div");
                this.getdata.innerHTML = str;
                document.querySelector(".cartlist").insertBefore(this.getdata, document.querySelector("#cart_bottom"));
                this.initEvent();
            }
        }, {
            key: "initEvent",
            value: function initEvent() {
                this.price = document.querySelectorAll(".price"); //商品单价数组
                this.count = document.querySelectorAll(".count"); //商品数量数组
                this.del = document.querySelectorAll(".fa-trash-o"); //商品删除数组
                this.label = document.querySelectorAll("label"); //商品选中数组
                this.cash = document.querySelector("#sumCash"); //支付总额
                this.cartNum = document.querySelector("#cartNum"); //商品类型总数量
                this.sumdel = document.querySelector("#sumdel"); //批量删除
                this.minus = document.querySelectorAll(".minus"); //减少商品数量按钮
                this.add = document.querySelectorAll(".add"); //增加商品数量按钮
                this.cartlist = document.querySelector(".cartlist"); //商品列表框
                this.input = document.querySelectorAll("input"); //checkbox
                // console.log(this.input)
                this.addevent();
            }
        }, {
            key: "addevent",
            value: function addevent() {
                //购物车商品类型数量
                this.cartNum.innerHTML = this.getdata.children.length.toString();
                //--------------------单个商品加减数量------------------------------------
                this.comProNum();
                //--------------------计算总价------------------------------------
                this.comSum();
                //--------------------删除商品------------------------------------
                this.delPro();
                //--------------------选中商品---------------------------------------
                this.choose();
            }

            //--------------------单个商品加减数量------------------------------------

        }, {
            key: "comProNum",
            value: function comProNum() {
                var that = this;
                this.cartlist.addEventListener("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    // console.log(target.classList.contains("fa-minus"));
                    if (target.className == "minus" || target.classList.contains("fa-minus")) {
                        if (target.className == "minus") {
                            var countNum = parseInt(target.nextElementSibling.innerHTML);
                            if (countNum > 1) {
                                countNum--;
                                target.nextElementSibling.innerHTML = countNum.toString();
                                that.comSum();
                            }
                        } else if (target.classList.contains("fa-minus")) {
                            var _countNum = parseInt(target.parentNode.nextElementSibling.innerHTML);
                            if (_countNum > 1) {
                                _countNum--;
                                target.parentNode.nextElementSibling.innerHTML = _countNum.toString();
                                that.comSum();
                            }
                        }
                    } else if (target.className == "add" || target.classList.contains("fa-plus")) {
                        if (target.className == "add") {
                            var _countNum2 = parseInt(target.previousElementSibling.innerHTML);
                            _countNum2++;
                            target.previousElementSibling.innerHTML = _countNum2.toString();
                            that.comSum();
                        } else if (target.classList.contains("fa-plus")) {
                            var _countNum3 = parseInt(target.parentNode.previousElementSibling.innerHTML);
                            _countNum3++;
                            target.parentNode.previousElementSibling.innerHTML = _countNum3.toString();
                            that.comSum();
                        }
                    }
                });
            }
            //-------------------计算商品总价---------------------------------------

        }, {
            key: "comSum",
            value: function comSum() {
                var sum = 0;
                var that = this;
                // console.log(that.getdata.children)
                for (var i = 0; i < that.getdata.children.length; i++) {
                    // sum += parseInt(that.price[i].innerHTML.slice(1,that.price[i].innerHTML.length)) * parseInt(that.count[i].innerHTML);

                    sum += parseInt(that.getdata.children[i].children[3].children[0].innerHTML.slice(1, that.price[i].innerHTML.length)) * parseInt(that.getdata.children[i].children[4].children[1].innerHTML);

                    // console.log(parseInt(this.price[i].innerHTML.slice(1,this.price[i].innerHTML.length)))
                    // console.log(that.getdata.children[i].children[3].children[0])
                    // console.log(that.price[i])
                }

                that.cash.innerHTML = "￥" + sum.toFixed(2);
            }

            //-------------------删除商品功能----------------------------------------------

        }, {
            key: "delPro",
            value: function delPro() {
                var that = this;
                this.cartlist.addEventListener("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if (target.classList.contains("fa-trash-o")) {
                        var src = target.parentNode.parentNode.children[1].children[0].src;
                        that.cookie.forEach(function (val, index, arr) {
                            if (val.proImg == src) {
                                arr.splice(index, 1);
                            }
                        });
                        setCookie("cartcookie", JSON.stringify(that.cookie));
                        // console.log(that.cookie)
                        target.parentNode.parentNode.remove();
                        that.comSum();
                    }
                });
            }
            //--------------------选中商品----------------------------------------------

        }, {
            key: "choose",
            value: function choose() {
                // console.log(this.label)
                var that = this;
                this.cartlist.addEventListener("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if (target.classList.contains("marklabel")) {
                        // target.classList.contains("active") ? target.classList.remove("active") : target.classList.add("active");
                        target.classList.toggle("active");
                    }
                    if (target.classList.contains("chAllLab")) {
                        if (target.classList.contains("active")) {
                            target.classList.remove("active");
                            for (var i = 2; i < that.label.length - 1; i++) {
                                that.label[i].classList.remove("active");
                                that.label[i].nextElementSibling.checked = false;
                            }
                        } else {
                            target.classList.add("active");
                            for (var _i = 2; _i < that.label.length - 1; _i++) {
                                that.label[_i].classList.add("active");
                                that.label[_i].nextElementSibling.checked = true;
                            }
                        }
                    }
                });
            }
        }]);

        return cart;
    }();
});
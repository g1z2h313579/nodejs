"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

    var wait = new Promise(function (resolve, reject) {

        $(".thead").load("../html/top.html", function () {
            resolve();
        });
        $(".footer").load("../html/foot.html");
        $(".bottom_box").load("../html/bottom.html");
    });

    wait.then(function () {
        // console.log("传入数据成功");
        //----------------------设置当前--------------------------------------
        document.querySelector("#life_nav").className = "active";
        //------------------数据处理类------------------------------------------
        new HandleData();
    });

    var HandleData = function () {
        function HandleData() {
            _classCallCheck(this, HandleData);

            this.catalog = document.querySelector(".catalog_box");
            this.cata_bottom = document.querySelector("#cata_bottom");
            this.getdata();
        }

        //-----------------导入数据-------------------------------------------


        _createClass(HandleData, [{
            key: "getdata",
            value: function getdata() {
                var that = this;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        that.success(xhr.responseText);
                    }
                };
                xhr.open("get", "../data/pro_data.json");
                xhr.send();
            }

            //-------------------处理数据--------------------

        }, {
            key: "success",
            value: function success(res) {
                this.res = JSON.parse(res);
                this.gameName = [];
                this.protyle = [];
                this.protyleStyle = [];
                var that = this;

                // ---------------------------处理产品列表数据-----------------------------------
                for (var i in this.res[0]) {
                    // console.log(this.res[0][i])
                    this.res[0][i].forEach(function (val, index, arr) {
                        // console.log(val)
                        for (var j in val) {
                            // console.log(j);//游戏名:全部，魔兽世界，守望先锋......
                            that.gameName.push(j);
                        }
                    });
                }

                for (var i in this.res[1]) {
                    // console.log(this.res[0][i])
                    this.res[1][i].forEach(function (val, index, arr) {
                        // console.log(val)
                        for (var j in val) {
                            // console.log(val);//商品类别：家居生活，手办模型...... 
                            that.protyle.push(j);
                            that.protyleStyle.push(val[j]);
                        }
                    });
                }
                var life = [];
                this.protyleArr = [];
                this.protyleStyle[1].forEach(function (val) {
                    for (var k in val) {
                        // console.log(k)
                        life.push(k);
                    }
                });
                this.protyleStyle.forEach(function (val) {
                    that.protyleArr.push(val);
                });
                this.protyleArr.splice(1, 1, life);

                // console.log(this.protyleArr);
                // console.log(this.protyle);//(7) ["全部", "居家生活", "手办模型", "数码外设", "配饰挂件", "服装服饰", "图书文具"]
                // console.log(this.protyleStyle);// [Array(1), Array(10), Array(6), Array(5), Array(7), Array(4), Array(4)]
                // // console.log(this.gameName);//全部，魔兽世界，守望先锋......
                this.renderindex();
                //-----------------------------产品列表数据处理结束--------------------------------------------

                //-----------------------------处理产品数据-----------------------------------------------
                // console.log(this.res[0].gameName[0]);
                this.gamedata = [];
                this.res[0].gameName.forEach(function (val) {
                    for (var _i in val) {
                        that.gamedata.push(val[_i]);
                    }
                });
                // console.log(this.gamedata);//所有游戏相关产品数据
                this.renderdata();
            }

            //----------------------渲染产品列表--------------------------------------

        }, {
            key: "renderindex",
            value: function renderindex() {
                // console.log(this.protyleStyle);
                var gameNamestr = "";
                for (var i = 0; i < this.gameName.length; i++) {
                    gameNamestr += "<li>" + this.gameName[i] + "</li>";
                }
                // console.log(gameNamestr);
                gameNamestr = "<li>\u6E38\u620F</li>" + gameNamestr + "<li>&nbsp</li>";
                this.gameNameul = document.createElement("ul");
                this.gameNameul.innerHTML = gameNamestr;
                // console.log(gameNamestr);//游戏数据遍历成功
                //把元素插入页面内，insertBefore插到this.cata_bottom之前
                this.catalog.insertBefore(this.gameNameul, this.cata_bottom);

                var protylestr = "";
                for (var _i2 = 0; _i2 < this.protyle.length; _i2++) {
                    protylestr += "<li>" + this.protyle[_i2] + "<span class=\"fa fa-angle-down\"></span></li>";
                }
                protylestr = "<li>\u5546\u54C1\u7C7B\u522B</li>" + protylestr;

                this.protyleul = document.createElement("ul");
                this.protyleul.innerHTML = protylestr;
                this.catalog.insertBefore(this.protyleul, this.cata_bottom);

                var protylestr2 = "";
                for (var _i3 = 1; _i3 < this.protyleArr.length; _i3++) {
                    protylestr2 += "<ul><li>&nbsp;</li>";
                    for (var j = 0; j < this.protyleArr[_i3].length; j++) {
                        protylestr2 += "<li>" + this.protyleArr[_i3][j] + "</li>";
                    }
                    protylestr2 += "</ul>";
                }
                // console.log(protylestr2);
                this.xi = document.createElement("div");
                this.xi.className = "xi";
                this.xi.innerHTML = protylestr2;
                this.catalog.insertBefore(this.xi, this.cata_bottom);

                this.checkindex();
            }

            //-----------------产品列表选择事件-------------------------------------------

        }, {
            key: "checkindex",
            value: function checkindex() {
                var _this = this;

                // console.log(this.protyleul);
                // console.log(this.xi)
                var that = this;
                // console.log(this.protyleul)

                var _loop = function _loop(i) {
                    _this.protyleul.children[i].onclick = function () {
                        for (var j = 0; j < that.xi.children.length; j++) {
                            that.xi.children[j].style.display = "none";
                        };
                        that.xi.children[i - 2].style.display = "block";
                        for (var k = 2; k < that.protyleul.children.length; k++) {
                            that.protyleul.children[k].className = "";
                        }
                        this.className = "active";
                        // console.log(i);
                        // console.log(that.xi.children[i-2])
                    };
                };

                for (var i = 2; i < this.protyleul.children.length; i++) {
                    _loop(i);
                }
            }

            //--------------------渲染数据----------------------------------------

        }, {
            key: "renderdata",
            value: function renderdata() {
                var prodata = "";
                for (var i = 0; i < this.gamedata[0].length; i++) {
                    prodata += "<li>\n                                <img src=\"" + this.gamedata[0][i].proImg + "\" alt=\"\">\n                                <p>" + this.gamedata[0][i].proDec + "</p>\n                                <span>\u5546\u57CE\u4EF7\uFF1A<span id=\"price\">" + this.gamedata[0][i].proPrice + "</span></span>\n                            </li>";
                }
                prodata = "<ul>" + prodata + "</ul>";
                this.pro = document.querySelector(".pro");
                this.pro.innerHTML = prodata;
                this.todetail();
            }

            //-------------------点击产品前往详情页数据-----------------------------------------

        }, {
            key: "todetail",
            value: function todetail() {
                // console.log(this.pro.children[0].children)
                this.goodimg = [];
                var that = this;
                this.pro.children[0].addEventListener("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if (target.tagName == "IMG") {
                        if (getCookie("goods") === "") {
                            that.goodimg.push({
                                proImg: target.src,
                                proDec: target.nextElementSibling.innerHTML,
                                price: target.nextElementSibling.nextElementSibling.children[0].innerHTML
                            });
                            var goodimg = JSON.stringify(that.goodimg);
                            // console.log(goodimg)
                            setCookie("goods", goodimg);
                            location.href = "detail.html";
                        } else {
                            var goodstr = JSON.parse(getCookie("goods"));
                            goodstr.push({
                                proImg: target.src,
                                proDec: target.nextElementSibling.innerHTML,
                                price: target.nextElementSibling.nextElementSibling.children[0].innerHTML
                            });
                            var _goodimg = JSON.stringify(goodstr);
                            setCookie("goods", _goodimg);
                            location.href = "detail.html";
                        }
                    }
                });
            }
        }]);

        return HandleData;
    }();
});
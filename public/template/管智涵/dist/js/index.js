"use strict";

$(function () {
    $(".banner").banner({
        img: $(".banner .imgbox").children(),
        btn_left: $(".banner #left"),
        btn_right: $(".banner #right"),
        list: $(".banner .list-top").children(),
        autoPlay: true,
        changeSpeed: 200,
        pauseTime: 2000
    });

    $(".thead").load("../html/top.html");
    $(".bottom_box").load("../html/bottom.html");
    $(".footer").load("../html/foot.html");
    $(".sider_box").load("../html/sider.html");

    //------------------建立点击切换图片插件------------------------------------------
    $.extend($.fn, {
        zbImgMove: function zbImgMove(options) {
            this.btn_l = options.bth_l;
            // console.log(this.btn_l)
            this.btn_r = options.btn_r;
            this.img = options.img;
            // console.log(this.btn_l)
            this.index = 0;
            this.margin = parseInt(getComputedStyle(options.img.children().eq(0)[0]).marginRight);
            // console.log(getComputedStyle(options.img.children().eq(0)[0]).marginRight)
            var that = this;

            function init() {
                that.btn_l.click(function () {
                    if (that.index <= 4 - that.img.children().length) {
                        that.img.css("left", 0);
                        that.index = -1;
                        imgMove(that.index);
                    } else {
                        that.index--;
                        imgMove(that.index);
                    }
                });

                that.btn_r.click(function () {
                    if (that.index >= 0) {
                        that.img.css("left", (4 - that.img.children().length) * (that.img.children().eq(0).width() + that.margin));
                        that.index = 4 - that.img.children().length + 1;
                        imgMove(that.index);
                    } else {
                        that.index++;
                        imgMove(that.index);
                    }
                });
            }
            function imgMove(i) {
                that.img.stop().animate({ left: i * (that.img.children().eq(0).width() + that.margin) }, 300);
            }

            init();
        }
    });
    //--------------调用插件----------------------------------------------
    $(".zb_box").zbImgMove({
        bth_l: $(".zhoubian .btn_left"),
        btn_r: $(".zhoubian .btn_right"),
        img: $(".zhoubian .zb_box ul")
    });

    $(".life").zbImgMove({
        bth_l: $(".life .pro_btn.pro_btn_left"),
        btn_r: $(".life .pro_btn.pro_btn_right"),
        img: $(".life .pro_switch ul")
    });

    $(".digital").zbImgMove({
        bth_l: $(".digital .pro_btn.pro_btn_left"),
        btn_r: $(".digital .pro_btn.pro_btn_right"),
        img: $(".digital .pro_switch ul")
    });
    $(".pendant").zbImgMove({
        bth_l: $(".pendant .pro_btn.pro_btn_left"),
        btn_r: $(".pendant .pro_btn.pro_btn_right"),
        img: $(".pendant .pro_switch ul")
    });
    $(".cloth").zbImgMove({
        bth_l: $(".cloth .pro_btn.pro_btn_left"),
        btn_r: $(".cloth .pro_btn.pro_btn_right"),
        img: $(".cloth .pro_switch ul")
    });
    $(".book").zbImgMove({
        bth_l: $(".book .pro_btn.pro_btn_left"),
        btn_r: $(".book .pro_btn.pro_btn_right"),
        img: $(".book .pro_switch ul")
    });
    $(".module").zbImgMove({
        bth_l: $(".module .pro_btn.pro_btn_left"),
        btn_r: $(".module .pro_btn.pro_btn_right"),
        img: $(".module .pro_switch ul")
    });

    //--------------回到顶部----------------------------------------------
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
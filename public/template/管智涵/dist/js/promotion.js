"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var wait = new Promise(function (resolve) {
        $(".thead").load("../html/top.html", function () {
            resolve();
        });
        $(".footer").load("../html/foot.html");
    });

    wait.then(function () {
        new Promotion({
            day: $("#day"),
            hour: $("#hour"),
            min: $("#min"),
            sec: $("#sec"),
            dur: "2019-2-29 16:54:00", //时间
            btn: $("#qg"),
            onoff: true //到点使按钮disabled
        });

        new Promotion({
            day: $("#day2"),
            hour: $("#hour2"),
            min: $("#min2"),
            sec: $("#sec2"),
            dur: "2019-2-29 16:54:00", //时间
            btn: $("#ms"),
            onoff: false //到点使按钮abled
        });
    });

    var Promotion = function () {
        function Promotion(opt) {
            _classCallCheck(this, Promotion);

            this.day = opt.day;
            this.hour = opt.hour;
            this.min = opt.min;
            this.sec = opt.sec;
            this.btn = opt.btn;
            this.dur = opt.dur;
            this.onoff = opt.onoff;
            this.init();
            this.comTime();
        }
        //-------------解析时间 -----------------------


        _createClass(Promotion, [{
            key: "init",
            value: function init() {
                //传入时间
                this.time = new Date(this.dur);
                this.timeStamp = this.time.getTime();
                this.btn.click(function () {
                    alert("抢到啦！");
                });
                this.countdown();
            }
        }, {
            key: "comTime",
            value: function comTime() {
                this.now = new Date();
                this.nowTime = this.now.getTime();

                //--------------------取差分时间----------------------------
                this.thrTime = this.timeStamp - this.nowTime;
                if (this.thrTime >= 0) {
                    this.d = parseInt(this.thrTime / 1000 / 60 / 60 / 24);
                    this.h = parseInt((this.thrTime / 1000 / 60 / 60 / 24 - this.d) * 24);
                    this.m = parseInt(((this.thrTime / 1000 / 60 / 60 / 24 - this.d) * 24 - this.h) * 60);
                    this.s = parseInt((((this.thrTime / 1000 / 60 / 60 / 24 - this.d) * 24 - this.h) * 60 - this.m) * 60);
                    this.day.html(Math.abs(this.d));
                    this.hour.html(Math.abs(this.h));
                    this.min.html(Math.abs(this.m));
                    this.sec.html(Math.abs(this.s));
                }
            }

            //----------------------倒计时--------------------------------------

        }, {
            key: "countdown",
            value: function countdown() {
                var _this = this;

                var timer = setInterval(function () {
                    _this.comTime();
                    if (_this.d == 0 && _this.h == 0 && _this.m == 0 && _this.s == 0) {
                        // console.log(1)
                        if (_this.onoff == true) {
                            console.log(_this.btn);
                            _this.btn.attr("disabled", "disabled");
                            _this.btn.get(0).className = "disabled";
                        } else if (_this.onoff == false) {
                            _this.btn.removeAttr("disabled").removeClass("disabled").addClass("ms");
                        }
                        clearInterval(timer);
                    }
                }, 1000);
            }
        }]);

        return Promotion;
    }();
});
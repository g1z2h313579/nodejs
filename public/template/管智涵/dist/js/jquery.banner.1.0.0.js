"use strict";

$(function () {
    "use strict";

    $.extend($.fn, {
        banner: function banner(options) {
            this.infoPlace = {
                img: options.img,
                btn_left: options.btn_left == undefined ? null : options.btn_left.length > 0 ? options.btn_left : null,
                btn_right: options.btn_right == undefined ? null : options.btn_right.length > 0 ? options.btn_right : null,
                list: options.list == undefined ? null : options.list.length > 0 ? options.list : null,
                autoPlay: options.autoPlay == undefined ? true : options.autoPlay == false ? false : true,
                changeSpeed: options.changeSpeed == undefined ? 300 : $.isNumeric(options.changeSpeed) == true ? options.changeSpeed : 300,
                pauseTime: options.pauseTime == undefined ? 1000 : $.isNumeric(options.pauseTime) == true ? options.pauseTime : 1000,
                index: 0
                // console.log(options.btn_left.length)

            };var that = this;
            var imgw = this.infoPlace.img.eq(0).width();
            var listw = this.infoPlace.list.parent().width() / this.infoPlace.img.length;
            //list
            // console.log(options.list)
            if (this.infoPlace.list !== null) {
                this.infoPlace.list.on("click", function () {
                    function imgMove(index, type) {
                        that.infoPlace.img.eq(index).css({ left: imgw * type }).stop().animate({ left: 0 }, that.infoPlace.changeSpeed).end().eq(that.infoPlace.index).stop().animate({ left: -imgw * type }, that.infoPlace.changeSpeed);
                        that.infoPlace.index = index;
                        that.infoPlace.list.parent().next().stop().animate({ left: index * listw });
                    }
                    if (that.infoPlace.index < $(this).index()) {
                        imgMove($(this).index(), 1);
                    }
                    if (that.infoPlace.index > $(this).index()) {
                        imgMove($(this).index(), -1);
                    }
                });
            }

            if (this.infoPlace.btn_left !== null && this.infoPlace.btn_right !== null) {
                this.infoPlace.btn_left.on("click", function () {
                    function imgMove(index, type) {
                        that.infoPlace.img.eq(index).stop().animate({ left: imgw * type }, that.infoPlace.changeSpeed).end().eq(index - 1).css({ left: -imgw * type }).stop().animate({ left: 0 }, that.infoPlace.changeSpeed);
                        if (that.infoPlace.list !== null) {
                            that.infoPlace.list.parent().next().stop().animate({ left: (index - 1 < 0 ? that.infoPlace.img.length - 1 : index - 1) * listw });
                        }
                    }
                    // console.log("左：",that.infoPlace.index)
                    if (that.infoPlace.index > 0) {
                        imgMove(that.infoPlace.index, 1);
                        that.infoPlace.index--;
                    } else {
                        // console.log(that.infoPlace.index)
                        imgMove(that.infoPlace.index, 1);
                        that.infoPlace.index = that.infoPlace.img.length - 1;
                    }
                });

                this.infoPlace.btn_right.on("click", function () {
                    function imgMove(index) {
                        that.infoPlace.img.eq(index).stop().animate({ left: -imgw }, that.infoPlace.changeSpeed).end().eq(index + 1 - that.infoPlace.img.length).css({ left: imgw }).stop().animate({ left: 0 }, that.infoPlace.changeSpeed);
                        if (that.infoPlace.list !== null) {
                            that.infoPlace.list.parent().next().stop().animate({ left: (index + 1 >= that.infoPlace.img.length ? 0 : index + 1) * listw });
                        }
                    }
                    // console.log("右：",that.infoPlace.index)
                    if (that.infoPlace.index < that.infoPlace.img.length - 1) {
                        imgMove(that.infoPlace.index);
                        that.infoPlace.index++;
                    } else {
                        // console.log(that.infoPlace.index)
                        imgMove(that.infoPlace.index);
                        that.infoPlace.index = 0;
                    }
                });
            }

            function autoMove() {
                that.infoPlace.img.eq(that.infoPlace.index).stop().animate({ left: -imgw }, that.infoPlace.changeSpeed).end().eq(that.infoPlace.index + 1 - that.infoPlace.img.length).css({ left: imgw }).stop().animate({ left: 0 }, that.infoPlace.changeSpeed);
                if (that.infoPlace.list !== null) {
                    that.infoPlace.list.parent().next().stop().animate({ left: (that.infoPlace.index + 1 >= that.infoPlace.img.length ? 0 : that.infoPlace.index + 1) * listw });
                }
                if (that.infoPlace.index >= that.infoPlace.img.length - 1) {
                    that.infoPlace.index = 0;
                } else {
                    that.infoPlace.index++;
                }
                // console.log(that.infoPlace.index)
            }
            this.infoPlace.timer = setInterval(autoMove, this.infoPlace.pauseTime);

            if (this.infoPlace.autoPlay !== false) {
                $(this).hover(function () {
                    clearInterval(that.infoPlace.timer);
                }, function () {
                    that.infoPlace.timer = setInterval(autoMove, that.infoPlace.pauseTime);
                });
            }

            return this;
        }
    });
});
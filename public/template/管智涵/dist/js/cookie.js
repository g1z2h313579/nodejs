"use strict";

//设置cookie
function setCookie(key, value, day) {
    var d = new Date();
    d.setDate(d.getDate() + day);
    document.cookie = key + "=" + value + ";expires" + d;
}

//查找cookie
function getCookie(key) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].split("=")[0] == key) {
            return arr[i].split("=")[1];
        }
    }
    return "";
}

//删除cookie
function removeCookie(key) {
    setCookie(key, "123", -1);
}
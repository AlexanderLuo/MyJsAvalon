/**
 * Copyright by Alexrander Luo.
 * Create Date 2016/11/8
 * Email 496952252@qq.com
 */
(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser globals (with support for web workers)
        var glob;

        try {
            glob = window;
        } catch (e) {
            glob = self;
        }

        glob.regTool = factory();
    }
}(function (undefined) {
    'use strict';

    var regTool={
        phone:function(str){
            var ph=/^1[34578]\d{9}$/;
            return ph.test(str)
        },
        email:function(str){
            var em=/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
            return em.test(str)
        },
        idCard:function(str){
            //15 或者 18 位数字
            var id15=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
            var id18=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            var out=id15.test(str) || id18.test(str);
            return out;
        }

    }

    return regTool;
}));


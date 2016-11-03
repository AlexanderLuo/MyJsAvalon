/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/27
 * Email 496952252@qq.com
 */


var html="../admin/doc/comp/";
var js="../admin/doc/comp/";

define([
    "text!"+html+"adddoc.html",
    "text!"+html+"datalist.html",
    "text!"+html+"deldoc.html",
    "text!"+html+"guide.html",
    "text!"+html+"pager.html",
    "text!"+html+"searchbox.html",
    ], function (a,b,c,d,e,f) {
    var tmp={
        adddoc:a,
        datalist:b,
        deldoc:c,
        guide:d,
        pager:e,
        searchbox:f
    }

    return tmp;
})
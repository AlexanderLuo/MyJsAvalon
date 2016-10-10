/*********************************************************************
 *                    全局变量 及方法                                *
 **********************************************************************/
//key值
var chengjiUrl = "";
//身份字典
var tagNameAndNum = {
    "教师": "1",
    "家长": "2",
    "学生": "4",
    "教育机构": "8",
    "1": "教师",
    "4": "学生",
    "2": "家长",
    "8": "教育机构"
};
//星期列表
var timeDay = {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
};

var THIRDCONFIG="thirdConfig";

//loading
var loadIndex;
var openLoading = function () {
    loadIndex = layer.load(1, {
        shade: [0.3, '#000'],
        area: '64px'
    });
};
var closeLoading = function () {
    layer.close(loadIndex);
};
//时间长度
var timeLength = function (param) {
    param += "";
    return param.length === 2 ? param : "0" + param;
};
//将时间戳改成年月日时分秒
var timeFormat = function (ms, showDay) {
    if (typeof ms == 'string') {
        ms = parseInt(ms);
    }
    var timeLocal = new Date(ms);
    var year = timeLocal.getYear() + 1900;
    var month = timeLength(timeLocal.getMonth() + 1);
    var day = timeLength(timeLocal.getDate());
    var hour = timeLength(timeLocal.getHours());
    var minutes = timeLength(timeLocal.getMinutes());
    var second = timeLength(timeLocal.getSeconds());
    var weekDay = timeDay[timeLocal.getDay()];

    if (!showDay) {
        var timeNew = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
    }
    else {
        var timeNew = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second + " " + weekDay;
    }

    return timeNew;
};
//是否成功返回
var isSuccess = function (rtnCode) {
    return "0000000" == rtnCode;
};

//验证返回内容
var validateResponse = function(data) {
    if(data.rtnCode=="0000001"){//登录无效
        layer.alert("获取用户信息失效，请重新登录！");
        return false;
    }
    return isSuccess(data.rtnCode);
};

/*********************************************************************
 *                    扩展方法                                  *
 **********************************************************************/
// js中String添加replaceAll 方法
String.prototype.replaceAll = function (a, b) {
    var reg = new RegExp(a, "g");
    return this.replace(reg, b);
};
// js中String添加startWith方法
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
// js中String添加endWith方法
String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
};
$.extend({
    //是否为空
    isNull: function (obj) {
        if (typeof(obj) == "undefined" || obj == "undefined") {
            return true;
        } else {
            return obj == null ? true : false;
        }
    },
    //获取IE版本
    msieVersion: function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0)      // If Internet Explorer, return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))
        else                 // If another browser, return 0
            return 0
    },
    //是否IE
    isIE: function () {
        return $.msieVersion() > 0 ? true : false;
    },
    //扩展兼容主流浏览器ajax（兼容IE8+、chrome、firefox...）
    ajaxFun: function (options) {
        //IE版本
        var msieVersion = $.msieVersion.call(this);
        // 设置默认参数
        var settings = $.extend({
            url: '',
            isPlain: true,      //content-type是否为空text/plain
            isXhr: false,    //检查跨域头（主平台）
            data: {},
            type: 'get',
            dataType: 'json',
            onSuccess: function (data) {
            },
            onError: function (data) {
            }
        }, options);
        settings.isCrossDomain = false;
        //http开头，默认外链
        if (settings.url.startWith("http")) {
            settings.isCrossDomain = true;
        }
        //IE浏览器（IE10以下）并且跨域请求
        if ($.isIE.call(this) && settings.isCrossDomain && msieVersion <= 9) {
            if (!settings.isPlain) {
                settings.type = "get";
            }
            // IE7 and lower can't do cross domain
            if (msieVersion <= 7) {
                alert("不支持IE8以下浏览器，请升级浏览器版本！");
                return;
            }
            // IE8 & 9 only Cross domain  request
            if (msieVersion == 8 || msieVersion == 9) {
                var xdr = new XDomainRequest(); // Use Microsoft XDR
                if (settings.type.toLocaleLowerCase() == "get") {
                    settings.url += ( ( /\?/ ).test(settings.url) ? "&" : "?") + $.param(settings.data);
                }
                xdr.open(settings.type, settings.url);
                xdr.onload = function () {
                    var dom = new ActiveXObject('Microsoft.XMLDOM'),
                        JSON = $.parseJSON(xdr.responseText);
                    dom.async = false;
                    if (JSON == null || typeof (JSON) == 'undefined') {
                        JSON = $.parseJSON(data.firstChild.textContent);
                    }
                    settings.onSuccess.call(this, JSON);
                };
                xdr.onerror = function (e) {
                    settings.onError.call(this, {});
                };
                xdr.send($.param(settings.data));
            }
        }
        //普通方式
        else {
            $.ajax({
                url: settings.url,
                type: settings.type,
                data: settings.data,
                cache: false,
                dataType: settings.dataType,
                xhrFields: {
                    withCredentials: settings.isXhr
                },
                success: function (data) {
                    settings.onSuccess.call(this, data);
                },
                error: function (data) {
                    avalon.log(data)
                    settings.onError.call(this, data);
                }
            });
        }
    }
});
/*********************************************************************
 *                    公用方法                                  *
 **********************************************************************/
function setCookie(name, value, iDay){

    /* iDay 表示过期时间

     cookie中 = 号表示添加，不是赋值 */

    var oDate=new Date();

    oDate.setDate(oDate.getDate()+iDay);

    document.cookie=name+'='+value+';expires='+oDate;

}

//设置本地存储
var setLocalValue = function(itemName,itemValue){
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    } else {
        Cookie.write(itemName, JSON.stringify(itemValue));
    }
};

//设置本地存储
var removeLocalValue = function(itemName){
    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.removeItem(itemName);
    } else {
        /* -1 天后过期即删除 */
        setCookie(name, 1, -1);
    }
};
//获得本地存储
var getLocalValue = function(item,key){
    if(key==undefined) {
        return JSON.parse(window.localStorage ? localStorage.getItem(item) : Cookie.read(item));
    }else{
        return JSON.parse(window.localStorage ? localStorage.getItem(item) : Cookie.read(item))[key];
    }
};

//获取用户信息并设置在本地存储
var getUserInfo = function (callback) {
    $.ajaxFun({
        url: '/sso/getUserInfo',//"/sso/getUserInfo",
        onSuccess: function (data) {
            if(validateResponse(data)){
                setLocalValue("account",data.bizData.account);
                setLocalValue("usertype",{ type: data.bizData.usertype });
                setLocalValue("isAdmin",{ type: data.bizData["isAdmin"] || false});
                setLocalValue("projectInfo",data.bizData.projectInfo);
                setLocalValue("token", data.bizData.token);
                if(callback)callback();
            } else {
                layer.open({ content: "获取用户信息失败，请确认是否已登录", shadeClose: false });
            }
        },
        onError: function(data){
            layer.open({ content: "获取用户信息失败，请确认是否已登录", shadeClose: false });
        }
    });
};

//弹窗公共方法
var layerOpen = function(url,tilte,width,height,callback){
    layer.open({
        type: 2,
        title: tilte,
        shade : 0.7,
        maxmin: true, //开启最大化最小化按钮
        area: [width+'px', height+'px'],
        content: url,
        end:function(index, layero){
            if(callback)callback();
            layer.close(index);
        }
    });
};
//弹窗公共方法
var layerModel = function (url, width, height, callback) {
    layer.open({
        type: 2,
        title: tilte,
        shade : 0.7,
        maxmin: true, //开启最大化最小化按钮
        area: [width+'px', height || '90%'],
        content: url,
        end:function(index, layero){
            if(callback)callback();
            layer.close(index);
        }
    });
}

//弹窗关闭公共方法
var layerClose = function(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
};

//读取公共配置项，如果没有则读取本机配置项
var getCommonConfigFun = function(){
    $.ajax({
        url:'/commonConfig.json',
        type :'get',
        cache : false,
        dataType:"json",
        success : function(res){
            getCloudConfig(res["cloudyDisk"]);
            setLocalValue("cloudyDisk",res["cloudyDisk"]);
            setLocalValue("ssoResource", res["ssoResource"]);
        },
        error : function(res){
            justForMeFun();
        }
    });
};

var getCloudConfig = function(url){
    $.ajax({
        url:'/config/thirdConfig.json',
        type :'get',
        cache : false,
        dataType:"json",
        success : function(res){
            for ( var key in res ){
                res[key]=url+res[key];
            }
            setLocalValue("thirdConfig",res);
        }
    });
}

//本地私有配置项
var justForMeFun = function(){
    $.ajax({
        url: '/config/configForMe.json',
        type: 'get',
        cache: false,
        dataType: "json",
        success: function (res) {
            getCloudConfig(res["cloudyDisk"]);
            setLocalValue("cloudyDisk",res["cloudyDisk"]);
            setLocalValue("ssoResource", res["ssoResource"]);
        },
        error: function (res) {
            console.log("res", res);
        }
    });
};

//获取url地址栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}


// 获取cookie
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//根据id获取云盘文件信息
function getCloudFileById(){
    var callback,id;
    for(var i in arguments){
        var el=arguments[i];
        callback=avalon.isFunction(el)?el:callback;
        id=avalon.type(el)=="number"?el:id;
    }
    if(callback&&id){
        $.ajaxFun({
            url: JSON.parse(localStorage.getItem(THIRDCONFIG))["cloudyDiskfetchOneFile"],
            type: 'post',
            isXhr: true,
            isPlain: false,
            data: {
                'fileId': id
            },
            onSuccess: function (res) {
                callback(res);
            }
        });
    }
}

/**
 * 初始化页面头部信息
 * @param vmModel
 * @param callback
 */
function initUserInfo(vmModel,callback){
    var accountType = "";
	vmModel.icon = getLocalValue("projectInfo","icon");
    vmModel.schoolName = getLocalValue("account", "schoolName");
    vmModel.userName = getLocalValue("account", "name");
    vmModel.accountType = accountType = getLocalValue("usertype", "type");
    /** validateAccount.switchAccountDesc **/
    vmModel.accountName = switchAccountDesc(parseInt(accountType));
    vmModel.returnUrl = getLocalValue("projectInfo", "returnUrl")
        + "?access_token=" + getLocalValue("token")
        + "&usertype=" + getLocalValue("usertype")
        + "&uid=" + getLocalValue("account","uid")
        + "&schoolCode=" + getLocalValue("account","schoolCode")
        + "&agencyCode=" + getLocalValue("account","agencyCode");
    vmModel.copyRight = getLocalValue("projectInfo", "copyRight");

    callback ? callback() : "";
}

Array.prototype.arrUniq = function() {
    var temp,arrVal,
        array = this,
        arrClone = array.concat(),//克隆数组
        typeArr = {//数组原型
            'obj' : '[object Object]',
            'fun' : '[object Function]',
            'arr' : '[object Array]',
            'num' : '[object Number]'
        },
        ent = /(\u3000|\s|\t)*(\n)+(\u3000|\s|\t)*/gi;//空白字符正则

    //把数组中的object和function转换为字符串形式
    for(var i = arrClone.length; i--;){
        arrVal = arrClone[i];
        temp = Object.prototype.toString.call(arrVal);

        if(temp == typeArr['num'] && arrVal.toString() == 'NaN'){
            arrClone[i] = arrVal.toString();
        }

        if(temp == typeArr['obj']){
            arrClone[i] = JSON.stringify(arrVal);
        }

        if(temp == typeArr['fun']){
            arrClone[i] = arrVal.toString().replace(ent,'');
        }
    }

    //去重关键步骤
    for (var i = arrClone.length; i--;) {
        arrVal = arrClone[i];
        temp = Object.prototype.toString.call(arrVal);

        if(temp == typeArr['arr']) arrVal.arrUniq();//如果数组中有数组，则递归
        if (arrClone.indexOf(arrVal) != arrClone.lastIndexOf(arrVal)) {//如果有重复的，则去重
            array.splice(i,1);
            arrClone.splice(i, 1);
        }
        else{
            if(Object.prototype.toString.call(array[i]) != temp){
                //检查现在数组和原始数组的值类型是否相同，如果不同则用原数组中的替换，原因是原数组经过了字符串变换
                arrClone[i] = array[i];
            }
        }
    }
    return arrClone;
};
// 下载地址
function downloadTemplate(){
    window.open("/excelTemplate/teacherBaseTEMP.xlsx");
   // window.location.href = downloadUrl;
}

// 获取中文的字节
function GetCharLength(str) {
    var iLength = 0;
    for(var i = 0;i<str.length;i++) {
        if(str.charCodeAt(i) >255) {
            iLength += 2;
        } else {
            iLength += 1;
        }
    }
    return iLength;
}
// 默认获取当天日期 isC为true 获取次日日期
function GetCurrentTime(flag,isC) {
    var currentTime = "";
    var myDate = new Date();
    !!isC && myDate.setDate(myDate.getDate()+1);//获取AddDayCount天后的日期
    var year = myDate.getFullYear();
    var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1
    if (month < 10) {
        month = "0" + month.toString();
    }
    var date = myDate.getDate();
    if (date < 10) {
        date = "0" + date.toString();
    }
    var hour = myDate.getHours();
    if (hour < 10) {
        hour = "0" + hour.toString();
    }
    var minute = myDate.getMinutes();
    if (minute < 10) {
        minute = "0" + minute.toString();
    }
    var second = myDate.getSeconds();
    if (second < 10) {
        second = "0" + second.toString();
    }
    if(flag == "0")
    {
        currentTime = year.toString() + month.toString() + date.toString() + hour.toString() + minute.toString() + second.toString(); //返回时间的数字组合
    }
    else if(flag == "1")
    {
        currentTime = year.toString() + "-" + month.toString() + "-" + date.toString() + " " + hour.toString() + ":" + minute.toString(); //以时间格式返回
    }
    return currentTime;
}
// 日期转换为 时间戳
function processDate(stringTime){
    stringTime = stringTime+":00";
    //格式化数据
    var re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(stringTime);
    return new Date(re[1],(re[2]||1)-1,re[3]||1,re[4]||0,re[5]||0,re[6]||0).getTime();
};

//将时间戳改成年月日时分秒
function formatDate(str)   {
    var now = new Date(str);
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();

    if(month<10){
        month = "0" + month;
    }

    if(date<10){
        date = "0" + date;
    }

    return year+"-"+month+"-"+date+" "+hour+":"+minute;

};
function stringToDate(str){
    var now = new Date(str);
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    }
    return year+"-"+month+"-"+date+" "+hour+":"+minute;
}
/**参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标中文个数 默认6个中文
 * 返回值： 处理结果字符串
 */
function CutEllipsisString(str, len) {
    len = len*2 || 12;
    //length属性读出来的汉字长度为1
    if(GetCharLength(str) <= (len)) {
        return str;
    }
    var strzTemplen = 0;
    var s = "";
    for(var i = 0;i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strzTemplen = strzTemplen + 2;
            if(strzTemplen >= len){
                return s.substring(0,s.length-1) + "...";
            }
        } else {
            strzTemplen = strzTemplen + 1;
            if(strzTemplen >= len){
                return s.substring(0,s.length-2) + "...";
            }
        }
    }
    return s;
}
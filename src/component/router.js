/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/26
 * Email 496952252@qq.com
 */



//插槽组件,似乎更加灵活
define(["avalon"], function (avalon) {
    avalon.ui.router = function (element, data, vmodels) {

        var innerHTML = element.innerHTML
        avalon.clearHTML(element)

        var options=data.routerOptions;

        //可以设置tmp来源于外部，这样跳转可是设置一个函数封装，进行切面操作
        var model = avalon.define({
            $id: data.routerId,
            router: options
        })


        //scan处理
        avalon.nextTick(function () {
            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model//必须返回新VM
    }


    return avalon
})
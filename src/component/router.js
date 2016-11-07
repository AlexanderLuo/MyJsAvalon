/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/26
 * Email 496952252@qq.com
 */



define(["avalon"], function (avalon) {
    avalon.ui.router = function (element, data, vmodels) {

        var innerHTML = element.innerHTML
        avalon.clearHTML(element)

        var options=data.routerOptions;

        var model = avalon.define({
            $id: data.routerId,
            router: options
        })

        avalon.nextTick(function () {
            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model
    }
    return avalon
})
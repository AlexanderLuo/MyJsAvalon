/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/27
 * Email 496952252@qq.com
 */


define(["avalon"], function (avalon) {
    avalon.ui.checkbox = function (element, data, vmodels) {

        var options=data.checkboxOptions;

        var innerHTML = options.tmp


        var model = avalon.define({
            id: data.checkboxId,
            state: {
                rows:[],
                checkAll:false
            },
            checkOneFun: function(el){
                console.log("checkOne")
                el.check=!el.check;
                model.state.checkAll=model.state.rows.every(function(el){
                    return el.check==true;
                })
            },
            checkAllFun:function(){
                model.state.checkAll=!model.state.checkAll;
                model.state.rows.forEach(function(el){
                    el.check=model.state.checkAll
                })
            }
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
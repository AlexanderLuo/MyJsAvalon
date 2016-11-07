/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/24
 * Email 496952252@qq.com
 */

define(["avalon"], function(avalon) {

    avalon.ui.pager = function(element, data, vmodels) {

        var options=data.pagerOptions;
        var innerHTML = options.tmp

        var model = avalon.define({
            $id:data.pagerId,
            state:{
                page:1,
                total:0,
                records:0
            },
            plusProxy:function(page){
                var total=model.state.total;
                if(page<1 || page>total){
                    console.log("page illegal");
                    return ;
                }
                model.plus({page:page})
            },
            plus:options.plus
        })


        avalon.nextTick(function() {

            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model
    }


    return avalon
})
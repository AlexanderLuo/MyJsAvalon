/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/24
 * Email 496952252@qq.com
 */

define(["avalon"], function(avalon) {

    //    必须 在avalon.ui上注册一个函数，它有三个参数，分别为容器元素，data， vmodels
    avalon.ui.pager = function(element, data, vmodels) {



        var options=data.pagerOptions;

        var innerHTML = options.tmp


        //为模块构建新的Vm
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


        //scan处理
        avalon.nextTick(function() {
            //widget的VM已经生成，可以添加回去让它被扫描
            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model//必须返回新VM
    }


    return avalon//必须返回avalon
})
/**
 * Edit by Alexrander Luo.
 * Create Date 2016/11/7
 * Email 496952252@qq.com
 */


define(["avalon","../tool/regTool"], function (avalon,regTool) {
    avalon.ui.reginput = function (element, data, vmodels) {

        var options = data.reginputOptions;



        //$login:{
        //    tmp:tmp.login,
        //        state:{
        //        name:"",
        //            pass:""
        //    },
        //
        //    //业务：1.及时尾部更新一个标志flag
        //    //      2.整体触发判断,借助pubSub开一个错误栈
        //    reg:[
        //        {key:"name", is:"email", required:false,max:10,success:function(){console.log("ok")},fail:function(){console.log("fail")}},
        //        {key:"pass", is:"phone"}
        //    ]
        //
        //},



        var innerHTML = options.tmp;

        var model = avalon.define({
            $id: data.reginputId,
            listen:options.listen|| false,
            state: options.state,
            reg:options.reg,
        })

            model.reg.forEach(function(el){
                var key=el.key;
                var is=el.is;
                model.state.$watch(key,function(val,old){
                    if(el.required==false && val=="") {
                        el.legal=true;
                        return ;
                    }
                    el.legal=regTool[is](val) || false;
                    if(el.legal) el.success && el.success.call();
                    if(!el.legal) el.fail && el.fail.call();
                })
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
/**
 * Edit by Alexrander Luo.
 * Create Date 2016/10/24
 * Email 496952252@qq.com
 */

define(["avalon"], function(avalon) {

    //    ���� ��avalon.ui��ע��һ�����������������������ֱ�Ϊ����Ԫ�أ�data�� vmodels
    avalon.ui.pager = function(element, data, vmodels) {



        var options=data.pagerOptions;

        var innerHTML = options.tmp


        //Ϊģ�鹹���µ�Vm
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


        //scan����
        avalon.nextTick(function() {
            //widget��VM�Ѿ����ɣ�������ӻ�ȥ������ɨ��
            element.innerHTML = innerHTML
            avalon.scan(element, [model].concat(vmodels))
        })
        return model//���뷵����VM
    }


    return avalon//���뷵��avalon
})
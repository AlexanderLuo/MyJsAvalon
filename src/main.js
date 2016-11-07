/**
 * Edit by Alexrander Luo.
 * Create Date 2016/11/7
 * Email 496952252@qq.com
 */



require([
    "avalon",
    "../src/component/html/tmploader",
    "../src/tool/cp",
    "../src/component/pager",
    "../src/component/router"

], function(avalon,tmp,cp) {

    var indexPage= avalon.define({
        $id:"indexPage",
        $pager:{
            tmp:tmp.pager,
            plus:function(state){
                console.log(state)
            }
        },
        $url:{
            docIndex:"/html/adminIndex.html",
            contract:"/html/admin/contract/contract.html",
            statistics:"/html/admin/statistics/statistics.html",
            docInfo:"/html/admin/doc/docInfo.html",
            downloadTemplate:"/rsda/downloadDangan/downloadTemplate"
        },

        init:function(){
           console.log(1)
            console.log(indexPage.$pager.tmp)
        }

    });

    avalon.scan();
    indexPage.init();

})
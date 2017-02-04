/**
 * Created by Administrator on 2016/12/22 0022.
 */


var mark={}

mark.scan=function(elem){
    scanStart(elem)



}

function scanStart(elem){
    console.log(1111111111,elem)
    scanChild(elem)
}
function scanChild(parent){
    var node = parent.firstChild

    while (node) {
        console.log(222,node)
        var nextNode = node.nextSibling        // 广度优先的节点遍历
        //scanNode(node, node.nodeType, vmodels)
        node = nextNode
    }


}
function scanEnd(){

}
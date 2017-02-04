/**
 * Created by Administrator on 2016/12/22 0022.
 */

var mark={}

obj={
    id:"test",
    name:"luohao",
    job:"coder"
}





mark.define=function(obj){

    return modelFactory(obj)

}



function  modelFactory(obj){
    var keys=Object.keys(obj);
    var accessors=[];
    var descriptors={}
    var vmodel={}

    keys.forEach(function(name){
        accessors[name]=makeSimpleAccessor(name,obj[name])
        descriptors[name]={
            set:accessors[name],
            get:accessors[name]
        }
    })




    Object.defineProperties(vmodel,descriptors)

    de(vmodel)

    return vmodel

}



function makeSimpleAccessor(name,value){
    function accessor(value){
        //setter
        if(arguments.length>0){
            if(!isEqual(value,accessor.value)){
                //notify
                PubSub.publish("set")
            }
        }
        //getter
        else{
            PubSub.publish("get")
            return accessor.value
        }
    }
    accessor.value=value;
    accessor.name=name

    return accessor;

}









PubSub.subscribe("get",function(){
    de("getPublic")
})
PubSub.subscribe("set",function(){
    de("setPublic")
})

var re=mark.define(obj);
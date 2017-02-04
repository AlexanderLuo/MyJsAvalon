/**
 * Created by Administrator on 2016/12/21 0021.
 */


function $if(f){
    return new Slink(f);
}
function Slink(f){
    this.thens = [];
    this.thens.push(f);
}
Slink.prototype = {
    $elseIf: function(f){
        if(typeof f === 'function'){
            this.thens.push(f);
            return this;
        }
    },
    $else: function(f){
        return this.$elseIf(f);
    },
    //resolve: function(name){
    //    for(var i = 0, len = this.thens.length; i < len; i++){
    //        if(this.thens[i](name) !== 'next'){
    //            break;
    //        }
    //    }
    //    return this;
    //},
    resolve: function(name){
        for(var i = 0, len = this.thens.length; i < len; i++){
            this.thens[i](name)
        }
        return this;
    }
}

function f1(name){if(name === 'Monkey') console.log('yes, I am Monkey');}
function f2(name){if(name === 'Dorie') console.log('yes, I am Dorie');}
function f3(){console.log('sorry, over for ending!')}


$if(f1).$elseIf(f2).$else(f3).resolve("Dorie");

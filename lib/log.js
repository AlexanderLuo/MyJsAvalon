/**
 * Created by Administrator on 2016/12/21 0021.
 */


conf={
    de:true,
    ma:true
}

function de() {
    if(!de) return;
    if (window.console) {
        // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
        Function.apply.call(console.log, console, arguments)
    }
}


function ma() {
    if(!ma) return;
    if (window.console) {
        // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
        Function.apply.call(console.log, console, arguments)
    }
}
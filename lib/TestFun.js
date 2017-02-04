/**
 * Created by Administrator on 2016/12/22 0022.
 */


//avalon

//var isEqual = Object.is || function (v1, v2) {
//        if (v1 === 0 && v2 === 0) {
//            return 1 / v1 === 1 / v2
//        } else if (v1 !== v1) {
//            return v2 !== v2
//        } else {
//            return v1 === v2
//        }
//    }



//  Polyfill for non-ES6 browsers

var isEqual = Object.is || function(x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    };





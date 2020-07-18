/*js에서 this함수란 현재 실행 문맥을 나타낸다.
    단순호출에서의 this는 브라우저에서는 -> window를 node.js, intellj에서는 -> global을 나타낸다.
    엄격모드는 'use strict'를 사용해 단일함수 혹은 전체스크립트에 적용가능하다.
    비엄격모드에서 this가 window였다면 엄격모드에서는 this가 undefined가 된다.
 */
function k(){
    'use strict';
    //a=10;       //error발생 엄격모드이므로 변수 선언이 필요하다.
}
console.log(k());

//기본적으로 this는 내부함수, 콜백함수 등 여러 개에  전역객체로 바인딩된다.
let value = 1;

let obj = {
    value: 100,
    foo: function() {
        console.log("foo's this: ",  this);  // obj (obj객체의 프로퍼티가 함수이다. 현재실행문맥은 여기서는 obj객체 자체이다.)
        console.log("foo's this.value: ",  this.value); // 100
        function bar() {
            console.log("bar's this: ",  this); // window (내부함수)
            console.log("bar's this.value: ", this.value); // browser에서는 1, 여기서는 undefined
        }
        bar();
    }
};
obj.foo();


var foo = function () {
    console.dir(this);
};

// 1. 함수 호출
foo();




/*
엄격모드는 매개변수에도 변화를 못준다
console.log(this);


function add(a, b){
    'use strict';
    console.log(arguments[0], arguments[1]); // Prints : 1,2

    a = 5, b = 10;

    console.log(arguments[0], arguments[1]); // Prints : 5,10
}

add(1, 2);
*/

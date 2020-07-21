/*js에서 this함수란 현재 실행 문맥을 나타낸다.
    단순호출에서의 this는 브라우저에서는 -> window를 node.js(서버측 에예시로 intellj)에서는 -> global을 나타낸다.
    엄격모드는 'use strict'를 사용해 단일함수 혹은 전체스크립트에 적용가능하다.
    비엄격모드에서 this가 window였다면 엄격모드에서는 this가 undefined가 된다.
    엄격모드는 매개변수에도 변화를 못준다
 */
function k(){
    'use strict';
    //a=10;       //error발생 엄격모드이므로 변수 선언이 필요하다.
}
console.log(k());




//기본적으로 this는 내부함수, 콜백함수 등 여러 개에  전역객체로 바인딩된다.

//어떤함수의 메소드일 경우에는 this는 자신을 호출한 객체에 바인딩, new를 이용한 생성자함수의 this 또한 생성자 함수에 의해 생성된 인스턴스(전역객체 x)
//즉 생성자 함수와 객체의 메소드를 제외한 모든 함수(내부 함수, 콜백 함수 포함) 내부의 this는 전역 객체를 가리킨다

let value = 1;

let obj = {
    value: 100,
    foo: function() {
        console.log("foo's this: ",  this);  // obj (obj객체의 메소드이다. this는 자신을 호출한 객체에 바인딩된다. 현재실행문맥은 여기서는 obj객체 자체이다.)
        console.log("foo's this.value: ",  this.value); // 100
        function bar() {
            console.log("bar's this: ",  this); // window (내부함수)
            console.log("bar's this.value: ", this.value); // browser에서는 1, node.js에서는 undefined
        }
        bar();
    }
};
obj.foo();


var foo = function () {
    console.dir(this);
};

foo();



/*함수를 호출하는 4가지 방법
1. 함수 호출
2. 메소드 호출
3. 생성자 함수 호출 => new 연산자를 사용하여 호출 (this 바인딩이 일단 함수호출과는 다르다)
4. apply, bind 사용

-> 생성자 함수에 new를 쓰지않을 경우 this는 전역객체가 되어버려 생성자 함수에 의해 생성된 인스턴스와는 다르게 원하는 결과가 나타나지않는다.
 */



/*리터럴 방식과 생성자 함수의 차이
기본적으로 리터럴이란 컴퓨터쪽에서 소스 코드의 고정된 값을 대표하는 용어다.
고정된 값을 사용하는 리터럴 방식에 비해 생성자 함수는 필요에 따라 다양한 프로퍼티를 가지는 객체를 생성할수있다.
 */

// 객체 리터럴 방식
var foo = {
    name: 'foo',
    gender: 'male'
}

console.dir(foo);

// 생성자 함수 방식
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}

var me  = new Person('Lee', 'male');
console.dir(me);

var you = new Person('Kim', 'female');
console.dir(you);



//this 바인딩의 경우 암묵적으로 하는 방법과 명시적으로 apply, call 함수를 이용하는 방법이있다.
//첫번째인자는 this로 사용할 객체이고 나머지는 함수 호출에서의 매개변수들이다.

function add(c, d) {
    return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.call(o, 5, 7); // 16

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 두 번째 인자는 함수 호출에서 인수로 사용될 멤버들이 위치한 배열이다.
add.apply(o, [10, 20]); // 34

/* 화살표 함수(this에 바인딩할 객체가 정적)  vs 일반 함수(this에 바인딩할 객체가 동적) => this의 차이
함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고,
함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.
화살표 함수는 this와 arguments를 바인딩하지 않는다
화살표 함수는 this와 arguments를 바인딩하지 않는다. 그 대신, 일반적인 this와 arguments와 동일한 범위를 가지고 있다.
 */

function createObject() {
    console.log('Inside `createObject`:', this.foo, this);
    return {
        foo: 42,
        bar: function() {
            console.log('Inside `bar`:', this.foo, this);
        },
    };
}
createObject.call({foo: 21}).bar();

/*
Inside `createObject`: 21, {foo: 21}
Inside `bar`: 42, bar: f
*/

function createObject() {
    console.log('Inside `createObject`:', this.foo, this);
    return {
        foo: 42,
        bar: () => console.log('Inside `bar`:', this.foo, this),
    };
}
createObject.call({foo: 21}).bar();

/*
Inside `createObject`: 21, {foo: 21}
Inside `bar`: 21, {foo: 21}
 */
//즉 화살표 함수가 현재 환경의 this를 따르게 하고 싶을 때 유용하다


//출처 : https://www.yceffort.kr/2020/05/difference-between-function-and-arrow/
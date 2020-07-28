/*고차함수란?
1. 함수를 인수로 받는 함수  ex) reduce
*/
let max=-Infinity,min=Infinity;
let re = [10,15,20].reduce(([min, max], v)=>{
        min = Math.min(v, min);
        max = Math.max(max, v - min);
        return [min ,max];
    },[min,max])[1];
/*
2. 함수를 반환하는 함수  ex) bind
 */
function sum(num){
    return num+this.num1+this.num2;
}
let myObj={num1:20,num2:3};
let customSum=sum.bind(myObj);      //customSum 함수를 반환
customSum(5);

// apply,call의 경우 호출 vs bind는 호출은 하지않고 함수만 반환한다.

var obj = {
    string: 'zero',
    yell: function() {
        console.log(this.string);
    }
};

var obj2 = {
    string: 'what?'
};

obj.yell(); // 'zero';
obj.yell.apply(obj2);               // 'what?'
obj.yell.call(obj2);                // 'what?'
obj.yell.bind(obj2);                //아무일도 생기지않는다.
let p = obj.yell.bind(obj2);        //함수를 반환
p();                                //what?   반환한 함수를 선언해야 사용가능

/*
클로저
1. 반환된(return) 내부함수가 자신이 선언되었을때의 환경을 기억하여 자신이 선언되었을때의 환경 밖에서 호출되어도 그 환경에 접근하는 함수
2. 자신이 생성될때의 환경을 기억하는 함수(전생기억) => 과거의 상태를 기억(유지)하기위해서
 */

function outerFunc() {
    var x = 10;
    var innerFunc = function () { console.log(x); };
    innerFunc();
}
outerFunc(); // 10          단순한 렉시컬 스코핑에 의한 내부함수에서 외부함수의 변수 x에 접근하는 것

function outerFunc1() {
    var x = 10;
    var innerFunc1 = function () { console.log(x); };
    return innerFunc1;
}
/**
 *  함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
 *  그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
 */
var inner1 = outerFunc1();      // 반 환 된 내부함수가 자신이 선언되었을때의 x를 찾아간다.
inner1(); // 10


/*
클로저의 활용 및 언제사용할까
=>현재 상태(.box 요소의 표시 상태를 나타내는 isShow 변수)를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용
=>클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다 (isShow와 같은 변수들을 전역변수로 선언해야한다.)

<!DOCTYPE html>
<html>
<body>
<button class="toggle">toggle</button>
    <div class="box" style="width: 100px; height: 100px; background: red;"></div>

    <script>
var box = document.querySelector('.box');
var toggleBtn = document.querySelector('.toggle');

var toggle = (function () {
    var isShow = false;

    // ① 클로저를 반환
    return function () {
        box.style.display = isShow ? 'block' : 'none';
        // ③ 상태 변경
        isShow = !isShow;
    };
})();
 toggleBtn.onclick = toggle;            //onclick event 발생할때마다 과거의 toggle이 반환한 내용에서 isShow기억해서 클로져 반환 및 isShow 상태 변경한다.
  </script>
</body>
</html>

출처 : https://poiemaweb.com/js-closure

 */



// ② 이벤트 프로퍼티에 클로저를 할당
toggleBtn.onclick = toggle;
</script>
</body>
</html>


//객체 생성 3가지 방법

// 1. 객체 리터럴 이용
const a = {};
const b = { x: 0, y: 0 };

// 2. new 연산자 이용
const a1 = new Object();
const b1 = new Array();
a1.x = 0;
a1.y = 0;

// 3.Object.create()
const a2 = Object.create({ x: 1, y: 1 });

console.log(b.x,a1.x,a2.x);

/* Symbol이란 ?
심볼(Symbol)은 프로그램이 이름 충돌의 위험 없이 속성(property)의 키(key)로 쓰기 위해 생성하고 사용할 수 있는 값

특징
1. new 연산자를 사용하지 않는다.
2. 문자열을 인자로 전달할 수 있다.

사용 이유
-개발자들이 하고싶은 작업은 위 객체 myObject 에 새로운 프로퍼티를 추가 한 후에도
Object.keys(myObject) 의값이 새롭게 추가된 프로퍼티가 제외된 [firstName,lastName] 이 결과를 보고 싶은 것
 */
var myObject = {};
myObject["prop1"] = 10;
myObject["prop2"] = 2;
var prop3 = Symbol("prop3");
var prop4 = Symbol("prop4");
myObject[prop3] = 3;
myObject[prop4] = 4;
for (var key in myObject){
    console.log('key'); // prop3 prop4는 나오지 않음.
}
console.log(myObject[prop3]) // 3
console.log(myObject[prop4]) // 4

for (var key in myObject){
    console.log(key); // prop3 prop4는 나오지 않음.
}
// 여기서 prop1을 Symbol type으로 다시 생성해도 충돌이 나지않는것을 알수있다.
let prop1 = Symbol("prop1");
myObject[prop1]=100;

console.log(myObject);
/*결과
{
    prop1: 100,
    prop2: 2,
    [Symbol(prop3)]: 3,
    [Symbol(prop4)]: 4,
    [Symbol(prop1)]: 100
}
*/
console.log(myObject["prop1"],myObject[prop1]); //10 100

//객체를 출력하는 방법
let pqq={
    test:5000
}
console.log(pqq.test,pqq["test"]);      //2가지 방법 둘다 가능
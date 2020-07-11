//let과 const 차이

function l(){
    let re=10;
    re=5;       //let은 재대입 가능
}
function c(){
    const c=10;
    c=5;        //error => const는 재대입 불가능
}
function k(){
    const p;
    p=10;       //error => const는 선언과 대입을 동시에 해야한다
}

//let과 const 공통점 == var와 let const의 차이점
//var는 재선언이 가능, 나머지는 불가능
//var는 호이스팅으로 인해 undefined를 출력, const,let은 호이스팅으로 인해 ReferenceError출력
//var는 함수scope, const, let은 블록scope를 갖는다.
function a(){
    var p=10;
    var p=15;
    console.log(p);
}

//함수 scope는 함수 단위로 범위를 지정한다.
// 블록 scope 는 중괄호{} 단위로 범위를 지정한다.
var h=15;
{
    var h=10;
}
console.log(h);     //10의 결과 출력 : 함수가 따로 없으므로 h는 마지막에 나온 10을 나타냄

var h1=15;
function k(){
    var h1=10;
}
console.log(h1);     //15의 결과 출력 : var는 함수스코프로 인해서 h1은 함수 밖에있는 15를 나타냄



//scope chain:변수가 스코프안에 선언되어있지 않는다면 그 변수를 찾기위해 계속해서 부모 scope로 올라간다.
let hj=10;
function zz(){
    console.log(hj);        //스코프안에 존재하지않음
}
console.log(zz());          //부모스코프로 올라가 hj를 찾음

//hosting : 선언부를 제일 위로 끌어올리는것 => 실제 var let const 전부 하긴한다. 단지 let const는 TDZ에 의해 ReferenceError를 생성
//TDZ : 선언전에 변수를 사용하는것을 허용하지않는다.(let const) <=> var는 선언전에 변수를 사용하는것을 허용한다.
{
    p=10;           //temporal dead zone(let에 대한)
    let p;
    k=0;            //temporal dead zone(const에 대한)
    const k;
}

// 함수 선언식(호이스팅 가능) vs 함수 표현식(호이스팅 불가능)
function sayHello() {
    console.log("Hello!");
}

const sayHello1 = function() {
    console.log("aFunction");
};

    //네스팅된 스코프(Nested scopes)에서의 렉시컬 스코핑(lexical scoping)
// 함수가 다른 함수 내부에서 정의되었다면, 내부 함수는 외부 함수의 변수에 접근할 수 있다. 이런 행동을 렉시컬 스코핑(lexical scoping)이라고 부른다.

//정리 : 스코프는 어떠한 범위, 호이스팅은 어떠한 변수를 맨위로 올려 선언하는 것
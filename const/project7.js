//기본적으로 알아야 할것
const ex = function(){
}
console.log(function(){});  //[Function (anonymous)] => 함수의 참조 값을 반환한다.    (함수의 실행없이 함수자체를 리턴)
console.log(()=>{});        //[Function (anonymous)] => 함수의 참조 값을 반환한다.    (함수의 실행없이 함수자체를 리턴)
console.log(ex);            //[Function: ex]         => 함수의 참조 값을 반환한다.    (함수의 실행없이 함수자체를 리턴)
console.log(ex());          //undefined              => 반환문이 없어서 undefined이다.(함수의 실행 후  반환값을 리턴)

//자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.
//setTimeout 예시
const later_hi = ()=>{console.log('1초뒤 ㅎㅇ');}
setTimeout(later_hi,1000);      //'1초뒤 ㅎㅇ'
//setTimeout(later_hi(),1000);      // error    =>later_hi()의 반환값이 undefiend이므로 스케줄링 대상을 찾지못함

// setTimeout과 setInterval의 차이 및 clearTimeout, clearInterval 사용법

// setTimeout
class ash1{
    hp=15;
}
const a1 = new ash1();
const di1 = setTimeout(dinomit1
    ,1000
)
function dinomit1()
{
    console.log('clearTimeout 으로 인해 출력 x');
}
clearTimeout(di1);      //di1에 반환값이 들어가있다가 clearTimeout으로 8반환값이 전달되어 타이머 취소

// setInterval (오버워치 애쉬에게 지속적으로 데미지를 받았을때)
class mei{
    hp=10;
}
const a = new mei();
const ash = setInterval(dinomit
,1000
)
function dinomit()
{
    a.hp--;
    console.log('hp는'+a.hp+'입니다(다이너마이트로 체력감소)');
    if(a.hp==0){
        console.log('dead');
        clearInterval(ash);          //di에 반환값이 들어가있다가 clearTimeout으로 반환값이 전달되어 타이머 취소
    }
}



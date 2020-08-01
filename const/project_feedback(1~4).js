//Topic 1) var는 함수스코프이고 let은 블럭스코프이다.

function e1(){       //블럭 스코프 내에서만 a가 동작하므로 console.log(a)에서는 a를 찾을수 없어 error
    {
        let a =10;
    }
   console.log(a);
}

function e2(){
    function f(){
        console.log(a);
    }
    f();
    let a = 10;
}
// f()가 먼저 실행이 되면 let a = 10이 호이스팅이 되면서 TDZ위치로 가서 console.log(a)를 찾아도 실패한다.

function s1(){
    function f() {
        console.log(a);
    }
    let a = 10;
    f();
}
// 출력 : 10
// let a 가 먼저 선언이 되고 f()실행을 하면 a의 스코프(범위)가 속한 곳에서 f()함수를 실행하므로 정상실행이된다.

function s2(){
    let a = 11;
    {
        console.log(a);
    }
}
/* a는 함수 범위내에 스코프가 존재하고 블럭안에 console.log(a)는 그 범위에 없으면 그 이상의 범위를 찾아가 a를 출력하려한다.
즉 s2 함수 범위까지 스코프 체인을 통해 a를 찾아 정상출력한다.
 */

function s3(){
    {
        var v3 =10;
    }
    console.log(v3);
}
/* var는 함수 스코프이므로 s3함수 범위내에 스코프가 존재하므로 console.log(v3)는 정상 실행된다.
 만약 v3가 var v3가 아닌 let v3라면 에러가 난다.
 (let은 블록스코프 이므로 { let v3 =10;}의 스코프만 가지므로 console.log(v3)가  정상작동 X)
 */




//Topic 2) 함수 안에 함수가 존재하는 경우의 스코프 심화
//case 1 : 전역변수 a의 값이 jmnote->john으로 변할때

var a = "jmnote";
function bar() {
    console.log(a); // jmnote
}
function foo() {
    a = "john";
    bar();
}

foo();      //john
bar();      //john
// foo()함수를 통해 전역변수 a가 jmnote에서 john으로 바뀌므로 bar()함수를 그다음 실행시켜도 전역변수는 변한값인 john이 출력

//case 2 : 전역변수 a1과 지역변수 a1이 서로 다르게 설정
var a1 = "jmnote";
function bar1() {
    console.log(a1); // jmnote
}
function foo1() {
    var a1 = "john";        //전역변수가 jmnote에서 john으로 바뀌는게 아닌 지역변수에서 새로운 a1이 생성되므로
    bar1();
}

foo1();      //jmnote
bar1();      //jmnote
//foo1()함수내의 bar1()함수도 자신이 선언된 위치로부터 a1을 찾아가는데 가장 가까운 곳은 전역변수 a1이기 때문에 jmnote 출력
//bar1()도 마찬가지로 자신이 선언된 부분에서 가장가까운 곳은 전역변수이므로 jmnote 출력 (렉시컬스코프)

//case 3 : 내부함수가 존재하지않고 단지 블럭으로 묶인 console.log()존재
var a2 = "jmnote";
function bar2() {
    console.log(a2); // jmnote
}
function foo2() {
    var a2 = "john";        //전역변수가 jmnote에서 john으로 바뀌는게 아닌 지역변수에서 새로운 a1이 생성되므로
    {
        console.log(a2);
    };
}

foo2();      //john
bar2();      //jmnote
//foo2()함수를 통해 console.log(a2)를 실행하는데 a2는 실행하는 위치에서 가장 가까운 foo2()함수의 지역변수인 a2(john)을 출력
//bar2()함수는 정상적으로 실행위치에서 가장 가까운 전역변수 a2인 jmnote를 출력시킨다.


/*Topic3 : 렉시컬 스코프와 스코프 체인
쓴이는 렉시컬 스코프와 스코프 체인에 대해 완벽히 이해했다고는 할수는 없다. 하지만 여러 블로그와 포스팅을 보면서 이해한것을 토대로 써본다.
출처 : https://leehwarang.github.io/2019/10/07/scope.html

스코프체인 : 식별자를 찾기위해 계속해서 상위 스코프로 가는것
렉시컬스코프 : (함수가 중첩되어있을때) 내부 함수에 찾는 식별자가 없다면 상위 스코프에서 식별자를 찾아 나간다.
 */


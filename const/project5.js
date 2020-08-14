/* 이터러블은 iterable(=반복가능)이란 뜻으로 이터러블 객체는 반복가능한 객체로 이에 포함되는것은
String,Array,TypedArray,Map,Set 이 있다.
반복을통해 문자열을 배열로 만들기도 한다.

사용하는 곳은 4가지로
1. for...of 루프
2. spread 연산자(...)
3. 분해대입
4. 기타 iterable을 인수로 받는 함수
 */

let S="PPL";
for(i of S){
    console.log(`${i}`);        //결국 PPL을 하나씩 반환하므로 P P L이 각각 출력
}

const H = [..."kimhyoungwook"]
console.log(H);     //['k', 'i', 'm', 'h', 'y', 'o', 'u', 'n', 'g', 'w', 'o', 'o', 'k']

const [c1, c2, c3 ] = "hello";
let p = [10,20,30,40];
const [c4,c5,c6] = p;
console.log(c1,c2,c3);          //h e l
console.log(c4,c5,c6);          //10 20 30

const characters1 = "hello".split("");
console.log(characters1);       //console.log([..."hello"]); 같은결과


/*
제너레이터 함수(generator 함수)는 이터러블을 생성하는 함수이다.    => yield를 통한 반복적 return 값이 사용
또한 제너레이터 함수는 포인터를 사용한다.

yield 키워드는 제너레이터 함수 (function* 또는  레거시 generator 함수)를 중지하거나 재개하는데 사용됩니다.
제너레이터 버전의 return 키워드로 생각 할 수 있다.
next()를 이용하면 yield가 실행되고 중지되고 다음 next()가 실행하면 그다음 yield 실행되고  중지되면서 done이 true가 될때까지 반복한다.
next()를 통해서는 value와 done이 포함된 객체를 반환한다.
 */

function* createInfinityByGenerator() {
    let i = 10;
    while (i<13) {
        yield i++;
       }
}

for (const n of createInfinityByGenerator()) {
    console.log(`${n} 입니다`);
}
/*처음 create실행하여 i값인 10이 반환되어
for문의 '10입니다'가 출력되고 다시 create실행하여 i값이 11을 반환하여
for문의 '11입니다'가 출력되고 다시 create실행하여 i값이 12을 반환하여
for문의 '12입니다'가 출력되고 다시 create실행하여 i값이 13이므로 while(i<13)가 성립하지않으므로 종료
 */
console.log();

let pp = createInfinityByGenerator()

console.log(pp.next()); //{ value: 10, done: false }
console.log(pp.next()); //{ value: 11, done: false }
console.log(pp.next()); //{ value: 12, done: false }
console.log(pp.next()); //{ value: undefined, done: true }

console.log(createInfinityByGenerator().next());    //{ value: 10, done: false }
console.log(createInfinityByGenerator().next());    //{ value: 10, done: false }
console.log();
//이러한 결과에 관해서는 맨 아래에 비슷한 내용이 설명되어있다.

const iterable = new Object();

function* pq() {
    yield 1;
    yield 2;
    yield 3;
};

for(var value of pq()) {
    console.log(value); // 1 2 3
}
const h = pq();
console.log(h.next());  //{ value: 1, done: false }     는 yield 1;까지만 실행
console.log(h.next());  //{ value: 2, done: false }     는 yield 1이후부터 yield 2까지만 실행
console.log(h.next());  //{ value: 3, done: false }     는 yield 2이후부터 yield 3까지만 실행

//제너레이터 함수가 생성한 제너레이터 객체의 next 메소드를 호출하면 처음 만나는 yield 문까지 실행되고 일시 중단(suspend)된다.
// 또 다시 next 메소드를 호출하면 중단된 위치에서 다시 실행(resume)이 시작하여 다음 만나는 yield 문까지 실행되고 또 다시 일시 중단된다.


/*제너레이터 정리
function* 선언 (끝에 별표가 있는 function keyword) 은 generator function 을 정의하는데, 이 함수는 Generator 객체를 반환합니다.
 함수를 정의하는 방법은 함수 선언과 함수 표현식 2가지가 있다. => 함수를 정의하려면 2가지 방법을 써야한다.
 쓴이는 함수선언식으로도 시도를 해봤으나 이는 제대로 결과가 나오지않는것을 알수있다.
*/

function* NoProblem() {
    let i = 10;
    while (i<13) {
        yield i++;
    }
}
let NP =NoProblem();

let P=function* Problem() {
    let i = 10;
    while (i<13) {
        yield i++;
    }
}

console.log(typeof NP, typeof P());     //object object

console.log(NP.next()); //{ value: 10, done: false }
console.log(NP.next()); //{ value: 11, done: false }
console.log(P().next()); //{ value: 10, done: false }
console.log(P().next()); //{ value: 10, done: false }       (8.14) 결과 오타수정

console.log(NP);
console.log(P());

/* 맨아래 NP,P()의 결과를 보면
NoProblem {<suspended>}
__proto__: Generator
[[GeneratorLocation]]: example.js:4
[[GeneratorStatus]]: "suspended"
[[GeneratorFunction]]: ƒ* NoProblem()
[[GeneratorReceiver]]: Window
[[Scopes]]: Scopes[3]
0: Local (NoProblem) {i: 12}
1: Script {NP: NoProblem, P: ƒ}
2: Global {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}

Problem {<suspended>}
__proto__: Generator
[[GeneratorLocation]]: example.js:9
[[GeneratorStatus]]: "suspended"
[[GeneratorFunction]]: ƒ* Problem()
[[GeneratorReceiver]]: Window
[[Scopes]]: Scopes[3]
0: Local (Problem) {i: undefined}
1: Script {NP: NoProblem, P: ƒ}
2: Global {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}

이를 통해 i의 값이 NP는 12로 되어있고 P()는 undefined로 결과가 나오는 것을 통해 함수선언문으로는 불가능하다는 것을 알수있다. (비슷해보이지만)
따라서 Generator함수를 쓰기위해서는 함수 선언과 함수 표현식 2가지를 사용해야한다. (함수선언식으로는 정상적 next()사용이 어렵다 생각)
 */

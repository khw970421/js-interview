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

var pp = createInfinityByGenerator()

console.log(pp.next()); //{ value: 10, done: false }
console.log(pp.next()); //{ value: 11, done: false }
console.log(pp.next()); //{ value: 12, done: false }
console.log(pp.next()); //{ value: undefined, done: true }

console.log(createInfinityByGenerator().next());    //{ value: 10, done: false }
console.log(createInfinityByGenerator().next());    //{ value: 10, done: false }
console.log();
//next()를 쓸때는 함수 선언식으로 사용하면 같은 값이 반복되므로 함수 표현식(pp.next())으로 써야한다.

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
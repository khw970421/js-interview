//Promise : 콜백의 문제점을 해결한 기능. ES2015에서 추가되었다. 자바스크립트 비동기 처리에 사용되는 객체
//f1함수와 f2함수는 setTimeout으로 인한 비동기이면서 서로 영향을 받지않는다.
function f1() {
    setTimeout(() => {
        console.log(1);
    }, 2000);
}

function f2() {
    setTimeout(() => {
        console.log(2);
    }, 1000);
}

(function f3() {
    f1();
    f2();
})()
//1초후에 f2()가 실행이되어 2가 출력되고 처음을 기준으로 2초후에는 f1()이 실행되어 1이 출력된다.

//f11함수와 f21함수는 setTimeout으로 인한 비동기이면서 f21()은 f11내부에 있어 영향을 받는다.
function f11() {
    setTimeout(() => {
        console.log(3);
        f21();
    }, 2000);
}

function f21() {
    setTimeout(() => {
        console.log(4);
    }, 1000);
}

(function f31() {
    f11();
})()
/* 2초후에 f11()이 실행되어 3이 출력되고 그때에 f21();가 진행되고 3초(f11 2초+ f21 1초)후에는 f21()이 실행되어 4가 출력된다.
즉
1초   2초   3초
2     1
      3     4
2134의 결과가 위의 코드를 실행하면 생성된다.
 */

/*비동기함수들 내에서 동기를 가지게 하려면 Promise를 이용해야한다. 그리고 콜백함수에 대해서도 이해가필요
콜백함수
 자바스크립트의 비동기성을 표현하는 가장 일반적인 기법.
 호출된 함수를 알려줘서 다른 프로그램이나 다른 모듈에서 함수를 호출하게 하는 방법.
 함수의 인자로 전달되는 함수
 */
function test(callback){
    console.log("콜백함수안");
    callback();
};
test(function(){console.log("이부분이 콜백")});

/* test함수가 실행되면서 test함수가 전부 끝나고 console.log('콜백함수안')이 실행되는것이 아닌
test함수가 실행중에 내부에 있는 콜백함수에 들어가서 console.log()를 하고 test함수로 콜백후 종료한다. (
test함수가 끝날때까지 대기하지않고 안에있는 함수 내용이 실행
 */

//이렇게도 비동기(h함수가 끝나기전에 내부함수들이 처리)이지만 결과 출력에 a,b가 순차적으로 나온다.
function h(callback){
    let a =100,b=150;
    callback(a);
    callback(b);
}
h(function(value){
    console.log(value);
});

//이를 약속을 정해서 Promise를 사용하면 이렇게 된다 생각
function C(p){
    return new Promise(resolve=>{
     resolve(p);
    }
    )
}

C(100)
    .then(str=>{        //resolve에 인수로 준 값인 str은 100
    console.log(str);
    return C(150)})
    .then(st=>{console.log(st)})        //resolve에 인수로 준 값인 st는 150

//Promise와 함꼐 쓰이는 것이 async함수와 await이다. (then메소드와 똑같은 방식동작)
// Promise => resolve로 반환하며 .then or async/await 사용

//then을 이용 (ms매개변수를 입력받아 ms초가 지난후 console.log실행하고 ms를 반환한다.
function C(ms){
    return new Promise(resolve=>{
            setTimeout(()=>{
                console.log(`${ms} 밀리초가 지났습니다.(콜백함수)`);
                resolve();
            },ms)
        }
    )
}

C(1000)
    .then(()=>{
        return C(2000)})
    .then(()=>{})

//async함수를 이용
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${ms} 밀리초가 지났습니다.(async함수)`);
            resolve();
        }, ms);
    });
}

async function main() {
    await delay(1000);
    await delay(2000);
}
main();

/*둘다 같은 동작으로 1000초 지나고 2000초 지나다고 console.log가 나타난다.
 await delay(1000);
 await delay(2000);
 이부분을
 await delay(2000);
 await delay(1000); 이렇게 바뀔경우
 1초 : 1000 밀리초가 지났습니다.(콜백함수)
 2초 : 2000 밀리초가 지났습니다.(async함수)
 3초 : 1000 밀리초가 지났습니다.(async함수) => 2초가 지난 후 1초가 지나야하므로
     : 2000 밀리초가 지났습니다.(콜백함수)   => 1초 지난후 2초가 지나야하므로
 이렇게 결과가 바뀐다.

 */


//이번 내용은 아직 배울게 많아서 닮은 예시를 위주로 다루어봤다 아직 이해할게 많다.

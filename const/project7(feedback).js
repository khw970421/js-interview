/*기본적으로 콜백함수(매개변수를 통해 전달되고 전달받은 함수의 내부에서 어느 특정지점에 실행)
 로 setTimeout이 있고 이는 비동기함수이다.
 */
function func1() {
    console.log('func1');
    func2();
}

function func2() {
    setTimeout(function() {
        console.log('func2');
    }, 0);              //아무리 0초를 해도 결국 안된다.

    func3();
}

function func3() {
    console.log('func3');
}

func1();
/*
진행순서 :https://poiemaweb.com/js-async
call stack에 func1 -> func2를 하다가 setTimeout코드가 진행되어 web Api로 setTimeout이 넘겨지고
func2위에 func3가 올려지고 특정시간이 지난후 time done 후 event queue에 call back함수로 setTimeout이 등록되고
그때에 이미 func3->func2->func1 순으로 전부 코드가 종료되고 남은 callback부분이 실행된다.
 */

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('1초가 지났습니다. ');
        resolve('hello');
    }, 1000);
})
//실행해버림 이미
/*Promise 생성자의 인수 : 콜백
이 콜백을 executor(실행자, 실행 함수) 라고 부른다.
new Promise 가 만들어 질 때 자동으로 실행된다
 */
p.then(result =>console.log(result))    //p는 object
/*
만약 Promise 가 이미 처리된 상태라면 즉각 실행된다.
즉 1초후 1초가 지났습니다가 나온후 Promise 처리가 끝나므로 바로 p.then이 실행
 */
let a=2;
let promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        if(a==1)
        resolve("done!");
        else
        reject(new Error("에러 발생!"));        //a가 2이므로 이곳이 실행
    }, 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
    result => console.log(result), // 1초 후 "done!"을 출력
    error => console.log(error) // 실행되지 않음
);

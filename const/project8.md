비동기함수 & 예외처리 
===
(이제부터 md를 통해 좀 더 가독성을 높이고 md에 익숙해진다.)

에러에는 문법 에러, 런타임 에러, 논리적 에러가 있디.

1.문법 에러
``` js
console.log(;
```
2.런타임 에러

(1) 배열 인덱스 범위

(2) 잘못된 공간에 접근하는 경우

(3) 0으로 나누는 것

3.논리적 에러 (실행시 오류x 원하는 결과가 아닐때)

try & catch & finally
---
try-catch 구문은 런타임에러를 처리할 수 있는 구문
ex)
```js
try {
    console.log("잘 실행됩니다.");
    console.log(v); //catch로 이동
    console.log("버려짐");
} catch (e) {
    console.log("코드의 실행 흐름이 catch 블록으로 옮겨왔습니다.");
    console.log(`발생한 에러의 이름: ${e.name} 내용: ${e.message}`);//발생한 에러의 이름: ReferenceError 내용: v is not defined
}
```
이때의 e는 에러객체이다. 따라서 e.name, e.message와 같은 기능을 사용
***
그외에도 e.constructor를 이용할수있다.
```js
try {
    console.log("잘 실행됩니다.");
    console.log(v);
    console.log("버려짐");
} catch (e) {
    switch (e.constructor) {
        case SyntaxError:
            console.log("안실행");
            break;
        case ReferenceError:
            console.log(e.constructor)
            console.log("실행");
            break;
    }
}
```
이때 e.name이 아닌 e.constructor를 써야하는 이유는 e.name은 String이고
e.constructor는 정확히는 함수이기 때문에 ReferenceError와 같은 타입이기때문
```js
try {
    console.log("잘 실행됩니다.");
    console.log(v);
    console.log("버려짐");
} catch (e) {
    console.log(e.name===ReferenceError);       //false
    console.log(e.constructor===ReferenceError);    //true
    console.log(typeof(e.constructor));     //function  
    console.log(typeof(ReferenceError));    //function
    console.log(toString.call(e.constructor));  //[object Function]
    console.log(toString.call(ReferenceError)); //[object Function]
}
```
***
finally는 추가적으로 무조건 실행되는 문장이다.
***
비동기식에서의 처리
---
```js
try {
  setTimeout(() => {
    throw new Error("에러!");
  });
} catch (e) {
  console.error(e);     //실제 실행이 안된다.
}

// 발생한 에러 객체가 출력되길 기대했지만 try블록은 이 에러를 잡아내지 못하고 에러 객체도 출력되지 않는다.
```
1.try 블록 내부의 setTimeOut() 비동기 함수를 만나면, 그 속의 콜백은 브라우저에 실행해달라고 맡기고 코드는 계속 진행된다.  
2.이때, 콜백은 작업큐에 들어가게 될거고, 호출 스택에서는 try블록이 다음 코드 실행 흐름에 따라 지워질 것이다.  
3.콜백이 호출 스택에 들어갈 시점에서는 남은 코드 실행도 다 끝난 시점이기 때문에 try는 더이상 존재하지 않는다...  
4.그래서 콜백에서 에러가 발생하면, 예외처리를 해주지 않은 것과 똑같이 동작한다. (실제로 예외처리를 해주지 않은게 된거다.)  

한마디로 catch가 에러를 받아와야하는데 비동기로 에러가 try~catch 코드가 끝나기전에 에러를 받아오지 못하고 코드가 종료되고 그 후에 비동기 함수로 인해 에러가 받아와도 이를 catch가 처리 할 코드는 이미 끝났기 때문에 console.error 의미가없다  
따라서 catch문을 비동기를 통해 받아온것에 에러가 있다면 
```js
setTimeout(() => {
  try {
    throw new Error("에러!");
  } catch (e) {
    console.error(e);
  }
});
```
이렇게 관련 전부를 비동기함수 안에서 처리를 진행한다.  
저번주 봤던 @eybac 은영님의 코드를 토대로 조금 이용하면
```js

const API_URL = 'https://api.github.com/repos/facebookincubator/create-react-app/issues?per_page=10';

$.ajaxSetup({
    dataType: 'json'
});

let permission=0;

$.get(API_URL, issues => {
    try {
        if(permission==1) {
            console.log('최근 10개의 이슈:');
            issues
                .map(issue => issue.title)
                .forEach(title => console.log(title));
            console.log('출력이 끝났습니다.');
        }
        else{
            throw new Error("받아오는데 문제 발생");
        }
    }
    catch(e){
        console.log(e);
    }
});

console.log('받아오는 중...');
```
허용을 받는 permission이 0이면 내용을 받지않고 catch로 문제를 발생시키고 1이면 정상적으로 10개의 이슈를 출력한다.  
이때 html에
```html
<script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
```
이렇게 script로 jquery관련 내용을 포함시키지않으면 ajax에서 문제가 생긴다.
만약 이 코드를
```js

const API_URL = 'https://api.github.com/repos/facebookincubator/create-react-app/issues?per_page=10';

$.ajaxSetup({
    dataType: 'json'
});

let permission=0;
try {
    $.get(API_URL, issues => {
        if (permission == 1) {
            console.log('최근 10개의 이슈:');
            issues
                .map(issue => issue.title)
                .forEach(title => console.log(title));
            console.log('출력이 끝났습니다.');
        } else {
            throw new Error("받아오는데 문제 발생");
        }
    })
}
catch
    (e)
{
    console.log(e);
};

console.log('받아오는 중...');
```
try안에 .get 비동기(다른곳에서 가져오므로 비동기라 생각하나 혹시 틀리다면 issue를 남겨주면 감사하겠습니다)  
를 넣는다면 permission이 0일때 전체 코드를 중단시키지 않고 어느 시점에서부터 다시 원하는 코드로 실행 흐름을 복구할 수 있는 작업을 예외 처리가 아닌  
그냥 디버그에서 문제가 발생한다. 따라서 비동기와 관련한 try&catch는 비동기 내에 전부 묶어내는 것을 추천한다. 

Promise
---
Promise 객체는 세가지 상태를 가질 수 있습니다.

pending - Promise 객체에 결과값이 채워지지 않은 상태  
fulfilled - Promise 객체에 결과값이 채워진 상태  
rejected - Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태  

Promise 객체가 rejected 상태가 되면, 이 Promise에 대해서는 then 메소드에 첫 번째 인수로 넘겨준 resolve 콜백이 실행되지 않고, 
두 번째 인수로 넘겨준 reject 콜백이 대신 실행됩니다.

그냥 바로 Promise와 Async에 대해 알아보자
```js
const promise = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log('1');resolve('2');},1000)
    });
}

promise().then((v)=>console.log(v))

async function f() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {console.log('3');resolve('4');}, 2000)
    });

    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

    console.log(result); // "완료!"
}

f();
```
결과는  
1  
2 //같이 1초후에 출력  
3  
4 //같이 2초후에 출력 
이다.

이를 통해 우리는 비동기 함수인 Promise나 async가 then과의 순서관계를 동기적으로 할 수 있다.
---

@pul8219님 내용 참고
Promise 체이닝(Promise then -> Promise then -> Promise then -> ...) 등의 방식도 가독성이 떨어질 수 있다는 비판 있음

async, await를 사용하면 동기식 코드처럼 보이는 비동기식 코드를 짤 수 있고 Promise를 깔끔하게 사용할 수 있게 해줌

---
추가적으로 주의해야할 부분( 함수인지 객체인지 잘 파악해서 ()를 사용여부를 주의)
```js
async function fetchUser() {
    // do network request in 10 secs...
    // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
    return 'yurim';
}

const user = fetchUser();

console.log(user);
console.log(typeof user);       //object =>user.then
user.then((v)=>console.log(v));

const user1 =async function fetchUser1() {
    // do network request in 10 secs...
    // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
    return 'yurim';
}
console.log(user1);
console.log(typeof user1);      //funciton =>user1().then이렇게 써야한다.
user1().then((v)=>console.log(v));
```

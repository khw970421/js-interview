//case1 : 비동기의 무작위로 출력

const printString = (string) => {
    setTimeout(() => {
            console.log(string+" random")
        },
        Math.floor(Math.random() * 100) + 1
    )
}

const printAll = () => {
    printString("A")
    printString("B")
    printString("C")
}
printAll()
// 무작위로 출력


//case2 : 비동기의 콜백함수를 이용해 순서가 존재하게 출력
const printString_CallBack = function (string, callback){
    setTimeout(function(){
            console.log(string+" Callback")
            callback()
        },
        Math.floor(Math.random() * 100) + 1
    )
}

const printAll_CallBack = () => {
    printString_CallBack("A", function()  {
        printString_CallBack("B", function()  {
            printString_CallBack("C", function(){})
        })
    })
}
printAll_CallBack()
// A, B, C 순서로 출력

//case3 : 비동기의 Promise .then을 이용해 순서대로 출력
const Promise_then = function(string){
    return new Promise(resolve=>{setTimeout(function(){
            console.log(string+" Promise and then");
            resolve(string);
        },
        Math.floor(Math.random() * 100) + 1
        )}
    )
}

Promise_then("A")
    .then(()=>{return Promise_then("B")})
    .then(()=>{return Promise_then("C")});

//case4 : 비동기의 Promise async, await를 이용해 출력
const Promise_async = function(string){
    return new Promise(resolve=>{setTimeout(function(){
            console.log(string+" Promise and async and await");
            resolve(string);
        },
        Math.floor(Math.random() * 100) + 1
        )}
    )
}

async function start_async(){
    await Promise_async("A");
    await Promise_async("B");
    await Promise_async("C");
}

start_async()
//이를통해 보면 확실히 비동기에 순서를 부여하는것은 async await가 제일 보기쉽다는 것을 알수있다.(주관적이지만 .then이 어려움)

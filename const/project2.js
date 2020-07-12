//js의 타입에는 크게 원시타입과 참조타입이있다.
//원시타입의 종류에는 String/symbol/number/null/undefined/bool
//참조타입의 종류에는 객체/배열/함수가 있다.

//원시타입은 값이 복사되어 전달된다.
var str1 = "hello world";
var str2 = str1;
console.log(str2);      //hello world
str1 = "nice to meet you";
console.log(str2);      //hello world
//데이터를 복사해서 전달하므로 (원본이 변경되어도 복사된 데이터에 영향이없다)

//참조타입은 값이 참조가 복사되어 전달된다.
var str3 = {name:"kim"};
var str4 = str3;
console.log(str4);  //{name:'kim'}
str3.name = "kik";
console.log(str4);  //{name:'kik'}
//참조값이 복사되므로(원본이 변경되면 복사된 데이터에 영향)

//원시타입은 값을 수정할 수 없다. (불변성)
var a = "hello";
a="kim";
console.log(a);
//이전에 생성된 문자열 ‘Hello’을 수정하는 것이 아니라 새로운 문자열 ‘kim’를 메모리에 생성하고 식별자 a은 이것을 가리킨다.
// 이때 문자열 ‘Hello’와 ‘kim’는 모두 메모리에 존재하고 있다

//참조타입은 값을 수정할수 있다.
var arr = [];
console.log(arr.length); // 0

var v2 = arr.push(2);    // arr.push()는 메소드 실행 후 arr의 length를 반환
console.log(arr.length); // 1
//객체인 arr은 push 메소드에 의해 update되고(값의 수정) v2에는 배열의 새로운 length 값이 반환된다.
// 처리 후 결과의 복사본을 리턴하는 문자열의 메소드 slice()와는 달리 배열(객체)의 메소드 push()는 직접 대상 배열을 변경한다.
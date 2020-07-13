//typeof의 결과값은 7개로
// ‘undefined’
// ‘boolean’
// ‘number’
// ‘string’
// ‘object’
// ‘function’
// 'symbol'

//전역객체 : 모든 객체는 전역객체의 프로퍼티이다.
function func(){
    alert('Hello?');
}
var o = function fuc1(){
    alert('hi');
}
func();
window.func();
o();
window.o();

//모든 전역변수와 함수는 windows 객체의 프로퍼티이다.
//js에서 배열과 함수는 객체이다.

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
var s1 = "hello";
var s2 = new String("hello");
var s3 = new String("hello");
var s4 = s3;

typeof s1;    // "string"
typeof s2;    // "object"

s1 == s2;    // false => typeof가 다르다.
s2 == s3;    // false => String 객체는 개별 객체이기 때문에 자기 자신과만 동일
s3 == s4;    // true => 참조값이 복사되므로 결국 같은 객체를 가르키기 때문에 true




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

var arr = ['zero', 'one'];
var obj = {
    '0':'zero',
    '1':'two'
}

console.log(typeof arr); // 출력결과: object(배열은 객체에 속한다.)
console.log(typeof obj); // 출력결과: object

//래퍼객체(4가지의 형태가 프로퍼티에 접근하려할때 객체를 호출한것처럼 객체화 하고 프로퍼티 참조가 끝나면 사라진다.
//원시 타입에 대응하는 래퍼 객체(Wrapper object)가 존재합니다. String, Number, Boolean, Symbol

var str = "문자열";   // 문자열 생성
var len = str.length; // 문자열 프로퍼티인 length 사용

//=> 문자열의 프로퍼티에 접근하려 할때 new String 호출한것처럼 문자열 값이 객체로 변하여 length를 사용할수있다.



/*정리
typeof로 얻을수있는 데이터 타입은 총 7개로 string,number,boolean,symbol,undefined,function,object 이다.
이때 string, number,boolean,symbol,undefined는 원시타입에 속하고 (null추가)
object, function은 참조타입에 속한다.

이때 원시타입의 4가지 string number boolean symbol타입은 래퍼객체에 속해 필요에 따라 객체화가 가능하다.(함수를 사용가능)
 */
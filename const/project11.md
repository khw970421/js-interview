객체
===
### 1. 개념적의미

객체 : 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합  
'Property' : 속성 이란 뜻으로, JS에서는 객체 내부의 속성(프로퍼티 키(이름)와 프로퍼티 값)을 의미합니다.  
프로퍼티 키 :  프로퍼티를 식별하기 위한 식별자(identifier)다. => 키 값을 통해서 각각의 다른 프로퍼티를 구분(식별)할수있다.    
 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 Prototype(원형) 객체 또는 줄여서 Prototype(프로토타입)이라 한다  
프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라 부른다.
<hr/>

### 2. 객체 생성
case 1. 객체 리터럴 이용

const a = {};  
const b = { x: 0, y: 0 };

case 2. new 연산자 이용

const a = new Object();  
const b = new Array();  

<hr/>

### 3. hasOwnProperty
객체.hasOwnProperty(속성명)ㅡ 객체의 속성이 상속받지 않은 속성인지 알려줌. 자신의 속성이면 true, 부모의 속성이거나 아예 속성이 아니면 false를 반환.  
```js
var obj = {
	example: "yes"
};
obj.example; // yes
obj.hasOwnProperty("example"); // true
obj.toString; // function toString() { [native code] }      모든 객체의 최상위 객체인 object가 가진 toString이다.
obj.hasOwnProperty("toString"); // false            obj가 자신의 속성이 아닌 최상위 객체의 속성이므로 false return
```
<hr/>

### 4. isPrototypeOf
객체.isPrototypeOf(대상)ㅡ 객체가 대상의 조상인지 알려준다.
<hr/>

### 5. 프로토타입에 대해서 (from 생활코딩 강의)
객체 : 서로 연관된 변수와 함수를 그룹핑하고 이름을 붙인것  
this : 메소드가 속해있는 객체를 가르키는 특수한 약속 (편하게 무언가를 수정하면 수정하는 다른 것도 줄이려고)
#### this예시
example) 이 경우는 만약 var kim부분을 ki로 바꾸거나 할 경우 sum함수 안에 있는 값도 ki로 전부 바꿔줘야 동작한다. 
```js
var kim = {
    name:'kim',
    first:10,
    second:20,
    sum:function(){
        return kim.first+kim.second;
    }
}
//console.log("kim.sum(kim.first, kim.second)", kim.sum(kim.first, kim.second));
console.log("kim.sum(kim.first, kim.second)", kim.sum());
```

example this) 이 경우는 var kim부분을 ki로 바꿔도 sum안에있는 this로 인해 저절로 kim이 ki로 바꾸기때문에 문제가 없다.
```js
var kim = {
    name:'kim',
    first:10,
    second:20,
    sum:function(){
        return this.first+this.second;
    }
}
//console.log("kim.sum(kim.first, kim.second)", kim.sum(kim.first, kim.second));
console.log("kim.sum(kim.first, kim.second)", kim.sum());
``` 
<hr/>

#### prototype 예시
원래코드
```js
function Person(name, first, second){
    this.name=name;
    this.first=first;
    this.second=second;

    this.sum = function(){
        return 'prototype : '+(this.first+this.second);
    }
}  


var kim = new Person('kim', 10, 20);
var lee = new Person('lee', 10, 10);
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());
```

수정한코드
```js
function Person(name, first, second){
    this.name=name;
    this.first=first;
    this.second=second;   
}
 
Person.prototype.sum = function(){
    return 'prototype : '+(this.first+this.second);
}
 
var kim = new Person('kim', 10, 20);  //생성자 함수(constructor)인 Person
var lee = new Person('lee', 10, 10);
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());
```
원래코드를 수정한코드로 바꾼후 장점 
1. Person이라는 생성자 함수안에 sum을 정의하는것이 들어가 있지 않기때문에 sum부분이 객체가 만들어질때마다 실행되지않는다.(성능,메모리절약)
2. 하나의 sum 함수를 수많은 객체들이 같이 쓸수있어 (성능,메모리 절약)

Person.prototype.sum이란 Person이라는 생성자함수의 공통적으로 사용할 sum이라는 메소드를 만드는 것이다.  
(Person이라고하는 생성자 함수의 prototype 즉 원형을 정한다.)
<hr/>

#### kim이라는 부분만 바꾸고 싶을때
```js
function Person(name, first, second){
    this.name=name;
    this.first=first;
    this.second=second;   
}
 
Person.prototype.sum = function(){
    return 'prototype : '+(this.first+this.second);
}
 
var kim = new Person('kim', 10, 20);
kim.sum = function(){
    return 'this : '+(this.first+this.second);
}
var lee = new Person('lee', 10, 10);
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());
 
```
동작원리 
1) kim.sum()의 경우 kim.sum이라는 것 자체가 있는지 판단하는데 kim 자신이 kim.sum을 가지므로 존재하는 것을 return한다.
2) lee.sum()의 경우 lee.sum이라는 것 자체가 있는지 판단하는데 lee 자신이 lee.sum을 가지지않으므로 이 객체의 생성자인 Person의 Prototype이라는 것의 sum이 정의되어있는지를 확인해 이를 return한다.

<hr/>

####Constructor

constructor : 객체가 만들어지기 직전에 실행되기로 약속된 함수  
 
case 1) class를 이용한 생성자함수 사용법
```js
class Person{
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
}

var kim = new Person('kim', 10, 20);        //kim 객체가 만들어지기 전에 constructor가 실행이 되어 값들이 저장된다.
console.log('kim', kim);
```
case 2) 그냥 function 이용한 생성자함수 사용법
```js
function Person1(name,first,second){
    this.name = name;
    this.first = first;
    this.second = second;
}
var kim1 = new Person1('kim', 10, 20);        //kim 객체가 만들어지기 전에 constructor가 실행이 되어 값들이 저장된다.
console.log('kim', kim1);
```

생성자는 기본적으로 함수이다.  
함수를 호출할때 new를 붙이게되면 단순한 함수가 아니라 생성자 함수가 된다.  
이를 통해 만들어진 것은 생성자를 통해 만들어진 객체가 들어가게된다.
객체의 원형은 Prototype이라는 property에 저장되어있다. 
Prototype이라는 특수한 property가 있다. 
```js
function Ultra(){}  //생성자
Ultra.prototype.ultraProp = true;
 
function Super(){}
Super.prototype = new Ultra();
 
function Sub(){}
Sub.prototype = new Super();
 
var o = new Sub();
console.log(o.ultraProp);
```
<hr/>

#### 객체간의 상속
case1) __proto__ 사용
```js
var superObj = {superVal:'super'}
var subObj = {subVal:'sub'}
subObj.__proto__ = superObj;
console.log('subObj.subVal =>', subObj.subVal);
console.log('subObj.superVal =>', subObj.superVal);
subObj.superVal = 'sub';
console.log('superObj.superVal =>', superObj.superVal);
```

case2) Object.create 사용
```js
var superObj = {superVal:'super'}
// var subObj = {subVal:'sub'}
// subObj.__proto__ = superObj;
var subObj = Object.create(superObj);
subObj.subVal = 'sub';
debugger;
console.log('subObj.subVal =>', subObj.subVal);
console.log('subObj.superVal =>', subObj.superVal);
subObj.superVal = 'sub';
console.log('superObj.superVal =>', superObj.superVal);
```
<hr/>

#### 객체와 함수 그리고 call() bind()
call()은 첫번째인자로 내부적으로 this를 무엇으로 할건지, 두번째부터 인자 값이 나타난다.  
sum()은 어떤 객체에도 속하지않지만 이를 쓰기위해서 .call()을 사용한다.  
사실 sum() === sum.call()이나 같은것이나 call()은 this를 받을 수 있기때문이다.  
call은 실행할때 함수의 context 즉 this의 값을 바꾼다.
```js
var kim = {name:'kim', first:10, second:20}
var lee = {name:'lee', first:10, second:10}
function sum(prefix){
    return prefix+(this.first+this.second);
}
// sum();
console.log("sum.call(kim)", sum.call(kim, '=> ')); //apply
console.log("lee.call(kim)", sum.call(lee, ': '));
```

bind()는 어떤함수의 내부적으로 this의 값을 영구적으로 바꾸는 **새로운 함수**를 만든다. 
```js
var kim = {name:'kim', first:10, second:20}
var lee = {name:'lee', first:10, second:10}
function sum(prefix){
    return prefix+(this.first+this.second);
}
// sum();
console.log("sum.call(kim)", sum.call(kim, '=> ')); //apply
console.log("lee.call(kim)", sum.call(lee, ': '));
var kimSum = sum.bind(kim, '-> ');
console.log('kimSum()', kimSum());
```

#### prototype, __proto__

```js
function Person(name,first,second){
    this.name=name;
    this.first=first;
    this.second=second;
}   
// 이 경우 객체가 2개가 생기는데 하나는 Person 객체이고 다른 하나는 Person.prototype 객체이다.
// Person의 prototype은 Person's Prototype객체를 가르키고  Person's Prototype객체의 constructor는 Person을 가르킨다.

console.log(Person===Person.prototype.constructor)   // 즉 이것이 true다

Person.prototype.sum = function(){
    return this.first+this.second;
}

var kim =new Person('kim',10,20)    //kim객체는 Person.prototype을 가르킨다.

var lee = new Person('lee',10,10)   //lee객체는 Person.prototype을 가르킨다.

console.log(kim.sum());             //kim객체내에서 sum()을 찾아 없으니 Person.prototype에서 찾아 sum()을 찾는다.
console.log(Person.prototype.sum.call(kim));
console.log(Person.prototype===kim.__proto__);   //true

```
<hr/>

#### 같은 의미
```js
let obj = {
    a:10
}; // 이 코드는
// let obj = new Object(); // 와 같은 의미이다.

function Object(a)
{
    this.a = a;
}
let obj2 = new Object(10)

console.log(obj2.a, obj.a)

```
결국 let obj ={}와 let obj = new Object()는 같은 의미이다. 

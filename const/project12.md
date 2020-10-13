객체(정리 간락히)
===
### 1. 방법
case 1. 직접 객체 만들기
```js
let mei = new Object();
mei.left = '얼리기';
mei.right = '고드름'
mei.e = '방벽'
```
case 2. 객체의 틀을 만들고 객체생성
```js
let mei1= {
    left:'얼리기',
    right:'고드름',
    e:'방벽'
}
```

case 3. 프로토타입을 이용(객체의 모양을 가진 틀) 생성자 함수 
```js
function make(left,right,e){
    this.left = left;
    this.right=right;
    this.e = e;
}

let mei2 = new make('얼리기','고드름','빙벽')
```

결과로 확인하기
```js
console.log(mei.left,mei1.left,mei2.left) //얼리기 얼리기 얼리기
console.log(typeof mei,typeof mei1,typeof mei2) //object object object
```

<hr>

### 2. prototype __proto__

```js
function ultra(){}
ultra.prototype.a = true;
function Super(){}
Super.prototype = new ultra();
function sub(){}
sub.prototype = new Super();
```

기본적으로
```js
function ultra(){}
ultra.prototype.a = true;
```
실행되었을때 우리가 알아야할것은 함수인 ultra가 있고 object인 ultra.prototype이 있다는 사실입니다.  
여기에 
```js 
Super.prototype = new ultra()
``` 
가 진행되면 복잡해지는데 쉽게 __ultra라는 객체가 추가됩니다.__ (중요 : ultra 함수가아닌 ultra 객체)  

위의 내용을 통해 Super의 프로토타입이 객체인 ultra를 가리키고   
이 객체인 ultra의 속성중 __proto__는 ultra.prototype을 가르킨다고 할 수 있습니다.  
(이를 통해 우리는 Super.prototype.a를 통해 Super객체를 통해 a를 얻을수있다.)  

```js
console.log(Super.prototype.__proto__ === ultra.prototype) //true
```

이를 
```js
function sub(){}
sub.prototype = new Super();
```
추가한다면 더욱 흥미로운 사실들이 나타나는데 브라우저에 
```js
console.log(sub.prototype)
console.log(sub.prototype.__proto__)
console.log(sub.prototype.__proto__.__proto__)
console.log(sub.prototype.__proto__ === Super.prototype)
```
결과는  
```js
ultra {}  
ultra {}  
ultra { a: true }  
true 
```  
이렇게 나타납니다.
결국 sub코드가 추가되면서 sub안의 prototype은 어떤 object가 되고  
 이 object의 __proto__는 Super가 가르키는 prototype와 같습니다. (위에 결과에서 true이듯이)
 이를 글보단 그림과 같이 보는게 나으므로  
 https://github.com/khw970421/js-interview/issues/8
 이곳의 아래부분의 그림을 참조하며 이해한다면 도움이 될 것입니다.  
 
 (알게 된 것
 prototype이란건 함수에만 존재하는 어떠한 객체를 가르키는 속성이란것을 알수있었고
 객체에 존재하는 __proto__는 자신의 바로위 부모의 객체를 나타내고
 함수에 존재하는 __proto__는 최상위 Object를 나타내는 __proto__를 가진 f()를 나타내는 것
 결국 객체를 통해 계속 나아가 최상위까지 가면서 객체에 따른 속성값이 있는지를 알아낼수있다.
 )
 
 prototype는  함수 -> 객체    
 __proto__는  함수 -> f()  
 __proto__는  객체 -> 부모객체 

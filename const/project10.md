자바스크립트 모듈 문법
===
### 1.1 기본적인 모듈의 사용법에 대해 알아보자  

html
```html
<script type="module" src="src/import.js"></script>
```

src/export.js
```js
const PI = 3.14;
let months=10, YEAR=100;
export { months,YEAR};

```
src/import.js
```js
import { months } from './export.js';
console.log(months);
```

위를 통해 우리는 export.js에 있는 months와 YEAR의 변수를 import에서 출력하는것을 해보았다.  
이때 만약 
src/import.js
```js 
import { months } from './export.js';
months=1000;
console.log(months);
```
<hr/>

### 1.2 import한 값을 변경하기 
이런식으로 let인 months를 바꾼다면 어떻게 될까??   
정답은 error가 뜹니다.  
에러 내용으로는  Assignment to constant variable. 라고 하는데 이는 const를 우리가 바꾸려할때 나는
에러와 비슷한데 왜 let인 months가 이런 오류가 날까에 대한 답변은   
https://stackoverflow.com/questions/53723251/javascript-modifing-an-imported-variable-causes-assignment-to-constant-varia  
이곳에서 알 수 있다. (아마 모듈에서의 import하는 내용을 함부로 바꾸지 못하게 하기위해 const로 고정시킨것이지 않을까싶다.)  

결국 이처럼 값을 변하게 하기위해서는 다른 방법을 이용하는데 이것이 함수이다. 

src/export.js
```js
const PI = 3.14;
var months=10, YEAR=100;
function modify(e){
    months=e;
}
export { months,YEAR,modify};

```
src/import.js
```js
import { months,modify } from './export.js';

console.log(months);
modify(1000);
console.log(months);
```
이렇게 import.js에서 export.js에서 import한 modify()를 이용해 months의 값을 바꿔줄수있다. 

<hr/>
  
### 2. export를 하는 2가지 방법

case 1) 변수나 함수앞에 export를 선언하기
```js
export const foo = "bar";

export const spam = "eggs";

export function add(x, y) {
  return x + y;
}

export class Person {
  // ...
}

```
case 2) 나중에 한번에 export로 묶기 (확실히 이쪽이 export를 매번 넣을 필요가 없으니 편하겠지)
```js
const foo = "bar";

const spam = "eggs";

function add(x, y) {
  return x + y;
}

class Person {
  // ...
}
export { foo, spam, add, Person}
```
<hr/>
  
### 3. export default
개념 : 변수 이름들을 export하는 named export와 다르게 export default 구문은 모듈을 대표하는 하나의 값을 지정하고, 그 값을 다른 모듈에서 불러와서 사용할 수 있습니다.   
(export는 다를바 없으나 export default만 하나 설정하고 그것만 따로 import --- from 하면 된다.)
###### ex)
export.js
```js
export default function(x, y) {
    return x + y;
}

export let h = 10000;

```
import.js
```js
import add from "./export.js"; // add가 모듈의 이름이 됐음.(새롭게 이름 짓기 가능) {add}할경우 오류
import {h} from "./export.js"; // export.js에 원래있었던 h 변수 import
(import add,{h} from "./export.js"로 한번에도 가능)

console.log(add(1, 2)); // 3
console.log(h);
```
<hr/>

### 4.다른 이름으로 export & import 하기
 각각 모듈에서는 같은 이름으로 변수를 선언해도 모듈 스코프 내에서 선언되기 때문에 충돌될 일은 없지만,  한 파일에서 각각 다른 모듈의 이름이 같은 변수를 export하면 import한 파일에서는 충돌이 일어날 수 있습니다.  
 이를 위해서 export 혹은 import하는 이름의 뒤에 as를 붙여서, 다른 이름을 대신 사용 할 수 있습니다.
흡사 다른 이름으로 저장하기 같은 느낌입니다.

### 5. 혼자 하는 정리 및 만들기 (조금 극단적(?)일수도 있다.)

index.html
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>모듈 적용</title>
</head>
<body>
<h1 class="galary">영웅 갤러리</h1>
<br>
<h1 class="mei">메이</h1>
<h1 class="reaper">리퍼</h1>
<h1 class="mercy">메르시</h1>


<script type="module" src="src/import.js"></script> 
<script type="module" src="src/galery.js"></script>
</body>
</html>
```
위를 통해 2개의 module을 사용할수 있다
<hr/>

import.js
```js
import {left as mei_l,right as mei_r,e as mei_e,q as mei_q,shift as mei_shift} from "./mei.js";
import {left as mercy_l,right as mercy_r,e as mercy_e,q as mercy_q,shift as mercy_shift} from "./mercy.js";
import {left as reaper_l,right as reaper_r,e as reaper_e,q as reaper_q,shift as reaper_shift} from "./reaper.js";
import {click,a,click_mercy,click_reaper,click_mei} from "./galery.js";

click.addEventListener('click',function(){
    console.log('메이')
    console.log('리퍼')
    console.log('메르시')
})
click_mei.addEventListener('click',function(){
    if(a==1){
        console.log(mei_l)
        console.log(mei_r)
        console.log(mei_q)
        console.log(mei_shift)
        console.log(mei_e)
    }
})
click_mercy.addEventListener('click',function(){
    if(a==2){
        console.log(mercy_l)
        console.log((mercy_r))
        console.log((mercy_q))
        console.log((mercy_shift))
        console.log((mercy_e))
    }
})
click_reaper.addEventListener('click',function(){
    if(a==3){
        console.log(reaper_l)
        console.log((reaper_r))
        console.log((reaper_q))
        console.log((reaper_shift))
        console.log((reaper_e))
    }
})

```
위를 통해 import한 모듈(galery.js)의 내용을 import.js가 import 하는것도 가능하다.  
또한 각각의 import한 것들이 left로 이름이 같으므로 이를 해결하기위해 as를 사용한다.
<hr/>

galery.js
```js
import {click_mei} from "./mei.js";
import {click_mercy} from "./mercy.js";
import {click_reaper} from "./reaper.js";

let click = document.querySelector(".galary");

let a=0;
click_mei.addEventListener('click',function(){
    a=1;
})
click_mercy.addEventListener('click',function(){
    a=2;
})
click_reaper.addEventListener('click',function(){
    a=3;
})

export {a,click,click_mei,click_reaper,click_mercy};

```
위를 통해 3가지 js파일에서 document.querySelector의 내용을 import를 해 온 것을 알수있다. 클릭시마다 a의 값은 바뀐다  
<hr/>

mei.js
```js
let left="얼리기"
let right="고드름"
let e = "방벽"
let shift="급속빙결"
let q = "뽕주부시선(정확히 몰라 찾기귀찮)"
let click_mei = document.querySelector(".mei")
export {left,right,e,shift,q,click_mei};

```
reaper.js
```js
let left="일반 공격"
let right="x"
let e = "그림자 밟기"
let shift="망령화"
let q = "죽어죽어죽어(정확히 몰라 찾기귀찮)"
let click_reaper = document.querySelector(".reaper")
export {left,right,e,shift,q,click_reaper};
```
mercy.js
```js
let left="힐 버프"
let right="딜 버프"
let e = "살리기"
let shift="따라가기"
let q = "버프 여러개(정확히 몰라 찾기귀찮)"
let click_mercy = document.querySelector(".mercy")
export {left,right,e,shift,q,click_mercy};
```

위를통해 알게 된 것은  click_mei,click_reaper,click_mercy 이 3가지의 변수의 경우
각각의 mei.js reaper.js mercy.js에서 galery.js로 import되고 그후에 import.js로
또 import되어서 사용된다는 것을 알 수 있다.  (모듈안에 모듈을 사용할수 있는 것 같다.)

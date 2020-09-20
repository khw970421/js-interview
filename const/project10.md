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

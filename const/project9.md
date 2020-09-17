자바스크립트 모듈의 역사
===
모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다.  

모듈은 파일 단위로 분리되어 있으며 애플리케이션은 필요에 따라 명시적으로 모듈을 로드하여 재사용   

모듈의 장점 : 재사용성이 좋아서 개발 효율성과 유지보수성을 높일 수 있다.  

ex) 가장 쉬운 export import 예시  
index.html (src파일안에 import.js export.js 존재할때)
```
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>모듈 적용</title>
</head>
<body>
<h1>테스트</h1>
<script type="module" src="src/import.js"></script> //모듈을 넣는다.
<script type="module" src="src/export.js"></script>
</body>
</html>
```
export.js
 ```js
// 배열 내보내기
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 상수 내보내기
export const YEAR = 2015;

// 함수 내보내기
export function sayHi(user) {
    alert('Hello! `user`');
}

// 클래스 내보내기
export class User {
    constructor(name) {
        this.name = name;
    }
}

```
export.js
```js
import { months, YEAR, sayHi as hello ,User } from './export.js';
//as 를 이용해 새 이름 부여하기
hello('길동');        //alert 
console.log(months);    //console에 출력
```

이를 통해 우리는 module을 생성하고 실행할수있다. 
주의해야할 점은 export.js나 import.js 자체를 실행시키면 오류가 뜬다.(SyntaxError: Unexpected token 'export')  
반드시 html파일에 type="module"로 만든 후 실행해야 정상적 동작한다.

모듈의 종류
===
1) ES6 Modules(ESM) → import : ES6 에서는 드디어 정식으로 모듈 시스템이 도입 되었습니다
2) CommonJS → require : js에는 module이 없는것을 해결하기 위해서 생성
3) AMD → define - require 
4) Browser →

AMD는 AMD(Asynchronous Module Definition) 의 약자( CommonJS 독립한 그룹)
AMD 그룹은 비동기 상황에서도 JavaScript 모듈을 쓰기 위해 CommonJS에서 함께 논의하다 합의점을 이루지 못하고 독립한 그룹  
비동기 환경에서도 매우 잘 동작, 서버사이드에서도 동일한 코드로 동작 (정웅님 내용 피드백)

CommonJs는 자바스립트를 브라우저에서 뿐만아니라 서버사이드에서도 사용하기 위해 만들어진 모듈 스펙  
CommonJS 는 특유의 동기적인 특성 때문에 보통 server-side 개발에 더 적합하다 한다
 
CommonJS, ESM 모두 동기식 로딩 방식을 채택하고 있습니다
따라서 로드한 모듈이 아직 사용되지 않았음에도, 미리 로딩해야 합니다

AMD 는 동적 로딩을 가능하게 하고, 의존성 관리나 모듈화를 할 수 있는 API를 제공합니다

과거에는 모듈의 개념이 없어 commonjs나 amd가 모듈을 만들었고 그 후에는 ES6라는 개념이 확립된 후 
module이 모듈 개념이 정식으로 ECMAScript 명세에 수록  
```js
 ES 모듈을 CommonJS 모듈과 함께 사용할 수 있게 코드 변환을 지원하는 도구는 바로 Babel이다.  
 Babel은 ES6 문법의 코드를 대부분의 환경에서 지원 가능한 ES3나 ES5 코드로 바꿔주는 역할을 한다. Babel이 ES 모듈의 코드를 CommonJS 모듈의 문법으로 바꿔주면서 이 방법이 이후에도 널리 사용되게 된다.
```
//출처  
https://velog.io/@doondoony/JavaScript-Module-System  
https://ui.toast.com/weekly-pick/ko_20190418/


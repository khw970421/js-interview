 DOM - BOM 이란?
===

기본적인 브라우저 원리 : 원하는 정보를 가진 서버에 요청을하여 해당하는 웹문서를 받아 브라우저의 렌더링엔진은 웹문서를 로드한 후, 브라우저가 이해할수있는 구조로 메모리에 적재한다. 

### 0. window 객체 : 자바스크립트의 최상위객체이자 전역객체이면서 모든 객체가 소속된 객체
Dom, Bom, JS core가 속해있다. 

### 1. BOM :  브라우저와 관련된 객체들의 집합  
웹페이지의 내용을 제외한 브라우저의 각종 요소들을 객체화  
브라우저의 버튼 URL 주소 입력창 타이틀 바 등 웹브라우저 윈도 및 웹페이지의 일부분을 제어할 수 있게 뜸한 윈도 객체모델이다.  
특징 : 자바스크립트가 브라우저와 소통하기 위한 모델

ex)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script type="text/javascript"> 
window.open(); 
window.open('http://www.naver.com/', 'Gz', 'width=500 height=500', true); </script>
</body>
</html>
```
이를 실행할 경우 새로운 브라우저에 네이버가 높이 넓이 500크기로 나타나게 된다.  
이는 즉, 문서를 객체화한 문서에 영향을 끼친 것이 아닌 브라우저 자체에 js가 영향을 끼친것으로 볼수있다. 즉 Bom이다. 

### 2. DOM : 웹페이지를 (자바스크립트로) 제어하기 위한 객체 모델 => 브라우저가 웹문서를 이해할수있게 구성된 것

=> dom은 서버를 통해 받아온 문서(index.html)을 객체로 만들어 이를 js를 통해 제어할수있게 하는 것이라 생각

Dom의 기능
1) HTML 문서에 대한 모델 구성 
2) HTML 문서 내의 각 요소에 접근 및 수정

ex)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
	<div class="a"> 운영체제보안 행복해요 </div>
<script type="text/javascript"> 
	document.querySelector('.a').innerHTML="사실 힘들어"
 </script>
</body>
</html>
```
이를 실행 할 경우 Dom으로 인해 문서가 객체화 될것이고 js를 통해 객체에 접근하여 문서의 내용을 바꿔주는 역할을 한다. 

정리하자면  
BOM은 브라우저 창 안의 속성 (문서외에 나머지와 관련)
DOM은 브라우저 창 안의 웹문서 내용 (문서와 관련)


### 3. Reflow :Render Tree와 각 요소들의 크기와 위치를 다시 계산하는 것
1. 노드의 추가 또는 제거시
2. 요소의 위치 변경 시
3. 요소의 크기 변경 시 (margin, padding, border, width, height 등..)
4. 폰트나 텍스트 내용 변경과 이미지 크기 변경 시
5. 페이지 초기 랜더링 시 (최초 Layout 과정)
6. 윈도우 리사이징 시

```js
var el = document.getElementById('reflow-test');

el.style.padding = '8px';
el.style.width = '320px';
el.style.height = '240px';
// 3 번의 리플로우 발생

/////////
var el = document.getElementById('reflow-test');

el.style.cssText = 'padding: 8px; width: 320px; height: 240px;';
/* or */
el.className = 'changed';
// 1 번의 리플로우 발생
```
따라서 리플로우의 발생을 줄일수록 repaint(redraw)도 줄어 시간을 줄이게된다. 


//출처 : 
https://webclub.tistory.com/346
https://wonism.github.io/reflow-repaint/

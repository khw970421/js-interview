//전반적 정리//

/* 함수를 정의하는 방식
1. 함수 선언문
2. 함수 표현식
3. function 생성자
 */

function square1(num){console.log(num*num);}


let square2 = function(num){console.log(num*num);}


let square3 = new Function('num','console.log(num*num)');

/* 함수를 호출하는 방식
1. 함수 호출
2. 객체의 메소드 호출
3. 생성자 함수 호출
4. apply, call, bind 사용
 */

// 함수 호출
square1(4);     //함수선언문
square2(4);     //함수표현식

// 객체의 메소드 호출
let method = {
    square4 : function(num) {
        console.log(num * num);         //함수표현식
    }
}
method.square4(4);

// 생성자 함수 호출
square3(4);

//apply, bind 사용
const k1 = Math.max.call(null,5,6,7,8,9);        //인수 리스트
const k2 = Math.max.apply(null,[5,6,7,8,9]);     //단일 배열
console.log(k1,k2);


// 화살표함수 (함수표현식에서 사용=>함수호출방식에서 함수호출, 객체의 메소드 호출때 사용)

let square5 = (num)=>{console.log(num*num);}
let method1 = {
    square6:(num)=>console.log(num*num)
};
square5(4);
method1.square6(4);

/*일반함수 vs 화살표함수
일반함수 : 호출 시 this에 동적으로 바인딩 => apply, call, bind 메소드 이용해 this 변경
화살표함수 : 선언 시 정적으로 바인딩 => apply, call, bind 메소드 이용해 this 변경 x
 */

let type = "zero";
let type1 = { type: "one" };
let type2 = { type: "two" };

//일반함수
let normal = {
    getType: function(){
        console.log('this type:\t',this.type,'\tthis:', this);
    }
}

//화살표함수
let arrow ={
    getType: ()=>console.log('this type:\t',this.type,'\tthis:', this)
}

//this를 변경
normal.getType();
normal.getType.call(this);
normal.getType.call(type1);     // == normal.getType.call(type1,null);
normal.getType.call(type2);     // == normal.getType.call(type2,null);

//this 변경 x
arrow.getType();
arrow.getType.call(this);
arrow.getType.call(type1);
arrow.getType.call(type2);

console.log();
//함수 호출때에도 마찬가지
getType1=function(){
    console.log('this type:\t',this.type,'\tthis:', this);
}

getType2=()=>console.log('this type:\t',this.type,'\tthis:', this)

getType1();
getType1.call(this);
getType1.call(type1);
getType1.call(type2);

getType2();
getType2.call(this);
getType2.call(type1);
getType2.call(type2);

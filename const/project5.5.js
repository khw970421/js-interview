/*
제너레이터 함수 : 이터러블, 이터레이터 객체를 만드는 손쉬운 방법 (함수인데 객체를 반환)
이터레이터 객체 : next() 메소드를 구현하고 있고, done과 value 속성을 가진 객체를 반환하는 객체
 */

//이터레이터 객체
const iter = {
    arr: [3,4, 5, 6],
    [Symbol.iterator]() {return this;},
    next: function() {
        return {
            value: this.arr.pop(),
            done: this.arr.length == 0
        }
    }
}

const a = iter;
console.log(a.next());  //yield로 반환값 6
console.log(a.next());  //yield로 반환값 5
console.log(a.next());  //yield로 반환값 4
console.log(a.next());  //yield로 반환값 3
console.log(a.next());  //yield로 반환값 undefined

/*결과
{ value: 6, done: false }
{ value: 5, done: false }
{ value: 4, done: false }
{ value: 3, done: true }
{ value: undefined, done: true }
 */


//제너레이터 함수
arr = [3,4,5,6];
function* iter1 (){
    let i=arr.length-1;
    while(i>=0) {
        yield arr[i--];
    }

}

const b =iter1();       // generator 함수를 호출해 받은 iter 객체를 변수에다 할당하여 사용하기 때문에 하나의 공간을 사용한다.
console.log(b.next());  //yield로 반환값 6
console.log(b.next());  //yield로 반환값 5
console.log(b.next());  //yield로 반환값 4
console.log(b.next());  //yield로 반환값 3
console.log(b.next());  //yield로 반환값 undefined

/*결과
{ value: 6, done: false }
{ value: 5, done: false }
{ value: 4, done: false }
{ value: 3, done: true }
{ value: undefined, done: true }
 */

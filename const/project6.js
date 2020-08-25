/*
ES2015 이전까지는 객체에 생성자를 사용해왔다
ES2015 부터는 클래스를 이용해 생성자(constructor)를 사용했다.
 */

//객체를 이용해 사용
let user1 = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};
console.log(user1.fullName); // John Smith

//클래스를 이용해 사용
class user2 {
    constructor(name,surname) {
        this.name=name;
        this.surname=surname;
    }
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};
var usr = new user2("JOHN","SMITH");    //인스턴스생성
console.log(usr.fullName); // John Smith
/*
//클래스의 특징

// 클래스 몸체(class body)에는 메소드만 선언할 수 있다.
class Person {
    console.log('hello');
}
// 에러: Unexpected token

// 클래스는 객체가 아닙니다!
class Person {
    prop1: 1,
    prop2: 2
}
// 에러: Unexpected token

// 클래스는 사실 함수이다. =>함수표현식과 함수선언식 2가지 가능
console.log(typeof user2); //function

//함수선언식
class p{

}
//함수 표현식
const h = class p1{

}
const h = class {

}

클래스의 인스턴스를 생성하려면 new 연산자와 함께 constructor(생성자)를 호출한다.
만약 클래스가 2개 이상의 constructor를 포함하면 문법 에러(SyntaxError)가 발생한다
java처럼 같은 생성자에 매개변수가 다른 오버로딩은 안되는듯하다.

class Foo {
    constructor(){
        console.log("start");
}
    constructor(p){
        this.p = p;
    }
}//error : A class may only have one constructor
const foo = new Foo();      //생성자 호출 (Foo==constructor)
foo;
const foo1 = new Foo(10);
foo1;

*/
function Person(name) {
    this.name = name;
}

// 생성자를 통한 객체 생성
// person1이 Person의 인스턴스입니다.
const person1 = new Person("윤아준");
console.log(person1.name)

//객체의 참조
let objA= {
    x: 10
}
let objB=objA;
objB.x=1000;
console.log(objA.x)     //객체를 같이 참조하므로 값이 변경되어 1000
//객체의 복사
let objA1={
    x:10
}
let value=objA1.x;
value=100;
console.log(objA1.x)    //객체를 복사하므로 10은 변하지않고 10으로 출력

//get과 set
//객체를 이용한 get set
var o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    }
};

console.log(o.a); // 7
console.log(o.b); // 8  (get의 사용방법) 다른 곳에서 사용할 수 있게한다.
o.c = 50;               //(set의 사용방법) 다른 곳에서 값을 설정할 수 있게한다.
console.log(o.a); // 25

//class를 이용한 get set
class p{
    constructor(a1){
        this.a1=a1;
    }
    get b() {
        return this.a1 + 1;
    }
    set c(x) {
        this.a1 = x / 2;
    }
}
let h = new p(7);
console.log(h.a1);
console.log(h.b);
h.c=50;
console.log(h.a1);

/*class내부에 있는 메소드를 인스턴스를통해 쓰는것이 아닌 바로 class_name.메소드로 쓰려면
메소드앞에 static을 붙인다.
java에서와 같이 상속도 가능하다.
 */

/*
1) 자식 클래스 A를 통해 부모 클래스 B의 정적 메소드와 정적 속성을 사용할 수 있습니다.
2) 부모 클래스 B의 인스턴스 메소드와 인스턴스 속성을 자식 클래스 A의 인스턴스에서 사용할 수 있습니다.
*/


class overwatch{        //부모클래스 overwatch
    static shift_cooltime=12;
    static shift(){
        console.log("shift키 누르기");
    }
    e(){
        console.log("e키 누르기");
    }
    static leftbar(){console.log("좌클릭누르기");}
    static rightbar(){console.log("우클릭누르기");}
}

class mei extends overwatch{        //자식클래스 mei

}

mei.shift();    // 1)자식클래스 mei를 통해 부모클래스 overwatch 정적메소드 shift()를 사용할수있다.
console.log(mei.shift_cooltime)     //1)자식클래스 mei를 통해 부모클래스 overwatch 정적속성 shift_cooltime 사용할수있다.

const m = new mei();
m.e();
/* 2) 부모 클래스 overwatch의 인스턴스 메소드와 인스턴스 속성(static을 쓰지않은것)
을 자식 클래스 mei의 인스턴스(m)에서 사용할 수 있습니다.

인스턴스 메소드 : e()
클래스 메소드 : shift(), leftbar(), rightbar()
클래스 속성 : shift_cooltime
인스턴스 : mei라는 객체를 통해 만들어낸 m
 */

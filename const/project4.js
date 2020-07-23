function createObject() {
    console.log('Inside `createObject`:', this.foo, this);
    let a= {
        foo: 42,
        bar: function () {
            console.log('Inside `bar`:', this.foo, this);
        }

    };
    return a;
}
createObject.call({foo: 21}).bar();

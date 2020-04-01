# this 的指向

总的来说，指向离他最近的function关键字所属的对象。

一般绑定this的方法有以下几种：

1. 箭头函数
2. 关键字new
3. 显式绑定
4. 隐式绑定
5. 默认绑定

以上按照优先级从高到低排列。

## 箭头函数

    function Person(){
      this.age = 0;
      setTimeout(function () {
        console.log(this.age);     // 输出undefined
      }, 1000);
    }
    var p = new Person();

    function Person(){
      this.age = 10;
      setTimeout(()=> {
        console.log(this.age);     // 输出10
      }, 1000);
    }
    var p = new Person();

在上述的箭头函数的例子中，setTimeout内部的函数是被global调用的，而global没有阿哥这个属性，输出undefined。

第二个使用箭头函数，this会绑定在Person上；因为箭头函数不会绑定this，导致setTimeout函数内部的函数不会绑定到global上。

## new关键字

    function foo() { 
        this.baz = "baz"; 
        console.log(this.bar + " " + baz); 
    } 
        var baz = new foo();
    var bar = "bar"; 
    var baz = new foo(); 

new关键字在函数的调用前，会创建一个新的对象实例，这个函数为实例的构造函数。

按照前文提到的this绑定的方法，在这个例子中，离this最近的function是foo，此时foo属于baz，所以this指向的是baz对象，在baz上并没有bar，global上没有baz，所以输出undefined undefined。

## 显式绑定

    function foo() { 
    console.log(this.bar); 
    } 
    var bar = "bar1"; 
    var obj = {bar: "bar2"}; 

    foo();
    foo.call(obj);

通过call显示绑定this

## 默认绑定和隐式绑定

    function foo() { 
        console.log(this.bar); 
    } 
    var bar = "bar1"; 
    var o2 = {bar: "bar2", foo: foo}; 
    var o3 = {bar: "bar3", foo: foo}; 
    foo();            // "bar1" – 默认绑定
    o2.foo();          // "bar2" – 隐式绑定
    o3.foo();          // "bar3" – 隐式绑定

调用函数foo，foo的function所属的对象是window，所以foo的this.bar指window的bar。

在o2和o3中，foo的function所属的对象分别是o2和o3，所以，this.bar分别指bar2和bar3。

## 总结

总的来说，this的指向除非通过一些方法显示规定，否则都是指向离他最近的function关键字所属的对象。
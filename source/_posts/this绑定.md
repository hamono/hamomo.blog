---
title: js中this的绑定
description: javascript中this的绑定方式
data: 2020-09-12 16:00
---

总体来说，this 总是指向离他最近的 function 关键字所属的对象。

可以分为严格模式下的和非严格模式下的；

## 严格模式下

### 函数调用时

```javascript
function foo() {
  this.bar = "123";
  console.log(this.bar);
}

foo(); // 报错
```

此处的 this 为 undefined，因为 function 关键字所属的对象为 undefined，所以不能添加属性。

所有函数中，this 都是 undefined，包括函数内部的函数，如：

```javascript
function foo() {
  this.bar = "123";
  function test() {
    console.log(this.bar);
  }
}

foo(); // 报错
```

`test()`函数的 this 依旧指向 undefined，与外层函数并无关系。

### 方法调用时

```javascript
function Foo() {
  this.bar = "123";
}
Foo.prototype.test = function () {
  console.log(this.bar);
};

var obj = new Foo();
obj.test(); // 123
```

方法调用时，`Foo()`作为构造函数，对于`obj`对象中的`test`方法，其 function 关键字所属的对象为`obj`对象，所以，会打印`123`.

### 隐式调用

可以通过`call`或`apply`方法动态的改变 this 的指向；

```javascript
var obj = { bar: "123" };

function foo(name) {
  console.log(this.bar + name);
}

foo.call(obj, "call"); // 123call
foo.apply(obj, ["apply"]); // 123apply
```

### 函数绑定

可以通过`bind()`方法绑定 this 值：

```javascript
function foo(name) {
  console.log(this + name);
}
const test = foo.bind("bind");

test("123"); // bind123
test("456"); // bind456
```

值得注意的是，`bind()`返回的是一个新的函数.

### 箭头函数

箭头函数并没有function关键字，所以依旧找离他最近的function关键字，判断this指向.

```javascript
function Foo(name) {
  this.bar = name;
}
Foo.prototype.test = () => {
  console.log(this.bar);
};

var obj = new Foo("123");
obj.test();   // undefined
```

因为箭头函数最近的function关键字是`Foo`函数，所以，this指向的是`Foo`函数所属的对象，即undefined.

## 非严格模式

在非严格模式下，与严格模式不同的地方在于函数调用时this的绑定，非严格模式下，比如浏览器环境，则指window对象.

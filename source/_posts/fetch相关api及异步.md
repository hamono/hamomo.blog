# fetch 相关 API

## fetch()

fetch 请求

    fetch('http://example.com/movies.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });

他可以接受两个参数，可以为一个请求的基本信息，如下：

    function postData(url, data) {
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(response => response.json()) // parses response to JSON
    }

## 上传 json 数据实例

    let url = 'https://example.com/profile';
    let data = {username: 'example'};

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

## await

等待一个`promise`对象，只能在异步函数中使用。

### 语法

    [return_value] = await expression;

expression：一个 Promise 对象或者任何要等待的值。
return_value：返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。

### 描述

await 表达式会暂停当前异步函数的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行异步函数。

若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。

## promise

看段代码：
    function read() {
      console.log('小明认真读书');
    }

    function eat() {
      return new Promise((resolve, reject) => {
        console.log('好嘞，吃饭咯');
        setTimeout(() => {
          resolve('饭吃饱啦');
        }, 1000)
      })
    }

    const cooking = new Promise((resolve, reject) => {
      console.log('妈妈认真做饭');
      setTimeout(() => {
        resolve('小明快过来，开饭啦');
      }, 3000);
    })

    cooking.then(msg => {
      console.log(msg);
      return eat();
    })
    read();

执行顺序：

妈妈认真做饭

小明认真读书

小明快过来，开饭了

好嘞，吃饭了

饭吃饱啦

promise的优点：将执行代码与处理数据的代码清晰的分离，在执行若干个异步函数时，将非常有用
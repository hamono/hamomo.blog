# setState的异步调用

`setState`是异步的，在class式的组件中，`this.state`表示当前渲染的值，在hook中`state`是同样的效果。

所以`this.setState`或者`setState`到底什么时候才会重新渲染呢？

`setState` 函数用于更新 `state`。它接收一个新的 `state` 值并将组件的一次重新渲染加入队列。在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 `state`。（这段话来自hook文档）

那么，“加入队列”怎么理解，“后续的重新渲染”又是什么时候呢？

先看一段代码：

      const [count, setCount] = React.useState(0);
      return <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>click</button>
        </div>

显而易见，打印的`count`的每次click都会加1，那么问题又来了，具体完成重新渲染是哪呢：是`onclick`函数执行完重新渲染呢，还是`setCount`执行完重新渲染呢？

观察下面的代码

      const [count, setCount] = React.useState(0);
      function handleValue(){
        setCount(count+1)
        setCount(count+1)
      }
      return <div>
        <p>You clicked {count} times</p>
        <button onClick={handleValue}>click</button>
      </div>

让我们猜一猜点击按钮一次，`count`的值是多少呢？

是1呢还是2呢？当然是1，所以setState并不会立刻rerender，正如上文所说，加入到了一个等待rerender的队列，按照上面的测试结果，我们是不是可以这样说：同一个函数内部的相同的setState只会执行一次，而它重新渲染是在其所在函数结束时。

真相真的是这样吗？

    const [count, setCount] = React.useState(0);
      function handleValue(){
        setCount((state)=>state+1)
        setCount((state)=>state+1)
      }
      return <div>
        <p>You clicked {count} times</p>
        <button onClick={handleValue}>click</button>
      </div>

那么这个点击一次的结果又是什么呢？

很明显这次不是1了，`count`是2了，这又是为什么呢？

首先要搞清参数`state`是什么

官方说法：`state` 是对应用变化时组件状态的引用。

通俗的说就是当前的`state`的值(`this.state`),也就是代码示例中的count值，因为count是不允许随意修改的，只能通过与其匹配的setCount传递值，所以这里使用了参数，所以这是一个很实惠(代码数量增加不多，解决的问题很关键)的消除异步的方法。(其实官方这样设计这个方法的时候目的是为了性能着想)

但是，关键的setState并不是总是异步的，只有在事件处理函数内部是才是异步的。

下面还有一段有趣的代码：

    const list=[1,1,1,1,1,1];
    const [count, setCount] = React.useState([]);
    function handleValue(){
      list.map((v:number)=>{
        setCount([...count,v])
      })
    }
    return <div>
      <p> {count} </p>
      <button onClick={handleValue}>click</button>
    </div>

setState的队列属性使得这种方法无法实现应有的效果，所以，我们修改：

    const list=[1,1,1,1,1,1];
    const [count, setCount] = React.useState([]);
    function handleValue(){
      list.map((v:number)=>{
        setCount((state)=>[...state,v])
      })
    }
    return <div>
      <p> {count} </p>
      <button onClick={handleValue}>click</button>
    </div>

如此，这个问题便解决了

这个是之前项目中出现的问题，解决了
function debounce(fn: () => void, time: number) {
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn();
    }, time);
  };
}

function fn(){
  console.log('防抖函数')
}

setInterval(debounce(fn,3000),5000)
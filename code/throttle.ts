function throttle(fn: (m:number) => void,pars:any, time: number) {
  let lastTime: number = null;
  return function () {
    let nowTime = Date.now();
    
    if (nowTime - lastTime > time || lastTime === null) {
      fn.apply(this,pars);
      lastTime = nowTime;
    }
  };
}

export function fn(m:number) {
  console.log("节流函数"+m);
}

setInterval(throttle(fn,[123], 3000), 1000);

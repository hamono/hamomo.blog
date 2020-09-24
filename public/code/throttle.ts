function throttle(fn: () => void, time: number) {
  let lastTime: number = null;

  return function () {
    let nowTime = (new Date() as unknown) as number;
    if (nowTime - lastTime > time || lastTime === null) {
      fn();
      lastTime = nowTime;
    }
  };
}

export function fn() {
  console.log("节流函数");
}

setInterval(throttle(fn, 3000), 10);

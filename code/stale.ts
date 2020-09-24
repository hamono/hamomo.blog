function stale(time: number) {
  let timer = true;
  let data;

  return function () {
    if (timer) {
      data = "获取数据";
      setTimeout(() => {
        timer = true;
      }, time);
      timer = false;
    } else {
      data = "返回缓存";
    }
    return data
  };
}

const test=stale(5000);

console.log(test());
console.log(test());
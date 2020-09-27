export default function useDebounce<T = any>(
  fn: (m?: T) => void,
  pars: any[],
  time: number
) {
  let timer = null;
  const context = this;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, pars);
    }, time);
  };
}

interface Test {
  asd: number;
}

function a({ asd }: Test) {
  console.log(asd);
}

setInterval(useDebounce<Test>(a, [123], 2000), 3000);

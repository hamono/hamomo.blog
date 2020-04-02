function sumString(a, b) {
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength, 0); //"0009007199254740991"
  b = b.padStart(maxLength, 0); //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f == 1) {
    sum = "1" + sum;
  }
  return sum;
}
function add() {
  var num1 = document.querySelector(".num1");
  console.log(typeof (num1))
  console.log(num1.value)
  var num2 = document.querySelector(".num2");
  console.log(typeof (num2))
  var but = document.querySelector("p");
  but.textContent = sumString(num1.value, num2.value);

}
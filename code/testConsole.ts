export default function test(m:()=>void){
  console.log(m)
}

test(()=>console.log(1))
<script>
import { gcd } from 'mathjs';

let SimpleNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];

let p = SimpleNumbers[Math.floor(Math.random() * SimpleNumbers.length)];
let q = SimpleNumbers[Math.floor(Math.random() * SimpleNumbers.length)];

let n = p * q;
let Fn = (p - 1) * (q - 1);

let e = eFunc(Fn);

function eFunc(Fn) {
  while (true) {
    let y = SimpleNumbers[Math.floor(Math.random() * SimpleNumbers.length)];
    let x = gcd(y, Fn);
    if (x == 1) {
      return y;
    }
  }
}

let d = modInverse(e, Fn);

function modInverse(a, m) {
  for (let i = 0; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return 1;
}

let l1 = 'Hello world!';
let result1 = '';
for(let i = 0; i < l1.length; i++) {
  let x = BigInt(l1.charCodeAt(i));
  let result = x ** BigInt(e) % BigInt(n);
  result1 += result.toString() + ' ';
}

console.log(result1);

let result2 = '';
let res = result1.split(' ');
for(let i = 0; i < res.length; i++) {
  let result = BigInt(res[i]) ** BigInt(d) % BigInt(n);
  result2 += String.fromCharCode(Number(result));
}

console.log(result2);
</script>

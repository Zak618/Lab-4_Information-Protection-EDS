<template>
  <div id="app">
    <h1><span class="colorRSA">Электронная</span> подпись</h1>
    <InputText v-model="m" @input="inputMessage" type="text" placeholder="Введите текст" />
    <InputText v-model="e" @input="eKeys" type="text" placeholder="e"/>
    <InputText v-model="n" @input="nKeys" type="text" placeholder="n"/>
    <InputText v-model="encryptedMessage" type="text" placeholder="Зашифрованный текст" readonly/>

    <InputText v-model="m1" @input="destMessage" type="text" placeholder="Введите шифрованный текст" />
    <InputText v-model="d" @input="dKeys" type="text" placeholder="d" />
    <InputText v-model="n" @input="nKeys" type="text" placeholder="n" />
    <InputText :value="decryptedMessage" type="text" placeholder="Расшифрованный текст" readonly />

    <button @click="signMessage">Подписать сообщение</button>
    <button @click="verifySignature">Проверить подпись</button>
    
    <p>© Made by Rolan</p>
  </div>
</template>

<script>
import { gcd } from 'mathjs';

let SimpleNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];

export default {
  data() {
    return {
      m: '',
      e: '',
      n: '',
      m1: '',
      d: '',
      encryptedMessage: '',
      decryptedMessage: '',
      signature: ''
    }
  },

  created() {
    this.initializeKeys();
  },

  methods: {
    initializeKeys() {
      let p = SimpleNumbers[Math.floor(Math.random() * SimpleNumbers.length)];
      let q = SimpleNumbers[Math.floor(Math.random() * SimpleNumbers.length)];

      this.n = p * q;
      let Fn = (p - 1) * (q - 1);

      this.e = this.eFunc(Fn);
      this.d = this.modInverse(this.e, Fn);
    },

    eFunc(Fn) {
      while (true) {
        let y = SimpleNumbers[Math.floor(Math.random() * SimpleNumbers.length)];
        let x = gcd(y, Fn);
        if (x == 1) {
          return y;
        }
      }
    },

    modInverse(a, m) {
      for (let i = 0; i < m; i++) {
        if ((a * i) % m === 1) {
          return i;
        }
      }
      return 1;
    },

    inputMessage() {
      this.updateEncryptedMessage();
    },

    destMessage() {
      this.updateDescryptedMessage();
    },

    updateEncryptedMessage() {
      let result1 = '';
      for (let i = 0; i < this.m.length; i++) {
        let x = BigInt(this.m.charCodeAt(i));
        let result = x ** BigInt(this.e) % BigInt(this.n);
        result1 += result.toString() + ' ';
      }
      this.encryptedMessage = result1;
    },

    updateDescryptedMessage() {
      let result2 = '';
      let res = this.encryptedMessage.split(' ');
      for(let i = 0; i < res.length; i++) {
        let result = BigInt(res[i]) ** BigInt(this.d) % BigInt(this.n);
        result2 += String.fromCharCode(Number(result));
      }
      this.decryptedMessage = result2;
    },

    calculateHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
      }
      return hash.toString(16);
    },

    signMessage() {
      const hash = this.calculateHash(this.m);
      this.signature = BigInt(parseInt(hash, 16)) ** BigInt(this.d) % BigInt(this.n);
    },

    verifySignature() {
      const hash = this.calculateHash(this.m);
      const decodedSignature = BigInt(this.signature) ** BigInt(this.e) % BigInt(this.n);

      if (BigInt(parseInt(hash, 16)) === decodedSignature) {
        alert("Подпись верна!");
      } else {
        alert("Подпись неверна!");
      }
    }
  }
}
</script>

<style>
.colorRSA {
  color: #5cd16f;
}
</style>

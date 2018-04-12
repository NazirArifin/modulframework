#Ecmascript 2015 (ES6)

```js
const a = 4;
```

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan Javascript sebagai dasar framework Javascript dengan baik.

## Persiapan

* Clone atau download berkas ini di [github.com](http://github.com/NazirArifin/modulframework), dan kemudian masuk ke folder "es6"

* Ketikkan perintah berikut:

```
npm install
```

* Setelah proses selesai ketikkan perintah:

```
npm run start
```

## Percobaan

### Penggunaan _let_, _const_, dan _var_.

```js
const pokok = 150;
var bonus = 0;

function getGaji(denganBonus) {
  if (denganBonus) {
    let bonus = 50; // local scope
    return pokok + bonus;
  }
  return pokok + bonus;
}

console.log(getGaji(false)); // 150
console.log(getGaji(true)); // 200
```

* Pada percobaan diatas kita menggunakan deklarasi variabel dengan __let__ yang membuat variabel tersebut hanya ada dalam _block scope_. Sama dengan _let_, _const_ juga ada ada dalam _block scope_ tapi dengan _const_ kita berasumsi bahwa variabel tersebut nilainya tidak akan pernah berubah.

### String Interpolation & Multiline

* Seringkali jika ingin meletakkan sebuah nilai variabel ke dalam string kita menggunakan _concatenation_, tapi sekarang ES6 memiliki _string interpolation_ dimana variabel kita akan langsung diterjemahkan dalam string seperti contoh berikut:

```js
function cetakKoordinat(lat, lon) {
  // sebelumnya (tanpa string interpolation)
  // return 'Latitude: ' + lat + ', Longitude: ' + lon; 

  // sekarang
  return `Latitude: ${lat}, Longitude: ${lon}`;
}
```

* Selain itu ES6 juga memiliki _template literal_ yang mendukung penggunaan string multi line (lebih dari satu baris) sehingga dapat mempermudah pembuatan template. Contoh penggunaannya adalah seperti berikut:

```js
const pesan = 'Hello World!';
const body = `
  <div class="container">
    <div class="row">
      <div class="col sm-12">
        <h1>${pesan}</h1>
      </div>
    </div>
  </div>
`;

document.getElementsByTagName('body')[0].innerHTML = body;
```

* Jika kode diatas dieksekusi maka tampilan halaman akan diganti dengan pesan __Hello World!__.

### Cacah Array dengan _for .. of_ dan _map_

* Jika kita memiliki sebuah variabel yang berisi array dan ingin kita tampilkan ke browser atau dijadikan _template_ maka ES6 memiliki dua operator untuk mencacah array dengan mudah yaitu __for .. of__ dan __map__.

* Contoh dari penggunaan __for .. of__ adalah sebagai berikut:

```js
const arr = ['a', 'b', 'c'];
/** // (cara biasanya dengan for)
for (let i = 0; i < arr.length; i++) {
  const elemen = arr[i];
  console.log(elemen);
}
*/

for (let elemen of arr) {
  console.log(elemen);
}
```

* Jika Anda ingin juga menampilkan __key__ dari array maka Anda dapat menambahkan method __entries()__ seperti contoh berikut:

```js
const arr = ['a', 'b', 'c'];
for (let [key, val] of arr.entries()) {
  console.log(`Index ke: ${key} dengan nilai ${val}`);
}
```

* Selain operator __for .. of__, ES6 juga memiliki fungsi __map()__ yang mana fungsi ini mencacah tiap elemen dalam array secara berurutan.

```js
const anggota = [
  { npm: '2014520001', nama: 'Romli' },
  { npm: '2014520002', nama: 'Zaitun' },
  { npm: '2014520003', nama: 'Yudhi' },
];

let template = '<ul>';
anggota.map(function(mhs) {
  template += `<li>NPM: ${mhs.npm}, Nama: ${mhs.nama}</li>`;
});
template += '</ul>';

document.getElementsByTagName('body')[0].innerHTML = template;
```

### Class

* ES6 menyediakan sintaks tambahan "__class__" yang dapat digunakan untuk menggantikan _constructor function_ di ES5. Konsep Class di ES6 tidak sama persis dengan konsep Class di Java atau bahasa pemrograman berbasis OOP lainnya karena di ES6 kita tidak dapat menambahkan _property_ dan hanya dapat menambahkan _method_. Satu hal yang mungkin sama adalah adanya penggunaan __constructor__.

```js
class Manusia {
  constructor(nama) {
    this.nama = nama; // deklarasi property nama
  }

  deskripsi() {
    return `Manusia dengan nama ${this.nama}`;
  }
}

const r = new Manusia('Rizal Ramli');
console.log(r.deskripsi());
```

* Untuk membuat _subclass_ atau turunan dari Class sebelumnya kita dapat menggunakan kata kunci __extends__ seperti contoh berikut:

```js
class Mahasiswa extends Manusia {
  constructor(nama, npm) {
    super(nama); // memanggil parent's constructor
    this.npm = npm;
  }

  deskripsi() {
    return `${super.deskripsi()} dan NPM ${this.npm}`;
  }
}

const m = new Mahasiswa('Rizal Ramli', '2015520001');
console.log(m.deskripsi());
```

## Arrow Functions

* ES6 mengenalkan Arrow Functions dalam pembuatan sebuah fungsi. Berikut ini adalah contoh perbedaan pembuatan fungsi tanpa dan dengan Arrow Function:

```js
/** // tanpa arrow function
function tambah(x, y) {
  return x + y;
}

// atau
var tambah = function(x, y) {
  return x + y;
}
*/

// dengan array function
const tambah = (x, y) => x + y;
console.log(tambah(2,3)); // 5

// arrow function dengan body menggunakan { }
// dan tanpa parameter
const getTanggal = () => {
  return new Date().toLocaleDateString();
};
console.log(getTanggal());
```

* Jika parameter yang dibutuhkan hanya satu maka kita bisa membuang tanda kurung di bagian parameter seperti contoh berikut:

```js
console.log(['a', 'b', 'c'].map(x => 'a_' + x));

// contoh lain
const kuadrat = x => x * x;
console.log(kuadrat(3));
```

### Modules (export & import)

* Modules adalah memecah mecah kode menjadi beberapa file yang dapat diekspor dan impor ketika dibutuhkan. Dengan begitu kita dapat membuat kode umum yang dapat digunakan berkali-kali sekaligus dapat mengelompokkan kode dengan lebih baik. Module tidak didukung oleh browser namun dengan bantuan webpack kita dapat menggunakan fitur modules dengan mudah.

* Buat file baru di folder __src__ dengan nama file __math-function.js__. Setelah itu masukkan kode berikut di file yang baru saja kita buat:

```js
const jumlah = (a, b) => a + b;

const kali = (a, b) => a * b;

export {jumlah, kali};
```

* Perhatikan bahwa kita membuat dua fungsi yang diekspor yaitu __jumlah__ dan __kali__. Selanjutnya untuk menggunakan module matematika ini kita dapat mengimpor nya dengan perintah seperti berikut: (di file __src/app.js__)

```js
import { jumlah, kali } from './math-function.js';
const a = 3;
const b = 7;

console.log(jumlah(2,3));
console.log(`Perkalian antara ${a} dan ${b} adalah: ${kali(a,b)}`);
```

* Jika di module hanya satu fungsi yang di ekspor maka kita bisa menggunakan kata kunci __default__ setelah __export__ seperti contoh berikut:

```js
// math-function.js
export default (x, y) => x + y;

// app.js
import jumlah from './math-function.js';
console.log(jumlah(2,3)); // 5
```

### Promise

* Di pemrograman Javascript kita akan sering berhubungan dengan kode yang berjalan secara asinkron (tidak berurutan). Contohnya adalah kita meminta data ke server secara online yang kita tidak tahu kapan data akan tersedia karena bisa saja server tidak merespon ataupun koneksi internet yang lambat. Karena itu kita akan sering menggunakan __Promise__.

* Promise dapat dianalogikan sebuah "Janji" seorang ibu kepada anaknya akan membelikan es krim besok. Ada tiga kondisi dalam hal ini yaitu: __pending__ yaitu masa menunggu sampai besok, __resolved__ yaitu kondisi ibu benar-benar menepati janji membelikan es krim dan __rejected__ ketika ibu tidak dapat menepati janjinya membelikan es krim.

* Untuk membuat Promise dari kasus diatas dapat dilakukan seperti berikut:

```js
const ibuSenang = true;

// Promise
const janjiEsKrim = new Promise((resolve, reject) => {
  if (ibuSenang) {
    const esKrim = {
      merk: 'Walls',
      rasa: 'Coklat'
    };
    resolve(esKrim);
  } else {
    const alasan = new Error('Ibu sedang sumpek');
    reject(alasan);
  }
});

// contoh memanggil Promise
const tagihIbu = () => {
  janjiEsKrim
  .then((esKrim) => {
    // sukses
    console.log(`Makan es krim ${esKrim.merk} rasa ${esKrim.rasa}`);
  })
  .catch(error => console.log(error.message));
};
tagihIbu();
```

* Pada kode diatas kita membuat fungsi janjiEsKrim yang mereturn sebuah Promise yang meresolve es krim dan mereject alasan ketika Promise gagal. Di fungsi __tagihIbu__ kita memanggil Promise diikuti dengan kata __then()__ jika Promise berhasil dan terakhir __catch__ jika Promise gagal.

* Kita juga bisa membuat Promise berantai (__Promise chaining__) dengan cara Promise pertama mereturn Promise berikutnya. Contohnya dapat dilihat pada kode berikut:

```js
const methodSatu = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: '123' });
    }, 2000);
  });
};

const methodDua = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: '456' });
    }, 2000);
  });
};

const methodTiga = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: '789' });
    }, 2000);
  });
};

methodSatu()
.then(data => {
  console.log(data);
  return methodDua();
})
.then(data => {
  console.log(data);
  return methodTiga();
})
.then(data => {
  console.log(data);
})
.catch(e => { console.log(e); });
```
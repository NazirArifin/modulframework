# Sass (Syntactically Awesome Style Sheets)

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan Sass sebagai dasar CSS Framework dengan baik.

## Persiapan
* Clone atau Download berkas di [github.com](https://github.com/NazirArifin/modulframework), dan kemudian masuk ke folder “sass”.

* Ketikkan perintah berikut ini:
```sh
npm install
```

* Setelah proses instalasi selesai ketikkan perintah:
```sh
npm run start
```

## HTML

* Kode html yang digunakan dalam file __index.html__ adalah sebagai berikut:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>SASS</title>
</head>
<body>
  <h1>SASS</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    <div class="container">
      <div class="col-4">1</div>
      <div class="col-4">2</div>
      <div class="col-4">3</div>
      <div class="col-4">4</div>
  </div>
</body>
</html>
```

## Sass

* Sass mengijinkan Anda bisa memiliki variabel di CSS. Nilai dari variabel bisa berupa angka, string, warna, null, list dan map. Untuk membuat variabel digunakan tanda/simbol __$__.

* Dalam Sass juga mengenal scope variabel sehingga jika Anda mendeklarasikan variabel dalam sebuah _selector_ maka hanya berlaku untuk _selector_ tersebut saja.

### SCSS
```sass
$primaryColor: #eeccff;

body {
  $primaryColor: #ccc;
  background: $primaryColor;
}

p {
  color: $primaryColor;
}

// Ketika dicompile maka warna paragraf akan menjadi #eeccff
```

### HTML
```html
<body>
  <h1>SASS</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</body>
```

## Perhitungan

* Sass mengijinkan kita melakukan perhitungan matematika seperti penjumlahan, pengurangan, perkalian, dsb.


### SCSS
```sass
$container-width: 100%;

.container {
  width: $container-width;
}

.col-4 {
  width: $container-width / 4;
}
```


### HTML
```html
<body>
  <h1>SASS</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <div class="container">
    <div class="col-4">1</div>
    <div class="col-4">2</div>
    <div class="col-4">3</div>
    <div class="col-4">4</div>
  </div>
</body>
```
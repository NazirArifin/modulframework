# Typescript

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan Typescript sebagai dasar dari Framework Angular dengan baik

## Persiapan

* Untuk menginstall Typescript _compiler_ maka ketikkan perintah berikut:

```sh
npm install -g typescript
```

* Buat file index.html dimanapun Anda akan membuat project dengan isi sebagai berikut:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Learning TypeScript</title>
</head>
<body>
 
  <script src="hello.js"></script>
</body>
</html>
```

* Sekarang buat file ```hello.ts``` disebelah file ```index.html``` dan masukkan perintah berikut:

```typescript
alert('hello world in TypeScript!');
```

* Kemudian ketikkan perintah berikut ini di _command line_:

```sh
tsc hello.ts --watch
```

* Buka browser dan Anda seharusnya mendapatkan tampilan __alert__ di browser yang Anda buka.

* Silakan bereksplorasi dengan kode Typescript!

[https://code.tutsplus.com/tutorials/getting-started-with-typescript--net-28890](https://code.tutsplus.com/tutorials/getting-started-with-typescript--net-28890)

[https://tutorialzine.com/2016/07/learn-typescript-in-30-minutes](https://tutorialzine.com/2016/07/learn-typescript-in-30-minutes)
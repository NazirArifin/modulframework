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

### HTML

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
  <div class="page-header">
    <h1>Sass (Syntactically Awesome Style Sheet)</h1>
  </div>
  <div class="container">
    <p>Aplikasi Surat Menyurat Pemerintah Daerah Pamekasan Madura Indonesia</p>
    <form role="form" class="form">
      <div class="form-group">
        <label for="nomor" class="form-label col-3">Nomor Surat</label>
        <div class="col-4">
          <input type="text" name="nomor" id="nomor" class="form-control valid">
        </div>
      </div>
      <div class="form-group">
        <label for="instansi" class="form-label col-3">Instansi Tujuan</label>
        <div class="col-4">
          <input type="text" name="instansi" id="instansi" class="form-control invalid">
        </div>
      </div>
      <div class="form-group">
        <label for="isi" class="form-label col-3">Isi Surat</label>
        <div class="col-6">
          <textarea name="isi" id="isi" cols="30" rows="6" class="form-control active"></textarea>
        </div>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary">Simpan</button>
        <button type="button" class="btn btn-warning">Cetak</button>
        <button type="reset" class="btn btn-reset">Reset</button>
      </div>
    </form>
  </div>
</body>
</html>
```

### SCSS

* Selanjutnya buat file __form.scss__ yang akan kita __import__ dari file __main.scss__. Setelah Anda buat, masukkan kode scss berikut ini yang merupakan contoh penggunaan Nesting selector di SCSS.

```scss
// Nesting selector
.form {
  margin-top: 50px;
  
  .form-group {
    width: $maxwidth;
    float: left;
    padding-bottom: 20px;
    
    label {
      text-align: right;
      padding-right: 10px;
    }

    .form-control {
      width: 100%;
      padding: 6px 12px;
    }
  }
}
```

* Kemudian masukkan kode SCSS berikut ini ke file __main.scss__, di dalamnya terdapat beberapa contoh penggunaan mixin, fungsi, dan extend. Pastikan bahwa Anda memahami kode yang Anda ketikkan.

```scss
// variabel di SCSS
$maxwidth: 100%;
$main-font-color: #333;
$border-color: #eee;

// fungsi untuk membuat kolom
@mixin create-col($width) {
  width: ($width *  $maxwidth) / 10;
  float: left; 
}

// mengimport file external
@import 'form.scss';

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 90%;
  color: $main-font-color;
}

h1 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.page-header {
  padding-bottom: 9px;
  margin: 40px 0 20px;
  border-bottom: 1px solid $border-color;
  h1 {
    font-size: 36px;
  }
}

.container {
  width: $maxwidth;
  clear: both;
}

.col-2 {
  @include create-col(2);
}
.col-3 {
  @include create-col(3);
}
.col-4 {
  @include create-col(4);
}
.col-6 {
  @include create-col(6);
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
}

// contoh extend
.btn-primary {
  @extend .btn;
  background-color: #428bca;
  border-color: #357ebd;
  color: #fff;
  &:hover {
    background-color: #3276b1;
    border-color: #285e8e;
  }
}

.btn-warning {
  // local variabel
  $border-color: #d58512;
  @extend .btn;
  background-color: lighten(orange, 10%);
  border-color: $border-color;
  color: #fff;

  // access parent selector dengan &
  &:hover {
    background-color: darken(orange, 10%);
    border-color: darken($border-color, 10%);
  }
}

.btn-reset {
  @extend .btn;
  background-color: #fff;
  border-color: #ccc;
  &:hover {
    background-color: #ebebeb;
    border-color: #adadad;
  }
}
```

* Coba beri style pada input dan textarea untuk class __.valid__, __.invalid__, dan __.active__

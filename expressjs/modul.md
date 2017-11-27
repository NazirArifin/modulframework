# ExpressJS + MySQL

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan ExpressJS sebagai salah satu server web berbasis NodeJS dengan baik.

## Persiapan

* Kita akan menggunakan express generator untuk membuat aplikasi web dengan cara memasukkan perintah berikut:

```sh
npm install -g express-generator
```

* Kemudian jalankan perintah berikut ini di folder manapun dimana Anda ingin membuat project baru:

```sh
express --view=twig --css=sass MyApp

cd MyApp
```

* Perintah diatas berarti kita akan membuat project expressJS menggunakan template engine __twig__ dan css engine __sass__.

* Selanjutnya kita install dependensinya dengan menggunakan perintah berikut:

```sh
npm install

npm install --save jquery popper.js bootstrap@4.0.0-beta.2 mysql

npm install --save-dev concurrently nodemon browser-sync
```

* Setelah semua perintah diatas dijalankan, buka file __package.json__ di folder project Anda dan ubah bagian __scripts__ menjadi seperti ini:

```js
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon --watch views --watch routes --watch public --ext js,twig,scss ./bin/www",
    "browserSync": "browser-sync start --proxy localhost:3000 --reload-delay 700 --files views/*.twig,routes/*.js,public/stylesheets/*.scss",
    "dev": "concurrently \"npm run devstart\" \"npm run browserSync\""
  }
```

* Pada dasarnya kita membuat sekumpulan perintah yang dapat dijalankan menggunakan perintah ```npm run <namaScript>```. Script-script diatas menggunakan __nodemon__ dan __browser-sync__ dengan beberapa parameter tambahan untuk mempermudah proses pengerjaan app seperti livereload dan auto restart server.

* Selanjutnya kita akan menjalankan perintah berikut ini untuk mulai bekerja:

```sh
npm run dev
```

* Otomatis sebuah jendela browser default akan terbuka dengan alamat __http://localhost:3001__ yang merupakan browser-sync proxy dari alamat server yang sebenarnya yaitu: __http://localhost:3000__.

* Agar kita bisa bekerja dengan SCSS dan memasukkan file scss dari bootstrap maka edit file ```app.js``` di baris 27 bagian __sassMiddleware__ nilai ```indentedSyntax``` menjadi ```false`` seperti berikut:

```js
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
```

* Ubah nama file ```public/stylesheets/style.sass``` menjadi ```style.scss``` dan ubah isinya menjadi seperti berikut ini:

```scss
@import "node_modules/bootstrap/scss/bootstrap";

body {
  padding-top: 50px;
}
```

## Database MySQL

* Buka [phpmyadmin](http://localhost/phpmyadmin) dan periksa apakah ada database cdcol, jika tidak ada buat database cdcol dan jalankan perintah SQL yang ada [SQL CDCOL](https://github.com/NazirArifin/MEAN/blob/master/cdcol.sql).

* Buat file baru untuk manajemen koneksi dan query database dengan nama file ```mydb.js``` dan letakkan di root bersebelahan dengan ```app.js```.

* Masukkan kode berikut pada file yang ```mydb.js```

```js
var mysql = require('mysql');

module.exports = {
  dbConfig: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cdcol'
  },
  db: null,

  connected: false,
  connect: function() {
    this.db = mysql.createPool(this.dbConfig);
  },

  query: function(query, params) {
    return new Promise((resolve, reject) => {
      this.db.getConnection(function(err, conn) {
        if (err) reject(err);
        if (typeof(params) === 'undefined') params = [];
        conn.query(query, params, function(err, rows) {
          conn.release();
          if (err) reject(err);
          resolve(rows);
        });
      });
    });
  }
}
```

* Buka file ```routes/index.js``` dan tambahkan kode berikut dibagian atas bagian __require__.

```js
var mydb = require('../mydb.js');
```

* Kemudian di bagian __router/get('/')__ kita ubah kodenya menjadi seperti berikut ini:

```js
  let cds = [];
  
  mydb.connect();
  mydb.query("SELECT * FROM cds").then(data => {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        cds.push(data[i]);
      }
    }

    res.render('index', { title: 'CDCOLS', data: cds });
  });
```

* Sekarang buka file ```views/layout.twig``` dan ubah menjadi berikut:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{ title }}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-12">
            {% block body %}{% endblock %}
        </div>
      </div>
    </div>
  </body>
</html>
```

* Dan kemudian ubah file ```views/index.twig``` menjadi seperti berikut:

```html
{% extends 'layout.twig' %}

{% block body %}
  
  <h1 class="text-center">{{title}}</h1>
  <hr>
  <p>
    <small class="text-muted">Aplikasi Menggunakan Express JS dan MySQL</small>
    <a href="/cd" class="btn btn-primary btn-sm float-right">+ TAMBAH DATA</a>
  </p>
  
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Judul</th>
        <th scope="col">Pengarang</th>
        <th scope="col">Tahun</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {% for cd in data %}
      <tr>
        <th scope="row">{{ loop.index }}</th>
        <td>{{ cd.titel }}</td>
        <td>{{ cd.interpret }}</td>
        <td>{{ cd.jahr }}</td>
        <td>
          <span class="btn-group">
            <a href="/cd/{{ cd.id }}" class="btn btn-outline-primary btn-sm">SUNTING</a>
            <a href="" class="btn btn-outline-danger btn-sm">HAPUS</a>
          </span>
        </td>
      </tr>
      {% endfor %}
    </tbody>
  </table>

{% endblock %}
```

## Form Tambah/Edit Data CD

* Jika Anda mengklik tombal TAMBAH DATA ataupun SUNTING maka kita perlu membuat route dan tampilan baru. Kita ubah nama file ```routes/users.js``` menjadi ```routers/cds.js```.

* Edit file ```app.js``` bagian ```var users = require('./routes/users');``` diubah menjadi ```var cds = require('./routes/cds');``` dan ```app.use('/users', users);``` menjadi ```app.use('/cd', cds);```.

* Buat file template untuk tampilan form yaitu file baru dengan nama ```views/cd.twig``` dengan isi seperti berikut:

```html
{% extends 'layout.twig' %}

{% block body %}
  
  <h1 class="text-center">{{title}}</h1>
  <hr>
  <p>
    <small class="text-muted">Aplikasi Menggunakan Express JS dan MySQL</small>
    <a href="/" class="btn btn-light btn-sm float-right">x BATALKAN</a>
  </p>

  <hr>
  <br>

  <div class="row justify-content-center">
    <div class="col-7">
      <form method="POST" action="/cd">
        <div class="form-group row">
          <label for="titel" class="col-sm-2 col-form-label">Judul</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="titel" name="titel" placeholder="Judul">
          </div>
        </div>
        <div class="form-group row">
          <label for="interpret" class="col-sm-2 col-form-label">Pengarang</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="interpret" name="interpret" placeholder="Pengarang">
          </div>
        </div>
        <div class="form-group row">
          <label for="jahr" class="col-sm-2 col-form-label">Tahun</label>
          <div class="col-sm-2">
            <input type="text" class="form-control" id="jahr" name="jahr" placeholder="Tahun">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4 offset-sm-2">
            <button class="btn btn-primary" type="submit">SIMPAN DATA</button>
          </div>
        </div>
      </form>
    </div>
  </div>

{% endblock %}
``` 

* Ubah file ```routes/cds.js``` dibagian respon get menjadi seperti berikut:

```js
router.get('/', function(req, res, next) {

  res.render('cd', { title: 'Tambah/Ubah CD' });
});
```
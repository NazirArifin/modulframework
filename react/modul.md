# ReactJS

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan ReactJS sebagai salah satu pustaka Javascript dengan baik.

## Instalasi

* Untuk memulai proyek ReactJS Anda harus menginstal kerangka kerja utama React secara global dengan perintah:

```
npm install -g create-react-app
```

* Setelah terinstall Anda dapat membuat dan menjalankan project baru dimanapun dengan mengetikkan perintah:

```
create-react-app nama-app
```

* Untuk dapat menggunakan SCSS di ReactJS pertamakali kita harus menginstall __node-sass-chokidar__ dan __npm-run-all__ dengan perintah:

```
npm install --save node-sass-chokidar npm-run-all 
```

* Modifikasi file __package.json__ diubah bagian __scripts__ menjadi seperti berikut:

```json
  "scripts": {
    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build-js": "react-scripts build",
    "build": "npm-run-all build-css build-js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

* Sekarang Anda dapat mengubah nama file __src/App.css__ menjadi __src/App.scss__. Setiap Anda mengubah isi file __src/App.scss__ maka webpack akan menggenerate ulang file __src/App.css__.

* Selanjutnya untuk menjalankan proses development dapat digunakan perintah:

```
npm run start
```

* Jika berhasil ReactJS akan membuka browser baru dengan fitur _livereload_ dan menampilkan tampilan "Welcome".

* Untuk memasukkan bootstrap ke aplikasi yang kita buat dapat digunakan perintah sebagai berikut:

```
npm install --save bootstrap jquery popper.js
```

* Selanjutnya mengimport scss bootstrap dengan cara mengedit file __src/App.scss__ menjadi seperti berikut:

```scss
@import 'bootstrap/scss/bootstrap';
```

## Component

* Pada dasarnya ReactJS dibangun dari pohon Component dimana class __App__ merupakan Component induk yang dimuat pertamakali. Secara umum, Component di ReactJS terdiri dari dua macam yaitu: _state_ dan _stateless_.

### Functional Component (Component dari Fungsi)

* Component paling sederhana dalam React dapat dibuat menggunakan sebuah fungsi yang mereturn JSX seperti contoh berikut:

```js
function Welcome(props) {
  return <h1>Halo, {props.nama}</h1>;
}

// jika JSX lebih dari satu baris maka digunakan tanda ()
function Greeting(props) {
  return (
    <div className="alert alert-info">
      <Welcome nama="Zulkifli Lubis"></Welcome>
    </div>
  );
}
```

* Beberapa hal yang harus diketahui adalah:

1. Nama fungsi sebaiknya diawali huruf kapital (__Welcome__, __Greeting__, dsb);
2. Jika template HTML memiliki properti __class__ maka harus diganti dengan __className__, contohnya: ___className="alert alert-info"___;
3. Template HTML yang direturn harus berada dalam satu induk tag, jika diperlukan gunakan __div__ untuk membungkus tag-tag yang sejajar;
4. Karena JSX menggunakan XML maka untuk tag tunggal seperti __img, br, hr__ dsb maka harus diberi _close tag_ secara langsung, contohnya: 
```html
<br />
<hr />
<img src={prop.image} />
```

### Class Component

* Selain menggunakan fungsi, membuat component React juga bisa dilakukan dengan menggunakan class seperti contoh berikut:

```js
import React from 'react';

...
class Welcome extends React.Component {
  render() {
    return <h1>Halo, {this.props.nama}</h1>;
  }
}
```
* Aturan yang digunakan juga sama dengan functional component seperti nama class diawali huruf kapital, dsb. Pastikan jika Anda memiliki __constructor(props)__ maka Anda harus memanggil parent class dengan perintah __super(props)__.

### Me _render_ Component

* Untuk menampilkan component yang telah dibuat maka di __scr/index.js__ dibagian __ReactDOM.render(( ... ))__ diganti dengan component yang telah kita buat. Contohnya seperti berikut:

```js
...
ReactDOM.render((
  <Greeting></Greeting>
), document.getElementById('root'));
```

* Jangan pernah ragu untuk membuat memisah-misah component yang besar menjadi component yang lebih kecil-kecil.

## Props dan State

* Pada tag component ```<Welcome nama="Zulkifli Lubis"></Welcome>```, terdapat property (disingkat __prop__) "__nama__" yang bernilai "Zulkifli Lubis". Prop ini akan digunakan dalam component menjadi ```{prop.nama}``` atau ```{this.prop.nama}```. Prop ini nilainya bisa diset dari induk component ataupun pada component itu sendiri.

* Semua component di React tidak diperbolehkan mengubah nilai prop, sekali diset maka tidak boleh ada perubahan lagi. Jika Anda ingin memiliki variabel dalam component yang dapat diubah-ubah maka Anda dapat menggunakan __state__. Penggunaan __state__ hanya dapat dilakukan oleh class component.

* Berikut ini adalah contoh state dalam class component:

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <h2>Sekarang {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

* State hanya boleh diset nilainya secara langsung seperti: ```this.state = {...}``` di __constructor__ saja, selain itu harus menggunakan fungsi __setState()__ dengan parameter field yang ingin diubah.

* Pada contoh diatas kita juga menggunakan method __componentDidMount()__ yang otomatis dieksekusi ketika component selesai dirender dan __componentWillUnmount()__ yang dieksekusi otomatis ketika component dibuang dari view.

## Navigasi & Router

* Dengan menggunakan React kita bisa membuat ___Single Page Application___, yang mana dengan menggunakan link kita bisa membuat navigasi pindah halaman tanpa harus mengubah halaman secara keseluruhan.

* Untuk menggunakan router kita bisa menginstall __react-router-dom__ dengan cara mengetikkan perintah:

```
npm install --save react-router-dom
```

* Sekarang kita import dan gunakan component __BrowserRouter__ dalam aplikasi yang kita buat. Ubah file __src/index.js__ menjadi seperti berikut:

```js
...
import { BrowserRouter } from 'react-router-dom';
...

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
...
```

* Anda dapat melihat bahwa component App kita masukkan dalam component BrowserRouter sehingga perlu mengubah file __scr/App.js__ menjadi seperti berikut:

```js
import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="">Universitas Madura</a>
        </nav>
        <div className="container pb-5">
          <div className="row">
            <div className="col-sm-12">
              <Switch>
                <Route exact path='/' component={MhsList} />
                <Route exact path='/mhs' component={MhsList} />
                <Route path='/mhs/:nim' component={MhsDetail} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

* Anda perhatikan kode diatas, terdapat component __Switch__ yang menentukan dimana tampilan harus berubah ketika terjadi perpindahan link. Di dalamnya terdapat component __Route__ yang memiliki prop __path__ sebagai path URL yang akan di _capture_, kemudian __component__ dimana kita mendefinisikan component apa yang akan dimunculkan saat URL cocok dengan __path__. Selain itu juga terdapat prop __exact__ dimana URL harus sama persis dengan __path__ yang telah ditentukan.

* Kita akan membuat component __MhsList__ dan __MhsDetail__ yang akan kita simpan dalam file lain untuk kemudian di import oleh file __src/App.js__. Buat file dengan nama __src/MhsList.js__ dan __src/MhsDetail.js__. File __src/MhsList.js__ berisi kode seperti berikut:

```js
import React from 'react';
import { Link } from 'react-router-dom';

function ListItem(props) {
  return (
    <Link to={'mhs/' + props.id} className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100">
        <img src={props.apiUrl + props.thumbnail} className="rounded mhs-thumbnail" alt=""/>
        <div className="ml-3">
          <h5 className="mb-1">{props.id}</h5>
          <p>{props.nama}</p>
        </div>
      </div>
    </Link>
  );
}

class MhsList extends React.Component {
  constructor(props) {
    super(props);
    
    this.apiUrl = 'http://api1.unira.ac.id/';
    this.state = { 
      mhs: [],
      cari: ''
    };
  }

  componentDidMount() {
    fetch(this.apiUrl + 'v1/mahasiswa?page=1&limit=4&filter[prodi]=52&filter[nim]=2015')
    .then(function(response) {
      return response.json();
    }).then(data => {
      this.setState({ mhs: data.data }, () => {
        console.log(this.state.mhs);
      });
    });
  }

  cariMhs = (e) => {
    this.setState({cari: e.target.value}, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h4>Mahasiswa Universitas Madura</h4>
          <form className="form-inline" name="form">
            <label className="sr-only">Cari</label>
            <input type="text" value={this.state.cari} onChange={this.cariMhs} className="form-control mb-2 mr-sm-2" id="search" name="cari" placeholder="Cari"/>
          </form>
        </div>

        <hr/>
        <div className="list-group">
          {
            this.state.mhs.map(mhs => (
              <ListItem id={mhs.id} nama={mhs.attributes.nama} apiUrl={this.apiUrl} thumbnail={mhs.attributes.thumbnail} key={mhs.id}></ListItem>
            ))
          }
        </div>
      </div>
    );
  }
}

export default MhsList;
```



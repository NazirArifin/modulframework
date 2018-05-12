# ReactJS 3 (Menggunakan Database & API)

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan ReactJS dan Redux dengan data berasal dari database dan API dengan baik.

## Persiapan

* Kita akan membuat aplikasi desktop menggunakan [NW.js](https://nwjs.io/) dan akan menggunakan boilerplate dari [create-nw-react--app](https://github.com/naviapps/create-nw-react-app). Untuk menginstalnya kita menjalankan perintah:

```sh
npm install -g create-nw-react-app
create-nw-react-app nama-app
cd nama-app
```

* Struktur folder dan file sama dengan ReactJS default namun perbedaanya pada file __index.html__ yang dari folder __public__ dikeluarkan sehingga berada di root folder. Kita perlu mengubah sedikit file __index.html__ menjadi seperti berikut:

```html
...
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <title>CDCOL</title>
  </head>
...
```

* Kita akan menggunakan project sebelumnya yang telah Anda buat berdasarkan modul sebelumnya [React 2](https://github.com/NazirArifin/modulframework/blob/master/react-2/modul.md).

* Kita install modul-modul yang akan kita butuhkan dengan perintah berikut:

```sh
npm install --save @material-ui/icons material-ui@next react-redux react-router-dom redux redux-form
```

* Hapus semua file di folder __src__ kecuali __index.js__ dan copy semua file yang ada di folder src project React2 (kecuali index.js) ke folder __src__ saat ini. Kemudian kita perlu mengedit file __src/index.js__ menjadi seperti berikut:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import cdApp from './reducers';
import App from './App';

import './index.css';

const store = createStore(cdApp);
ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));
window.resizeTo(window.screen.width, window.screen.height);
```
* Bagian yang berbeda dengan project sebelumnya (React 2) adalah kita tidak menggunakan __BrowserRouter__ tapi diganti dengan __HashRouter__ dengan begitu kita juga harus mengganti bagian di ReactDOM.render.

### Redux Middleware (Redux Thunk)

* Request ke database ataupun ke API server meskipun cepat tapi kita tidak dapat memastikan tereksekusi secara berurutan (asinkron), karena itu kita perlu modul tambahan yaitu __redux-thunk__ yang bisa mengatasi permasalahan dispatch secara asinkron. 

```sh
npm install --save redux-thunk
```

* Kita perlu mengubah file __src/index.js__ menjadi seperti berikut:

```js
...
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
...
const store = createStore(
  cdApp,
  applyMiddleware(thunkMiddleware)
);
...
```
* Pastikan tampilan aplikasi Anda sudah sama dengan project sebelumnya ketika dibuka di browser dan layar terbuka penuh di layar.


## Data Source dari Database

* Buka [phpmyadmin](http://localhost/phpmyadmin) dan periksa apakah ada database __cdcol__, jika tidak ada buat database __cdcol__ dan jalankan perintah SQL yang ada [SQL CDCOL](https://github.com/NazirArifin/MEAN/blob/master/cdcol.sql).

* Kita perlu memasukkan modul __mysql__ dengan menggunakan perintah:

```sh
npm install --save mysql
```
* Kemudian kita buat file konfigurasi dengan nama __src/dbconfig.json__ dengan isi seperti berikut:

```json
{
  "host": "127.0.0.1",
  "user": "root",
  "password": "",
  "database": "cdcol"
}
```

* Kita buat file yang akan melakukan segala sesuatu tentang database seperti koneksi dan query dengan nama file __src/mysql.js__ dengan isi seperti berikut:

```js
import mysql from 'mysql';

export default class MySQL {
  constructor(dbconfig) {
    this.db = mysql.createPool(dbconfig);
  }

  query(query, params) {
    return new Promise((resolve, reject) => {
      this.db.getConnection(function(err, conn) {
        if (err) {
          reject(err); return;
        }
        if (typeof(params) === 'undefined') params = [];
        conn.query(query, params, function(err, rows) {
          conn.release();
          if (err) {
            reject(err); return;
          }
          resolve(rows);
        });
      });
    });
  }
}
```

* Untuk membuat koneksi kita menggunakan fungsi __createPool__ yang dipanggil di constructor sehingga saat object dibuat maka koneksi akan dibuat. Selanjutnya terdapat method __query__ yang akan memproses query dan dieksekusi ke database yang sudah terkoneksi.

### Asinkron Action Creator

* Berbeda dengan action creator sebelumnya yang langsung mereturn sebuah action maka kita akan membuat sebuah action creator yang mereturn fungsi yang dieksekusi secara asinkron. Kita akan menambahkan import dan fungsi lagi di file __src/actions.js__ seperti berikut:

```js
...
import MySQL from './mysql';
import dbconfig from './dbconfig.json';
...
const mysql = new MySQL(dbconfig);

...
export function queryData() {
  return (dispatch, getState) => {
    let cds = Object.assign({}, getState().cds);
    // total halaman
    mysql.query("SELECT COUNT(id) AS TOTAL FROM cds").then(data => {
      cds.total = data[0].TOTAL;
      // perpage
      const start = cds.page * cds.limit;
      mysql.query(`SELECT * FROM cds LIMIT ${start}, ${cds.limit}`).then(data => {
        cds.data = [];
        for (let d of data) cds.data.push(Object.assign({}, d));
        dispatch(loadCds(cds));
      });
    }).catch(err => console.log(err));
  }
}
...
```

* Fungsi yang direturn memiliki parameter __dispatch__ dan __getState__ yang mana parameter getState bersifat opsional. Pada contoh diatas kita menggunakan Promise untuk melakukan query ke database dan begitu data tersedia dipanggil fungsi __dispatch__ untuk mengubah state yang saat ini ada.

* Kita perlu mengubah __src/reducers.js__ yang sudah ada di bagian __LOAD_CDS__ menjadi seperti berikut:

```js
...
    case actions.LOAD_CDS:
      return action.data;
...
```

* Selain itu kita juga perlu mengubah __src/containers/ShowCd.js__ agar memanggil fungsi action creator yang baru saja kita buat. 

```js
...
  return {
    onMounted: () => {
      dispatch(actions.queryData());
    },
    onChangeRowsPerPage: value => {
      dispatch(actions.setDataPerPage(parseInt(value, 10)));
      dispatch(actions.queryData());
    },
    onChangePage: page => {
      dispatch(actions.setCurrentPage(page));
      dispatch(actions.queryData());
    },
    onDeleteCd: id => {
      dispatch(actions.deleteCd(id));
    }
...
```

### Hapus Data

* Bagian termudah yang harus diganti adalah action untuk hapus, karena itu kita perlu mengubah file __src/actions.js__ menjadi seperti berikut:

```js
...
export function deleteCd(index) {
  return dispatch => {
    mysql.query("DELETE FROM cds WHERE id = ?", [index]).then(data => {
      dispatch(queryData());
    }).catch(err => console.log(err));
  }
}
...
```

* Kemudian hapus bagian __actions.DELETE_CD__
 yang ada di __src/reducers.js__.

### Simpan Data (Tambah & Edit)

* Kita perlu membuat sebuah asinkron action creator untuk mengeset nilai form default yang diambil dari database sesuai dengan id yang ada pada path url. Kita tambah file __src/actions.js__ dengan kode berikut:

```js
...
export function loadCd(id) {
  return dispatch => {
    if (id) {
      mysql.query("SELECT * FROM cds WHERE id = ?", [id]).then(data => {
        dispatch(setCd(Object.assign({}, data[0])));
      }).catch(err => console.log(err));
    } else dispatch(setCd(id));
  }
}
...
```

* Kemudian kita perlu memodifikasi __src/reducers.js__ dibagian __SET_CD__ menjadi seperti berikut:

```js
...
function cd(state = cdBase, action) {
  switch (action.type) {
    case actions.SET_CD:
      if (action.id) return action.id;
      return cdBase;
    default:
      return state;
  }
}
...
```

* Dan tentu saja file form yang memanggil action juga harus di modifikasi. File __src/components/EditPage.js__ di bagian __connect__ kita ubah menjadi:

```js
...
  (dispatch, ownProps) => ({
    onMounted: id => {
      dispatch(actions.loadCd(id));
      dispatch(initialize('Edit'));
    },
...
```

* Untuk menyimpan data baru ataupun edit data lama kita akan menggunakan action sudah ada kita ganti menjadi seperti berikut:

```js
...
export function saveCd(cd) {
  return dispatch => {
    if (cd.id > 0) {
      mysql.query("UPDATE cds SET titel = ?, interpret = ?, jahr = ? WHERE id = ?", [cd.titel, cd.interpret, cd.jahr, cd.id]).then(data => {
        dispatch(queryData());
      });
    } else {
      mysql.query("SELECT id FROM cds ORDER BY id DESC LIMIT 0, 1").then(data => {
        cd.id = (data[0] ? data[0].id + 1 : 1);
        mysql.query("INSERT INTO cds SET ?", cd).then(data => {
          dispatch(queryData());
        });
      }).catch(err => console.log(err));
    }
  }
}
...
```

* Dan selanjutnya kita ubah __src/reducers.js__ dengan menghapus bagian __actions.SAVE_CD__

___

## Data Source dari API

* Pada umumnya API _endpoint_ disediakan oleh server dan dibuat dengan bahasa pemrograman sisi server seperti PHP, Python, NodeJS dan sebagainya. Namun kali ini kita akan menggunakan [JSON Server](https://github.com/typicode/json-server) untuk menyediakan layanan data untuk aplikasi ReactJS yang kita buat.

* Kita install json-server dengan perintah seperti berikut:

```sh
npm install -g json-server
```

* Buat file __cdcol.json__ dan letakkan di folder manapun dengan isi seperti berikut:

```json
{
  "cds": [
    {
      "titel": "Beauty",
      "interpret": "Ryuichi Sakamoto",
      "jahr": "1990",
      "id": 1
    },
    {
      "titel": "Goodbye Country (Hello Nightclub)",
      "interpret": "Groove Armada",
      "jahr": "2001",
      "id": 4
    },
    {
      "titel": "Glee",
      "interpret": "Bran Van 3000",
      "jahr": "1997",
      "id": 5
    }
  ]
}
```

* Di folder dimana file json tersebut diletakkan ketikkan perintah berikut untuk membuat server berdasarkan file json pada port 8080:

```sh
json-server -p 8080 --watch cdcol.json
```

* Sekarang Anda dapat mengakses alamat __http://localhost:8080/cds__ maka di browser akan muncul data json yang ada di file cdcol.json. Untuk mengakses data dengan id 1 maka Anda dapat mengetikkan __http://localhost:8080/cds/1__.

* Buat project baru nw react dengan menggunakan perintah berikut: 

```sh
create-nw-react-app nama-app2
cd nama-app2
npm install --save @material-ui/icons material-ui@next react-redux react-router-dom redux redux-form redux-thunk
```

* _Copy_ semua file dalam folder __src__ dan file __index.html__ dari project sebelumnya yang menggunakan database ke project baru Anda. Hapus beberapa file berikut ini: __dbconfig.json, mysql.js__. Kemudian modifikasi file __src/actions.js__ dengan __MENGHAPUS__ kode yang berhubungan dengan mysql seperti kode ini:

```js
import MySQL from './mysql';
import dbconfig from './dbconfig.json';
...
const mysql = new MySQL(dbconfig);
...
mysql.query...
...
mysql.query...
...
```

### HTTP Request

* ReactJS tidak menyediakan fungsi khusus untuk melakukan request asinkron ke server, karena itu kita perlu menginstal modul tambahan yaitu [__axios__](https://github.com/axios/axios).

```sh
npm install --save axios
```

* Kita akan mengubah asinkron action creator di file __src/actions.js__ di fungsi __queryData__ menjadi seperti berikut:

```js
import axios from 'axios';
const baseURL = 'http://localhost:8080';
...

export function queryData() {
  return (dispatch, getState) => {
    let cds = Object.assign({}, getState().cds);
    // total halaman
    axios.get('/cds', { baseURL: baseURL }).then(data => {
      cds.total = data.data.length;
      // perpage
      axios.get('/cds', { baseURL: baseURL, params: { _page: cds.page, _limit: cds.limit } }).then(data => {
        cds.data = [];
        for (let d of data.data) cds.data.push(Object.assign({}, d));
        dispatch(loadCds(cds));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
}
...
```

* Kita menggunakan __axios.get__ untuk melakukan request ke json-server yang telah kita buat. Untuk pagination json-server menerima parameter _page dan _limit yang bisa digunakan untuk menampilkan data pada page tertentu saja.

* Untuk menghapus data kita perlu mengubah fungsi __deleteCd__ menjadi seperti berikut:

```js
export function deleteCd(index) {
  return dispatch => {
    axios.delete('/cds/' + index, { baseURL: baseURL }).then(data => {
      dispatch(queryData());
    }).catch(err => console.log(err));
  }
}
```

* Jika tombol Edit di baris tabel ditekan kita harus mengambil data cd di server-json, karena itu kita akan mengubah fungsi __loadCd__ menjadi seperti berikut:

```js
...
export function loadCd(id) {
  return dispatch => {
    if (id) {
      axios.get('/cds/' + id, { baseURL: baseURL }).then(data => {
        dispatch(setCd(Object.assign({}, data.data)));
      }).catch(err => console.log(err));
    } else dispatch(setCd(id));
  }
}
...
```

* Selanjutnya kita akan memodifikasi fungsi __saveCd__ menjadi seperti berikut:

```js
...
export function saveCd(cd) {
  return dispatch => {
    if (cd.id > 0) {
      axios.put('/cds/' + cd.id, cd, { baseURL: baseURL }).then(data => {
        dispatch(queryData());
      }).catch(err => console.log(err));
    } else {
      axios.get('/cds', { baseURL: baseURL, params: { _page: 1, _limit: 1, _sort: 'id', _order: 'desc' } }).then(data => {
        cd.id = (data.data[0] ? parseInt(data.data[0].id, 10) + 1 : 1);
        axios.post('/cds', cd, { baseURL: baseURL }).then(data => {
          dispatch(queryData());
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  }
}
...
```

* Untuk mengupdate data yang sudah ada kita menggunakan request __PUT__ dengan path __cds/:id__ dan untuk menambah data baru digunakan method __POST__ dengan path __cds__. Dengan begini kita sudah bisa mengedit dan menambah data baru dan tersimpan di file cdcol.json.




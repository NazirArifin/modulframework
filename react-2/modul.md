# ReactJS 2 (Redux)

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan ReactJS Redux sebagai salah satu arsitektur pengembangan aplikasi ReactJS dengan baik.

## Persiapan

* Buat project baru dengan perintah sebagai berikut:

```sh
create-react-app cdcol
cd cdcol
```

* Hapus semua file yang berada dalam folder kecuali file __App.js__, __index.js__, __App.css__ dan __App.js__.

* Hapus semua (kosongkan) isi di __src/App.css__ dan kemudian modifikasi file __src/App.js__ menjadi seperti berikut:

```jsx
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
```

* Modifikasi file __src/index.js__ menjadi seperti berikut:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Instalasi Modul Material-UI

* Untuk desain tampilan kita akan menggunakan beragam component yang disediakan oleh [material-ui](https://material-ui-next.com/). Kita ketikkan perintah berikut untuk menginstallnya:

```sh
npm install --save @material-ui/icons material-ui@next
```

* Untuk memuat font _Roboto_ dari google font maka kita perlu ubah beberapa bagian dari file __public/index.html__ menjadi seperti berikut:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <title>CDCOL</title>
  </head>
  ...
```

* Kita perlu melakukan perubahan pada file __src/index.css__ dan __src/App.css__ dengan memasukkan kode CSS sebagai berikut:

```css
/* src/index css */
body {
  margin: 0;
  padding-top: 90px;
}
```
```css
/* src/App.css */
.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 90%;
}

@media only screen and (min-width: 601px) {
  .container { width: 85%; }
}

@media only screen and (min-width: 993px) {
  .container { width: 70%; }
}

.toolbar-title { flex: 1; }

form .MuiGrid-item-63 { margin: 20px 0 !important; }
```

##  Instalasi React Router, Redux, React Redux, dan Redux Form

* Kita akan menggunakan beberapa modul tambahan. Untuk menambahkan modul-modul tersebut digunakan perintah:

```sh
npm install --save react-redux react-router-dom redux redux-form
```

* [Redux](https://redux.js.org/) adalah arsitektur yang menangani manajemen state di dalam pembuatan aplikasi Javascript. Redux tidak hanya dapat digunakan di React tapi juga dapat digunakan pada framework lain seperti Angular, Vue, dsb.

* React Redux adalah implementasi dari Redux ke ReactJS.

* [Redux Form](https://redux-form.com/7.3.0/) adalah modul yang digunakan mempermudah manajemen state dalam form yang menggunakan Redux. 

## Merancang Router,  dan State

* Kita akam membuat aplikasi dengan skenario sebagai berikut:

1. Pengguna melihat data cd dalam tabel yang dilengkapi dengan pagination
2. Tersedia tombol __Tambah Data__ untuk memindah halaman ke halaman input data cd baru
3. Di tiap baris data dalam tabel terdapat link __Edit__ yang akan memindah halaman ke halaman edit data
4. Di tiap baris data dalam tabel terdapat link __Hapus__ untuk menghapus data pada baris tersebut

* Berdasarkan skenario tersebut kita memerlukan route dan component sebagai berikut:

| Path | Fungsi |
|---|---|
| "__/__" | Menampilkan data cd |
| "__cd__" | Menampilkan form input cd baru |
| "__cd/:id__" | Menampilkan form edit cd |

* Kemudian state yang akan digunakan adalah berbentuk:

```js
{
  cds: {
    data: [],
    page: 0,
    limit: 5,
    total: 0
  },
  cd: {
    titel: '',
    interpret: '',
    jahr: '',
    id: 0
  }
}
```

* __cds__ adalah bagian yang menampung data yang berhubungan dengan tabel yaitu __data__ berisi array yang ditampilkan di tabel, __page__ adalah angka untuk  halaman aktif (dimulai dari 0), __limit__ adalah angka jumlah data perhalaman (5, 10, 25), dan __total__ yang berisi angka total data secara keseluruhan.

* __cd__ adalah bagian yang menampung data cd tunggal yang digunakan saat mengedit data cd dan ditampilkan di form sebagai nilai default.

## Membuat Desain Tampilan

* Kita akan membuat dua component dan pastikan Anda simpan dua file component ini dalam folder __components__ (buat folder lebih dulu jika belum ada). Dua file tersebut adalah: __HomePage.js__ dan __EditPage.js__. 

* Kita juga akan menggunakan router untuk berpindah antar component. Ubah file __src/index.js__ dengan menambah import dan bagian _ReactDOM.render_ menjadi seperti berikut:

```jsx
...
import { BrowserRouter } from 'react-router-dom';
...
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
```

* Selanjutnya Component pertama yang kita buat adalah __src/components/HomePage.js__ dengan kode sebagai berikut:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Table, { 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

class Home extends React.Component {
  render = () => {
    return (
      <Grid container className="container">
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <Button component={Link} to="/cd" variant="raised" size="large" color="primary">
              Tambah Data
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell>JUDUL</TableCell>
                <TableCell>TAHUN</TableCell>
                <TableCell>PENGARANG</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Judul CD</TableCell>
                <TableCell>2012</TableCell>
                <TableCell>Mark Zulkifli</TableCell>
                <TableCell>
                  <IconButton color="default" component={Link} to={'/cd/1'} size="small" aria-label="Edit">
                    <CreateIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>      
        </Grid>
      </Grid>
    );
  }
}

export default Home;
```
* Pada component diatas kita menggunakan component ```<Table>``` dari material-ui. Kemudian kita menggunakan component ```<Button>``` untuk dijadikan link menuju halaman Edit. Sebenarnya component yang digunakan untuk routing adalah ```Link``` tapi dengan material-ui kita melewatkan component Link ke Button dengan properti ```component={Link}```. 

* Component berikutnya adalah __src/components/EditPage.js__ dengan isi kode seperti berikut:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Send from '@material-ui/icons/Send';

import '../App.css';

class Edit extends React.Component {
  render() {
    return (
      <Grid justify="center" container className="container">
        <Grid item xs={8}>
          <form noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField name="titel" label="*Judul" helperText="Tuliskan JUDUL CD dibagian sini"
                type="text" fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField name="interpret" label="*Pengarang" helperText="Tuliskan PENGARANG dibagian sini"
                type="text" fullWidth
              />
            </Grid>
            
            <Grid item xs={1}>
              <TextField name="jahr" label="*Tahun" helperText="Tahun" type="text" fullWidth 
              />
            </Grid>

            <Grid container justify="flex-end">
              <Button variant="raised" size="large" color="primary" type="submit">
                Simpan Data <Send style={{ marginLeft: '10px' }}></Send>
              </Button> &nbsp; 
              <Button size="large" color="default" component={Link} to="/">
                Batalkan
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Edit;
```
* Untuk input text kita gunakan ```TextField``` yang berasal dari material-ui. Untuk dokumentasi lengkap dari component yang disediakan oleh material-ui dapat dilihat dari website resminya.

* Kemudian kita mengubah file __src/App.js__ menjadi seperti berikut:

```jsx
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import './App.css';

import Home from './components/HomePage';
import Edit from './components/EditPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit" className="toolbar-title">
              CDCOL
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cd" component={Edit} />
          <Route exact path="/cd/:id" component={Edit} />
        </Switch>
      </div>
    );
  }
}

export default App;
```
* Untuk membuat routing dibagian yang akan diganti-ganti berdasarkan url maka beri component ```<Switch>``` yang berisi beberapa ```<Route>``` yang berisi path dan component yang ditampilkan ketika routingnya sesuai dengan path.

* Seharusnya tampilan di browser Anda sudah berisi tabel dengan tombol Tambah Data dan juga tombol Edit di tiap baris di tabel yang jika diklik akan memindahkan halaman ke component __Edit__.

## Membuat Redux Actions

* Untuk mengubah state dalam Redux kita perlu membuat __action__. Beberapa action yang akan kita gunakan adalah:

| Action | Keterangan |
|---|---|
| LOAD_CDS | Memuat data-data cd untuk ditampilkan di tabel sesuai page aktif |
| SET_CD | Mengeset data cd ke state.cd untuk edit data |
| SAVE_CD | Menyimpan data cd (baru/lama) dan disimpan ke data master |
| DELETE_CD | Menghapus data cd di data master |
| SET_CURRENT_PAGE | Mengeset halaman aktif untuk ditampilkan di tabel |
| SET_DATA_PER_PAGE | Mengeset jumlah data per halaman di dalam tabel |

* Buat file __src/actions.js__ dengan isi action dan _action creator_ seperti berikut:

```js
export const LOAD_CDS = 'LOAD_CDS';
export const SET_CD = 'SET_CD';
export const SAVE_CD = 'SAVE_CD';
export const DELETE_CD = 'DELETE_CD';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_DATA_PER_PAGE = 'SET_DATA_PER_PAGE';

export function loadCds(page) {
  return { type: LOAD_CDS, page };
}

export function setCd(id) {
  return { type: SET_CD, id };
}

export function saveCd(cd) {
  return { type: SAVE_CD, cd };
}

export function deleteCd(index) {
  return { type: DELETE_CD, index }
}

export function setCurrentPage(page) {
  return { type: SET_CURRENT_PAGE, page }
}

export function setDataPerPage(limit) {
  return { type: SET_DATA_PER_PAGE, limit }
}
```

## Membuat Redux Reducer

* Setelah membuat action kita perlu merancang reducer yang memproses action untuk menghasilkan state berikutnya. Namun terlebih dahulu kita harus membuat data __JSON__ yang menampung data-data cd awal sebagai __data master__. Buat file __src/cds.json__ dengan isi sebagai berikut:

```json
[
  {
    "titel": "Beauty",
    "interpret": "Ryuichi Sakamoto",
    "jahr": "1990",
    "id": "1"
  },
  {
    "titel": "Goodbye Country (Hello Nightclub)",
    "interpret": "Groove Armada",
    "jahr": "2001",
    "id": "4"
  },
  {
    "titel": "Glee",
    "interpret": "Bran Van 3000",
    "jahr": "1997",
    "id": "5"
  }
]
```

* Setelah itu kita buat file reducer dengan nama __src/reducers.js__ dan berisi kode seperti berikut:

```js
import { combineReducers } from 'redux';
import * as actions from './actions';
import CdMaster from './cds';

let Cd = CdMaster; // set data master (readonly) ke variabel
const cdBase = {
  titel: "", interpret: "", jahr: "", id: 0
};

const cdsBase = {
  data: [], page: 0, limit: 5, total: 0
};

function cd(state = cdBase, action) {
  switch (action.type) {
    case actions.SET_CD:
      if (action.id) {
        return Cd.find(e => e.id === action.id);
      }
      return cdBase;

    default:
      return state;
  }
}

function cds(state = cdsBase, action) {
  let nextState = Object.assign({}, state);
  
  switch (action.type) {
    case actions.LOAD_CDS:
      const start = state.page * state.limit;
      nextState.data = Cd.slice(start, (start + state.limit));
      nextState.total = Cd.length;
      return nextState;

    case actions.DELETE_CD:
      Cd = Cd.filter(t => t.id !== action.index);
      return state;

    case actions.SET_CURRENT_PAGE:
      return Object.assign({}, state, { page: action.page });

    case actions.SET_DATA_PER_PAGE:
      return Object.assign({}, state, { limit: action.limit });

    case actions.SAVE_CD:
      let obj = Object.assign({}, cdBase, action.cd);
      if (obj.id === 0) {
        // push cd baru, id increment
        obj.id = '' + parseInt(Cd[Cd.length - 1].id, 10) + 1;
        Cd.push(obj);
      } else {
        // edit cd
        const index = Cd.findIndex(t => t.id === obj.id);
        Cd[index] = obj;
      }
      return state;

    default:
      return state;
  } 
}

const cdApp = combineReducers({
  cd, 
  cds
});

export default cdApp;
```

* Pada reducer diatas kita merancang state yang terdiri dari dua data yaitu __cd__ dan __cds__ dan digabung menggunakan __combineReducers__. 

## Buat Redux Store

* Setelah membuat __reducer__ selanjutnya adalah membuat store dengan mengedit file __src/index.js__ menjadi seperti berikut:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import cdApp from './reducers';
import App from './App';

import './index.css';

const store = createStore(cdApp);
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
```

* Perhatikan bahwa kita menggunakan fungsi __createStore__ dari redux dan kemudian menggunakan Component __Provider__ dari react-redux yang membungkus keseluruhan component aplikasi dibagian __ReactDOM.render__.

## Meng-_connect_-kan HomePage

* Kita akan menggabungkan state dengan component Home sehingga tampilan di tabel akan sesuai dengan data yang ada di state. Kita buat container baru dalam folder __containers__ dengan nama __src/containers/ShowCd.js__ dengan isi seperti berikut:

```js
import { connect } from 'react-redux';
import * as actions from '../actions';
import Home from '../components/HomePage';

const mapStateToProps = state => {
  return {
    cds: state.cds
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMounted: () => {
      dispatch(actions.loadCds());
    },
    onChangeRowsPerPage: value => {
      dispatch(actions.setDataPerPage(parseInt(value, 10)));
      dispatch(actions.loadCds());
    },
    onChangePage: page => {
      dispatch(actions.setCurrentPage(page));
      dispatch(actions.loadCds());
    },
    onDeleteCd: id => {
      dispatch(actions.deleteCd(id));
      dispatch(actions.loadCds());
    }
  }
};

const ShowCd = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default ShowCd;
```

* Kita mengimport __connect__ dari react-redux untuk men-_subscribe_ component ke store yang berisi state yang kita inginkan. Fungsi __mapStateToProps__ adalah fungsi yang menentukan state apa yang ingin kita connect-kan sedangkan fungsi __mapDispatchToProps__ adalah fungsi yang mendata semua kegiatan yang dapat mengubah state dan dipicu dari kegiatan dalam component.

* Bagian terakhir dari file diatas kita memasukkan component __Home__ ke dalam fungsi __connect__ sehingga component Home akan dicover oleh container __ShowCd__. Dengan ini kita perlu mengubah file __src/App.js__ dibagian routing menjadi seperti berikut:

```jsx
...
import ShowCd from './containers/ShowCd'; // ubah HomePage jadi ShowCd
import Edit from './components/EditPage';
...
        <Switch>
          <Route exact path="/" component={ShowCd} />
          <Route exact path="/cd" component={Edit} />
          <Route exact path="/cd/:id" component={Edit} />
        </Switch>
...
```

## Mengubah View "src/component/HomePage.js"

* Kita perlu mengubah kode tampilan tabel agar sesuai dengan data yang ada di state. Karena itu kode tabel yang baru adalah:

```jsx
...
class Home extends React.Component {
  componentDidMount() {
    this.props.onMounted();
  }

  render = () => {
    const { cds } = this.props;
    ...
            <TableBody>
              {cds.data.map((cd, index) => (
                <TableRow key={cd.id}>
                  <TableCell>{(cds.page * cds.limit) + (index + 1)}.</TableCell>
                  <TableCell>{cd.titel}</TableCell>
                  <TableCell>{cd.jahr}</TableCell>
                  <TableCell>{cd.interpret}</TableCell>
                  <TableCell>
                    <IconButton color="default" component={Link} to={'/cd/' + cd.id} size="small" aria-label="Edit">
                      <CreateIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="Delete" onClick={() => this.props.onDeleteCd(cd.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
...
```

* Kita menambahkan event __componentDidMount__ yang memanggil fungsi __onMounted__ di container dimana fungsi ini akan meload data cd menggunakan __dispatch(actions.loadCd())__. Kemudian kita mendapatkan prop __cds__ yang merubah data state yang kemudian kita render ke tabel dengan __cds.data.map(..)__ (Pastikan akan menghapus ```<TableBody>``` yang lama).

* Dengan begitu kita sudah dapat menampilkan data berdasarkan state yang ada dan sekaligus menghapus data dengan menekan tombol Hapus di tiap baris data.

### Pagination

* Material-ui memiliki component ```<TablePagination>``` yang dapat langsung digabungkan pada data tabel yang sudah ada sebelumnya. Untuk itu kita perlu menambahkan kode seperti berikut:

```jsx
...
class Home extends React.Component {
  ...

  handleChangePage = (e, page) => {
    this.props.onChangePage(page);
  }

  handleChangeRowsPerPage = e => {
    this.props.onChangeRowsPerPage(e.target.value);
  }
...
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={cds.total}
                  rowsPerPage={cds.limit}
                  page={cds.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
...
```

## Redux Form

* Untuk menangani beberapa fungsi form seperti validasi dan penanganan state kita memerlukan modul __reduxForm__ dalam form yang kita buat. Langkah pertama untuk menggunakan Redux Form adalah dengan memasukkan form reducer. Kita edit file __src/reducers__ menjadi seperti berikut:

```js
...
import { reducer as formReducer } from 'redux-form';
...

const cdApp = combineReducers({
  cd, 
  cds,
  form: formReducer
});
...
```

* Anda perhatikan setelah mengimport __formReducer__ kita memasukkannya ke dalam fungsi __combineReducer__ dengan menambahkan kode __form: formReducer__ setelah kode sebelumnya.

## Mengubah View "src/component/EditPage.js"

* Kita akan melakukan banyak perubahan di file ini. Karena form ini digunakan baik untuk memasukkan data ataupun mengedit data yang lama maka seharusnya form akan dapat membaca routing dengan kondisi:

1. Jika urlnya: '/cd' maka semua field akan kosong karena kita memasukkan data baru
2. Jika urlnya: '/cd:id' maka kita harus mengambil data dengan id tersebut dan ditampilkan sebagai nilai default di form.

* Redux form menggunakan component ```<Field>```sehingga kita perlu membungkus component ```<TextField>``` dari material-ui ke Fild

* Selanjutnya kita perlu melakukan validasi sederhana untuk mengecek data yang dimasukkan oleh pengguna.

### Mengubah TextField ke Field

* Kita perlu mengubah file __EditPage__ seperti berikut:

```jsx
...
import { reduxForm, Field, initialize } from 'redux-form';
...

const renderTextField = ({
  input,
  label,
  helperText,
  meta: { touched, error, warning },
  ...custom
}) => (
  <TextField
    error={error && touched}
    label={label}
    helperText={error ? error : helperText}
    {...input}
    {...custom}
  />
);
...
          <form noValidate autoComplete="off" onSubmit={this.props.handleSubmit}>
            <Grid item xs={12}>
              <Field name="titel" label="*Judul" helperText="Tuliskan JUDUL CD dibagian sini"
                component={renderTextField} type="text" fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Field name="interpret" label="*Pengarang" helperText="Tuliskan PENGARANG dibagian sini"
                component={renderTextField} type="text" fullWidth
              />
            </Grid>
            
            <Grid item xs={1}>
              <Field name="jahr" label="*Tahun" helperText="Tahun" 
                component={renderTextField} type="text" fullWidth 
              />
            </Grid>

            <Grid container justify="flex-end">
              <Button variant="raised" size="large" color="primary" type="submit">
                Simpan Data <Send style={{ marginLeft: '10px' }}></Send>
              </Button> &nbsp; 
              <Button size="large" color="default" component={Link} to="/">
                Batalkan
              </Button>
            </Grid>
          </form>
...

Edit = reduxForm({
  form: 'Edit'
})(Edit);

export default Edit;
```

## Meng-_connect_ kan Form

* Kita ingin form terkoneksi ke state sekaligus dapat menampilkan nilai default ketika url sesuai dengan bentuk yang kita harapkan. Sehingga kita perlu menambahkan beberapa kode sebagai berikut:

```jsx
...
import { connect } from 'react-redux';
import * as actions from '../actions';
...
class Edit extends React.Component {
  componentWillMount() {
    this.props.onMounted(this.props.match.params.id);
  }

...
Edit = connect(
  state => ({
    initialValues: state.cd
  }),
  (dispatch, ownProps) => ({
    onMounted: id => {
      dispatch(actions.setCd(id));
      dispatch(initialize('Edit'));
    },
    onSubmit: values => {
      dispatch(actions.saveCd(values));
      ownProps.history.push('/'); // redirect
    }
  })
)(Edit);

export default Edit;
```

* Kita menggunakan event __componentWillMount__ untuk memanggil data cd yang sesuai dengan url di bagian __params.id__. Kemudian kita menambahkan __connect__ dibagian bawah untuk menghubungkan form dengan state yang kita inginkan dalam hal ini __state.cd__. Nilai __state.cd__ akan diset ke __initialValues__ yangmana oleh form-redux akan dimasukkan sebagai nilai default dari input.

* Jika Anda menekan tombol Edit di baris tabel maka form akan otomatis terisi dengan data yang sesuai dengan data yang sebenarnya. Dan Anda sekarang juga sudah bisa mengedit dan menambah data cd yang mana data akan tersimpan dalam memory (tekan Refresh/Reload untuk mereset data).

### Validasi Input

* Form redux juga menyediakan validasi input sederhana sehingga kita dapat membuat validasi seperti berikut:

```jsx
...
const required = value => undefined;
const number = value => value && isNaN(Number(value)) ? 'Harus angka' : undefined;
const maxLength = max => value =>
  value && value.length > max ? `Harus ${max} karakter atau kurang` : undefined
export const minLength = min => value =>
  value && value.length < min ? `Harus ${min} karakter atau lebih` : undefined

const maxLength4 = maxLength(4)
export const minLength4 = minLength(4)

class Edit extends React.Component {
  componentWillMount() {
    this.props.onMounted(this.props.match.params.id);
  }

  render() {
    const { invalid, pristine } = this.props;
          ...

          <form noValidate autoComplete="off" onSubmit={this.props.handleSubmit}>
            <Grid item xs={12}>
              <Field name="titel" label="*Judul" helperText="Tuliskan JUDUL CD dibagian sini"
                validate={[required, minLength4]} component={renderTextField} type="text" fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Field name="interpret" label="*Pengarang" helperText="Tuliskan PENGARANG dibagian sini"
                validate={[required, minLength4]} component={renderTextField} type="text" fullWidth
              />
            </Grid>
            
            <Grid item xs={1}>
              <Field name="jahr" label="*Tahun" helperText="Tahun" 
                validate={[required, number, minLength4, maxLength4]} component={renderTextField} type="text" fullWidth 
              />
            </Grid>

            <Grid container justify="flex-end">
              <Button variant="raised" size="large" color="primary" type="submit" disabled={pristine || invalid}>
                Simpan Data <Send style={{ marginLeft: '10px' }}></Send>
              </Button> &nbsp; 
              <Button size="large" color="default" component={Link} to="/">
                Batalkan
              </Button>
            </Grid>
          </form>
...
```

* Selamat Anda sudah membuat aplikasi CRUD menggunakan ReactJS, Redux dan Redux-Form


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
* Bagian __nama-app__ dapat diganti nama apapun sesuai keinginan Anda. Selanjutnya untuk menjalankan proses development dapat digunakan perintah:

```
cd nama-app
npm run start
```

* Jika berhasil ReactJS akan membuka browser baru dengan fitur _livereload_ dan menampilkan tampilan "Welcome".

## Component

* Pada dasarnya ReactJS dibangun dari pohon (_tree_) Component dimana class __App__ merupakan Component induk yang dimuat pertamakali. Secara umum, Component di ReactJS terdiri dari dua macam yaitu: ___state___ dan ___stateless___.

### Functional Component (Component dari Fungsi)

* Component paling sederhana dalam React dapat dibuat menggunakan sebuah fungsi yang mereturn JSX seperti contoh berikut (file __App.js__):

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Halo, {props.nama}</h1>;
}

// dengan arrow function dan props yang didefinisikan
const WelcomeGuest = ({ nama }) => (
  <h1 style={ { textDecoration: 'underline' } }>Halo, {nama}</h1>
);

// jika JSX lebih dari satu baris maka digunakan tanda ()
function Greeting(props) {
  return (
    <div className="alert alert-info">
      <Welcome nama="Zulkifli Lubis"></Welcome>
      <WelcomeGuest nama="Mark Zulkifli" />
    </div>
  );
}

// cara memanggil component
class App extends Component {
  render() {
    return (
      <div className="App">
        <Greeting nama="Mark Zulkifli" />      
      </div>
    );
  }
}
```

* Beberapa hal yang harus diketahui adalah:

1. Nama fungsi sebaiknya diawali huruf kapital (__Welcome__, __Greeting__, dsb);
2. Jika template HTML memiliki properti __class__ maka harus diganti dengan __className__, contohnya: __className="alert alert-info"__;
3. Component bisa menggunakan _inline style_ dan menggunakan objek javascript yang mirip CSS namun kata kedua menggunakan huruf kapital, contohnya:

```jsx
<h1 style={ { textAlign: "center" } }>Header</h1>
```

4. Template HTML yang direturn harus berada dalam satu induk tag, jika diperlukan gunakan __div__ untuk membungkus tag-tag yang sejajar / bersebelahan;
5. Karena JSX menggunakan XML maka untuk tag tunggal seperti __img, br, hr__ dsb maka harus diberi _close tag_ secara langsung, contohnya: 
```html
<br />
<hr />
<img src={prop.image} />
```
6. Selalu prioritaskan membuat Component menggunakan fungsi dibandingkan dengan menggunakan _class_ kecuali untuk Component dengan _state_.

### Class Component (Component dari Class)

* Selain menggunakan fungsi, membuat component React juga bisa dilakukan dengan menggunakan class. Kelebihan dari pembuatan component dengan class adalah kita bisa membuat _state_ dan juga menambahkan _event_ saat component di _mount_ ataupun _unmount_. Contoh pembuatannya seperti berikut:

```jsx
import React from 'react';

...
class Welcome extends React.Component {
  render() {
    return <h1>Halo, {this.props.nama}</h1>;
  }
}
```
* Aturan yang digunakan juga sama dengan functional component seperti nama class diawali huruf kapital, dsb. Pastikan jika Anda memiliki __constructor(props)__ maka Anda harus memanggil parent class dengan perintah __super(props)__.

* Jangan pernah ragu untuk membuat memisah-misah component yang besar menjadi component yang lebih kecil-kecil. Konsep dasarnya adalah membuat component yang bisa dipakai berulang-ulang.

## Props dan State

* Pada tag component ```<Welcome nama="Zulkifli Lubis"></Welcome>```, terdapat property (disingkat __props__) "__nama__" yang bernilai "Zulkifli Lubis". Props ini akan digunakan dalam component menjadi ```{props.nama}``` atau ```{this.props.nama}```. Props ini nilainya bisa diset dari induk component (biasa dikenal sebagai "__controlled component__") ataupun pada component itu sendiri dengan mengetikkan secara manual.

* Semua component di React tidak diperbolehkan mengubah nilai props, sekali diset maka tidak boleh ada perubahan lagi. Jika Anda ingin memiliki variabel dalam component yang dapat diubah-ubah maka Anda dapat menggunakan __state__.

* Berikut ini adalah contoh penggunaan state dalam class component:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  
  componentDidMount() { // event saat component dimuat
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() { // event saat component dibuang
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

## Menangani Event

* Di React event yang ada hampir sama dengan event di elemen DOM dengan perbedaan yaitu di React nama event menggunakan __camelCase__ (__onClick, onChange, dsb__);

```jsx
const ActionLink = () => (
  <a href="#" onClick={e => {
    e.preventDefault();
    console.log('Link di klik!');
  }}>Klik Saya</a>
);
```

* Jika componet dibuat menggunakan class maka pola yang umum untuk penanganan event adalah dimasukkan sebagai _method_ dari class seperti contoh berikut:

```jsx
import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true }
  }

  handleClick = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

* Jika Anda ingin melewatkan parameter ke _event handler_ maka dapat Anda gunakan cara seperti berikut:

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Hapus baris</button>
```

## Membuat List (Daftar)

* Pada umumnya untuk menampilkan list dari sebuah array di React menggunakan fungsi __map()__ yang mana fungsi ini akan mencacah setiap item dari array satu persatu.

```jsx
const array = [1, 2, 3, 4, 5];
const List = ({ numbers }) => (
  <ul>
    {
      numbers.map(number => (
        <li>{number}</li>
      ))
    }
  </ul>
);

...
  render() {
    return (
      <div className="App">
        <List numbers={array} />
      </div>
    );
  }
..
```

* Jika kode diatas dijalankan akan terdapat peringatan bahwa sebuah __key__ harus diikutkan dalam list sehingga kode diatas harus diubah menjadi:

```jsx
...
      <li key={number.toString()}>{number}</li>
...
```

* Jika Anda mendapatkan data dari resource biasanya key akan diisi dengan __id__ dari data tersebut, namun jika data tidak memiliki id maka kita dapat menggunakan _item index_ dengan mengubah kode menjadi seperti berikut:

```jsx
...
      numbers.map((number, index) => (
        <li key={index}>{number}</li>
      ))
...
```
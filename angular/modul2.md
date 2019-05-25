# Angular

Tujuan pembelajaran: Mahasiswa mengenal dan dapat mengenal dan menggunakan Angular sebagai salah satu Javascript Framework dengan baik

## Instalasi

* Install __angular-cli__ secara global dengan perintah:

```sh
npm install -g @angular/cli
```

* Untuk membuat _project_ baru dengan scss maka dapat menggunakan perintah:

```sh
ng new namaProject --style=scss --routing=true
```

* Setelah beberapa saat instalasi maka untuk menjalankan aplikasi dengan menggunakan perintah:
```
ng serve --open
```

* Sebuah jendela _browser_ akan terbuka dengan fitur _livereload_ dan Anda sudah bisa membuat aplikasi dengan Angular.

* Untuk memasukkan bootstrap ke aplikasi Angular yang kita buat dapat digunakan perintah sebagai berikut:

```
npm install --save bootstrap
```

* Untuk memasukkan scss dari bootstrap ataupun mengubah style umum / global Anda dapat mengedit file ```styles/scss``` kode scss berikut:

```scss
@import '~bootstrap/scss/bootstrap';
```

## Component

* Pada dasarnya Angular dibangun dari pohon Component dimana __app.component__ merupakan Component induk yang dimuat pertamakali. Pada umumnya setiap Component terdiri dari sebuah template HTML, sebuah file typescript dan file style (css/scss).

* Jika Anda melihat file ```src/index.html``` dan melihat _tag_ ```<app-root></app-root>``` maka itu adalah Component pertama yang kita punya secara default. Class Component di Typescript ditandai dengan _decorator_ ```@Component```.

* Sekarang kita akan memodifikasi template Component yang sudah ada yaitu dengan mengedit file ```src/app/app.component.html``` menjadi seperti berikut: (isi sebelumnya dihapus)

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">IF UNIRA</a>
</nav>
<div class="container">
  <div class="row">
	<div class="col">
	  <router-outlet></router-outlet>
	</div>
  </div>
</div>
```

### Data Binding Dalam Component

* Angular memiliki beberapa metode dalam mem-_binding_ atau menghubungkan variabel di Class Component (.ts) ke View (.html). Pertama adalah __interpolatioan__ dimana nilai suatu variabel dapat langsung ditampilkan di view menggunakan kode __{{ variabel }}__.

```html
Selamat Datang {{ nama }}
``` 
* Selanjutnya adalah __property binding__ dimana nilai suatu variabel di Class Component dapat dimunculkan pada properti suatu tag HTML. Contoh adalah memunculkan url gambar secara dinamis seperti berikut:

```html
<img [src]="variabel">
``` 

* __Two way binding__ adalah suatu nilai variabel bisa diubah dari HTML menggunakan input yang diberi atribut __ngModel__.

```html
<input type="text" [(ngModel)]="variabel" name="input">
```

* Yang terakhir adalah __event binding__ dimana kita bisa menghubungkan event tertentu pada suatu elemen HTML ke fungsi yang ada di Class Component. Contohnya:


```html
<button (click)="simpanData()">SIMPAN</button>
```


### Membuat Component Baru

* Untuk membuat component baru di Angular bisa menggunakan CLI dengan mengetikkan perintah seperti berikut:

```
ng generate component namacomponent
```

* Sekarang kita buat __dua__ component baru yaitu __list__ untuk menampilkan list data mahasiswa dan __detail__ untuk menampilkan detail mahasiswa ketika link di daftar mahasiswa di klik.

* Ketikkan perintah berikut:

```
ng generate component pages/list
ng generate component pages/detail
```

* Jika sukses maka di folder __src__ akan muncul folder __pages/list__ dan __pages/detail__ yang masing-masing berisi file __.ts__, __.scss__, dan __.html__.

## Navigasi

* Kita buat routes sederhana yang hanya mengatur navigasi dari halaman list mahasiswa ke detail mahasiswa. Tambahkan kode berikut ini di __src/app/app-routing.module.ts__:

```ts
const appRoutes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'detail/:nim', component: DetailComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];
```
* __Pastikan component List dan Detail sudah terimport dengan benar sehingga kode diatas tidak menyebabkan error__

* Bagian __path__ adalah URL yang digunakan oleh aplikasi nantinya. URL __detail/:id__ akan sesuai dengan URL detail/3, detail/5, dsb. Sedangkan bagian __component__ adalah menunjuk component apa yang akan digunakan saat URL sesuai dengan path. 

* Kita akan memodifikasi file template __list.component.html__ sehingga menampilkan daftar mahasiswa yang jika diklik menuju halaman detail. Ubah kode htmlnya menjadi seperti berikut:

```html
<table class="table table-striped">
  <thead>
    <tr>
      <th colspan="2">MAHASISWA</th>
      <th>KONTAK</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="" alt="" class="img-thumbnail">
      </td>
      <td><strong>NAMA</strong><br>NPM</td>
      <td>TELEPON<br>ALAMAT</td>
      <td>
        <a href="" class="btn btn-info">DETAIL</a>
      </td>
    </tr>
  </tbody>
</table>

<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <button type="button" class="page-link">&laquo; SEBELUMNYA</button>
    </li>
    <li class="page-item">
      <button type="button" class="page-link">BERIKUTNYA &raquo;</button>
    </li>
  </ul>
</nav>
```

* Sekarang kita ubah file __list.component.ts__ menjadi seperti berikut:

```ts
...
export class ListComponent implements OnInit {

  mhsList: any[] = [
    {
      foto: '', npm: '201452009', nama: 'Ridho', alamat: 'Pamekasan', telepon: '000', link: ['/mhs/201452009']
    },
    {
      foto: '', npm: '201452010', nama: 'Fajar', alamat: 'Pamekasan', telepon: '000', link: ['/mhs/201452010']
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
...
```

* Sementara variabel mhsList baru berisi data _dummy_ yang dimasukkan secara manual, namun yang perlu dicatat adalah bagaimana sebuah variabel ditampilkan di view (html).

* Seharusnya tampilan browser Anda sudah dapat menampilkan data mahasiswa sesuai dengan data di class Component lengkap dengan link menuju detail mahasiswa.

* Sekarang kita berpindah ke component detail dengan pertamakali mengubah file template __detail.component.html__ menjadi seperti berikut:

```html
<div class="card text-center">
  <div class="card-header">
    NPM
  </div>
  <div class="card-body">
    <p><img src="" alt="foto" class="img-thumbnail"></p>
    <h5 class="card-title">NAMA</h5>
    <p class="text-muted">TELEPON</p>
    <p class="card-text">ALAMAT</p>
    <button type="button" class="btn btn-primary">KEMBALI</button>
  </div>
  <div class="card-footer text-muted">
    Universitas Madura
  </div>
</div>
```

* Di file __mhs-detail.component.ts__ diubah menjadi berikut:

```ts
public npm: string;

constructor(
  private route: ActivatedRoute,
  private http: HttpClient,
  private location: Location
) {
}

ngOnInit() {
  this.npm = this.route.snapshot.paramMap.get('nim');
}
```

* Perhatikan bahwa kita mengimpor __ActivatedRoute__ dari __@angular/router__ untuk mendapatkan data npm dari url dengan bentuk __detail/:npm__. Kemudian untuk mendapatkan __:npm__ menggunakan kode ___snapshot.paramMap.get('nim')___. 

* Sekarang navigasi secara umum sudah dapat berfungsi. Anda dapat menggunakan tombol link untuk melihat detail mahasiswa dan juga tombol kembali untuk daftar mahasiswa.

## HTTP

* Kita akan menggunakan API dari UNIRA untuk mendapatkan data mahasiswa untuk ditampilkan di halaman daftar mahasiswa. API UNIRA menggunakan REST API yang bisa diakses menggunakan GET, POST, PUT dan DELETE method.

* Untuk dapat menggunakan HTTP kita perlu mengimport http client module dari __@angular/common/http__ di file __src/app.module.ts__ seperti kode berikut:

```ts
...
import { HttpClientModule } from '@angular/common/http';
...

  imports: [
    ...
    HttpClientModule
    ...
  ]
...
```

* Selanjutnya kita perlu mengubah file __list.component.ts__ untuk melakukan request HTTP ketika Component dimulai. Pertama kita import HttpClient dan HttpParams dan masukkan di HttpClient di __constructor__.

```ts
...
import { HttpClient, HttpParams } from '@angular/common/http';

...
  apiUrl: string;

  ...
  
  // jangan lupa masukkan ke constructor
  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = 'https://api.unira.ac.id';
  }

  ...
```

* Selanjutnya kita buat request http ke API unira di fungsi ngOnInit seperti berikut:

```ts
  ...
  ngOnInit() {
    let params = new HttpParams();
    params = params.append('limit', '5'); // batasi 5 data pagination
    params = params.append('filter[prodi]', '52'); // dari prodi TI
    params = params.append('filter[nim]', '2016'); // nim like %nim%

    this.http.get(this.apiUrl + '/v1/mahasiswa', { params: params }).toPromise().then(data => {
      this.mhsList = data['data'];
    });
  }
  ...
```

* Anda perhatikan kode diatas, pertama kita buat paramater (URL query) yang akan diikutkan ketika mengirim request GET ke API UNIRA. Untuk membuat parameter baru menggunakan perintah __new HttpParams()__ yang diikuti dengan tambahan parameter yang akan digunakan.

* Selanjutnya digunakan perintah __this.http.get(...)__ untuk melakukan proses request diikuti dengan perintah __toPromise()__ dan __then(...)__ mengubah hasil request menjadi Promise dan kemudian mengupdate data __mhsList__ dengan data dari hasil request.

* Kita harus memodifikasi file __mhs-list.component.html__ (template) kita agar sesuai dengan data baru yang kita peroleh menjadi seperti berikut:

```html
<table class="table table-striped">
  <thead>
    <tr>
      <th colspan="2">MAHASISWA</th>
      <th>KONTAK</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let mhs of mhsList">
      <td>
        <img [src]="apiUrl + '/' + mhs.attributes.thumbnail" alt="" class="img-thumbnail">
      </td>
      <td><strong>{{mhs.attributes.nama}}</strong><br>{{mhs.id}}</td>
      <td>{{mhs.attributes.hp}}<br>{{mhs.attributes.alamat}}</td>
      <td>
        <a [routerLink]="['/detail/', mhs.id]"  class="btn btn-info">DETAIL</a>
      </td>
    </tr>
  </tbody>
</table>

<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <button type="button" [disabled]="page === 1" (click)="prevPage()" class="page-link">&laquo; SEBELUMNYA</button>
    </li>
    <li class="page-item">
      <button type="button" [disabled]="page === totalPage" (click)="nextPage()" class="page-link">BERIKUTNYA &raquo;</button>
    </li>
  </ul>
</nav>
```

* Jika berhasil maka seharusnya Anda sudah dapat melihat tampilan data mahasiswa Universitas Madura lengkap dengan foto thumbnailnya. *_Namun ketika link di klik dan menuju halaman detail datanya masih belum sesuai dengan data yang sebenarnya_.









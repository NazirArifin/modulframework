# Angular

Tujuan pembelajaran: Mahasiswa mengenal dan dapat mengenal dan menggunakan Angular sebagai salah satu Javascript Framework dengan baik

## Instalasi

* Install __angular-cli__ secara global dengan perintah:

```sh
npm install -g @angular/cli
```

* Untuk membuat _project_ baru dengan scss maka dapat menggunakan perintah:

```sh
ng new namaProject --style=scss
```

* Setelah beberapa saat instalasi maka untuk menjalankan aplikasi dengan menggunakan perintah:
```
ng serve --open
```

* Sebuah jendela _browser_ akan terbuka dengan fitur _livereload_ dan Anda sudah bisa membuat aplikasi dengan Angular.

* Untuk memasukkan bootstrap ke aplikasi Angular yang kita buat dapat digunakan perintah sebagai berikut:

```
npm install --save bootstrap jquery popper.js
```

* Untuk memasukkan scss dari bootstrap ataupun mengubah style umum / global Anda dapat mengedit file ```styles/scss``` kode scss berikut:

```scss
@import '~bootstrap/scss/bootstrap';

body {
  padding-top: 5rem;
  .mhs-thumbnail {
    height: 80px;
  }
}
```

* Sedangkan untuk memasukkan javascript dari jquery, popper.js dan bootstrap salah satu caranya dengan cara mengedit file ```.angular-cli.json``` dibagian __scripts__ diubah menjadi seperti berikut (pastikan urutannya benar):

```json
      "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/popper.js/dist/umd/popper.min.js",
        "../node_modules/bootstrap/dist/js/bootstrap.min.js"
      ],
```

* Kemudian edit file ```src/app/app.component.ts``` dengan menambahkan kode

```ts
declare const $: any;

@Component
...
```

## Component

* Pada dasarnya Angular dibangun dari pohon Component dimana __app.component__ merupakan Component induk yang dimuat pertamakali. Pada umumnya setiap Component terdiri dari sebuah template HTML, sebuah file typescript dan file style (css/scss).

* Jika Anda melihat file ```src/index.html``` dan melihat _tag_ ```<app-root></app-root>``` maka itu adalah Component pertama yang kita punya secara default. Class Component di Typescript ditandai dengan _decorator_ ```@Component```.

* Sekarang kita akan memodifikasi template Component yang sudah ada yaitu dengan mengedit file ```src/app/app.component.html``` menjadi seperti berikut: (isi sebelumnya dihapus)

```html
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="">Universitas Madura</a>
</nav>
<div class="container pb-5">
  <div class="row">
    <div class="col-sm-12">
      <!-- UNTUK NAVIGASI, COMPONENT PAGE AKAN MUNCUL DISINI -->
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

* __Two way binding__ adalah suatu nilai variabel bisa diubah dari HTML menggunakan input yang diberi atribut __ngModel__, cara penggunaan dapat Anda lihat nanti di modul ini.

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
ng generate component nama-component
```

* Sekarang kita buat __dua__ component baru yaitu __mhs-list__ untuk menampilkan list data mahasiswa dan __mhs-detail__ untuk menampilkan detail mahasiswa ketika link di daftar mahasiswa di klik.

* Ketikkan perintah berikut:

```
ng generate component mhs-list
ng generate component mhs-detail
```

* Jika sukses maka di folder __src__ akan muncul folder __mhs-list__ dan __mhs_detail__ yang masing-masing berisi file __.ts__, __.scss__, dan __.html__.

## Navigasi

* Secara default router untuk navigasi tidak terpasang di Angular, karena itu kita perlu mengubah file __src/app/app.module.ts__ bagian import dengan mengimport RouterModule seperti berikut:

```ts
...
import { RouterModule, Routes } from '@angular/router';
...
```

* Kita buat routes sederhana yang hanya mengatur navigasi dari halaman list mahasiswa ke detail mahasiswa. Tambahkan kode berikut ini di __src/app/app.module.ts__ dibagian bawah import sebelum @NgModule:

```ts
const appRoutes: Routes = [
  { path: 'mhslist', component: MhsListComponent },
  { path: 'mhs/:id', component: MhsDetailComponent },
  { path: '', redirectTo: '/mhslist', pathMatch: 'full' }
];
```

* Bagian __path__ adalah URL yang digunakan oleh aplikasi nantinya. URL __mhs/:id__ akan sesuai dengan URL mhs/3, mhs/5, dsb. Sedangkan bagian __component__ adalah menunjuk component apa yang akan digunakan saat URL sesuai dengan path. 

* Selanjutnya kita tambahkan RouterModule ke aplikasi dengan cara memasukkannya ke bagian __imports__ dengan parameter __appRoutes__ yang telah kita buat sebelumnya:

```ts
...
@NgModule({
  declarations: [
    AppComponent,
    MhsListComponent,
    MhsDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
...
```

* Jika berhasil maka aplikasi Anda seharusnya menampilkan data HTML yang ada di dalam mhs-list.component.html. 

* Kita akan memodifikasi file template __mhs-list.component.html__ sehingga menampilkan daftar mahasiswa yang jika diklik menuju halaman detail. Ubah kode htmlnya menjadi seperti berikut:

```html
<div class="d-flex justify-content-between">
  <h4>{{ titlePage }}</h4>
  <form class="form-inline" name="form">
    <label class="sr-only" for="search">Cari</label>
    <input type="text" class="form-control mb-2 mr-sm-2" name="cari" (keyup)="cariMhs()" id="search" placeholder="Cari" [(ngModel)]="titlePage">
  </form>
</div>

<hr>
<div class="list-group">
  <a [routerLink]="['/mhs', mhs.npm]" class="list-group-item list-group-item-action flex-column align-items-start" *ngFor="let mhs of mhsList">
    <div class="d-flex w-100">
      <img src="http://via.placeholder.com/80x80" class="rounded" alt="">
      <div class="ml-3">
        <h5 class="mb-1">{{ mhs.npm }}</h5>
        <p>{{ mhs.nama }}</p>
      </div>
    </div>
  </a>
</div>
```

* Agar dapat menggunakan __[(ngModel)]__ di input cari mahasiswa kita perlu mengimport module form di __src/app/app.module.ts__ dengan menambahkan kode berikut di bagian import:

```ts
...
import { FormsModule } from '@angular/forms'; // biar bisa ngModel
...

  import: [
    ...
    FormsModule,
    BrowserModule
  ],
...
```

* Untuk menampilkan nilai variabel dari class typescript secara langsung bisa menggunakan perintah __{{ namaVariabelnya }}__ (_one way binding_)

* Untuk memasukkan variabel ke input agar bisa mengubah nilai variabel dari view (html) dapat menggunakan perintah __[(ngModel)]="namaVariabel"__ (_two way binding_)

* Selanjutnya masih di kode HTML sebelumnya juga terdapat kode _directive_ __*ngFor__ untuk mencacah array data mahasiswa di variabel __mhsList__. Pastikan Anda memahami konsep directive seperti *ngFor, *ngIf, dsb., karena ini berguna dalam tampilan agar lebih dinamis mengikuti data yang ada di class Componentnya.

* Atribut __[routerLink]__ digunakan untuk membuat link secara dinamis berdasarkan variabel mhs. Bermacam bentuk routerLink dapat dilihat di dokumentasi Angular tentang Router.

* Sekarang kita ubah file __mhs-list.component.ts__ menjadi seperti berikut:

```ts
...
export class MhsListComponent implements OnInit {

  titlePage: string;
  mhsList: Array<any> = [
    {
      npm: '201452009', nama: 'Ridho Abdillah', link: ['/mhs/201452009']
    },
    {
      npm: '201452010', nama: 'Fajar Abu Sofyan', link: ['/mhs/201452010']
    }
  ];

  constructor() {
    this.titlePage = 'Mahasiswa Universitas Madura';
  }

  public cariMhs() {
    console.log(this.titlePage);
  }

  ngOnInit() {
  }

}
...
```

* Sementara variabel mhsList baru berisi data _dummy_ yang dimasukkan secara manual, namun yang perlu dicatat adalah bagaimana sebuah variabel ditampilkan di view (html).

* Seharusnya tampilan browser Anda sudah dapat menampilkan data mahasiswa sesuai dengan data di class Component lengkap dengan link menuju detail mahasiswa.

* Sekarang kita berpindah ke component mhs-detail dengan pertamakali mengubah file template __mhs-detail.component.html__ menjadi seperti berikut:

```html
<div class="card text-center">
  <div class="card-header">
    {{ npm }}
  </div>
  <div class="card-body">
    <h5 class="card-title">Ridho Abdillah</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a routerLink="/mhslist" class="btn btn-primary">KEMBALI</a>
  </div>
  <div class="card-footer text-muted">
    Universitas Madura
  </div>
</div>
```

* Di file __mhs-detail.component.ts__ diubah menjadi berikut:

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mhs-detail',
  templateUrl: './mhs-detail.component.html',
  styleUrls: ['./mhs-detail.component.scss']
})
export class MhsDetailComponent implements OnInit {

  npm: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.npm =  this.route.snapshot.params['id'];
  }

}
```

* Perhatikan bahwa kita mengimpor __ActivatedRoute__ dari __@angular/router__ untuk mendapatkan data npm dari url dengan bentuk __mhs/:id__. Kemudian untuk mendapatkan __:id__ menggunakan kode ___snapshot.params['id']___. 

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

* Selanjutnya kita perlu mengubah file __mhs-list.component.ts__ untuk melakukan request HTTP ketika Component dimulai. Pertama kita import HttpClient dan HttpParams dan masukkan di HttpClient di __constructor__.

```ts
...
import { HttpClient, HttpParams } from '@angular/common/http';

...
export class MhsListComponent implements OnInit {

  titlePage: string;
  apiUrl: string;

  ...
  
  // jangan lupa masukkan ke constructor
  constructor(
    private http: HttpClient
  ) {
    this.titlePage = 'Mahasiswa Universitas Madura';
    this.apiUrl = 'http://api1.unira.ac.id/';
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
    params = params.append('filter[nim]', '2015'); // nim like %nim%

    this.http.get(this.apiUrl + 'v1/mahasiswa', { params: params }).toPromise().then(data => {
      this.mhsList = data['data'];
    });
  }
  ...
```

* Anda perhatikan kode diatas, pertama kita buat paramater (URL query) yang akan diikutkan ketika mengirim request GET ke API UNIRA. Untuk membuat parameter baru menggunakan perintah __new HttpParams()__ yang diikuti dengan tambahan parameter yang akan digunakan.

* Selanjutnya digunakan perintah __this.http.get(...)__ untuk melakukan proses request diikuti dengan perintah __toPromise()__ dan __then(...)__ mengubah hasil request menjadi Promise dan kemudian mengupdate data __mhsList__ dengan data dari hasil request.

* Kita harus memodifikasi file __mhs-list.component.html__ (template) kita agar sesuai dengan data baru yang kita peroleh menjadi seperti berikut:

```html
<div class="d-flex justify-content-between">
  <h4>{{ titlePage }}</h4>
  <form class="form-inline" name="form">
    <label class="sr-only" for="search">Cari</label>
    <input type="text" class="form-control mb-2 mr-sm-2" name="cari" (keyup)="cariMhs()" id="search" placeholder="Cari" [(ngModel)]="titlePage">
  </form>
</div>

<hr>
<div class="list-group">
  <a [routerLink]="['/mhs', mhs.id]" class="list-group-item list-group-item-action flex-column align-items-start" *ngFor="let mhs of mhsList">
    <div class="d-flex w-100">
      <img [src]="apiUrl + mhs.attributes?.thumbnail" class="rounded mhs-thumbnail" alt="">
      <div class="ml-3">
        <h5 class="mb-1">{{ mhs.id }}</h5>
        <p>{{ mhs.attributes?.nama }}</p>
      </div>
    </div>
  </a>
</div>

<hr>
<nav aria-label="Page Navigation">
  <ul class="pagination justify-content-center">
    <li class="page-item"><a class="page-link" href="">1</a></li>
    <li class="page-item"><a class="page-link" href="">2</a></li>
    <li class="page-item"><a class="page-link" href="">3</a></li>
  </ul>
</nav>
```

* Jika berhasil maka seharusnya Anda sudah dapat melihat tampilan data mahasiswa Universitas Madura lengkap dengan foto thumbnailnya. *_Namun ketika link di klik dan menuju halaman detail datanya masih belum sesuai dengan data yang sebenarnya_.

## Service

* Jika kita akan menggunakan perintah HTTP request ke API UNIRA berkali-kali dan digunakan oleh lebih dari satu Component (contohnya oleh mhs-list dan mhs-detail) maka kita perlu membuat sebuah Service. Anda bisa saja _copy paste_ kode yang sama di setiap Component tapi ini akan membuat kode Anda menjadi "kotor" dan tidak rapi. Karena itu kita perlu __Service__ yang dapat kita panggil oleh semua Component dengan mudah tanpa mengulang-ulang kode import dan kode dasar yang sama.

* Untuk membuat service baru Anda ketikkan perintah berikut ini:

```
ng generate service mhsApi
```

* Jika sukses akan muncul file baru di folder app yaitu: __mhs-api.service.ts__. Kita akan memindahkan perintah import HttpClient dan HttpParams, perintah http.get ke Class ini. Kita ubah file __mhs-api.service.ts__ menjadi seperti berikut:

```ts
...
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MhsApiService {

  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = 'http://api1.unira.ac.id/';
  }

  getApiUrl() {
    return this.apiUrl;
  }
  
  // untuk request semua mahasiswa
  getAllMhs() {
    return new Promise<any[]>((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('limit', '4'); // batasi 5 data pagination
      params = params.append('filter[prodi]', '52'); // dari prodi TI
      params = params.append('filter[nim]', '2015'); // nim like %nim%

      this.http.get(this.apiUrl + 'v1/mahasiswa', { params: params }).toPromise().then(data => {
        resolve(data['data']);
      });
    });
  }
  
  // untuk request detail per mahasiswa
  getMhsDetail(npm) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'v1/mahasiswa/' + npm).toPromise().then(data => {
        resolve(data['data']);
      });
    });
  }
...

```

* Perhatikan bahwa kita membungkus request ke API untuk data mahasiswa dalam sebuah fungsi __getAllMhs()__ yang nanti akan dipanggil oleh Component mhs-list dan fungsi __getMhsDetail__ yang akan dipanggil oleh Component mhs-detail. Selain itu juga pastikan Anda sudah mengimport HttpClient dan HttpParams.

* Selanjutnya kita ubah file __mhs-list.component.ts__ menjadi seperti berikut (pastikan import HttpClient dan HttpParam sebelumnya sudah tidak ada):

```ts
import { Component, OnInit } from '@angular/core';
import { MhsApiService } from '../mhs-api.service';

...
  constructor(private mhsService: MhsApiService) {
    this.titlePage = 'Mahasiswa Universitas Madura';
    this.apiUrl = this.mhsService.getApiUrl();
  }

  public cariMhs() {
    console.log(this.titlePage);
  }

  ngOnInit() {
    this.mhsService.getAllMhs().then(data => {
      this.mhsList = data;
    });
  }
...
```

* Di fungsi __ngOnInit()__ kita sudah menggunakan Service yang baru saja kita buat dan memanggil fungsi __getAllMhs()__ yang mereturn data hasil request ke API Unira. Service ini akan digunakan juga di Component __mhs-detail__ sehingga kita perlu memodifikasi file __mhs-detail.component.ts__ menjadi seperti berikut:

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MhsApiService } from '../mhs-api.service';

@Component({
  selector: 'app-mhs-detail',
  templateUrl: './mhs-detail.component.html',
  styleUrls: ['./mhs-detail.component.scss']
})
export class MhsDetailComponent implements OnInit {

  npm: string;
  mhs: any;
  apiUrl: string;

  constructor(
    private route: ActivatedRoute,
    private mhsService: MhsApiService
  ) {
    this.mhs = {};
    this.apiUrl = this.mhsService.getApiUrl();
  }

  ngOnInit() {
    this.npm =  this.route.snapshot.params['id'];
    this.mhsService.getMhsDetail(this.npm).then(data => {
      this.mhs = data;
    });
  }

}
```

* Perhatikan bahwa kita tinggal menggunakan Service yang telah dibuat dalam Component mhs-detail diatas dengan menggunakan fungsi __getMhsDetail(this.npm)__. Fungsi ini akan mengubah data variabel mhs menjadi data hasil request ke API UNIRA.

* Selain itu kita juga akan mengubah data view html menjadi seperti berikut:

```html
<div class="card text-center">
  <div class="card-header">
    {{ npm }}
  </div>
  <div class="card-body">
    <p><img [src]="apiUrl + mhs.attributes?.thumbnail" alt="foto" class="img-thumbnail"></p>
    <h5 class="card-title">{{ mhs.attributes?.nama }}</h5>
    <p class="card-text">{{ mhs.attributes?.alamat }}</p>
    <a routerLink="/mhslist" class="btn btn-primary">KEMBALI</a>
  </div>
  <div class="card-footer text-muted">
    Universitas Madura
  </div>
</div>
```

* Jika berhasil Anda akan mendapatkan tampilan navigasi yang sudah berjalan lengkap dengan halaman list dan detail mahasiswa.

## TUGAS

* Buat pagination yang berfungsi dengan menambah paramater __page__ di request ke API UNIRA!

* Fungsikan pencarian mahasiswa sehingga mahasiswa yang muncul di list sesuai dengan kata kunci pencarian yang dimasukkan!









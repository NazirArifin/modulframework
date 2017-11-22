# Angular

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan Angular sebagai salah satu Javascript Framework dengan baik

## Instalasi

* Install __angular-cli__ secara global dengan perintah:

```sh
npm install -g @angular/cli
```

* Untuk membuat _project_ baru maka dapat menggunakan perintah:

```sh
ng new namaProject
```

* Setelah beberapa saat instalasi maka untuk menjalankan aplikasi dengan menggunakan perintah:
```
ng serve --open
```

* Sebuah jendela _browser_ akan terbuka dengan fitur _livereload_ dan Anda sudah bisa membuat aplikasi dengan Angular.

## Angular 5 + Electron

Kita akan menggabungkan Angular dengan Electron sehingga aplikasi dapat dibungkus menjadi sebuah aplikasi _executable_ dan langsung dijalankan di komputer lain tanpa menggunakan _browser_.

* Anda dapat menggunakan project [angular-electron](https://github.com/NazirArifin/angular-electron) dengan meng _clone_ atau mengunduh _repository_ tersebut. Setelah itu Anda ketikkan perintah ```npm install```.

* Setelah proses selesai Anda dapat mencoba menjalankan aplikasi dengan mengetikkan perintah berikut: ```npm start```, dan Voila! Anda dapat menggunakan aplikasi Angular + Electron app dengan hot reload.

## Menggunakan Request HTTP

* Untuk menggunakan HTTP kita perlu memasukkannya ke dalam module dengan cara mengedit file ```src/app/app.module.ts``` dengan mengimport HttpClientModule dan memasukkan di __imports__.

```typescript
...
import { HttpClientModule } from '@angular/common/http';

...
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
...
```

* Buka file ```src/app/components/home/home.component.html``` dan ubah isinya menjadi seperti berikut:

```html
<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="media" *ngFor="let mhs of mahasiswaList">
        <img class="mr-3" [src]="mhs.attributes.thumbnail ? mhs.attributes.thumbnail : 'assets/background.jpg'" alt="image">
        <div class="media-body">
          <h5 class="mt-0">{{ mhs.id }}</h5>
          {{ mhs.attributes.nama }}
        </div>
      </div>
    </div>
  </div>
</div>
```

* Untuk mengubah _style_ tampilan anda dapat mengubah file ```src/app/components/home/home.component.scss``` menjadi seperti berikut:

```sass
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .media {
    margin-bottom: 15px;
    img {
      width: 150px;
      border-radius: 50%;
    }
  }
}
```

* Sekarang kita buka file ```src/app/components/home/home.component.ts``` dan masukkan kode berikut:

```typescript
...
import { HttpClient, HttpParams } from '@angular/common/http';

...
  mahasiswaList: [any];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    let params = new HttpParams();
    params = params.append('limit', 5 + '');

    this.http.get('https://api.unira.ac.id/v1/mahasiswa', { params: params }).subscribe(data => {
      this.mahasiswaList = data['data'];
      console.log(this.mahasiswaList);
    });
  }

...
```

* Pastikan anda terhubung ke internet sehingga di aplikasi anda akan muncul lima mahasiswa yang berasal dari _endpoint_ [https://api.unira.ac.id](__api.unira.ac.id__).

* Buat pagination untuk menampilkan lima mahasiswa berikutnya!

 

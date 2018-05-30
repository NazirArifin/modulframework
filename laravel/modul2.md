# Laravel 5.5 (REST API)

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan framework Laravel 5.5 untuk membuat REST API dengan baik.

## Persiapan

* Buat project baru dapat dilakukan dengan perintah:

```sh
laravel new webapi
```

* atau menggunakan perintah composer seperti berikut:

```sh
composer create-project laravel/laravel webapi "5.5.*" --prefer-dist
```

* Perintah-perintah diatas akan membuat folder baru dengan nama "webapi" yang berisi instalasi Laravel dan dependensinya telah terinstall dengan lengkap.

* Selanjutnya pada project tersebut jalankan perintah:

```sh
php artisan serve
```

* Untuk tampilkan client Anda bisa menggunakan project React dengan API dan pastikan endpointnya diganti dengan project Laravel (__http://localhost:8000__) yang sedang kita buat sekarang.

## Database & Model

* Database yang kita gunakan tetap menggunakan database cdcol. Jika belum memiliki database cdcol maka buat database tersebut dan tabel dapat menjalankan perintah SQL [disini](https://github.com/NazirArifin/MEAN/blob/master/cdcol.sql)

* __Pastikan konfigurasi database di file _.env_ sudah benar__. Selanjutnya kita akan membuat model dari tabel __cds__ dengan mengetikkan perintah:

```sh
php artisan make:model Cd
```
* Karena di tabel cd tidak membutukan _timestamp_ maka Anda tambahkan kode berikut ini dalam class __Cd__ di file __app/Cd.php__:

```php
  ...
  public $timestamps = false;
  ...
```

## Routing

* Kita rancang routing yang akan digunakan dalam aplikasi kita yaitu:

| Path | Method | Fungsi |
|---|---|---|
| api/__cds__ | GET | Menampilkan data cd |
| api/__cds__ | POST | Menyimpan data cd baru
| api/__cds/{id}__ | GET | Melihat data cd dengan id {id} |
| api/__cds/{id}__ | PUT | Mengubah data cd dengan id {id} |
| api/__cds/{id}__ | DELETE | Menghapus data cd dengan id {id} |

* Method GET, POST, PUT, dan DELETE adalah bagian dari spesifikasi request HTTP dan Anda sebaiknya mengikuti filosofi ini dalam pembuatan REST API.

## Controller

* Kita akan membuat controller yang berisi beberapa method yang berhubungan dengan tindakan atas resource __cd__ yang kita punya dengan menggunakan perintah berikut:

```sh
php artisan make:controller CdsController --resource
```

* Selanjutnya kita akan mengerjakan REST API dengan mengedit file __app/Http/Controllers/CdsController.php__ dan __routes/api.php__.

### GET /cds

* Ubah route dengan menambah kode berikut:

```php
...
Route::get('cds', 'CdsController@index');
```

* Kemudian dibagian Controller dibagian __index__ diubah menjadi:

```php
    public function index(Request $request)
    {
      $limit = intval($request->input('_limit'));
      if ($limit === 0) return Cd::all();
      
      $page = intval($request->input('_page'));
      return Cd::limit($limit)->offset($page * $limit)->get();
    }
```

* Pada kode diatas kita ingin mengetahui parameter query __limit__ dan __page__ melalui argumen __$request->input(...)__.


### POST /cds

* Kita akan membaca data post yang dikirim di client dan kemudian disimpan ke database. Untuk itu kita menambah route dengan kode:

```php
...
Route::post('cds', 'CdsController@store');
```

* Dibagian Controller fungsi __store__ diubah menjadi:

```php
    public function store(Request $request)
    {
      extract($request->json()->all());
      $cd = new Cd;
      $cd->titel = $titel;
      $cd->interpret = $interpret;
      $cd->jahr = $jahr;
      
      $cd->save();
    }
```

### GET /cds/{id}

* Kita tambahkan route dengan menambahkan kode:

```php
...
Route::get('/cds/{id}', 'CdsController@show');
```

* Selanjutnya ubah file Controller di bagian __show__ menjadi seperti berikut:

```php
    public function show($id)
    {
      return Cd::find($id);
    }
```

### PUT /cds/{id}

* Kita tambahkan route dengan menambahkan kode:

```php
...
Route::put('/cds/{id}', 'CdsController@update');
```

* Selanjutnya ubah file Controller dibagian __update__ menjadi seperti berikut:

```php
    public function update(Request $request, $id)
    {
      extract($request->json()->all());
      
      $cd = Cd::find($id);
      $cd->titel = $titel;
      $cd->interpret = $interpret;
      $cd->jahr = $jahr;
      $cd->save();
    }
```

### DELETE /cds/{id}

* Kita tambahkan route dengan menambah kode:

```php
...
Route::delete('/cds/{id}', 'CdsController@destroy');
```

* Selanjutnya ubah file COntroller dibagian __destroy__ menjadi seperti berikut:

```php
    public function destroy($id)
    {
      $cd = Cd::find($id);
      $cd->delete();

      $response = new Response();
      return $response->setStatusCode(204, 'Deleted');
    }
```





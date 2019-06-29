# Laravel 5.5 (REST API)

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan framework Laravel 5.5 untuk membuat REST API dengan baik.

## Persiapan

* Install laravel menggunakan composer dengan perintah:

```sh
composer global require laravel/installer
```

* Selanjutnya buat project baru dapat dilakukan dengan perintah:

```sh
laravel new webapi
```

dimana "webapi" diganti dengan nama aplikasi yang akan Anda buat.

* Perintah-perintah diatas akan membuat folder baru dengan nama "webapi" yang berisi instalasi Laravel dan dependensinya telah terinstall dengan lengkap.

* Selanjutnya pada project tersebut jalankan perintah:

```sh
php artisan serve
```

* Untuk tampilkan client Anda bisa menggunakan project React dengan API dan pastikan endpointnya diganti dengan project Laravel (__http://localhost:8000__) yang sedang kita buat sekarang atau menggunakan [PostMan](https://www.getpostman.com/apps).

## Database & Model

* Database yang kita gunakan tetap menggunakan database cdcol. Jika belum memiliki database cdcol maka buat database tersebut dan tabel dapat menjalankan perintah SQL [disini](https://github.com/NazirArifin/MEAN/blob/master/cdcol.sql)

* __Pastikan konfigurasi database di file _.env_ sudah benar__. Selanjutnya kita akan membuat model dari tabel __cds__ dengan mengetikkan perintah:

```sh
php artisan make:model Cd -m
```
dimana tanda __-m__ menandakan kita juga akan meng _generate_ file migrasi.

* Selanjutnya edit file migrasi yang dengan nama __database/migrations/***********_create_cds_table.php__ yang mana tanda *** akan berisi tanggal pembuatan migrasi. Ubah isinya dengan kode berikut:

```php
...
    public function up()
    {
        Schema::create('cds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('interpret');
            $table->integer('jahr');
            // $table->timestamps();
        });
    }
...
```

* Jika sudah jalankan perintah:

```sh
php artisan migrate
```

* Ubah file model __app/Cd.php__ tambahkan property berikut:

```php
...
    public $timestamps = false;

    //
    protected $fillable = [
      'title', 'jahr', 'interpret'
    ];
...
```

* Bagian __timestamps__ menandakan tabel tidak membutuhkan kolom _created_at_ dan _updated_at_, sedangkan bagian __fillable__ menandakan kolom mana saja yang bisa diisi dan diupdate.

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

* Untuk membuat route api yang meng _cover_ semua method dapat dilakukan dengan menggunakan kode berikut di routes/api.php:

```php
Route::apiResource('cds', 'CdController');
```

## Controller

* Kita akan membuat controller yang berisi beberapa method yang berhubungan dengan tindakan atas resource __cd__ yang kita punya dengan menggunakan perintah berikut:

```sh
php artisan make:controller CdController --api
```

* Selanjutnya kita akan mengerjakan REST API dengan mengedit file __app/Http/Controllers/CdController.php__ dan __routes/api.php__.

### GET /cds

* CdController dibagian __index__ diubah menjadi:

```php
    public function index(Request $request)
    {
        return Cd::all();
    }
```

** Pada kode diatas jika kita ingin mengetahui parameter query yang dikirimkan oleh _client_ seperti misalnya __limit__ dan __page__ maka dapat dilakukan melalui argumen __$request->input(...)__.


### POST /cds

* Kita akan membaca data post yang dikirim di client dan kemudian disimpan ke database. Untuk itu kita menambah route dengan kode:

* Dibagian Controller fungsi __store__ diubah menjadi:

```php
    public function store(Request $request)
    {
        return Cd::create($request->json()->all());
    }
```

### GET /cds/{id}

* Selanjutnya ubah file Controller di bagian __show__ menjadi seperti berikut:

```php
    public function show($id)
    {
        return Cd::find($id);
    }
```

### PUT /cds/{id}

* Selanjutnya ubah file Controller dibagian __update__ menjadi seperti berikut:

```php
    public function update(Request $request, $id)
    {
        $cd = Cd::findOrFail($id);
        $cd->update($request->json()->all());

        return $cd;
    }
```

### DELETE /cds/{id}

* Selanjutnya ubah file COntroller dibagian __destroy__ menjadi seperti berikut:

```php
    public function destroy($id)
    {
        $cd = Cd::findOrFail($id);
        $cd->delete();

        return 204;
    }
```

# Authentifikasi dengan JWT

* Instalasi module jwt dengan perintah:

```sh
composer require tymon/jwt-auth "1.0.*"
```

* Jika instalasi sudah selesai dan berhasil selanjutnya mempublish config jwt dengan perintah:

```sh
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

* File __jwt.php__ dibuat difolder __config__. Kemudian generate secret key dengan perintah:

```sh
php artisan jwt:secret
```




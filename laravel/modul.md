# Laravel 5.5

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan framework Laravel dengan baik.

## Persiapan

* Pastikan komputer Anda sudah terinstall [Composer](https://getcomposer.org/), PHP 7 dan masukkan path PHP ke Windows environment.
*  Kita install Laravel secara global dengan dengan perintah:

```sh
composer global require "laravel/installer"
``` 

* Untuk membuat project baru dapat dilakukan dengan perintah:

```sh
laravel new website
```

* Perintah diatas akan membuat folder baru dengan nama "website" yang berisi instalasi Laravel dan dependensinya telah terinstall dengan lengkap.

* Pastikan Anda sudah memiliki database __cdcol__, jika belum Anda buat database tersebut dan tabel dapat menjalankan perintah SQL [disini](https://github.com/NazirArifin/MEAN/blob/master/cdcol.sql)

* Selanjutnya pada project tersebut jalankan perintah:

```sh
php artisan serve
```

* kemudian buka browser Anda dan akses url __http://localhost:8000__, dan jika berhasil Anda akan melihat tulisan Laravel beserta beberapa link dibawahnya.

## Environment dan Config

* Di root folder terdapat file __.env__ yang berisi beberapa field global yang dapat diakses oleh aplikasi nantinya seperti konfigurasi database dan sebagainya. Untuk mendapatkan nilai di file __.env__ anda dapat menggunakan fungsi ```env('FIELDNYA', NILAIDEFAULT)```. Contohnya adalah: ```env('DB_PORT', '3306')```.

* Untuk mendapatkan nilai di file-file konfigurasi di folder __config__ dapat menggunakan fungsi ```config('app.name')```, dan untuk mengeset nilai dapat dilakukan dengan fungsi ```config(['app.name' => 'WebsiteQ'])```

## Routing

* Semua file routing berada di folder __routes__ dan akan otomatis dimuat oleh Laravel. Sesuai kesepakatan jika Anda ingin menambahkan route untuk halaman web maka Anda dapat menambahkannya di file __routes/web.php__.

* Untuk informasi lengkap tentang routing dapat dilihat di [dokumentasi Laravel](https://laravel.com/docs/5.5/routing)

## Templating dengan Blade

* Salah satu keunggulan Blade adalah kita bisa membuat kerangka induk template yang dapat diturunkan atau dikembangkan ke template yang lebih kompleks.

* Kita buat kerangka template seperti berikut dan simpan di file __resources/views/main.blade.php__.

```html
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
	<meta charset="UTF-8">
	<title>CDCOL - @yield('title')</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		@section('header')
			<h1>@yield('title')</h1>
		@show

		<div class="content">
			@yield('content')
		</div>

		@section('footer')
			<em>@copy; 2017</em>
		@show
	</div>
</body>
</html>
```

* Selanjutnya kita akan membuat pengembangan dari template dasar diatas dengan membuat file __resources/views/front.blade.php__ dengan isi sebagai berikut:

```html
@extends('main')

@section('title', 'Beranda')

@section('header')
	@parent
	<hr>
	<p>
		<span class="badge badge-info">&gt;&gt; Halaman Beranda</span>
		<a href="/cd" class="float-right btn btn-sm btn-primary">Tambah Data</a>
	</p>
@endsection

@section('content')
	<table class="table">
		<thead>
			<tr>
				<th>NO</th>
				<th>JUDUL</th>
				<th>PENGARANG</th>
				<th>TAHUN</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>Titel</td>
				<td>Interpret</td>
				<td>Jahr</td>
				<td>
					<a href="" class="btn btn-info btn-sm">EDIT</a> <a href="" class="btn btn-sm btn-danger">HAPUS</a>
				</td>
			</tr>
		</tbody>
	</table>
@endsection

@section('footer')
	@parent
	<p><small>{{ date('d F Y') }}</small></p>
@endsection
```

* Perhatikan bahwa file diatas memanfaatkan induk template sebagai kerangka dan dikembangkan menjadi tampilan yang lebih kompleks. Kita memanfaatkan _directive_ seperti __@extends__, __@section__, dan __@parent__.

* Sekarang edit file __routes/web.php__ di bagian __view__ menjadi nama file yang telah kita buat:

```php
Route::get('/', function () {
  config(['app.locale' => 'id']);
  return view('front');
});
```

* Refresh/reload halaman web di browser Anda, maka Anda akan melihat tampilan tabel lengkap dengan header dan footer.

* __Informasi__: Beberapa framework Javascript juga menggunakan tanda {{ }} sehingga akan gagal jika menggunakan templating Blade, karena itu agar tanda {{ }} tidak diterjemahkan oleh Blade dan dibiarkan seperti itu maka Anda harus menambahkan karakter __@__ di depan {{ }} seperti berikut: ```Hello, @{{ name }}```

* Untuk informasi lengkap tentang templating Blade termasuk penggunakan _directives_ __@if__, __@elseif__, __@else__, __@switch__, __@for__, __@while__, __@include__ dsb dapat Anda lihat di [Blade Templating](https://laravel.com/docs/5.5/blade)

## Controller

* Dengan membuat controller kita dapat membuat beberapa kegiatan yang dikelompokkan dalam satu class dan tidak "mengotori" router yang sudah ada. Semua file controller terletak dalam folder __app/Http/Controllers__. 

* Untuk membuat controller baru kita bisa menggunakan perintah:

```sh
php artisan make:controller NamaController
```

* Jika Anda merencanakan sebuah controller yang dapat menangani fungsi CRUD pada sebuah resource maka Anda dapat menambahkan parameter __--resource__ pada perintah diatas. Kita akan membuat sebuah controller untuk fungsi CRUD di tabel cd dengan perintah:

```sh
php artisan make:controller CdController --resource
```

* Maka file __app/Http/Controller/CdController.php__ akan dibuat secara otomatis lengkap dengan beberapa method yang dapat digunakan untuk mengelola resource seperti untuk view, update, dan insert.

* Edit file __app/Http/Controller/CdController.php__ dibagian __index__ menjadi seperti berikut:

```php
  public function index()
  {
    config(['app.locale' => 'id']);
    return view('front');
  }
```

* Sekarang kita modifikasi routing kita menjadi seperti berikut:

```php
Route::get('/', 'CdController@index');
```

* Refresh/reload halaman web di browser Anda dan seharusnya tampilan tetap dan tidak muncul error apapun.

## Database

* Konfigurasi database terdapat di file __config/database.php__ dan sesuaikan dengan konfigurasi database Anda atau dengan mengubah nilai di file .env seperti berikut:

```sh
...
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cdcol
DB_USERNAME=root
DB_PASSWORD=
...
```

* Modifikasi file __CdController.php__ dengan menambahkan kode berikut dibagian atas:

```php
use Illuminate\Support\Facades\DB;
```

* Di method __index__ kita ubah dengan kode untuk melakukan query ke database seperti berikut:

```php
  public function index()
  {
    $cds = DB::select('select * from cds');
    config(['app.locale' => 'id']);
    return view('front', ['cds' => $cds]);
  }
```

* Selanjutnya kita modifikasi file template kita yaitu __resources/views/front.blade.php__ menjadi seperti berikut:

```html
...
          <tbody>
			@foreach ($cds as $cd)
			<tr>
				<td>{{ $loop->iteration }}</td>
				<td>{{ $cd->titel }}</td>
				<td>{{ $cd->interpret }}</td>
				<td>{{ $cd->jahr }}</td>
				<td>
					<a href="/cd/{{ $cd->id }}" class="btn btn-info btn-sm">EDIT</a> <a href="/cd/delete/{{ $cd->id }}" class="btn btn-sm btn-danger">HAPUS</a>
				</td>
			</tr>
			@endforeach
		</tbody>
...
```

* Refresh/reload browser Anda maka seharusnya sekarang tabel Anda sudah berisi data yang berasal dari database.

## Form Tambah/Edit Data

* Kita akan buat template untuk form tambah dan edit data cds dengan nama __resources/views/form.blade.php__ yang berdasarkan template utama seperti kode berikut:

```html
@extends('main')

@section('title', (isset($id) ? 'Edit' : 'Tambah') . ' CD')

@section('header')
	@parent
	<hr>
	<p>
		<span class="badge badge-info">&gt;&gt; Halaman {{ isset($id) ? 'Edit' : 'Tambah' }} CD</span>
		<a href="/" class="float-right btn btn-sm btn-danger">Batalkan</a>
	</p>
@endsection

@section('content')

@if ($errors->any())
<hr>
  <div class="alert alert-danger">
    <ul>
      @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
      @endforeach
    </ul>
  </div>
<hr>
@endif

<form method="POST" action="/cd">
  <div class="form-group row">
    <label for="titel" class="col-sm-2 col-form-label">Judul</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="titel" name="titel" @isset($titel) value="{{ $titel }}" @endisset placeholder="Judul">
    </div>
  </div>
  <div class="form-group row">
    <label for="interpret" class="col-sm-2 col-form-label">Pengarang</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="interpret" name="interpret" @isset($interpret) value="{{ $interpret }}" @endisset placeholder="Pengarang">
    </div>
  </div>
  <div class="form-group row">
    <label for="jahr" class="col-sm-2 col-form-label">Tahun</label>
    <div class="col-sm-2">
      <input type="text" class="form-control" id="jahr" name="jahr" @isset($jahr) value="{{ $jahr }}" @endisset placeholder="Tahun">
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-4 offset-sm-2">
      <button class="btn btn-primary" type="submit">SIMPAN DATA</button>
      <a href="/" class="btn btn-secondary">BATALKAN</a>
    </div>
  </div>
</form>

@endsection

@section('footer')
  @parent
  <p><small>{{ date('d F Y') }}</small></p>
@endsection
```

* Karena template diatas juga akan digunakan untuk mengedit data CD maka kita gunakan pengecekan kondisi dengan fungsi __isset()__ dan di template __@isset()__.

* Bagian ```{{ csrf_field() }}``` merupakan salah satu mekanisme Laravel untuk mencegah serangan CSRF, jadi kita harus memasukkan kode ini di semua form yang kita buat.

* Sekarang tambahkan route baru di file __routes/web.php__ seperti berikut:

```php
Route::get('/cd', 'CdController@create');
```

* Route diatas memanggil controller __CdController__ dan method __create__. Kita ubah file controller __app/Http/Controllers/CdController.php__ dibagian fungsi __create__ menjadi seperti berikut:

```php
...
    public function create()
    {
        return view('form');
    }
...
```

* Refresh/reload browser Anda dan klik tombol __Tambah Data__ di pojok kanan atas untuk melihat form yang baru saja kita buat.

## Validasi Data Form

* Form diatas jika kita tekan tombol __SIMPAN DATA__ akan mengarah ke POST /cd, karena itu kita tambahkan route baru di file __routes/web.php__ seperti berikut:

```php
Route::post('/cd', 'CdController@store');
```

* Selanjutkan kita akan menggunakan validasi dari Laravel dengan mengedit file __app/Http/Controllers/CdController.php__ dibagian fungsi __store__ menjadi seperti berikut:

```php
public function store(Request $request)
    {
        $validateData = $request->validate([
            'titel'     => 'required|min:4|max:120',
            'interpret' => 'required|min:4|max:60',
            'jahr'      => 'required|numeric|'
        ], [
            'titel.required'     => 'Judul harus diisi',
            'interpret.required' => 'Pengarang harus diisi',
            'jahr.required'      => 'Tahun harus diisi',
            'jahr.numeric'       => 'Tahun harus angka'
        ]);

        // jika sukses validasi, kita gunakan model sebentar lagi
        
    }
```

* __required__ artinya harus terisi, __min__ adalah panjang minimal, __numeric__ adalah data harus berupa angka. Untuk informasi lengkap tentang validasi di Laravel dapat Anda lihat [disini](https://laravel.com/docs/5.5/validation#available-validation-rules)

* Coba Anda kosongkan semua input dan tekan tombol __SIMPAN DATA__ maka akan muncul pesan sesuai dengan teks yang kita ketikkan ketika error input terjadi.

## Model untuk ORM

* Laravel memiliki _ActiveRecord_ sederhana yang membuat kita bisa membuat model dari sebuah tabel. Kita akan membuat sebuah model menggunakan perintah seperti berikut:

```sh
php artisan make:model Cd
```

* Sebuah file __Cds.php__ akan terbuat otomatis di folder __app__. Kesepakatan umum bahwa nama prural (jamak) class harus sama dengan nama tabel sehingga jika kita membuat nama class __Cd__ maka akan mengacu ke tabel __cds__. Jika Anda ingin mengeset nama tabel secara manual dapat lihat di [dokumensi Laravel](https://laravel.com/docs/5.5/eloquent).

* Karena tabel cds kita tidak membutuhkan _timestamp_ atau waktu insert dan update maka kita harus men_disable_ properti _timestamp_ di model seperti berikut:

```php
...
class Cd extends Model
{
    public $timestamps = false;
}
```

* Setelah itu kita kembali ke file controller yang kita tinggal tadi, kita tambahkan kode berikut dibagian atas:

```php
use App\Cd;
```

* Kemudian di fungsi __store__ kita tambahkan kode berikut:

```php
...
        // jika sukses validasi
        $cd = new Cd;
        $cd->titel = $request->titel;
        $cd->interpret = $request->interpret;
        $cd->jahr = $request->jahr;

        // simpan ke database
        $cd->save();
        // redirect
        return redirect('/');
...
```

* Sekarang coba isi form dengan benar maka data akan tersimpan ke database sekaligus di redirect kembali ke halaman utama.

## Edit Data

* Kita akan menggunakan template yang sama untuk mengedit data. Kita tambahkan route berikut ini sehingga jika Anda mengklik tombol __EDIT__ akan muncul tampilan form edit:

```php
Route::get('/cd/{id}', 'CdController@edit');
```

* Selanjutnya kita ubah controller __app/Http/Controllers/CdController.php__ dibagian fungsi __edit($id)__ menjadi seperti berikut ini:

```php
...
    public function edit($id)
    {
        $cd = Cd::find($id);
        return view('form', $cd->toArray());
    }
...
```

* Sekarang tekan tombol __EDIT__ di halaman utama maka akan muncul form edit yang berasal dari template yang sudah kita buat sebelumnya.

---

## Tugas Akhir Untuk Ujian Praktikum

* __Lanjutkan pembuatan aplikasi hingga dapat mengedit, dan menghapus data__. Pastikan Anda menggunakan _method_ __update()__ dan __destroy__ yang ada di controller. Tambahkan route sesuai dengan template yang sudah ada.

* Ujian praktikum dilaksanakan hari rabu seminggu setelah UAS, Anda harus mendemonstrasikan pembuatan aplikasi diatas dari awal sampai akhir (__View, Insert, Update, Delete__) __menggunakan Eloquent ORM (Model)__. __OPEN BOOK__, __OPEN INTERNET__, __bisa mengikuti langkah-langkah di modul ini__.

* Tiap sesi terdiri dari 8-10 mahasiswa dengan waktu pengerjaan 1 jam.

* Semoga sukses!
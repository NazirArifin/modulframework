# Simpel Book API dengan Lumen

Tujuan Pembelajaran: Mahasiswa dapat mengenal dan menggunakan mini framework Lumen dari Laravel dengan baik

## Persiapan

* Install Lumen dengan perintah
```sh
composer create-project --prefer-dist laravel/lumen namaproject
```

* Edit file .env sesuaikan dengan kebutuhan, namun pastikan bagian database yang diawali dengan prefix __DB__ terisi dengan benar agar bisa terkoneksi dengan database

* Kita menggunakan tabel book dari modul sebelumnya

* Untuk menjalankan server, ketikkan perintah berikut:
```sh
php -S localhost:8181 -t public
```

* Umumnya API diakses menggunakan aplikasi _client_ (front end), namun untuk ujicoba tanpa harus membuat aplikasi _client_ terlebih dahulu maka bisa digunakan aplikasi [INSOMNIA](https://insomnia.rest/download)

* Setelah diinstall buka aplikasi INSOMNIA dan buat Request ke alamat: [http://localhost:8181](http://localhost:8181)

## Routing

* Buat routing di file __routes/web.php__ dengan group book sebagai kerangka target url untuk API yang akan dibuat seperti berikut:

```php
$router->group(['prefix' => 'book'], function() use($router) {
  $router->get('/', 'BookController@index');
  $router->get('/{id}', 'BookController@show');
  $router->post('/', 'BookController@store');
  $router->put('/{id}', 'BookController@edit');
  $router->delete('/{id}', 'BookController@destroy');
});
```

* Sekarang kita buat __BookController.php__ secara manual di folder __app/Http/Controllers__ dimana disitu sudah ada file __Controller.php__ dan __ExampleController.php__.

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller {
  public function index() {
    return response()->json(DB::table('books')->paginate(2));
  }

  public function show($id) {
    return \response()->json(DB::table('books')->find($id));
  }

  public function store(Request $request) {
    $this->validate($request, [
      'title' => 'required|max:120|min:3',
      'author' => 'required|max:80|min:2',
      'year' => 'required|digits:4|integer'
    ]);
    DB::table('books')->insert(\request()->only(['title', 'author', 'year']));
    return \response()->json(['message' => 'success']);
  }

  public function edit(Request $request, $id) {
    $this->validate($request, [
      'title' => 'required|max:120|min:3',
      'author' => 'required|max:80|min:2',
      'year' => 'required|digits:4|integer'
    ]);
    DB::table('books')->where('id', $id)->update(\request()->only(['title', 'author', 'year']));
    return \response()->json(['message' => 'success']);
  }

  public function destroy($id) {
    DB::table('books')->delete($id);
    return \response()->json(['message' => 'success']);
  }
}
```

## Request dengan INSOMNIA

* GET ```http://localhost:8181/book``` : data semua buku perpage (dengan pagination)
* GET ```http://localhost:8181/book/1``` : data buku dengan id 1
* POST ```http://localhost:8181/book``` : menyimpan data buku baru
* PUT ```http://localhost:8181/book/4``` : mengupdate data buku dengan id 4
* DELETE ```http://localhost:8181/book/3``` : menghapus data buku dengan id 3

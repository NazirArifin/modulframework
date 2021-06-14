# CRUD Laravel 8

* Edit home.blade.php tambah link ke /cd
* Buat migration books (id, title, author, year)
  - php artisan make:migration create_books_table
```sh
php artisan migrate
```
* Buat model
```sh
php artisan make:model Book
```
* Update model
```php
public $timestamps = false;
protected $fillable = ['title', 'author', 'year'];
```
* Buat controller
```sh
php artisan make:controller PhotoController --resource
```
* Edit route
```php
  Route::prefix('/book')->group(function() {
    Route::get('/', [BookController::class, 'index'])->name('book');
  });
```
* Buat main template (main.blade.php)
```php
<!DOCTYPE html>
<html lang="id">
<head>
	<meta charset="UTF-8">
	<title>CDCOL - @yield('title')</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
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
			<em><small>&copy; 2021</small></em>
		@show
	</div>
</body>
</html>
```
* Buat view (book/show.blade.php)
```php
@extends('main')

@section('title', 'Beranda')

@section('header')
	@parent
	<hr>
	<p>
		<a href="/book/add" class="float-right btn btn-sm btn-primary mb-3">Tambah Data</a>
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

* Ubah BookController fungsi index
```php
return \view('book.show');
```

* Buat form tambah tambah data (book/form.blade.php)
```php
@extends('main')

@section('title', (isset($id) ? 'Edit' : 'Tambah') . ' Buku')

@section('header')
	@parent
	<hr>
@endsection

@section('content')

<form method="POST" action="/book">
  @csrf
  <div class="form-group row">
    <label for="title" class="col-sm-2 col-form-label">Judul</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="title" name="title" value="" minlength="3" maxlength="120" placeholder="Judul">
    </div>
  </div>
  <div class="form-group row">
    <label for="author" class="col-sm-2 col-form-label">Pengarang</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="author" name="author" value="" minlength="2" maxlength="80" placeholder="Pengarang">
    </div>
  </div>
  <div class="form-group row">
    <label for="year" class="col-sm-2 col-form-label">Tahun</label>
    <div class="col-sm-2">
      <input type="text" class="form-control" id="year" name="year" value="" minlength="4" maxlength="4" placeholder="Tahun">
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-4 offset-sm-2">
      <button class="btn btn-primary" type="submit">SIMPAN DATA</button>
      <a href="/book" class="btn btn-secondary">BATALKAN</a>
    </div>
  </div>
</form>

@endsection

@section('footer')
  @parent
  <p><small>{{ date('d F Y') }}</small></p>
@endsection
```

* Edit router dalam prefix 'book'
```php
Route::get('/book/add', [BookController::class, 'create']);
```

* Edit BookController di fungsi create
* Update router dalam prefix 'book'
```php
Route::post('/', [BookController::class, 'store']);
```
* Edit BookController di fungsi store
```php
$validated = $request->validate([
  'title' => 'required|max:120|min:3',
  'author' => 'required|max:80|min:2',
  'year' => 'required|digits:4|integer'
]);

// save
$book = new Book();
$data = $request->only($book->getFillable());
$book->fill($data)->save();

return \redirect()->route('book');
```

* Untuk menampilkan error, edit form.blade.php
```php
  @if ($errors->any())
  <div class="alert alert-danger">
    <ul>
      @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
      @endforeach
    </ul>
  </div>
  <hr>
  @endif
```

* Menampilkan data di database (book/) edit BookController fungsi index
```php
return \view('book.show', [
  'books' => Book::all()->toArray()
]);
```

* Edit view (show.blade.php)

```php
<tbody>
  @foreach ($books as $book)
  <tr>
    <td>{{ $loop->index + 1 }}</td>
    <td>{{ $book['title'] }}</td>
    <td>{{ $book['author'] }}</td>
    <td>{{ $book['year'] }}</td>
    <td>
      <a href="/book/edit/{{ $book['id'] }}" class="btn btn-info btn-sm">EDIT</a> 
      <a href="/book/delete/{{ $book['id'] }}" class="btn btn-sm btn-danger">HAPUS</a>
    </td>
  </tr>
  @endforeach
</tbody>
```

* Edit router
```php
Route::get('/edit/{id}', [BookController::class, 'edit']);
```

* Edit BookController di fungsi edit
```php
public function edit($id)
{
    return \view('book.form', Book::findOrFail($id)->toArray());
}
```

* Update form agar value diset otomatis atau kosong sekaligus input hidden id
```php
<form method="POST" action="/book{{ isset($id) ? '/' . $id : '' }}">
  @csrf
  @if (isset($id))
    @method('PUT')
  @endif

#.....
value="{{ $year ?? '' }}"
```

* Edit route, tambah untuk update
```php
Route::put('/{id}', [BookController::class, 'update']);
```

* Edit BookController di fungsi __update__
```php
$validated = $request->validate([
  'title' => 'required|max:120|min:3',
  'author' => 'required|max:80|min:2',
  'year' => 'required|digits:4|integer'
]);

// update
$book = Book::find($id);
$data = $request->only($book->getFillable());
$book->title = $data['title'];
$book->author = $data['author'];
$book->year = $data['year'];
$book->save();

return \redirect()->route('book');
```

* Untuk hapus, edit route
```php
Route::get('/delete/{id}', [BookController::class, 'destroy']);
```

* Edit BookController di fungsi destroy
```php
Book::destroy($id);
return \redirect()->route('book');
```




# CRUD Vue3 dengan Backend Laravel 8

* Tambahkan link di home.blade.php ke /book/api
* Tambahkan route dalam prefix /book
```php
Route::get('/api', [BookController::class, 'indexApi']);
```
* Buat file views/book/showApi.blade.php
```php
@extends('main')

@section('title', 'Beranda')

@section('header')
  @parent
  <hr>
  <div class="row">
    <div class="col">
      <input type="text" name="query" class="form-control" placeholder="Cari">
    </div>
    <div class="col">
      <a href="" class="float-right btn btn-primary mb-3">Tambah Data</a>
    </div>
  </div>
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
        <td>JUDUL</td>
        <td>PENGARANG</td>
        <td>TAHUN</td>
        <td>
          <a href="" class="btn btn-info btn-sm">EDIT</a> 
          <a href="" class="btn btn-sm btn-danger">HAPUS</a>
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

* Edit BookController, buat fungsi:
```php
    public function indexApi() 
    {
      return \view('book.showApi');
    }
```

* Download [vue global](https://unpkg.com/vue@3.1.1/dist/vue.global.prod.js), simpan sebagai: __public/js/vue.js__

* Edit view/main.blade.php tambahkan script src
```php
<script src="{{ URL::asset('js/vue.js') }}"></script>
..
<-- Tambahkan #app di container -->
<div class="container" id="app">
```

* Edit showApi.blade.php di bagian footer
```html
<script>
const App = {
  data() {
    return {
      query: '',
      currentPage: 0,
      books: [],
      links: [],
    }
  }
}

Vue.createApp(App).mount('#app')
</script>
```

* Tambahkan v-model di input pencarian

* Buat controller BookApiController
```sh
php artisan make:controller BookApiController --api
```

* Edit showApi.blade.php, buat method loadBook dan otomatis dipanggil saat component di buat:
```js
const App = {
  ...
  methods: {
    loadBook() {
      // load dengan ajax
    }
  },
  mounted() {
    this.loadBook();
  }
}
```

* Edit routes/api.php, tambahkan di atas:

```php
Route::prefix('/book')->group(function() {
  Route::get('/', [BookApiController::class, 'index']);
});
```

* Edit fungsi loadBook di showApi.blade.php
```js
    async loadBook(url) {
      if ( ! url) {
        url = '/api/book';
        if (this.query.length > 0) {
          url += `?query=${this.query}`;
        }
      }
      const result = await fetch(url);
      const data = await result.json();

      this.currentPage = data.current_page;
      this.books = data.data;
      this.links = data.links;
    }
```

* Edit tablenya agar datanya muncul
```php
      <tr v-for="(book, index) in books" :key="index">
        <td>@{{ index + 1 }}</td>
        <td>@{{ book.title }}</td>
        <td>@{{ book.author }}</td>
        <td>@{{ book.year }}</td>
        <td>
          <a href="" class="btn btn-info btn-sm">EDIT</a> 
          <a href="" class="btn btn-sm btn-danger">HAPUS</a>
        </td>
      </tr>
```

* Untuk pagination:
```html
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: ! link.url || parseInt(link.label) == currentPage }" v-for="(link, i) in links" :key="i">
        <a class="page-link" href="#" v-html="link.label" v-on:click.prevent="loadBook(link.url)" :disabled=" ! link.url"></a>
      </li>
    </ul>
  </nav>
```

* Untuk pencarian tambah event keyup di search
```html
@keyup="loadBook()"
```

* Wrap tag table dan nav pagination dengan div, lalu buat div yang bersebelahan dengan isi:

```html
  <div>
    ... tabel
    ... nav
  </div>
  <div>
    <form role="form">
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Judul</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" name="title" minlength="3" maxlength="120" placeholder="Judul">
        </div>
      </div>
      <div class="form-group row">
        <label for="author" class="col-sm-2 col-form-label">Pengarang</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="author" name="author" minlength="2" maxlength="80" placeholder="Pengarang">
        </div>
      </div>
      <div class="form-group row">
        <label for="year" class="col-sm-2 col-form-label">Tahun</label>
        <div class="col-sm-2">
          <input type="text" class="form-control" id="year" name="year" minlength="4" maxlength="4" placeholder="Tahun">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-4 offset-sm-2">
          <button class="btn btn-primary" type="submit">SIMPAN DATA</button>
          <a href="#" class="btn btn-secondary">BATALKAN</a>
        </div>
      </div>
    </form>
  </div>
```

* Buat variabel isEditing dengan nilai false sehingga form tersembunyi dengan v-if

* Buat variabel untuk v-model
```js
book: {
  id: 0, title: '', author: '', year: ''
}
```

* Beri v-model pada masing-masing input

* Fungsi setEdit dan cancelEdit
```js
setEdit(i) {
  this.isEditing = true;
  if (typeof(i) != 'undefined') {
    this.book = {...this.books[i]};
  }
},
cancelEdit() {
  this.isEditing = false;
  this.book.id = 0;
  this.book.title = this.book.author = this.book.year = '';
},
```

* Fungsi saveBook, ditrigger dari form v-on:submit.prevent
```js
async saveBook() {
  const url = '/api/book' + (this.book.id > 0 ? `/${this.book.id}` : ''); 
  const response = await fetch(url, {
    method: this.book.id > 0 ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: new URLSearchParams(this.book)
  });
  const data = await response.json();
  if (data.hasOwnProperty('errors')) {
    this.errors = data.errors;
  } else {
    this.cancelEdit();
    this.loadBook();
  }
},
```

* Tambah route api
```php
Route::post('/', [BookApiController::class, 'store']);
```

* Edit file BookApiController di fungsi store
```php
      $validated = $request->validate([
        'title' => 'required|max:120|min:3',
        'author' => 'required|max:80|min:2',
        'year' => 'required|digits:4|integer'
      ]);
      
      $book = new Book();
      $data = $request->only($book->getFillable());
      $book->fill($data)->save();
      return \response()->json(['message' => 'Success']);
```

* Menampilkan error di showApi.blade.php
```php
@section('header')
  @parent
  <hr>
  <div class="row" v-if=" ! isEditing">
    <div class="col">
      <input type="text" v-model="query" @keyup="loadBook()" name="query" class="form-control" placeholder="Cari">
    </div>
    <div class="col">
      <a href="" class="float-right btn btn-primary mb-3" v-on:click.prevent="setEdit()">Tambah Data</a>
    </div>
  </div>
  <div v-if="Object.keys(errors).length > 0">
    <div class="alert alert-danger">
      <ul>
        <li v-for="(e, i) in errors" :key="i">@{{ e[0] }}</li>
      </ul>
    </div>
    <hr>
  </div>
@endsection
```

* Ubah link button untuk edit, panggil fungsi setEdit(i)

* Tambah route baru:
```php
Route::put('/{id}', [BookApiController::class, 'update']);
```

* Ubah Controller di fungsi update
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
      return \response()->json(['message' => 'Success']);
```

* Untuk hapus, tambah method js:
```js
    async deleteBook(i) {
      await fetch(`/api/book/${i}`, { method: 'DELETE' });
      this.loadBook();
    }
```

* Tambah di route:
```php
Route::delete('/{id}', [BookApiController::class, 'destroy']);
```

* Edit BookApiCOntroller di method destroy:
```php
      Book::destroy($id);
      return \response()->json(['message' => 'Success']);
```


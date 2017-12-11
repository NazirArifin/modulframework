# CodeIgniter

Tujuan pembelajaran: Mahasiswa mengenal dan dapat menggunakan framework CodeIgniter dengan baik.

## Persiapan

* Unduh CodeIgniter [disini](https://github.com/bcit-ci/CodeIgniter/archive/3.1.6.zip)
* Ekstrak di folder manapun jika Anda menggunakan PHP minimal versi 5.6 atau di __xampp/htdocs__ (_root_)
* Jika Anda menggunakan minimal PHP 5.6 ketikkan perintah berikut:

```sh
php -S localhost:8080
```
* Lalu buka browser Anda dan akses url: ```http://localhost:8080```.
* Jika Anda tidak menggunakan PHP 5.6 buka browser Anda dan akses url: ```http://localhost```. (_Pastikan Apache dan MySQL telah dijalankan_)
* Jika berhasil maka Anda akan melihat tampilan _Welcome to CodeIgniter_.

## Struktur Folder

* Secara umum struktur folder yang digunakan adalah seperti berikut:

```
application
  ...
  config
  controllers
  ...
  models
  ...
  views
system
user_guide
```

* Sebagian besar waktu Anda akan mengedit file yang ada di dalam folder application seperti controller, models, dan views.

## Controller

* Controller adalah sebuah _class_ yang membantu dalam urusan melimpahkan tugas ke _class_ lain. Dia menjadi pusat dari semua _request_ dan seperti lem dari sebuah aplikasi.
* Contohnya jika kita mengakses URL ```http://localhost/berita/terbaru/10``` berarti kita berasumsi bahwa kita memanggil controller ```berita``` dengan method ```terbaru``` dan parameter yang dimasukkan adalah ```10```.
* Format umumnya adalah: ```http://localhost/[controller-class]/[controller-method]/[arguments]```
* Sekarang kita buat controller baru untuk menangani url seperti ```berita/terbaru/10``` dengan membuat file __application/controllers/Berita.php__ dengan isi seperti berikut:

```php
<?php
class Berita extends CI_Controller {
  public function index($page = 'home') {
    
  }
  public function terbaru($params = 0) {
    
  }
}
```

* Pada kode diatas kita membuat _method_ __index()__ yang menerima sebuah parameter opsional berisi nama dari halaman yang akan dimuat serta _method_ __terbaru()__. 
* File templates (halaman html) jika mengikuti url diatas biasanya akan diletakkan di folder __application/views/berita/__.

### Routing

* Routing berguna untuk memetakan url yang digunakan dalam aplikasi. Sekarang kita buka file __application/config/routes.php__ dan tambahkan kode berikut:

```php
...
// routes untuk berita
$route['berita'] = 'berita';
$route['berita/terbaru'] = 'berita/terbaru';
...
```

* Routing diatas memetakan url ```http://localhost/berita``` ke class controller ```Berita``` dengan pola ```$route[urlnya] = classController```.

* Sekarang coba akses halaman ```http://localhost/berita``` dan ```http://localhost/berita/terbaru```. Seharusnya Anda melihat tampilan kosong di browser Anda.

* Untuk bentuk routing yang lebih lengkap dapat Anda lihat dan pelajari di [Routing CogeIgniter](https://codeigniter.com/userguide3/general/routing.html)

## Views

* View adalah template html yang digunakan hanya untuk menampilkan data. Kita akan mencoba membuat _header_ dan _footer_ untuk tampilan aplikasi. Buat folder __templates__ di folder __application/views__ dengan nama file ```application/views/templates/header.php``` dan ```application/views/templates/footer.php```.

* Isi dari file __application/views/templates/header.php__ adalah:

```html
<html>
  <head>
    <title>Aplikasi CodeIgniter</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
  </head>
  <body>
   <div class="container">
     <h1><?php echo $title; ?></h1>
```

* Sedangkan isi dari file __application/views/templates/footer.php__ adalah:

```html
      <em>&copy; 2017</em>
    </div>
  </body>
</html>
```

* Buat file baru __application/views/berita/home.php__ dengan isi seperti berikut:

```html
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
	  <td>1.</td>
	  <td>Judul</td>
	  <td>Pengarang</td>
	  <td>Tahun</td>
	  <td>
	    <a href="" class="btn btn-info">EDIT</a> <a href="" class="btn btn-danger">HAPUS</a>
	  </td>
	</tr>
  </tbody>
</table>
```

* Sekarang kita ubah file controller __Berita.php__ di bagian _method_ __index()__ menjadi seperti berikut:

```php
...
public function index($page = 'home') {
 $data['title'] = 'CDCOL'; // lewatkan string ke view
 $this->load->view('templates/header', $data);
 $this->load->view('berita/' . $page, $data);
 $this->load->view('templates/footer');
}
...
```

* Jika Anda mengakses url ```http://localhost:8080/berita``` maka seharusnya Anda dapat melihat tampilan tabel template di file ```application/views/berita/home.php```.

## Database

* Untuk dapat menggunakan database maka kita harus mengkonfigurasi file __application/config/database.php__ dibagian:

```php
...
$db['default'] = array(
  'dsn'	=> '',
  'hostname' => 'localhost',
  'username' => 'root',
  'password' => '',
  'database' => 'cdcol',
  'dbdriver' => 'mysqli',
...
```

* Bagian yang harus diubah adalah __username__, __password__, __database__, dan __dbdriver__. Karena kita menggunakan database MySQL maka dbdriver tetap dibiarkan dengan nilai __mysqli__.

* Pastikan Anda memiliki database __cdcol__, jika belum Anda dapat mengunduh di [SQL CDCOL](https://github.com/NazirArifin/MEAN/blob/master/cdcol.sql)

* Untuk menggunakan database, Anda harus meload fungsi database di controller seperti berikut: 

```php
$this->load->database();
```

* Perintah diatas tidak otomatis melakukan koneksi ke database, jika Anda ingin otomatis konek di setiap halaman maka Anda dapat mengubah file __application/config/autoload.php__ dan tambahkan kata database pada array library. Pada modul ini kita akan melakukan koneksi secara manual dari controller.

## Model

* Model adalah _class_ PHP yang digunakan untuk bekerja dengan database. Contohnya adalah Anda bisa memiliki class yang berisi fungsi untuk insert, update, dan read data dari tabel tertentu. Untuk memuat model dari controller menggunakan cara seperti berikut:

```php
$this->load->model('berita');
```

* Model disimpan didalam folder __aplication/models__ dengan nama ```class Model_name extends CI_Model``` dimana nama class __harus__ memiliki huruf pertama kapital dan huruf berikutnya huruf kecil. Contohnya adalah ```class Berita_model extends CI_Model``` dan disimpan ke file dengan nama __application/models/Berita_model.php__.

* Buat file __application/models/Berita_model.php__ dan isi dengan kode berikut:

```php
<?php
class Berita_model extends CI_Model {
  public function __construct() {
    parent::__construct();
    // Your own constructor code
  }

  public function get() {
  	$query = $this->db->query("SELECT * FROM cds");
  	return $query->result();
  }
}
```

* Sekarang modifikasi _method_ __index__ di file __application/controllers/Berita.php__ menjadi seperti berikut:

```php
...
  public function index($page = 'home') {
  	$this->load->database(); // load database
  	$this->load->model('berita_model', '', true); // load model, koneksikan manual
  	$data['berita'] = $this->berita_model->get();

    $data['title'] = 'CDCOL';
    $this->load->view('templates/header', $data);
    $this->load->view('berita/' . $page, $data);
    $this->load->view('templates/footer');
  }
...
```

* Selanjutnya adalah mengubah view __application/views/berita/home.php__ sehingga dapat menampilkan data yang berasal dari model menjadi seperti berikut:

```html
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
	 <?php foreach ($berita as $k => $b): ?>
	 <tr>
	   <td><?php echo $k + 1 ?>.</td>
	   <td><?php echo $b->titel ?></td>
	   <td><?php echo $b->interpret ?></td>
	   <td><?php echo $b->jahr ?></td>
	   <td>
	     <a href="" class="btn btn-info">EDIT</a> <a href="" class="btn btn-danger">HAPUS</a>
		</td>
	  </tr>
	  <?php endforeach ?>
  </tbody>
</table>
```

* Sekarang seharusnya jika Anda mengakses ```http://localhost:8080/berita``` maka Anda dapat melihat data yang berasal dari database yang Anda miliki







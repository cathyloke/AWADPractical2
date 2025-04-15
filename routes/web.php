<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/register/admin', [RegisterController::class, 'showAdminRegisterForm']);
Route::post('/register/admin', [RegisterController::class, 'createAdmin']);

Route::get('/register/author', [RegisterController::class, 'showAuthorRegisterForm']);
Route::post('/register/author', [RegisterController::class, 'createAuthor']);

Route::get('/login/admin', [LoginController::class, 'showAdminLoginForm']);
Route::post('/login/admin', [LoginController::class, 'adminLogin']);

Route::get('/login/author', [LoginController::class, 'showAuthorLoginForm']);
Route::post('/login/author', [LoginController::class, 'authorLogin']);


Route::group(['middleware' => 'auth:author'], function () {
    Route::view('/author', 'author');
});

Route::group(['middleware' => 'auth:admin'], function () {
    Route::view('/admin', 'admin');
});

Route::get('logout', [LoginController::class, 'logout']);
Route::post('/author', [LoginController::class, 'authorLogin']);




Route::get('/posts/show', [PostController::class, 'show']);
Route::get('/posts/index', [PostController::class, 'index']);
Route::get('/posts/create', [PostController::class, 'showCreateForm']);
Route::post('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::get('/posts/udpate/{id}', [PostController::class, 'showUpdateForm']);
Route::post('/posts/udpate/{id}', [PostController::class, 'update'])->name('posts.update');
Route::get('/posts/delete/{id}', [PostController::class, 'destroy'])->name('posts.delete');

// Route::get('/posts/index', [PostController::class, 'index'])->middleware('can:isAuthor')->name('post.index');
// Route::get('/posts/create', [PostController::class, 'create'])->middleware('can:isAuthor')->name('post.create');
// Route::get('/posts/edit', [PostController::class, 'edit'])->middleware('can:isAuthor')->name('post.edit');
// Route::get('/posts/delete', [PostController::class, 'delete'])->middleware('can:isAdmin')->name('post.delete');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

<?php
use App\Http\Controllers\Api\Members\MembersController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/admin/register', [AdminController::class, 'registerForm'])->name('register');
Route::post('/admin/register', [AdminController::class, 'register'])->name('register.post');

// Login
Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('login');
Route::post('/admin/check', [AdminController::class, 'login'])->name('login.post');


Route::middleware(['auth:admin','admin.permission:Access Dashboard'])->group(function () {

    Route::get('/admin/dashboard', [DashboardController::class, 'login'])->name('dashboard.index');

});
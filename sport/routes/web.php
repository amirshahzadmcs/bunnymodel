<?php
use App\Http\Controllers\Api\Members\MembersController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;


// Login
Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('login');
Route::post('/admin/check', [AdminController::class, 'login'])->name('login.post');


Route::middleware(['auth:admin','admin.permission:Access Dashboard'])->group(function () {

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

});

Route::middleware(['auth:admin','admin.permission:Access Dashboard'])->group(function () {

    Route::get('/admin/user/register', [AdminController::class, 'registerForm'])->name('admin.register');
    Route::post('/admin/user/register', [AdminController::class, 'register'])->name('register.post');
    Route::get('/admin/user/list', [AdminController::class, 'list'])->name('admin.user.list');
    Route::delete('/admin/user/remove/{admin}', [AdminController::class, 'removeAdmin'])->name('admin.user.remove');

    Route::get('/admin/user/edit/{admin}', [AdminController::class, 'editAdmin'])->name('admin.user.edit');
    Route::put('/admin/user/update/{admin}', [AdminController::class, 'updateAdmin'])->name('admin.user.update');

    Route::get('admin/roles', [RoleController::class, 'index'])->name('admin.roles.index'); 
    Route::get('admin/roles/create', [RoleController::class, 'create'])->name('admin.roles.create'); 
    Route::post('admin/roles', [RoleController::class, 'store'])->name('admin.roles.store');      
    Route::get('admin/roles/{role}/edit', [RoleController::class, 'edit'])->name('admin.roles.edit');
    Route::put('admin/roles/{role}', [RoleController::class, 'update'])->name('admin.roles.update');  
    Route::delete('admin/roles/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy'); 

    Route::get('admin/permissions', [PermissionController::class, 'index'])->name('admin.permissions.index'); 
    Route::get('admin/permissions/create', [PermissionController::class, 'create'])->name('admin.permissions.create'); 
    Route::post('admin/permissions', [PermissionController::class, 'store'])->name('admin.permissions.store');      
    Route::get('admin/permissions/{permission}/edit', [PermissionController::class, 'edit'])->name('admin.permissions.edit');
    Route::put('admin/permissions/{permission}', [PermissionController::class, 'update'])->name('admin.permissions.update');  
    Route::delete('admin/permissions/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy'); 


});
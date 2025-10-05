<?php
use App\Http\Controllers\Api\Members\MembersController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\BunnyModels;


// Login
Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('login');
Route::post('/admin/check', [AdminController::class, 'login'])->name('login.post');


Route::middleware(['auth:admin','admin.permission:Access Dashboard'])->group(function () {

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

});

// Roles & Permissions
Route::middleware(['auth:admin', 'admin.permission:Manage roles permissions'])->group(function () {

    // Roles
    Route::prefix('admin/roles')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('admin.roles.index');
        Route::get('/create', [RoleController::class, 'create'])->name('admin.roles.create');
        Route::post('/', [RoleController::class, 'store'])->name('admin.roles.store');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('admin.roles.edit');
        Route::put('/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');
    });

    // Permissions
    Route::prefix('admin/permissions')->group(function () {
        Route::get('/', [PermissionController::class, 'index'])->name('admin.permissions.index');
        Route::get('/create', [PermissionController::class, 'create'])->name('admin.permissions.create');
        Route::post('/', [PermissionController::class, 'store'])->name('admin.permissions.store');
        Route::get('/{permission}/edit', [PermissionController::class, 'edit'])->name('admin.permissions.edit');
        Route::put('/{permission}', [PermissionController::class, 'update'])->name('admin.permissions.update');
        Route::delete('/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy');
    });
});

// Users
Route::middleware(['auth:admin', 'admin.permission:Manage Users'])->group(function () {
    Route::prefix('admin/user')->group(function () {
        Route::get('/register', [AdminController::class, 'registerForm'])->name('admin.register');
        Route::post('/register', [AdminController::class, 'register'])->name('register.post');
        Route::get('/list', [AdminController::class, 'list'])->name('admin.user.list');
        Route::get('/edit/{admin}', [AdminController::class, 'editAdmin'])->name('admin.user.edit');
        Route::put('/update/{admin}', [AdminController::class, 'updateAdmin'])->name('admin.user.update');
        Route::delete('/remove/{admin}', [AdminController::class, 'removeAdmin'])->name('admin.user.remove');
    });
});

// Pages
Route::middleware(['auth:admin', 'admin.permission:Manage pages'])->group(function () {
    Route::prefix('admin/pages')->group(function () {
        Route::get('/', [PageController::class, 'index'])->name('admin.pages.index');
        Route::get('/create', [PageController::class, 'create'])->name('admin.pages.create');
        Route::post('/', [PageController::class, 'store'])->name('admin.pages.store');
        Route::get('/{page}/update', [PageController::class, 'update'])->name('admin.pages.update');
        Route::put('/{page}', [PageController::class, 'updateStore'])->name('admin.pages.updateStore');
        Route::delete('/{page}', [PageController::class, 'destroy'])->name('admin.pages.destroy');
    });
});

// Models
Route::middleware(['auth:admin', 'admin.permission:Manage members'])->group(function () {
    Route::prefix('admin/models')->group(function () {
        Route::get('/', [BunnyModels::class, 'index'])->name('admin.models.index');
        Route::get('/create', [BunnyModels::class, 'create'])->name('admin.models.create');
        Route::post('/', [BunnyModels::class, 'store'])->name('admin.models.store');
        Route::get('/{model}/update', [BunnyModels::class, 'update'])->name('admin.models.update');
        Route::put('/{model}', [BunnyModels::class, 'updateStore'])->name('admin.models.updateStore');
        Route::delete('/{model}', [BunnyModels::class, 'destroy'])->name('admin.models.destroy');
        Route::get('/export', [BunnyModels::class, 'export'])->name('admin.models.export');
        Route::post('/import', [BunnyModels::class, 'import'])->name('admin.models.import');
    });
});

// Members
Route::middleware(['auth:admin', 'admin.permission:Manage models'])->group(function () {
    Route::prefix('admin/members')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('admin.members.index');
        Route::get('/{member}/update', [MemberController::class, 'update'])->name('admin.members.update');
        Route::put('/{member}', [MemberController::class, 'updateStore'])->name('admin.members.updateStore');
    });
});
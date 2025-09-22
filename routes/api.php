<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BunnyModels\BunnyModelController;
use App\Http\Controllers\Api\Members\MembersController;


// Public routes for Models
Route::get('/models', [BunnyModelController::class, 'index']);
// Get single model by username
Route::get('/model/{username}', [BunnyModelController::class, 'model']);

// Public routes for members
Route::post('member/register', [MembersController::class, 'register']);
Route::post('member/login', [MembersController::class, 'login']);

// Protected routes for members
Route::middleware('auth:sanctum')->prefix('member')->group(function () {

    Route::get('/profile/{username}', [MembersController::class, 'profile'])->name('profile');
    Route::post('/logout', [MembersController::class, 'logout']);
    Route::get('/is-logged-in', [AuthController::class, 'isLoggedIn']);
    Route::post('/update-password', [MembersController::class, 'updatePassword']);
});

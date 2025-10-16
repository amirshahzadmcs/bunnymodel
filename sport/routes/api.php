<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BunnyModels\BunnyModelController;
use App\Http\Controllers\Api\Members\MembersController;
use App\Http\Controllers\Api\Page\PageController;
use App\Http\Controllers\API\Post\PostController;

Route::fallback(function () {
    return response()->json([
        'status' => 'error',
        'message' => 'The requested API endpoint does not exist.'
    ], 404);
});

// Public routes for Models
Route::get('/models', [BunnyModelController::class, 'index']);
// Get single model by username
Route::get('/model/{username}', [BunnyModelController::class, 'model']);


// Public routes for members
Route::post('member/register', [MembersController::class, 'register']);
Route::post('member/login', [MembersController::class, 'login']);
// Member Password reset routes (public)
Route::post('member/forgot-password', [MembersController::class, 'sendOtp']);
Route::post('member/verify-otp', [MembersController::class, 'verifyOtp']);
Route::post('member/reset-password', [MembersController::class, 'resetPasswordWithOtp']);
Route::get('member/verify-email/{token}', [MembersController::class, 'verifyEmail']);

Route::get('page/{slug}', [PageController::class, 'showBySlug']);

// Check if the currently authenticated member is logged in
// - Protected route: requires authentication via 'checkApiAuth' middleware
// - Returns 401 JSON response if the user is not logged in
// Protected routes for members
Route::middleware('MemberAuth')->prefix('member')->group(function () {

    Route::get('/profile/{username}', [MembersController::class, 'profile'])->name('profile');
    Route::put('/profile/update', [MembersController::class, 'updateProfile']); // update profile
    Route::get('/is-logged-in', [MembersController::class, 'profile'])->name('profile');
    Route::post('/logout', [MembersController::class, 'logout']);
    Route::post('/update-password', [MembersController::class, 'updatePassword']);

});

// Post routes (public)
Route::get('/posts', [PostController::class, 'index']);      // Paginated posts
Route::get('/post/{slug}', [PostController::class, 'showBySlug']); // Single post
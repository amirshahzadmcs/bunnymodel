<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BunnyModels\BunnyModelController;

Route::get('/models', [BunnyModelController::class, 'index']);

// Get single model by username
Route::get('/model/{username}', [BunnyModelController::class, 'model']);
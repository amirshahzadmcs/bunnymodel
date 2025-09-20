<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BunnyModels\BunnyModelController;

Route::prefix('models')->group(function () {
    Route::get('/', [BunnyModelController::class, 'index']);           // Get all models
    Route::get('/{username}', [BunnyModelController::class, 'model']);       // Get single model
});
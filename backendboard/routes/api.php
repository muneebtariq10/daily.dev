<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/checkCredentials', [AuthController::class, 'checkCredentials']);
Route::post('/auth/register', [AuthController::class, 'register']);
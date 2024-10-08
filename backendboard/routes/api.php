<?php

use App\Events\PostBroadcastEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\UserController;
use App\Models\Post;
use Illuminate\Support\Facades\Broadcast;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/update/profile', [UserController::class, 'updateProfileImage']);

    Route::apiResources([
        "post" => PostController::class,
        "comment" => CommentController::class
    ]);
});

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/checkCredentials', [AuthController::class, 'checkCredentials']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::post('/post/channel', function() {
    $post = Post::select("*")->with("user")->orderByDesc("id")->first();
    // PostEvent::dispatch($post);
    PostBroadcastEvent::dispatch($post);
    return response()->json(["message" => "Data sent to client"]);
});

Broadcast::routes(["middleware" => ["auth:sanctum"]]);
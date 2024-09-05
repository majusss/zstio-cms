<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'api'], function () {
    Route::get('/', function () {
        return response()->json(['message' => 'API is running',]);
    });
    Route::get('/messages', [\App\Http\Controllers\MessageController::class, 'show']);
});

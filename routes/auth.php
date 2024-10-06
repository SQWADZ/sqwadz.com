<?php

use App\Http\Controllers\GamesController;
use App\Http\Controllers\LoginController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

Route::get('/games', [GamesController::class, 'index'])->name('games');
Route::get('/faq')->name('faq');
Route::get('/privacy-policy')->name('privacy-policy');
Route::get('/terms-of-service')->name('terms-of-service');
Route::get("/games/{game}", [GamesController::class, 'show'])->name("game");

Route::middleware('guest')->group(function () {
    Route::get('/sign-in', fn () => Inertia::render('SignIn'))->name('sign-in');

    Route::get('/auth/redirect/{provider}', [LoginController::class, 'redirect'])->name('auth.redirect');
    Route::get('/auth/callback/{provider}', [LoginController::class, 'callback'])->name('auth.callback');
});

Route::middleware('auth')->group(function () {
    Route::get('/logout', fn () => Auth::logout())->name('logout');
});

<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/games', function() {
        return Inertia::render('Games');
    })->name('games');
    Route::get('/faq')->name('faq');
    Route::get('/privacy-policy')->name('privacy-policy');
    Route::get('/terms-of-service')->name('terms-of-service');
    Route::get('/sign-in')->name('sign-in');
});

Route::middleware('auth')->group(function () {

});

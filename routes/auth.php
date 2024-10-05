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
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::middleware('guest')->group(function () {
    Route::get('/games', function() {
        return Inertia::render('Games');
    })->name('games');
    Route::get('/faq')->name('faq');
    Route::get('/privacy-policy')->name('privacy-policy');
    Route::get('/terms-of-service')->name('terms-of-service');
    Route::get('/sign-in', function () {
        return Inertia::render('SignIn');
    })->name('sign-in');

    Route::get('/auth/discord/redirect', function () {
        return Socialite::driver('discord')->setScopes(['identify'])->redirect();
    })->name('discord.redirect');
    Route::get('/auth/discord/callback', function () {
        $discordUser = Socialite::driver('discord')->user();

        // Todo: Login user

        return redirect("/");
    });
});

Route::middleware('auth')->group(function () {

});

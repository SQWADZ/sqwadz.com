<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

Route::get('/games', fn () => Inertia::render('Games'))->name('games');
Route::get('/faq')->name('faq');
Route::get('/privacy-policy')->name('privacy-policy');
Route::get('/terms-of-service')->name('terms-of-service');

Route::middleware('guest')->group(function () {
    Route::get('/sign-in', function () {
        return Inertia::render('SignIn');
    })->name('sign-in');

    Route::get('/auth/discord/redirect', function () {
        return Socialite::driver('discord')->setScopes(['identify'])->redirect();
    })->name('discord.redirect');

    Route::get('/auth/discord/callback', function () {
        $discordUser = Socialite::driver('discord')->user();

        $existingUser = User::query()->where('provider_id', 'discord|' . $discordUser->getId())->first();

        if ($existingUser) {
            Auth::login($existingUser);

            return redirect("/");
        }

        $user = User::create([
            'provider_id' => "discord|" . $discordUser->getId(),
            'username' => $discordUser->getName(),
            'avatar' => $discordUser->getAvatar(),
        ]);

        Auth::login($user);

        return redirect("/");
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/logout', fn () => Auth::logout())->name('logout');
});

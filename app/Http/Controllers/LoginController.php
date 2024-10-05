<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    private array $providers = ['discord', 'twitch', 'battlenet'];

    public function redirect(Request $request, string $provider)
    {
        if (!in_array($provider, $this->providers)) {
            return redirect("/");
        }

        switch ($provider) {
            case 'discord':
                return Socialite::driver('discord')->setScopes(['identify'])->redirect();
        }

        return redirect("/");
    }

    public function callback(Request $request, string $provider): RedirectResponse
    {
        if (!in_array($provider, $this->providers)) {
            return redirect("/");
        }

        try {
            $user = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return redirect("/");
        }

        $existingUser = User::query()->where('provider_id', $provider . "|" . $user->getId())->first();

        if ($existingUser) {
            Auth::login($existingUser, true);

            return redirect("/");
        }

        $newUser = User::create([
            'provider_id' => "discord|" . $user->getId(),
            'username' => $user->getName(),
            'avatar' => $user->getAvatar(),
        ]);

        Auth::login($newUser, true);

        return redirect("/");
    }
}

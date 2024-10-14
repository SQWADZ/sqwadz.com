<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel("room.{gamePath}.{roomId}", function(User $user, string $gamePath, string $roomId) {
    // TODO: check for room space

    return [
        'provider_id' => $user->provider_id,
        'username' => $user->username,
        'avatar' => $user->avatar,
        'is_verified_creator' => $user->is_verified_creator
    ];
});

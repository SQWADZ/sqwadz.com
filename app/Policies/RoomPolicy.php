<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Redis;

class RoomPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    function remove(User $user, string $gamePath, string $roomId)
    {
        $roomCreatorId = Redis::hget("rooms:$gamePath:$roomId", "creatorId");

        return $user->provider_id === $roomCreatorId;
    }
}

<?php

namespace App\Http\Controllers;

use App\Events\RoomCreated;
use App\Jobs\RemoveRoom;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;

class RoomsController extends Controller
{

    public function show(string $gamePath, string $roomId): Response {
        $room = Redis::hscan("rooms:{$gamePath}:{$roomId}", 0)[1];

        return Inertia::render('Room/Room', [
            'room' => $room,
            "gamePath" => $gamePath,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        global $validated, $game, $user, $time, $newRoom;

        $validated = $request->validate([
            "activity" => "required|max:50",
            "slots" => "required|integer|min:2",
            "duration" => "required|integer|min:1",
            "password" => "nullable|string"
        ]);

        $game = $request->game;
        $user = $request->user();
        $time = time();

        $transaction = Redis::transaction(function ($redis) {
            global $game, $validated, $user, $time, $newRoom;

            $newRoom = [
                "id" => $time,
                "activity" => $validated["activity"],
                "slots" => $validated["slots"],
                "duration" => $validated["duration"],
                "password" => (bool) $validated["password"],
                "creatorName" => $user->username,
                "creatorId" => $user->provider_id,
                "creatorVerified" => false,
                "membersCount" => 0,
                "createdAt" => $time,
                "expiresAt" => $time + ($validated['duration'] * 60 * 60)
            ];

            $redis->zadd("rooms:{$game}", $time, $time);
            $redis->hMSet("rooms:{$game}:{$time}", $newRoom);
        });

        RoomCreated::dispatch($game, $newRoom);
        RemoveRoom::dispatch($game, $time)->delay(now()->addHour());

        return redirect("/games/$game/$time");
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $game, string $roomId): RedirectResponse
    {

        if (!Gate::allows("remove-room", [$game, $roomId])) {
            abort(403);
        }

        Redis::del("rooms:{$game}:{$roomId}");
        Redis::zrem("rooms:{$game}", $roomId);

        return redirect("/games/$game");
    }
}

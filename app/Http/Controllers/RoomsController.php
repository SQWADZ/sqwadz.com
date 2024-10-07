<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades;
use Redis;

class RoomsController extends Controller
{

    public function show(string $game, string $roomId): Response {
        return Inertia::render('Room/Room');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        global $validated;
        global $game;
        global $user;

        $validated = $request->validate([
            "activity" => "required|max:50",
            "slots" => "required|integer|min:2",
            "duration" => "required|integer|min:1",
            "password" => "nullable|string"
        ]);

        $game = $request->game;
        $user = $request->user();

        $transaction = Facades\Redis::transaction(function ($redis) {
            global $game, $validated, $user;

            $time = time();

            $redis->sadd("rooms:{$game}", $time);
            $redis->hMSet("rooms:{$game}:{$time}", [
                "id" => $time,
                "activity" => $validated["activity"],
                "slots" => $validated["slots"],
                "duration" => $validated["duration"],
                "password" => (bool) $validated["password"],
                "creatorName" => $user->username,
                "creatorVerified" => false,
                "membersCount" => 0,
                "createdAt" => $time,
            ]);
        });

        // TODO: check if transaction is ok

        return redirect("/games/{$game}");
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
    public function destroy(string $id)
    {
        //
    }
}

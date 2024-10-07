<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;
use Inertia\Response;

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
        $validated = $request->validate([
            "activity" => "required|max:50",
            "slots" => "required|integer|min:2",
            "duration" => "required|integer|min:1",
            "password" => "nullable|string"
        ]);

        $game = $request->game;
        $time = time();

        Redis::sadd("rooms:{$game}", $time);
        Redis::hSet("rooms:{$game}:{$time}", "id", $time, "activity", $validated["activity"], "slots", $validated["slots"], "duration", $validated["duration"], "password", $validated["password"]);

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

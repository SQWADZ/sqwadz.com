<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;
use Inertia\Response;

class GamesController extends Controller
{
    public function index(): Response
    {
        $games = DB::table('games')->where('status', 'enabled')->get();

        return Inertia::render('Games', [
            'games' => $games->toArray()
        ]);
    }

    public function show(string $game): Response
    {
        $targetGame = DB::table('games')->select('name', 'path')->where('path', $game)->first();
        $rooms = [];

        $roomKeys = Redis::sscan("rooms:{$targetGame->path}", 0)[1];

        foreach ($roomKeys as $roomKey) {
            $rooms[] = Redis::hscan("rooms:{$targetGame->path}:{$roomKey}", 0)[1];
        }

        return Inertia::render('Game/Game', [
            'rooms' => $rooms,
            'game' => [
                "name" => $targetGame->name,
                "path" => $targetGame->path,
            ]
        ]);
    }
}

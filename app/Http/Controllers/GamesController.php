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
        $rooms = [];
        $targetGame = DB::table('games')->select('name', 'path')->where('path', $game)->first();


        return Inertia::render('Game', [
            'rooms' => $rooms,
            'game' => [
                "name" => $targetGame->name,
                "path" => $targetGame->path,
            ]
        ]);
    }
}

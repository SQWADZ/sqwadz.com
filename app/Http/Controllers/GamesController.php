<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class GamesController extends Controller
{
    public function show(): Response {
        $games = DB::table('games')->where('status', 'enabled')->get();

        return Inertia::render('Games', [
            'games' => $games->toArray()
        ]);
    }
}

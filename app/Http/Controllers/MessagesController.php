<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Message;
use App\Sender;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function __invoke(Request $request, string $gamePath, string $roomId): JsonResponse
    {
        $user = $request->user();
        $messageContents = $request->get("message");

        // Todo: check if room contains user
        // Todo: Rate limiter

        $message = new Message(new Sender($user->avatar, $user->username), $messageContents, floor(microtime(true) * 1000));

        MessageSent::dispatch($gamePath, $roomId, $message);

        return response()->json(["success" => true]);
    }
}

<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

Broadcast::channel("room.{gamePath}.{roomId}", function(User $user, string $gamePath, string $roomId) {
    $REVERB_APP_ID = env("REVERB_APP_ID");
    $REVERB_HOST = env("REVERB_HOST");
    $REVERB_PORT = env("REVERB_PORT");
    $REVERB_SCHEME = env("REVERB_SCHEME");
    $REVERB_APP_KEY = env("REVERB_APP_KEY");
    $REVERB_APP_SECRET = env("REVERB_APP_SECRET");

    $timestamp = time();

    $url = "$REVERB_SCHEME://$REVERB_HOST:$REVERB_PORT/apps/$REVERB_APP_ID";
    $endpoint = "/channels/presence-room.$gamePath.$roomId";
    $parameters = "auth_key=$REVERB_APP_KEY&auth_timestamp=$timestamp&auth_version=1.0&info=user_count";

    $stringToSign = "GET\n/apps/$REVERB_APP_ID" . "$endpoint\n$parameters";
    $authSignature = hash_hmac("sha256", $stringToSign, $REVERB_APP_SECRET);

    $authUrl = "?$parameters&auth_signature=$authSignature";

    $response = Http::get($url . $endpoint . $authUrl);
    $data = json_decode($response->body());

    $slots = Redis::hget("rooms:$gamePath:$roomId", "slots");

    if ($data->occupied && $data->user_count >= $slots) return false;

    return [
        'provider_id' => $user->provider_id,
        'username' => $user->username,
        'avatar' => $user->avatar,
        'is_verified_creator' => $user->is_verified_creator
    ];
});

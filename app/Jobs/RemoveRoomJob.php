<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;

class RemoveRoomJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public string $game, public string $roomId)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $game = $this->game;
        $roomId = $this->roomId;

        try {
            Redis::del("rooms:{$game}:{$roomId}");
            Redis::zrem("rooms:{$game}", $roomId);
        } catch (\Throwable $exception) {
            error_log($exception->getMessage());
        }
    }
}

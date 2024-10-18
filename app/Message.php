<?php

namespace App;

class Message
{
    /**
     * Create a new class instance.
     */
    public function __construct(public Sender $sender, public string $contents, public int $sentAt)
    {
        //
    }
}

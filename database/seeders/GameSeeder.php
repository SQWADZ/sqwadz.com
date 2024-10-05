<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('games')->insert([
            [
                "path" => "anything",
                "name" => "Anything",
                "image" => "/images/games/anything.webp",
                "color" => "#feca57",
                "status" => "enabled"
            ],
            [
                "path" => "aoc",
                "name" => "Ashes of Creation",
                "image" => "/images/games/aoc.webp",
                "color" => "#f1c40f",
                "status" => "disabled"
            ],
            [
                "path" => "cod",
                "name" => "Call of Duty",
                "image" => "/images/games/cod.webp",
                "color" => "#5f27cd",
                "status" => "enabled"
            ],
            [
                "path" => "d2r",
                "name" => "Diablo II: Resurrected",
                "image" => "/images/games/d2r.webp",
                "color" => "#d63031",
                "status" => "enabled"
            ],
            [
                "path" => "d4",
                "name" => "Diablo IV",
                "image" => "/images/games/d4.webp",
                "color" => "#d63031",
                "status" => "enabled"
            ],
            [
                "path" => "dayz",
                "name" => "DayZ",
                "image" => "/images/games/dayz.webp",
                "color" => "#202020",
                "status" => "enabled"
            ],
            [
                "path" => "enshrouded",
                "name" => "Enshrouded",
                "image" => "/images/games/enshrouded.webp",
                "color" => "#81ecec",
                "status" => "enabled"
            ],
            [
                "path" => "general",
                "name" => "General",
                "image" => "/images/games/general.webp",
                "color" => "#feca57",
                "status" => "disabled"
            ],
            [
                "path" => "helldivers2",
                "name" => "Helldivers 2",
                "image" => "/images/games/helldivers2.webp",
                "color" => "#273c75",
                "status" => "enabled"
            ],
            [
                "path" => "last-epoch",
                "name" => "Last Epoch",
                "image" => "/images/games/last-epoch.webp",
                "color" => "#593FA3",
                "status" => "enabled"
            ],
            [
                "path" => "lightnofire",
                "name" => "Light No Fire",
                "image" => "/images/games/lightnofire.webp",
                "color" => "#593FA3",
                "status" => "disabled"
            ],
            [
                "path" => "minecraft",
                "name" => "Minecraft",
                "image" => "/images/games/minecraft.webp",
                "color" => "#4cd137",
                "status" => "enabled"
            ],
            [
                "path" => "norestforthewicked",
                "name" => "No Rest for the Wicked",
                "image" => "/images/games/norestforthewicked.webp",
                "color" => "#4A0404",
                "status" => "disabled"
            ],
            [
                "path" => "palworld",
                "name" => "Palworld",
                "image" => "/images/games/palworld.webp",
                "color" => "#F88379",
                "status" => "disabled"
            ],
            [
                "path" => "pax-dei",
                "name" => "Pax Dei",
                "image" => "/images/games/paxdei.webp",
                "color" => "#dfe6e9",
                "status" => "disabled"
            ],
            [
                "path" => "poe",
                "name" => "Path of Exile",
                "image" => "/images/games/poe.webp",
                "color" => "#2ecc71",
                "status" => "enabled"
            ],
            [
                "path" => "poe2",
                "name" => "Path of Exile 2",
                "image" => "/images/games/poe2.webp",
                "color" => "#26c281 ",
                "status" => "disabled"
            ],
            [
                "path" => "rdr2",
                "name" => "Red Dead Redemption 2",
                "image" => "/images/games/rdr2.webp",
                "color" => "#ee0000",
                "status" => "disabled"
            ],
            [
                "path" => "rust",
                "name" => "Rust",
                "image" => "/images/games/rust.webp",
                "color" => "#e67e22",
                "status" => "enabled"
            ],
            [
                "path" => "soulmask",
                "name" => "Soulmask",
                "image" => "/images/games/soulmask.webp",
                "color" => "#DE3163",
                "status" => "disabled"
            ],
            [
                "path" => "the-finals",
                "name" => "The Finals",
                "image" => "/images/games/thefinals.webp",
                "color" => "#a86add",
                "status" => "enabled"
            ],
            [
                "path" => "v-rising",
                "name" => "V Rising",
                "image" => "/images/games/vrising.webp",
                "color" => "#82a8c4",
                "status" => "disabled"
            ]
        ]);
    }
}

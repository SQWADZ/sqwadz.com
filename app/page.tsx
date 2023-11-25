import GameCard from '@/components/game-card';

export default function Home() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 p-4">
      <div className="flex flex-col gap-0">
        <p className="text-xl">Games</p>
        <p className="sm text-muted-foreground">Select a game to find a group in</p>
      </div>

      <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-3">
        <GameCard
          name="Diablo IV"
          image="https://cdn.discordapp.com/attachments/964230870468816939/1177954651295993986/Diablo_IV_Logo.png?ex=657462c2&is=6561edc2&hm=b2f8143e5f314eb26f1487eaab05055abafae1b258fe440916f0ee80cd3b942a&"
        />
        <GameCard
          name="Path of Exile"
          image="https://cdn.discordapp.com/attachments/964230870468816939/1177958365176004669/normalheader.png?ex=65746637&is=6561f137&hm=bafc6f35cb8ecab66cb58c2b0df9f94d889307ec928a0126caa98042d400b923&"
        />
        <GameCard
          name="Rust"
          image="https://cdn.discordapp.com/attachments/964230870468816939/1177959314271502446/Rust-Game-Logo.png?ex=65746719&is=6561f219&hm=d51cf3744d19519aaa6b3b1063dd475ff8fba5a3bac0529bd7742311c3a96b6d&"
        />
      </div>
    </main>
  );
}

import GameCard from '@/components/game-card';
import games from '@/data/games.json';

export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-8 p-4">
      <div className="flex flex-col gap-0">
        <p className="text-xl">Games</p>
        <p className="sm text-muted-foreground">Select a game to find a group in</p>
      </div>

      <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.name} name={game.name} image={game.image} />
        ))}
      </div>
    </div>
  );
}

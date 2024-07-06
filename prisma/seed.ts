import { PrismaClient } from '@prisma/client';
import games from '../data/games.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.game.createMany({
    data: games,
  });
}

main()
  .then(() => {
    console.log('Data seeded...');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

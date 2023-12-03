import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  name: string;
  image: string;
  path: string;
}

const GameCard: React.FC<Props> = ({ name, image, path }) => {
  const gamePageUrl = `/games/${encodeURIComponent(path)}`;

  return (
    <Link href={gamePageUrl}>
      <div className="group flex cursor-pointer items-center justify-start gap-8">
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="rounded-lg bg-transparent transition-colors duration-150 group-hover:bg-destructive">
            <Image
              src={image}
              width={400}
              height={150}
              alt={name}
              className="h-[150px] rounded-lg duration-150 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:transition-all"
            />
          </div>
          <p className="line-clamp-1">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;

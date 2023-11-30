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
      <div className="flex cursor-pointer items-center justify-start gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src={image} width={400} height={150} alt={name} className="h-[150px] rounded-lg" />
          <p>{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;

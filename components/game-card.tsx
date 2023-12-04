// https://codepen.io/Axiol/pen/QWLRMVr - twitch like hover effect

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  name: string;
  image: string;
  path: string;
  color: string;
}

const GameCard: React.FC<Props> = ({ name, image, path, color }) => {
  const gamePageUrl = `/games/${encodeURIComponent(path)}`;

  console.log(color);

  return (
    <Link href={gamePageUrl}>
      <div className="group flex cursor-pointer items-center justify-start gap-8">
        <div className="relative flex flex-col items-start justify-center gap-2">
          <div
            className="relative z-10 origin-bottom-left bg-transparent transition-all duration-150"
            style={{ backgroundColor: color }}
          >
            <div
              style={{ backgroundColor: color }}
              className="absolute left-0 top-0 h-[8px] w-[8px] origin-top-left -rotate-45 scale-0 transition-all duration-100 group-hover:scale-100"
            />
            <Image
              src={image}
              width={400}
              height={150}
              alt={name}
              style={{ backgroundColor: color }}
              className="relative z-10 h-[150px] duration-150 group-hover:-translate-y-[6px] group-hover:translate-x-[6px] group-hover:transition-all"
            />
            <div
              style={{ backgroundColor: color }}
              className="absolute bottom-0 right-0 h-[8px] w-[8px] origin-bottom-right rotate-45 scale-0 transition-all duration-100 group-hover:z-0 group-hover:scale-100"
            />
          </div>
          <p className="line-clamp-1">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;

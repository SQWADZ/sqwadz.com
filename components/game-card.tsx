// https://codepen.io/Axiol/pen/QWLRMVr - twitch like hover effect

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
        <div className="relative flex flex-col items-start justify-center gap-2">
          <div className="relative z-10 origin-bottom-left bg-transparent transition-all duration-150 before:absolute before:left-0 before:top-0 before:h-[8px] before:w-[8px] before:origin-top-left before:-rotate-45 before:scale-0 before:bg-primary before:transition-all before:duration-100 before:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[8px] after:w-[8px] after:origin-bottom-right after:rotate-45 after:scale-0 after:bg-primary after:transition-all after:duration-100 after:content-[''] group-hover:bg-primary group-hover:before:scale-100 group-hover:after:z-0 group-hover:after:scale-100">
            <Image
              src={image}
              width={400}
              height={150}
              alt={name}
              className="relative z-10 h-[150px] duration-150 group-hover:-translate-y-[6px] group-hover:translate-x-[6px] group-hover:transition-all"
            />
          </div>
          <p className="line-clamp-1">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;

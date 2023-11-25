import React from 'react';
import Image from 'next/image';

interface Props {
  name: string;
  image: string;
}

const GameCard: React.FC<Props> = ({ name, image }) => {
  return (
    <div className="flex items-center justify-start gap-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src={image} width={512} height={256} alt="Diablo-4" className="h-[160px] rounded-lg" />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default GameCard;

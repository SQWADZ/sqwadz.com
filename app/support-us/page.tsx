import Container from '@/components/container';
import React from 'react';
import Link from 'next/link';

const SupportUsPage: React.FC = () => {
  return (
    <Container className="flex flex-col items-center justify-center p-10 gap-8">
      <div className="text-center">
        <p className="text-xl text-gray-600">Enjoy what we made? Consider supporting us!</p>
      </div>
      <Link href="https://ko-fi.com/sqwadz/donate" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1">
        Support on Ko-fi
      </Link>
    </Container>
  );
};

export default SupportUsPage;

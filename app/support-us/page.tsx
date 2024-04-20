import Container from '@/components/container';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

const SupportUsPage: React.FC = () => {
  return (
    <Container className="flex flex-col items-center justify-center gap-8 p-10">
      <div className="text-center">
        <p className="text-xl">Enjoy what we made? Consider supporting us!</p>
      </div>
      <Link
        href="https://ko-fi.com/sqwadz/donate"
        target="_blank"
        rel="noopener noreferrer"
        className="w-60 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-red-600"
      >
        <div className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faMugHot} fixedWidth size="lg" />
          <p>Support on Ko-fi</p>
        </div>
      </Link>
    </Container>
  );
};

export default SupportUsPage;

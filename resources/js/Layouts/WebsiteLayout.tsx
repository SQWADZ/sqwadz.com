import React from 'react';
import { PageProps } from '@/types';
import Header from '@/Components/header/Header';
import Footer from '@/Components/Footer';

const WebsiteLayout: React.FC<PageProps<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;

import React from 'react';
import Link from 'next/link';
import HeaderLink from '@/components/header-link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="m-auto flex w-full max-w-7xl items-center justify-center justify-between bg-background py-4 text-center text-muted-foreground">
      <p>© {currentYear} SQWADZ.com, All rights reserved.</p>
      <div className="flex gap-4">
        <HeaderLink path="/privacy-policy" label="Privacy Policy" />
        <HeaderLink path="/terms-of-service" label="Terms of Service" />
      </div>
    </footer>
  );
};

export default Footer;

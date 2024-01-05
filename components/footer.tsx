import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full items-center justify-center bg-background py-4 text-center text-muted-foreground">
      <p>© {currentYear} SQWADZ.com, All rights reserved.</p>
    </footer>
  );
};

export default Footer;

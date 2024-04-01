import React from 'react';
import Link from 'next/link';
import HeaderLink from '@/components/header-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col items-center justify-between border-t bg-background p-4 text-center text-muted-foreground">
      <div className="flex w-full max-w-7xl flex-col">
        <div className="flex w-full max-w-7xl flex-col items-start justify-between gap-10 py-10 md:flex-row">
          <Link href="/" className="self-center">
            <p className="logo text-4xl text-foreground">SQWADZ</p>
          </Link>
          <div className="flex flex-col items-baseline justify-start gap-4">
            <p className="text-sm">Terms & Privacy</p>
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-col items-baseline gap-4">
            <p className="text-sm">Socials</p>
            <Link
              href="https://twitter.com/sqwadzplatform"
              target="_blank"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <FontAwesomeIcon icon={faTwitter} fixedWidth />
              <p>Twitter</p>
            </Link>
            <Link
              href="https://discord.sqwadz.com"
              target="_blank"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <FontAwesomeIcon icon={faDiscord} fixedWidth />
              <p>Discord</p>
            </Link>
          </div>
        </div>
        <p className="mt-8 self-start text-sm">© {currentYear} SQWADZ.com, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

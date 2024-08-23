'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faComment, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useModal } from '@/components/modals-provider';
import FeedbackModal from '@/components/feedback-modal';
import KofiLink from '@/components/kofi-link';

const MobileNavMenu: React.FC<{ session: Session | null }> = ({ session }) => {
  const [open, setOpen] = React.useState(false);
  const modal = useModal();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faBars} fixedWidth size="xl" />
      </Button>
      <SheetContent>
        <SheetTitle></SheetTitle>
        <div className="flex flex-col gap-4">
          <p className="self-start text-sm text-muted-foreground">Account</p>
          {session?.user && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={session.user?.image || undefined} />
                <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="truncate text-sm">{session?.user.name}</p>
            </div>
          )}
          {session?.user ? (
            <div className="flex flex-col gap-2">
              <Button variant="secondary" className="flex items-center justify-start gap-2">
                <FontAwesomeIcon icon={faGear} fixedWidth />
                <p>Settings</p>
              </Button>
              <Button
                variant="secondary"
                className="flex items-center justify-start gap-2"
                onClick={() => {
                  setOpen(false);
                  modal.open({ title: 'Give feedback', children: <FeedbackModal /> });
                }}
              >
                <FontAwesomeIcon icon={faComment} fixedWidth />
                <p>Give feedback</p>
              </Button>
              <Button
                variant="secondary"
                className="flex items-center justify-start gap-2"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth />
                <p>Sign out</p>
              </Button>
            </div>
          ) : (
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              <Button className="w-full">Sign in</Button>
            </Link>
          )}
          <Separator />
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Links</p>
            <Link href="/games" onClick={() => setOpen(false)}>
              <Button variant="outline" className="flex w-full justify-start">
                Games
              </Button>
            </Link>
            <Link href="/faq" onClick={() => setOpen(false)}>
              <Button variant="outline" className="flex w-full justify-start">
                FAQ
              </Button>
            </Link>
            <KofiLink />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavMenu;

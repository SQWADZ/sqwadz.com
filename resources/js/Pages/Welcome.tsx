import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import LogoSvg from '@/Components/LogoSvg';

export default function Welcome({ auth }: PageProps) {
  return (
    <Container className="flex flex-1 flex-col-reverse items-center justify-center gap-12 md:flex-row">
      <Head title="SQWADZ" />
      <div className="flex flex-col items-center justify-between gap-8 md:flex-[0.3] md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-center text-4xl md:text-left">
            Finding groups has <span className="font-bold text-primary">never</span> been easier
          </p>
          <p className="text-sm text-muted-foreground">Browse games, select a room, join the group.</p>
        </div>
        <div className="flex gap-4">
          <Link href={route('games')}>
            <Button variant="secondary">Browse games</Button>
          </Link>
          <Link href={route(auth?.user ? 'games' : 'sign-in')}>{auth?.user ? null : <Button>Sign in</Button>}</Link>
        </div>
      </div>
      <div className="flex items-center md:flex-[0.7] md:justify-end">
        <LogoSvg width={400} height={400} />
      </div>
    </Container>
  );
}

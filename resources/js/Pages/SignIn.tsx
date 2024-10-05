import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import React from 'react';

const SignIn: React.FC = () => {
  return (
    <Container className="flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-1 flex-col gap-4 rounded-lg border-[1px] border-border p-4 shadow md:max-w-md">
        <div>
          <p className="text-xl">Sign in</p>
          <p className="text-sm text-muted-foreground">Create an account or use an existing one</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="flex items-center justify-start gap-2" variant="outline" asChild>
            <a href={route('auth.redirect', 'discord')}>Discord</a>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;

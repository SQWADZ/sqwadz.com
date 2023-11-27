'use client';

import React from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

const SignIn: React.FC = () => {
  return <Button onClick={() => signIn('discord')}>Sign in</Button>;
};

export default SignIn;

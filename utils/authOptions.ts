import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma';
import DiscordProvider from 'next-auth/providers/discord';
import TwitchProvider from 'next-auth/providers/twitch';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],
};

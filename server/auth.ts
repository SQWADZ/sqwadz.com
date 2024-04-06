import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import TwitchProvider from 'next-auth/providers/twitch';
import BattleNetProvider from 'next-auth/providers/battlenet';
import DiscordProvider from 'next-auth/providers/discord';
import { NextApiRequest, NextApiResponse } from 'next';

type BattleNetIssuer =
  | 'https://www.battlenet.com.cn/oauth'
  | 'https://us.battle.net/oauth'
  | 'https://eu.battle.net/oauth'
  | 'https://kr.battle.net/oauth'
  | 'https://tw.battle.net/oauth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: {
    ...PrismaAdapter(prisma),

    // Providers such as battle.net pass an aditional argument `sub` that prisma tries to insert
    // into a `sub` column, which does not exist in our schema so we have to use this hacky workaround

    // @ts-ignore
    linkAccount: ({ sub, ...data }) => prisma.account.create({ data }),
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    BattleNetProvider({
      clientId: process.env.BNET_CLIENT_ID as string,
      clientSecret: process.env.BNET_CLIENT_SECRET as string,
      issuer: process.env.BNET_ISSUER as BattleNetIssuer,
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
    newUser: '/',
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
export const getPagesServerAuthSession = (req: NextApiRequest, res: NextApiResponse) =>
  getServerSession(req, res, authOptions);

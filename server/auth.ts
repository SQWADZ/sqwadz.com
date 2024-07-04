import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions, DefaultUser, Session, User } from 'next-auth';
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
      isVerified?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    isVerified?: boolean;
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
    session: ({ session, user }: { session: Session; user: User }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        isVerified: user.isVerified,
      },
    }),
  },
  adapter: {
    ...PrismaAdapter(prisma),

    // Providers such as battle.net pass an aditional argument `sub` that prisma tries to insert
    // into a `sub` column, which does not exist in our schema so we have to use this hacky workaround

    // @ts-ignore
    linkAccount: ({ sub, ...data }) => {
      if (data.expires_at && typeof data.expires_at === 'string') {
        data.expires_at = new Date(data.expires_at).valueOf() / 1000;
      }

      // Some providers such as epic send additional data that is not relevant to us and causes
      // and error in prisma as it tries to insert it into the column, so we destruct the whole data object

      const {
        userId,
        type,
        provider,
        providerAccountId,
        refresh_token,
        access_token,
        expires_at,
        token_type,
        scope,
        id_token,
        session_state,
      } = data;

      return prisma.account.create({
        data: {
          userId,
          type,
          provider,
          providerAccountId,
          refresh_token,
          access_token,
          expires_at,
          token_type,
          scope,
          id_token,
          session_state,
        },
      });
    },
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
    {
      id: 'epic',
      name: 'Epic',
      type: 'oauth',
      wellKnown: 'https://api.epicgames.dev/epic/oauth/v1/.well-known/openid-configuration',
      clientId: process.env.EPIC_CLIENT_ID,
      clientSecret: process.env.EPIC_CLIENT_SECRET,
      authorization: { params: { scope: 'openid basic_profile' } },
      token: {
        async request(context) {
          const authToken = Buffer.from(`${process.env.EPIC_CLIENT_ID}:${process.env.EPIC_CLIENT_SECRET}`).toString(
            'base64'
          );

          const params = new URLSearchParams();

          params.append('grant_type', 'authorization_code');
          params.append('code', context.params.code as string);
          params.append('scope', 'openid basic_profile');
          params.append('state', context.params.state as string);

          const response = await fetch('https://api.epicgames.dev/epic/oauth/v2/token', {
            method: 'POST',
            body: params,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${authToken}`,
            },
          });

          const tokens = await response.json();

          return { tokens };
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.dn,
          email: null,
          image: null,
        };
      },
    },
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

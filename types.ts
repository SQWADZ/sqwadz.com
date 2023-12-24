import { Session } from 'next-auth';

export type User = Omit<Session['user'], 'email'>;
export type Message = User & { contents: string };

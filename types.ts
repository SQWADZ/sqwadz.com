import { Session } from 'next-auth';

export type RoomMember = Omit<Session['user'], 'email'>;
export type Message = RoomMember & { contents: string };

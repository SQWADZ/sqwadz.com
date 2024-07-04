import { Session } from 'next-auth';

export type RoomMember = Omit<Session['user'], 'email'> & { joinedAt: number };
export type Message = RoomMember & { contents: string; createdAt: number };
export type MessageData = {
  messages: Message[];
  hasMore?: boolean;
};

export type GeneralFeedback = {
  type: 'general';
  title: string;
  comment: string;
};

export type GameRequest = {
  type: 'game-request';
  game: string;
};

export type BugReport = {
  type: 'bug-report';
  title: string;
  comment: string;
};

export type Room = {
  id: number;
  creatorId: number;
  activity: string;
  slots: number;
  password?: string;
  game: string;
  createdAt: Date;
};

export type RoomListing = Room & {
  creator: { name: string; isVerified?: boolean };
  _count: { roomMembers: number };
};

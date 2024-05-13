import { Session } from 'next-auth';

export type RoomMember = Omit<Session['user'], 'email'>;
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

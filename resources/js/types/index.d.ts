export interface User {
  provider_id: number;
  username: string;
  avatar?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth?: {
    user: User;
  };
};

export interface Room {
  id: string;
  activity: string;
  creatorName: string;
  creatorVerified?: boolean;
  createdAt: number;
  membersCount: number;
  slots: number;
  password?: boolean;
}

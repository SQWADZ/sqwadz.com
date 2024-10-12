export interface User {
  provider_id: string;
  username: string;
  avatar?: string;
  is_verified_creator?: boolean;
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
  creatorId: string;
  slots: number;
  password?: boolean;
  expiresAt: number;
  duration: number;
}

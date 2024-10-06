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

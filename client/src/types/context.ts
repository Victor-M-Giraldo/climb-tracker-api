import { User } from './user';

export type UserContextType = {
  user: User | null,
  setUser: (user: User | null) => void,
};

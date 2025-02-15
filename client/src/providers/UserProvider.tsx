import { useState } from 'react';
import { User } from '../types/user';
import { UserContext } from '../contexts/UserContext';

import { ReactNode } from 'react';

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value = {
    user: user,
    setUser: setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

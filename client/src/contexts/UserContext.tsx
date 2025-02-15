import UserContextType from '../types/context';
import { createContext } from 'react';

export const UserContext = createContext<UserContextType | null>(null);

import { useState } from 'react';
import useUser from '../hooks/useUser';
import UserService from '../services/UserService';
import { LoginResponse } from '../types/api';
import { handleErrors } from '../utils/errorHandler';
import { setItem } from '../utils/localStorage';

export function useLogin() {
  const { setUser } = useUser();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string): Promise<void> {
    setLoading(true);
    setErrors({});

    try {
      const userService = new UserService();
      const response = await userService.authenticate(email, password);

      if (response.ok) {
        const data: LoginResponse = await response.json();
        const { token, expiresIn, user } = data as LoginResponse;
        setUser(user);
        setItem('token', { token, expiresIn });
      } else {
        const serverErrors = await handleErrors(response);
        setErrors(serverErrors);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return { login, errors, loading };
}

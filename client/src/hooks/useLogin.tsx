import { useState } from 'react';
import useUser from '../hooks/useUser';
import { LoginResponse } from '../types/api';
import { LoginErrorResponse, ValidationError } from '../types/errors';

export function useLogin() {
  const { setUser } = useUser();
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string): Promise<void> {
    setLoading(true);
    setError({});

    try {
      const response = await fetch('http://localhost:3000/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data: LoginResponse | LoginErrorResponse = await response.json();

      if (response.status === 400) {
        const { errors } = data as LoginErrorResponse;
        const serverErrors: Record<string, string> = {};
        errors.forEach((error: ValidationError) => {
          serverErrors[error.path] = error.msg;
        });
        setError(serverErrors);
        return;
      } else if (response.status === 401) {
        setError({ general: 'Invalid email or password' });
        return;
      }

      const { token, expiresIn, user } = data as LoginResponse;
      localStorage.setItem(
        'token',
        JSON.stringify({
          token: token,
          expiresIn: expiresIn,
        })
      );
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return { login, error, loading };
}

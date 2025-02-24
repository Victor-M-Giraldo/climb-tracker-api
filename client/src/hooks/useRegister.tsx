import { useState } from 'react';
import useUser from './useUser';
import { ValidationError } from '../types/errors';

export function useRegister() {
  const { setUser } = useUser();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function register(formData: Record<string, string>) {
    setLoading(true);
    setErrors({});
    const { firstName, lastName, email, password, confirmPassword } = formData;

    try {
      const response = await fetch('http://localhost:3000/register', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, expiresIn, user } = data;
        localStorage.setItem(
          'token',
          JSON.stringify({
            token: token,
            expiresIn: expiresIn,
          })
        );
        setUser(user);
        return true;
      }

      switch (response.status) {
        case 400: {
            const { errors } = await response.json();
            const serverErrors: Record<string, string> = {};
            errors.forEach((error: ValidationError) => {
                serverErrors[error.path] = error.msg;
            });
            setErrors(serverErrors);
            break;
        }
        case 409: {
            setErrors({ general: 'Email already in use' });
            break;
        } default: {
            throw new Error('Something unexpected went wrong');
        }
      }

    } catch (e) {
      console.error(e);
    } finally {
        setLoading(false);
    }
  }
  return { register, errors, loading };
}

import { useState } from 'react';
import useUser from './hooks/useUser';

export default function LoginPage() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem(
        'token',
        JSON.stringify({
          token: data.token,
          expiresIn: data.expiresIn,
        })
      );
      setUser(data.user);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <section className='h-full grid place-items-center bg-base-200'>
      <div className='bg-base-100 p-4 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6'>Log In</h1>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='input w-full mt-1'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='input w-full mt-1'
              required
            />
          </div>

          <div>
            <button type='submit' className='btn btn-primary w-full'>
              Log In
            </button>
          </div>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <a href='/register' className='text-blue-500 hover:text-blue-600'>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

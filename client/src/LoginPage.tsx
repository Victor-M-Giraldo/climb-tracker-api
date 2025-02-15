import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:3000/register', { mode: 'cors'});
      console.log(response);
      const data = await response.json();
      console.log(data);
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
            <label
              htmlFor='email'
              className='block text-sm font-medium'>
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
            <label
              htmlFor='password'
              className='block text-sm font-medium'>
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

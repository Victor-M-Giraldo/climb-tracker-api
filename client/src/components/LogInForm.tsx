import InputField from './InputField';
import Form from './Form';
import { useState } from 'react';
import useUser from '../hooks/useUser';

export default function LogInForm() {
  const { setUser } = useUser();
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <h1 className='text-3xl font-bold text-center mb-6'>Log In</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <InputField
            type='email'
            value={email}
            setValue={setEmail}
            label='Email'
            placeholder='Enter your email'
          />
        </div>

        <div>
          <InputField
            type='password'
            value={password}
            setValue={setPassword}
            label='Password'
            placeholder='Enter your password'
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary w-full'>
            Log In
          </button>
        </div>
      </Form>
      <div className='mt-6 text-center'>
        <p className='text-sm'>
          Don't have an account?{' '}
          <a href='/register' className='text-blue-500 hover:text-blue-600'>
            Sign up here
          </a>
        </p>
      </div>
    </>
  );
}

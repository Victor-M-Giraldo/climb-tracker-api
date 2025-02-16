import InputField from './InputField';
import Form from './Form';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';



export default function LogInForm() {
  const { login, error, loading } = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <>
      <h1 className='text-3xl font-bold text-center mb-6'>Log In</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <InputField
            type='email'
            value={email}
            setValue={(value) => setFormData({ ...formData, email: value })}
            label='Email'
            placeholder='Enter your email'
            error={error?.email}
          />
        </div>

        <div>
          <InputField
            type='password'
            value={password}
            setValue={(value) => setFormData({ ...formData, password: value })}
            label='Password'
            placeholder='Enter your password'
            error={error?.password}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary w-full' disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
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

import InputField from './InputField';
import Form from './Form';
import { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formData;

  return (
    <>
      <div className='w-full p-8'>
        <h1 className='text-2xl font-bold mb-6'>Create Your Account</h1>
        <Form>
          <div>
              <InputField
                type='email'
                placeholder='Enter your email'
                label='Email'
                value={email}
              />
          </div>
          <div>
              <InputField
                type='password'
                placeholder='Enter your password'
                label='Password'
                value={password}
              />
          </div>
          <div>
              <InputField
                type='password'
                placeholder='Confirm your password'
                label='Confirm Password'
                value={confirmPassword}
              />
          </div>
          <div>
            <button type='submit' className='w-full btn btn-primary'>
              Sign Up
            </button>
          </div>
        <div className='mt-6 text-center'>
          <p className='text-sm'>
            Already have an account?{' '}
            <a href='/login' className='link'>
              Log in here
            </a>
          </p>
        </div>
        </Form>
      </div>
    </>
  );
}

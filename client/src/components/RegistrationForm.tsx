import InputField from './InputField';
import Form from './Form';
import { useState } from 'react';
import { handleChange } from '../utils/formHandlers';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router';

export default function RegistrationForm() {
  const { register, error: serverError, loading } = useRegister();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword, firstName, lastName } = formData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/');
    }
  }
  return (
    <>
      <div className='w-full p-8'>
        <h1 className='text-2xl font-bold mb-6'>Create Your Account</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <InputField
              type='text'
              placeholder='Enter your first name'
              label='First Name'
              value={firstName}
              name='firstName'
              onChange={(e) => handleChange(e, setFormData, formData)}
              error={serverError.firstName}
            />
          </div>
          <div>
            <InputField
              type='text'
              placeholder='Enter your last name'
              label='Last Name'
              value={lastName}
              name='lastName'
              onChange={(e) => handleChange(e, setFormData, formData)}
              error={serverError.lastName}
            />
          </div>
          <div>
            <InputField
              type='email'
              placeholder='Enter your email'
              label='Email'
              value={email}
              name='email'
              onChange={(e) => handleChange(e, setFormData, formData)}
              error={serverError.email}
            />
          </div>
          <div>
            <InputField
              type='password'
              placeholder='Enter your password'
              label='Password'
              value={password}
              name='password'
              onChange={(e) => handleChange(e, setFormData, formData)}
              error={serverError.password}
            />
          </div>
          <div>
            <InputField
              type='password'
              placeholder='Confirm your password'
              label='Confirm Password'
              value={confirmPassword}
              name='confirmPassword'
              onChange={(e) => handleChange(e, setFormData, formData)}
              error={serverError.confirmPassword}
            />
          </div>
          <div>
            <button type='submit' className='w-full btn btn-primary' disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
          <div className='mt-6 text-center'>
            <p className='text-sm'>
              Already have an account?{' '}
              <a
                href='/login'
                className='link text-blue-500 hover:text-blue-600'>
                Log in here
              </a>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}

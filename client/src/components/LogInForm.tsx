import InputField from './InputField';
import Form from './Form';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { handleChange } from '../utils/formHandlers';
import { validateEmail, validatePassword } from '../utils/validations';

export default function LogInForm() {
  const { login, error: serverError, loading } = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setValidationErrors({ email: '', password: '' });

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation.email || passwordValidation.password) {
      setValidationErrors({
        ...emailValidation,
        ...passwordValidation,
      });
      return;
    }

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
            name='email'
            onChange={(e) => handleChange(e, setFormData, formData)}
            label='Email'
            placeholder='Enter your email'
            error={validationErrors.email || serverError?.email}
            onBlur={(e) => {
              setValidationErrors({
                ...validationErrors,
                ...validateEmail(e.target.value),
              });
            }}
          />
        </div>

        <div>
          <InputField
            type='password'
            value={password}
            name='password'
            onChange={(e) => handleChange(e, setFormData, formData)}
            label='Password'
            placeholder='Enter your password'
            error={validationErrors.password || serverError?.password}
            onBlur={(e) => {
              setValidationErrors({
                ...validationErrors,
                ...validatePassword(e.target.value),
              });
            }}
          />
        </div>

        {serverError?.general && (
          <div className='text-red-400 text-sm mb-4'>{serverError.general}</div>
        )}
        <div>
          <button
            type='submit'
            className='btn btn-primary w-full'
            disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </Form>
      <div className='mt-6 text-center'>
        <p className='text-sm'>
          Don't have an account?{' '}
          <a href='/register' className='link text-blue-500 hover:text-blue-600'>
            Sign up here
          </a>
        </p>
      </div>
    </>
  );
}

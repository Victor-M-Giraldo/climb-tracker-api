import InputField from './InputField';
import Form from './Form';
import { useState } from 'react';
import { handleChange } from '../utils/formHandlers';
import { validateEmail, validatePassword, validateConfirmPassword } from '../utils/validations';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formData;

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
    if (emailValidation.email || passwordValidation.password || confirmPasswordValidation.confirmPassword) {
      setValidationErrors({
        ...emailValidation,
        ...passwordValidation,
        ...confirmPasswordValidation,
      });
      return;
    }
  }
  return (
    <>
      <div className='w-full p-8'>
        <h1 className='text-2xl font-bold mb-6'>Create Your Account</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <InputField
              type='email'
              placeholder='Enter your email'
              label='Email'
              value={email}
              name='email'
              onChange={(e) => handleChange(e, setFormData, formData)}
              onBlur={(e) => {
                setValidationErrors({
                  ...validationErrors,
                  ...validateEmail(e.target.value),
                });
              }}
              error={validationErrors.email}
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
              onBlur={(e) => {
                setValidationErrors({
                  ...validationErrors,
                  ...validatePassword(e.target.value),
                });
              }}
              error={validationErrors.password}
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
              error={validationErrors.confirmPassword}
              onBlur={(e) => {
                setValidationErrors({
                  ...validationErrors,
                  ...validateConfirmPassword(password, e.target.value),
                });
              }}
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
              <a href='/login' className='link text-blue-500 hover:text-blue-600'>
                Log in here
              </a>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}

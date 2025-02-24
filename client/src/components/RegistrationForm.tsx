import InputField from './InputField';
import Form from './Form';
import Button from './Button';
import AuthFooter from './AuthFooter';
import { serializeFormData } from '../utils/formUtils';
import { useRegister } from '../hooks/useRegister';

export default function RegistrationForm() {
  const { register, errors, loading } = useRegister();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = serializeFormData(formData);
    register(data);
  }
  return (
    <>
      <div className='w-full p-8'>
        <Form onSubmit={handleSubmit} FormHeader={() => (
          <h1 className='text-2xl font-bold mb-6'>Create Your Account</h1>
        )}>
            <InputField
              type='text'
              name='firstName'
              placeholder='Enter your first name'
              label='First Name'
              error={errors.firstName}
              required={true}
              Wrapper='div'
            />
            <InputField
              type='text'
              name='lastName'
              placeholder='Enter your last name'
              label='Last Name'
              error={errors.lastName}
              required={true}
              Wrapper='div'
            />
            <InputField
              type='email'
              name='email'
              placeholder='Enter your email'
              label='Email'
              error={errors.email}
              required={true}
              Wrapper='div'
            />
            <InputField
              type='password'
              name='password'
              placeholder='Enter your password'
              label='Password'
              error={errors.password}
              required={true}
              Wrapper='div'
            />
            <InputField
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password'
              label='Confirm Password'
              error={errors.confirmPassword}
              required={true}
              Wrapper='div'
            />
            <Button type='submit' disabled={loading} Wrapper='div'>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <AuthFooter promptText="Already have an account? " link='/login' linkText='Log in here'/>
        </Form>
      </div>
    </>
  );
}

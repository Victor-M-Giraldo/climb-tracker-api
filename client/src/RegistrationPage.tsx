const RegistrationPage: React.FC = () => {
  return (
    <div className='h-full flex items-center justify-center p-6'>
      <div className='bg-base-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row w-full max-w-4xl'>
        <div className='hidden md:w-1/2 md:block bg-cover bg-center bg-[url(/chalk-bag.jpg)]'>
          <div className='h-full p-8 flex items-center justify-center'>
            <h2 className='text-3xl font-bold text-center'>
              Join the Climbing Community
            </h2>
          </div>
        </div>
        <div className='md:w-1/2 p-8'>
          <h1 className='text-2xl font-bold mb-6'>Create Your Account</h1>
          <form className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email
              </label>
              <input
                type='text'
                id='email'
                placeholder='Type here'
                className='input w-full mt-1'
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium'>
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Type here'
                className='input w-full mt-1'
              />
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium'>
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                placeholder='Type here'
                className='input w-full mt-1'
              />
            </div>
            <div>
              <button type='submit' className='w-full btn btn-primary'>
                Sign Up
              </button>
            </div>
          </form>
          <div className='mt-6 text-center'>
            <p className='text-sm'>
              Already have an account?{' '}
              <a href='/login' className='link'>
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

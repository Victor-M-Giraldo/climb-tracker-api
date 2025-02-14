export default function LoginPage() {
  return (
    <section className='h-full grid place-items-center bg-base-200'>
      <div className='bg-base-100 p-4 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6'>Log In</h1>
        <form className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium'>
              Email
            </label>
            <input
              type='email'
              id='email'
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

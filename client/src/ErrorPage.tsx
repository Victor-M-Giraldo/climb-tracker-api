import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <>
      <section className='h-screen flex items-center justify-center bg-base-200'>
        <div className='card bg-base-100 shadow-xl w-full max-w-md'>
          <div className='card-body text-center'>
            <h1 className='text-6xl font-bold text-error'>404</h1>
            <p className='text-xl text-base-content mt-4'>
              Oops! Something went wrong.
            </p>
            <p className='text-base-content/70 mt-2'>
              The page you're looking for doesn't exist or another error
              occurred.
            </p>
            <div className='justify-center mt-6'>
              <Link to='/' className='btn btn-primary'>
                Go back to the homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

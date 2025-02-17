import LogInForm from '../components/LogInForm';

export default function LoginPage() {
  return (
    <section className='h-full grid place-items-center bg-base-200'>
      <div className='bg-base-100 p-4 rounded-lg shadow-md w-full max-w-md'>
        <LogInForm/>
      </div>
    </section>
  );
}

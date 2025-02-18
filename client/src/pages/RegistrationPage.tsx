import AsideImage from "../components/AsideImage";
import RegistrationForm from "../components/RegistrationForm";

export default function RegistrationPage() {
  return (
    <section className='h-full flex items-center justify-center p-6'>
      <div className='bg-base-100 rounded-lg shadow-md grid md:grid-cols-2 w-full max-w-4xl'>
        <AsideImage />
        <RegistrationForm/>
      </div>
    </section>
  );
};

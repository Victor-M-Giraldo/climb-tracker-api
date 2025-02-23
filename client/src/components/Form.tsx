import { ElementType } from 'react';

interface FormProps {
  FormHeader: ElementType;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function Form({ children, FormHeader, onSubmit }: FormProps) {
  return (
    <>
    <FormHeader/>
    <form onSubmit={onSubmit} className='space-y-4'>
      {children}
    </form>
    </>
  );
}

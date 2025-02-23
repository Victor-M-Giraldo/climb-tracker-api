import { ElementType } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  Wrapper?: ElementType;
}

export default function Button({ children, Wrapper, ...props }: ButtonProps) {
  const Content = (
    <button {...props} className='btn btn-primary w-full'>
      {children}
    </button>
  );
  return Wrapper ? <Wrapper>{Content}</Wrapper> : Content;
}

import { ElementType } from "react";

interface InputFieldProps {
  type: 'email' | 'password' | 'text';
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  error: string | null;
  Wrapper?: ElementType
}

export default function InputField({
  label,
  error,
  Wrapper,
  ...props
}: InputFieldProps) {

  const Content = (
    <label htmlFor={label}>
      {label}
      <input
        {...props}
        className='input w-full mt-1'
      />

      <p className='text-sm text-red-400 mt-1'>{error}</p>
    </label>
  )
  return Wrapper ? <Wrapper>{Content}</Wrapper> : Content;
}

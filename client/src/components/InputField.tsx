interface InputFieldProps {
  value: string;
  setValue: (value: string) => void;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
}

export default function InputField({
  value,
  setValue,
  type,
  placeholder,
  label,
  required,
}: InputFieldProps) {
  return (
    <label htmlFor={label}>
      {label}
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        className='input w-full mt-1'
      />
    </label>
  );
}

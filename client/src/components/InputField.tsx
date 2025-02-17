interface InputFieldProps {
  value: string;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputField({
  value,
  type,
  placeholder,
  label,
  required,
  error,
  onBlur,
  onChange,
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
        onChange={onChange}
        onBlur={onBlur}
        className='input w-full mt-1'
      />
      {error && (
        <p className='text-sm text-red-400 h-4 mt-1'>{error}</p>
      )}
    </label>
  );
}

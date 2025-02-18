import { Dispatch, SetStateAction } from 'react';

export function handleChange<T extends Record<string, string>>(e: React.ChangeEvent<HTMLInputElement>, setFormData: Dispatch<SetStateAction<T>>, formData: T) {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
}

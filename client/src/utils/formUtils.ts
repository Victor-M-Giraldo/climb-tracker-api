import { Dispatch, SetStateAction } from 'react';

export function serializeFormData(formData: FormData) {
  return Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, value.toString()]));
}

export function handleChange<T extends Record<string, string>>(e: React.ChangeEvent<HTMLInputElement>, setFormData: Dispatch<SetStateAction<T>>, formData: T) {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
}

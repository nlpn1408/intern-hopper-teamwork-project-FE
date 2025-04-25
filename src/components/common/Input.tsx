import React from 'react';
import { UseFormRegister, FieldValues, RegisterOptions, FieldPath, Path } from 'react-hook-form';

interface InputProps<TFieldValues extends FieldValues> {
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
}

const Input = <TFieldValues extends FieldValues>({
  placeholder,
  register,
  name,
  type = 'text',
  error,
  rules,
}: InputProps<TFieldValues>) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
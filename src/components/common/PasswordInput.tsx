'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister, FieldValues, RegisterOptions, FieldPath, Path } from 'react-hook-form';

interface PasswordInputProps<TFieldValues extends FieldValues> {
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  error?: string;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
}

const PasswordInput = <TFieldValues extends FieldValues>({
  placeholder,
  register,
  name,
  error,
  rules,
}: PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(name, rules)}
        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  onSubmit: (data: RegisterData) => void;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<RegisterData>();

  const password = watch('password');

  useEffect(() => {
    if (isSubmitSuccessful) {
      toastr.success('Đăng ký thành công');
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitForm = (data: RegisterData) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error(error);
      toastr.error('Đăng ký thất bại');
    }
  };

  return (
    <form
    onSubmit={handleSubmit(onSubmitForm)}
    className="space-y-2 w-11/12 sm:max-w-10/12 md:max-w-9/12 lg:max-w-8/12 xl:max-w-4/12 mx-auto bg-white py-10 px-6 rounded-lg shadow-md"
  > 
      <h1 className="text-2xl font-bold mb-4 text-center">Đăng ký tài khoản</h1>

      <div className="w-full md:w-10/12 lg:w-10/12 mx-auto">
        <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Tên</label>
        <input
          {...register('name', { required: 'Vui lòng nhập tên' })}
          className="w-full lg:mt-2 p-1 lg:p-3 md:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name ? (
          <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.name.message}</p>
        ) : (
          <p className="invisible text-sm min-h-[1.25rem]">placeholder</p>
        )}
      </div>

      <div className="w-full md:w-10/12 lg:w-10/12 mx-auto">
        <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Email</label>
        <input
          {...register('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không hợp lệ',
            },
          })}
          className="w-full lg:mt-2 p-1 lg:p-3 md:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email ? (
          <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.email.message}</p>
        ) : (
          <p className="invisible text-sm min-h-[1.25rem]">placeholder</p>
        )}
      </div>

      <div className="w-full md:w-10/12 lg:w-10/12 mx-auto">
        <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Mật khẩu</label>
        <input
          type="password"
          {...register('password', {
            required: 'Vui lòng nhập mật khẩu',
            minLength: {
              value: 8,
              message: 'Mật khẩu phải có ít nhất 8 ký tự',
            },
            validate: (value) => {
              const rules = [
                { regex: /[A-Z]/, message: 'Phải có ít nhất 1 chữ hoa' },
                { regex: /[a-z]/, message: 'Phải có ít nhất 1 chữ thường' },
                { regex: /[0-9]/, message: 'Phải có ít nhất 1 số' },
                { regex: /[@$!%*?&]/, message: 'Phải có ít nhất 1 ký tự đặc biệt' },
              ];
              for (const rule of rules) {
                if (!rule.regex.test(value)) return rule.message;
              }
              return true;
            },
          })}
          className="w-full lg:mt-2 p-1 lg:p-3 md:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password ? (
          <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.password.message}</p>
        ) : (
          <p className="invisible text-sm min-h-[1.25rem]">placeholder</p>
        )}
      </div>

      <div className="w-full md:w-10/12 lg:w-10/12 mx-auto">
        <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Xác nhận mật khẩu</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Vui lòng xác nhận mật khẩu',
            validate: (value) =>
              value === password || 'Mật khẩu xác nhận không khớp',
          })}
          className="w-full lg:mt-2 p-1 lg:p-3 md:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword ? (
          <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.confirmPassword.message}</p>
        ) : (
          <p className="invisible text-sm min-h-[1.25rem]">placeholder</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full mt-2 py-2 lg:mt-3 md:w-10/12 lg:w-10/12 bg-blue-600 text-white lg:py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Đăng ký
        </button>
      </div>

    </form>
  );
}

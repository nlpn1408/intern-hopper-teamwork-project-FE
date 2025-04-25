'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export type RegisterData = {
  username: string;
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
  const onSubmitForm = (data: RegisterData) => {
    onSubmit(data);
  };
  return (
    <form
    onSubmit={handleSubmit(onSubmitForm)}
    className=" max-w-11/12 lg:max-w-md md:max-w-md mx-auto bg-white p-10 rounded-xl shadow-md"
  > 
      <h1 className="text-2xl font-bold text-center mb-6">ĐĂNG KÍ TÀI KHOẢN</h1>
      <div className="w-full mx-auto">
        {/* <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Tên</label> */}
        <input
          {...register('username', { required: 'Vui lòng nhập tên' })}
          className="w-full lg:mt-1 p-1 lg:px-4 lg:py-2 md:p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Họ và tên"
        />
        {errors.username ? (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        ) : (
          <p className="invisible text-sm">placeholder</p>
        )}
      </div>

      <div className="w-full mx-auto">
        {/* <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Email</label> */}
        <input
          {...register('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không hợp lệ',
            },
          })}
          className="w-full lg:mt-1 p-1 lg:px-4 lg:py-2 md:p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
        {errors.email ? (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        ) : (
          <p className="invisible text-sm">placeholder</p>
        )}
      </div>

      <div className="w-full mx-auto">
        {/* <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Mật khẩu</label> */}
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
          className="w-full lg:mt-1 p-1 lg:px-4 lg:py-2 md:p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mật khẩu"
        />
        {errors.password ? (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        ) : (
          <p className="invisible text-sm">placeholder</p>
        )}
      </div>

      <div className="w-full mx-auto">
        {/* <label className="block text-sm md:text-lg lg:text-lg font-medium text-gray-700">Xác nhận mật khẩu</label> */}
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Vui lòng xác nhận mật khẩu',
            validate: (value) =>
              value === password || 'Mật khẩu xác nhận không khớp',
          })}
          className="w-full lg:mt-1 p-1 lg:px-4 lg:py-2 md:p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Xác nhận mật khẩu"
        />
        {errors.confirmPassword ? (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        ) : (
          <p className="invisible text-sm">placeholder</p>
        )}
      
      </div>
      

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full font-bold mt-2 py-2 lg:mt-3 bg-blue-600 text-white lg:py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ĐĂNG KÍ
        </button>
      </div>
      <div className="text-center mt-4 text-sm">
        <p className="text-gray-600">
          Bạn đã có tài khoản?{' '}
          <a href="/login" className="text-blue-600 underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>

    </form>
  );
}

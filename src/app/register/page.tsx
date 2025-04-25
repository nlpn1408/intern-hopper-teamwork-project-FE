'use client';

import { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import RegisterForm, { RegisterData } from '../components/register/RegisterForm';
import { registerUser } from '../service/authService';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    setIsSubmitting(true);
    try {
      const result = await registerUser(data);
      if (result.success === true) {
        toastr.success('Đăng ký thành công!');
        router.push('/login');
      } else {
        toastr.error(result.message || 'Đăng ký không thành công');
        if (result.errors) {
          if (result.errors.email) toastr.error(result.errors.email.join(', '));
          if (result.errors.password) toastr.error(result.errors.password.join(', '));
          if (result.errors.username) toastr.error(result.errors.username.join(', '));
        }
      }
    } catch (error) {
      console.error(error);
      toastr.error('Đăng ký thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/register/bg.jpg')" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      <div className="relative w-full">
        <RegisterForm onSubmit={handleRegister} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}

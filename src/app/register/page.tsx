'use client';

import { useState } from 'react';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import RegisterForm, { RegisterData } from '../components/register/RegisterForm';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Đăng ký thất bại');
      }

      const result = await response.json();

      if (result.success) {
        toastr.success('Đăng ký thành công!');
      } else {
        toastr.error(result.message || 'Đăng ký không thành công');
      }
    } catch (error) {
      console.error(error);
      toastr.error('Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Ảnh nền */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/images/register/bg.jpg')",
        }}
      />
      {/* Lớp phủ mờ */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      
      {/* Form đăng ký */}
      <div className="relative w-full">
        <RegisterForm onSubmit={handleRegister} />
        {loading && <p>Đang xử lý...</p>}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; 
import LoginForm from "../../features/auth/components/LoginForm"; 
import { LoginForm as LoginFormType } from "../../features/auth/types";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function LoginPage() {
  const { login: authLogin, loading: authLoading } = useAuth(); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleLogin = async (data: LoginFormType) => {
    setIsSubmitting(true);
    try {
      await authLogin(data);
    } catch (error: any) {
      console.error("Login failed:", error);
      toastr.error(error.message || "Đăng nhập thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = authLoading || isSubmitting;

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/register/bg.jpg')" }} 
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      <div className="relative w-full">
        <div className="max-w-11/12 lg:max-w-md md:max-w-md mx-auto bg-white p-10 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">ĐĂNG NHẬP</h1>

          <LoginForm onSubmit={handleLogin} isSubmitting={isLoading} />

          <div className="text-center mt-4 text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-600 underline">
              Đăng ký ngay
            </a>
            <br />
            <a href="/forgot-password" className="text-blue-600 underline">
              Quên mật khẩu? Khôi phục mật khẩu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
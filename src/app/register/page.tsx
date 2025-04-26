'use client';

import 'toastr/build/toastr.min.css';
import RegisterForm from '../../features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/register/bg.jpg')" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      <div className="relative w-full">
        <RegisterForm />
      </div>
    </div>
  );
}

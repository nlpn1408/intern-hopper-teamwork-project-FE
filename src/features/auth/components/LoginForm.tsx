"use client";

import { useForm } from "react-hook-form";
import { LoginForm as LoginFormType } from "../types";
import Input from "@/components/common/Input"; 
import PasswordInput from "@/components/common/PasswordInput";
type LoginFormProps = {
  onSubmit: (data: LoginFormType) => void;
  isSubmitting: boolean;
};

export default function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onSubmitForm = (data: LoginFormType) => {
    onSubmit(data);
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Input
          placeholder="Email"
          register={register}
          name="email"
          type="email"
          error={errors.email?.message}
          rules={{
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          }}
        />
      </div>

      <div>
        <PasswordInput
          placeholder="Mật khẩu"
          register={register}
          name="password"
          error={errors.password?.message}
          rules={{
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded-xl font-semibold transition ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
      </button>
    </form>
  );
}

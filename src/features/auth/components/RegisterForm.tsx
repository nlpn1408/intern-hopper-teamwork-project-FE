"use client";

import { useForm } from "react-hook-form";
import { RegisterData } from "../types";
import { registerUser } from "../services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toastr from 'toastr';
import PasswordInput from "../../../components/common/PasswordInput";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const password = watch("password");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    setIsSubmitting(true);
    try {
      const result = await registerUser(data);
      if (result.success === true) {
        toastr.success("Đăng ký thành công!");
        router.push("/login");
      } else {
        toastr.error(result.message || "Đăng ký không thành công");
        if (result.errors) {
          Object.values(result.errors).forEach((errorMessages) => {
            errorMessages.forEach((errorMessage) => {
              toastr.error(errorMessage);
            });
          });
        }
      }
    } catch (error) {
      console.error(error);
      toastr.error("Đăng ký thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-11/12 lg:max-w-md md:max-w-md mx-auto bg-white p-10 rounded-xl shadow-md"
    >
      <h1 className="text-2xl font-bold text-center mb-6">ĐĂNG KÍ TÀI KHOẢN</h1>

      <div className="w-full mx-auto">
        <input
          {...register("username", { required: "Vui lòng nhập tên" })}
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Họ và tên"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="w-full mx-auto mt-3">
        <input
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full mx-auto mt-3">
        <PasswordInput
          placeholder="Mật khẩu"
          register={register}
          name="password"
          error={errors.password?.message}
          rules={{
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
            validate: (value) => {
              const rules = [
                { regex: /[A-Z]/, message: "Phải có ít nhất 1 chữ hoa" },
                { regex: /[a-z]/, message: "Phải có ít nhất 1 chữ thường" },
                { regex: /[0-9]/, message: "Phải có ít nhất 1 số" },
                {
                  regex: /[@$!%*?&]/,
                  message: "Phải có ít nhất 1 ký tự đặc biệt",
                },
              ];
              for (const rule of rules) {
                if (!rule.regex.test(value)) return rule.message;
              }
              return true;
            },
          }}
        />
      </div>

      <div className="w-full mx-auto mt-3">
         <PasswordInput
          placeholder="Xác nhận mật khẩu"
          register={register}
          name="confirmPassword"
          error={errors.confirmPassword?.message}
          rules={{
            required: "Vui lòng xác nhận mật khẩu",
            validate: (value) =>
              value === password || "Mật khẩu xác nhận không khớp",
          }}
        />
      </div>

      <div className="text-xs text-gray-500 mt-4">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-bold py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Đang đăng ký..." : "ĐĂNG KÍ"}
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        Bạn đã có tài khoản?{" "}
        <a href="/login" className="text-blue-600 underline">
          Đăng nhập ngay
        </a>
        <br />
        <a href="/forgot-password" className="text-blue-600 underline">
          Quên mật khẩu? Khôi phục mật khẩu
        </a>
      </div>
    </form>
  );
}

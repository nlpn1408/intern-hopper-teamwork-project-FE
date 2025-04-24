"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/users?email=${email}`);
      const users = await response.json();

      if (users.length === 0) {
        throw new Error("Email không tồn tại");
      }

      const user = users[0];

      if (user.password !== password) {
        throw new Error("Mật khẩu không đúng");
      }

      // Giả lập lưu thông tin
      localStorage.setItem("token", "fake-jwt-token");
      localStorage.setItem("userName", user.username);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("roleId", user.roleId.toString());

      alert("Đăng nhập thành công");
      router.push("/"); // Về trang chính
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">ĐĂNG NHẬP TÀI KHOẢN</h2>
    <p className="text-sm text-center text-gray-500 mb-4">Nhập email và mật khẩu của bạn:</p>

    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-xs text-gray-400">
        This site is protected by reCAPTCHA and the Google
        <a href="#" className="text-blue-500 hover:underline ml-1">Privacy Policy</a> and
        <a href="#" className="text-blue-500 hover:underline ml-1">Terms of Service</a> apply.
      </p>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
      </button>
    </div>

    <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
      <a href="/dangky" className="hover:underline text-blue-600">
        Khách hàng mới? <span className="font-medium">Tạo tài khoản</span>
      </a>
      <p>
        Quên mật khẩu?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Khôi phục mật khẩu
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default LoginPage;

"use client"; 


import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Save, X, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role_id: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const roleOptions = [
  { id: 2, name: 'Admin' },
  { id: 1, name: 'User' },
];

export default function UserCreationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role_id: '1',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowModal(true); 
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.username) {
      newErrors.username = 'Tên người dùng không được để trống';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất một chữ cái viết thường';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất một con số';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const emailCheckResponse = await fetch(`http://localhost:3001/get_users?email=${formData.email}`);
        const emailCheckData = await emailCheckResponse.json();

        if (emailCheckData.length > 0) {
          setErrorMessage('Email đã tồn tại!');
          setIsSubmitting(false);
          return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            role_id: parseInt(formData.role_id),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false,
          }),
        });

        if (response.ok) {
          setSuccessMessage('Người dùng đã được tạo thành công!');
          setErrorMessage('');

          setTimeout(() => {
            setFormData({
              email: '',
              username: '',
              password: '',
              confirmPassword: '',
              role_id: '0',
            });
            setSuccessMessage('');
            router.push('/users');
          }, 3000);
        } else {
          const data = await response.json();
          console.error('Lỗi tạo người dùng:', data);
          setErrorMessage(data.message || 'Tạo người dùng thất bại!');
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
        setErrorMessage('Có lỗi xảy ra khi gọi API');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/users');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
    {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs ">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-center mb-6 text-red-600">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Phiên đăng nhập hết hạn</h3>
        <p className="text-gray-600 text-center mb-6">Vui lòng đăng nhập để tiếp tục sử dụng hệ thống</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div className="bg-blue-600 h-1.5 rounded-full animate-progress"></div>
        </div>
        <p className="text-sm text-gray-500 text-center">Đang chuyển hướng đến trang đăng nhập...</p>
      </div>
   </div>
    )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={handleCancel}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <a href="/users">
    <span>Quay lại danh sách người dùng</span>
  </a>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-white p-2 mr-4">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-white">Tạo người dùng mới</h2>
            </div>
          </div>

          <div className="p-8">
            {successMessage && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
                <button
                  className="ml-auto text-green-500 hover:text-green-700"
                  onClick={() => setSuccessMessage('')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
                <button
                  className="ml-auto text-red-500 hover:text-red-700"
                  onClick={() => setErrorMessage('')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                      errors.email 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Tên người dùng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                      errors.username 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder="Tên người dùng"
                  />
                  {errors.username && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.username}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role_id"
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  >
                    {roleOptions.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
            
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                          errors.password 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="Nhập mật khẩu"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.password}
                      </p>
                    )}
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt</p>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                          errors.confirmPassword 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="Xác nhận mật khẩu"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Lưu người dùng
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
}
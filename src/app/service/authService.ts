import axios from 'axios';
import { RegisterData } from '../components/register/RegisterForm';

interface RegisterResponse {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
    username?: string[];
  };
}

const API_URL = 'http://localhost:3001/api/auth/register';

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(API_URL, data); 

    if (response.data?.message === 'Tạo tài khoản thành công') {
      return {
        success: true,
        message: response.data.message,
      };
    }

    return {
      success: false,
      message: 'Đăng ký không thành công',
    };
  } catch (error: any) {
    const errorData = error.response?.data as RegisterResponse;

    const errorMessage = errorData?.message;

    if (errorMessage === 'Email đã được sử dụng') {
      return {
        success: false,
        message: errorMessage,
      };
    }

    if (errorMessage === 'Dữ liệu không hợp lệ') {
      return {
        success: false,
        message: errorMessage,
        errors: errorData.errors || {},
      };
    }

    return {
      success: false,
      message: 'Có lỗi xảy ra khi đăng ký',
    };
  }
};

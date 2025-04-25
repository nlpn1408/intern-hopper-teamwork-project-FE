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
  data?: {
    id: number;
    username: string;
    email: string;
    password: string;
    role_id: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
  };
}

const API_URL = 'http://localhost:3001/api/auth/register';

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(API_URL, data); 
    console.log(response);
    
    if (response.data?.message === 'Tạo tài khoản thành công') {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data, 
      };
    }

    if (response.data?.message === 'Email đã được sử dụng') {
      return {
        success: false,
        message: 'Email đã được sử dụng',
      };
    }

    if (response.data?.message === 'Dữ liệu không hợp lệ') {
      return {
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: response.data.errors || {},
      };
    }

    return {
      success: false,
      message: 'Đăng ký không thành công',
    };
  } catch (error: any) {
    const errorData = error.response?.data as RegisterResponse;
    const errorMessage = errorData?.message || 'Có lỗi xảy ra khi đăng ký';

    return {
      success: false,
      message: errorMessage,
      errors: errorData.errors || {},
    };
  }
};

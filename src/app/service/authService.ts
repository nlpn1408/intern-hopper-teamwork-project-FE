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

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };

  } catch (error: any) {
    const status = error.response?.status;
    const errorData = error.response?.data as RegisterResponse;
    if (status === 409) {
      return {
        success: false,
        message: errorData?.message || 'Email đã được sử dụng',
      };
    }
    if (status === 400) {
      return {
        success: false,
        message: errorData?.message || 'Dữ liệu không hợp lệ',
        errors: errorData.errors || {},
      };
    }

    return {
      success: false,
      message: 'Có lỗi xảy ra khi đăng ký',
    };
  }
};

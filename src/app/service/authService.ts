import axios from 'axios';
import { RegisterData } from '../components/register/RegisterForm';

interface RegisterResponse {
  success: boolean;
  message?: string;
}

const API_URL = 'http://localhost:3003/api/auth/register';

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Đăng ký thất bại:', error);
    throw new Error('Đăng ký thất bại');
  }
};

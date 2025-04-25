export interface User {
  id: number;
  username: string;
  email: string;
}
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
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

import { RegisterData, RegisterResponse, LoginForm, LoginResponse } from "../types"; // Import LoginForm and LoginResponse
import { api, API_ENDPOINT } from "@/utils/api";

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const { confirmPassword, ...rest } = data;
    const response = await api.post<RegisterResponse>(
      API_ENDPOINT.AUTH.RESGISTER,
      rest
    );
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Error during registration:", error);

    if (error.response) {
      const errorData = error.response.data as RegisterResponse;
      return {
        success: false,
        message:
          errorData.message ||
          `Registration failed with status ${error.response.status}`,
        errors: errorData.errors,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred during registration.",
      };
    }
  }
};

export const login = async (
  credentials: LoginForm
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(API_ENDPOINT.AUTH.LOGIN, credentials);
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw error;
  }
};

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LoginForm, User } from "../types";
import { login as apiLogin } from "../services/auth.service";
import toastr from "toastr";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginForm) => {
    setLoading(true);
    try {
      const { data, message } = await apiLogin(credentials);

      if (data?.accessToken) {
        const loggedInUser: User = {
          email: credentials.email,
          id: 0,
          username: "",
        };
        setUser(loggedInUser); // Set user in the context state
        toastr.success("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user info
        localStorage.setItem("token", data?.accessToken);
      } else {
        toastr.error(message ? message : "Lỗi không xác định");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

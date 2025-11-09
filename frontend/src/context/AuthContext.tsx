import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";

interface User {
  id: string;
  username: string;
  email: string;
  role: "student" | "employer";
  avatar?: { public_id: string; secure_url: string };
  student?: {
    studentId: string;
    major: string;
    className: string;
    gpa: number;
    description?: string;
    cv?: { public_id: string; secure_url: string };
  };
  employer?: {
    companyName: string;
    companyAddress?: string;
    website?: string;
    phoneNumber: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getProfile();

        const { user, detail } = res.data;
        // 👉 Gộp detail vào trong user để frontend có thể truy cập user.student hoặc user.employer
        const mergedUser = {
          ...user,
          ...(user.role === "student"
            ? { student: detail }
            : { employer: detail }),
        };

        setUser(mergedUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

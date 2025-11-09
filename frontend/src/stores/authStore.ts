import { create } from "zustand";
import { authApi } from "../api/authApi";

interface User {
  _id: string;
  username: string;
  email: string;
  role: "student" | "employer";
  avatar?: {
    public_id: string;
    secure_url: string;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const res = await authApi.getProfile();
      set({ user: res.data.user, loading: false });
    } catch (err: any) {
      set({
        user: null,
        loading: false,
        error: err.response?.data?.message || "Unauthorized",
      });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await authApi.login({ email, password });
      set({ user: res.data.user, loading: false, error: null });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  logout: async () => {
    await authApi.logout();
    set({ user: null });
  },

  setUser: (user) => set({ user }),
}));

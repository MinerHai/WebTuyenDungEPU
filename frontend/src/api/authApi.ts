import axiosClient from "./axiosClient";

export const authApi = {
  register: (data: any) => axiosClient.post("/auth/register", data),
  login: (data: any) => axiosClient.post("/auth/login", data),
  logout: () => axiosClient.post("/auth/logout"),
  getProfile: () => axiosClient.get("/auth/profile"),
  changePassword: (data: any) =>
    axiosClient.patch("/auth/change-password", data),

  changeAvatar: (formData: FormData) =>
    axiosClient.patch("/auth/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

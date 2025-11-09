// src/api/userApi.ts
import axiosClient from "./axiosClient";

export const userApi = {
  changeAvatar: (formData: FormData) =>
    axiosClient.patch("/user/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateStudentProfile: (formData: FormData) =>
    axiosClient.patch("/user/profile/student", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateEmployerProfile: (data: any) =>
    axiosClient.patch("/user/profile/employer", data),
};

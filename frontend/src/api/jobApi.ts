import axiosClient from "./axiosClient";

export const jobApi = {
  // ✅ Lấy danh sách tất cả job (dành cho student)
  getAll: async (params?: any) => {
    const res = await axiosClient.get("/jobs", { params });
    return res.data;
  },

  // ✅ Lấy danh sách job của employer hiện tại
  getMine: async () => {
    const res = await axiosClient.get("/jobs/employer/me");
    return res.data.data;
  },

  // ✅ Lấy chi tiết job
  getById: async (id: string) => {
    const res = await axiosClient.get(`/jobs/${id}`);
    return res.data;
  },

  // ✅ Tạo job mới
  create: async (data: any) => {
    const res = await axiosClient.post("/jobs", data);
    return res.data;
  },

  // ✅ Cập nhật job
  update: async (id: string, data: any) => {
    const res = await axiosClient.put(`/jobs/${id}`, data);
    return res.data;
  },

  // ✅ Xóa / đóng job
  remove: async (id: string) => {
    const res = await axiosClient.delete(`/jobs/${id}`);
    return res.data;
  },
};

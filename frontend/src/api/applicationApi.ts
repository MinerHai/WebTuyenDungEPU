import axiosClient from "./axiosClient";

export const applicationApi = {
  /**
   * 🧩 Student apply vào 1 job
   * POST /api/applications/:jobId/apply
   */
  apply: async (jobId: string) => {
    const res = await axiosClient.post(`/applications/${jobId}/apply`);
    return res.data;
  },

  /**
   * 🧾 Lấy danh sách các job mà student đã apply
   * GET /api/applications/mine
   */
  getMine: async () => {
    const res = await axiosClient.get("/applications/mine");
    return res.data.data;
  },

  /**
   * 📋 Employer xem danh sách ứng viên apply vào 1 job
   * GET /api/applications/:jobId/applicants
   */
  getApplicants: async (jobId: string) => {
    const res = await axiosClient.get(`/applications/${jobId}/applicants`);
    return res.data.data;
  },

  /**
   * 🔄 Employer cập nhật trạng thái ứng viên (shortlist, reject, hire)
   * PATCH /api/applications/:appId/status
   */
  updateStatus: async (appId: string, status: string) => {
    const res = await axiosClient.patch(`/applications/${appId}/status`, {
      status,
    });
    return res.data;
  },
};

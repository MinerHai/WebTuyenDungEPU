import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api", // backend Express
  withCredentials: true, // gửi cookie JWT
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: interceptor để log lỗi
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;

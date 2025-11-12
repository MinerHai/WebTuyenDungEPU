import { useState } from "react";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Gửi request đăng nhập
      await authApi.login({ email, password });

      // 2️⃣ Gọi lại getProfile để lấy dữ liệu đầy đủ (user + detail)
      const profileRes = await authApi.getProfile();
      const { user, detail } = profileRes.data;

      // 3️⃣ Gộp dữ liệu vào 1 object giống cấu trúc context cần
      const mergedUser = {
        ...user,
        ...(user.role === "student"
          ? { student: detail }
          : { employer: detail }),
      };

      // 4️⃣ Cập nhật vào AuthContext
      setUser(mergedUser);

      // 5️⃣ Chuyển hướng về trang chủ
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Đăng nhập</h2>
        <p className="auth-subtitle">
          Chào mừng bạn quay lại với EPU Connect 👋
        </p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="auth-footer">
          Chưa có tài khoản?{" "}
          <span onClick={() => navigate("/register")} className="auth-link">
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}

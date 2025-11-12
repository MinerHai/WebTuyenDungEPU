import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/auth.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    major: "",
    className: "",
    gpa: "",
    companyName: "",
    companyAddress: "",
    website: "",
    phoneNumber: "",
    studentId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.register(form);
      setUser(res.data.user);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Đăng ký tài khoản</h2>
        <p className="auth-subtitle">Tham gia EPU Connect ngay hôm nay 🎓</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Tên hiển thị</label>
            <input
              name="username"
              placeholder="Tên hiển thị"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email EPU của bạn"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Vai trò</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Sinh viên</option>
              <option value="employer">Nhà tuyển dụng</option>
            </select>
          </div>

          {form.role === "student" && (
            <div className="role-section fade-in">
              <div className="form-group">
                <label>Mã sinh viên</label>
                <input
                  name="studentId"
                  placeholder="Mã sinh viên"
                  value={form.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Chuyên ngành</label>
                <input
                  name="major"
                  placeholder="Ví dụ: Công nghệ thông tin"
                  value={form.major}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Lớp</label>
                <input
                  name="className"
                  placeholder="Ví dụ: D17CNPM1"
                  value={form.className}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>GPA</label>
                <input
                  name="gpa"
                  placeholder="Nhập GPA (0 - 4)"
                  value={form.gpa}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {form.role === "employer" && (
            <div className="role-section fade-in">
              <div className="form-group">
                <label>Tên công ty</label>
                <input
                  name="companyName"
                  placeholder="Ví dụ: FPT Software"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ công ty</label>
                <input
                  name="companyAddress"
                  placeholder="Số 8 Tôn Thất Thuyết, Cầu Giấy, Hà Nội"
                  value={form.companyAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  name="website"
                  placeholder="https://example.com"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại liên hệ</label>
                <input
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="auth-footer">
          Đã có tài khoản?{" "}
          <span onClick={() => navigate("/login")} className="auth-link">
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}

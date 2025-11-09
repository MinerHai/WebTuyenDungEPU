import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/profile.css";
import { userApi } from "../api/userApi";

export default function Profile() {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Đang tải...</p>
    );
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const res = await userApi.changeAvatar(formData);
      setUser((prev) => (prev ? { ...prev, avatar: res.data.avatar } : prev));
    } catch (err) {
      console.error("Change avatar failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src="/banner-epu.jpg" alt="Banner" className="profile-banner" />
      </div>

      <div className="profile-container">
        <div className="profile-left">
          <div className="avatar-wrapper" onClick={handleAvatarClick}>
            <div className="avatar-border">
              {user.avatar?.secure_url ? (
                <img
                  src={user.avatar.secure_url}
                  alt={user.username}
                  className="profile-avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              {loading && (
                <div className="avatar-overlay">Đang cập nhật...</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <h2 className="profile-name">{user.username}</h2>
          <p className="profile-role">
            {user.role === "student" ? "Sinh viên" : "Nhà tuyển dụng"}
          </p>
          {user.role === "student" && (
            <p className="profile-dept">
              Khoa {user.student?.major || "Chưa cập nhật"}
            </p>
          )}
        </div>

        <div className="profile-right">
          <h3 className="section-title">Thông tin cơ bản</h3>
          <div className="info-card">
            {user.role === "student" ? (
              <>
                <p>
                  <span>Mã sinh viên:</span> {user.student?.studentId || "—"}
                </p>
                <p>
                  <span>Lớp:</span> {user.student?.className || "—"}
                </p>
                <p>
                  <span>Chuyên ngành:</span> {user.student?.major || "—"}
                </p>
                <p>
                  <span>GPA:</span> {user.student?.gpa || "—"}
                </p>
                <p>
                  <span>Mô tả bản thân:</span>{" "}
                  {user.student?.description || "Chưa có"}
                </p>
                <p>
                  <span>CV:</span>{" "}
                  {user.student?.cv?.secure_url ? (
                    <a
                      href={user.student?.cv.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem CV
                    </a>
                  ) : (
                    "Chưa tải lên"
                  )}
                </p>
              </>
            ) : (
              <>
                <p>
                  <span>Tên công ty:</span> {user.employer?.companyName || "—"}
                </p>
                <p>
                  <span>Địa chỉ:</span> {user.employer?.companyAddress || "—"}
                </p>
                <p>
                  <span>Website:</span>{" "}
                  {user.employer?.website ? (
                    <a href={user.employer?.website} target="_blank">
                      {user.employer?.website}
                    </a>
                  ) : (
                    "Chưa có"
                  )}
                </p>
                <p>
                  <span>Số điện thoại:</span>{" "}
                  {user.employer?.phoneNumber || "—"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

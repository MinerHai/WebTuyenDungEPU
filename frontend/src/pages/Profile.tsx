import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/profile.css";
import { userApi } from "../api/userApi";
import EmployerProfileForm from "../components/EmployerProfileForm";
import StudentProfileForm from "../components/StudentProfileFrom";

export default function Profile() {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Đang tải...</p>
    );
  }

  // Avatar
  const handleAvatarClick = () => fileInputRef.current?.click();
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
          <div className="profile-right-header">
            <h3 className="section-title">Thông tin cơ bản</h3>
            {!editMode ? (
              <button className="btn-primary" onClick={() => setEditMode(true)}>
                ✏️ Chỉnh sửa hồ sơ
              </button>
            ) : (
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  className="btn-cancel"
                  onClick={() => setEditMode(false)}
                >
                  ❌ Hủy
                </button>
              </div>
            )}
          </div>

          {/* --- FORM / VIEW --- */}
          {user.role === "student" ? (
            <StudentProfileForm
              user={user}
              editMode={editMode}
              setUser={setUser}
              setEditMode={setEditMode}
            />
          ) : (
            <EmployerProfileForm
              user={user}
              editMode={editMode}
              setUser={setUser}
              setEditMode={setEditMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import logoEpu from "../assets/logo-epu.png";
import "../assets/styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setOpenMenu(false);
    navigate("/login");
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tạo chữ avatar
  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  // Tạo màu nền avatar (từ tên user)
  const getAvatarColor = (name?: string) => {
    const colors = ["#E0F2FE", "#FEF9C3", "#FCE7F3", "#DCFCE7", "#F3E8FF"];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-left" onClick={() => navigate("/")}>
          <img src={logoEpu} alt="EPU Connect" className="navbar-logo" />
          <div className="navbar-brand">
            <h1>EPU</h1>
            <h1>Connect</h1>
          </div>
        </div>

        {/* MENU */}
        <nav className="navbar-center">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/jobs">Việc làm</NavLink>
          <NavLink to="/employers">Nhà tuyển dụng</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
        </nav>

        {/* USER / CTA */}
        <div className="navbar-right">
          {user ? (
            <div className="user-menu" ref={dropdownRef}>
              <div
                className="user-info"
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                <div
                  className="avatar-circle small-avatar"
                  style={{
                    backgroundColor: user.avatar?.secure_url
                      ? "transparent"
                      : getAvatarColor(user.username),
                  }}
                >
                  {user.avatar?.secure_url ? (
                    <img
                      src={user.avatar.secure_url}
                      alt={user.username}
                      className="avatar-img"
                    />
                  ) : (
                    <span className="avatar-text">
                      {getInitial(user.username)}
                    </span>
                  )}
                </div>
                <span className="username">{user.username}</span>
                <i
                  className={`fa-solid fa-chevron-${
                    openMenu ? "up" : "down"
                  } chevron`}
                ></i>
              </div>
              {openMenu && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate("/profile")}>
                    <i className="fa-regular fa-id-card"></i> Trang cá nhân
                  </button>
                  {user.role === "employer" && (
                    <button onClick={() => navigate("/employer/jobs")}>
                      <i className="fa-regular fa-id-card"></i> Danh sách bài
                      tuyển dụng
                    </button>
                  )}

                  {user.role === "student" && (
                    <button onClick={() => navigate("/student/applied-jobs")}>
                      <i className="fa-regular fa-id-card"></i> Danh sách đơn
                      xin tuyển
                    </button>
                  )}
                  <button onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="recruiter-info">
              <div className="avatar-circle">
                <i className="fa-regular fa-user"></i>
              </div>
              <div className="recruiter-text">
                <p className="small">Bạn là nhà tuyển dụng ???</p>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/register")}
                >
                  ĐĂNG TUYỂN NGAY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

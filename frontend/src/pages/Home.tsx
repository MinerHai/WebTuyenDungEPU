import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>
        Chào mừng {user?.username || "bạn"} đến với hệ thống tuyển dụng EPU 🎓
      </h1>
      <p>Đây là trang chính, chỉ hiển thị khi bạn đã đăng nhập.</p>
    </div>
  );
}

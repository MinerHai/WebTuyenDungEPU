import "../assets/styles/FeaturedSections.css";
import samsung from "../assets/samsung.png";
import fpt from "../assets/fpt.png";
import viettel from "../assets/viettel.png";
import mbb from "../assets/mbb.png";
import { Link } from "react-router-dom";
export default function FeaturedSections() {
  const industries = [
    { icon: "💡", label: "Điện - điện tử" },
    { icon: "💻", label: "Công nghệ thông tin" },
    { icon: "🛠️", label: "Tự động hóa" },
    { icon: "🏪", label: "Kinh doanh - bán hàng" },
    { icon: "💼", label: "Hành chính - nhân sự" },
    { icon: "🏛️", label: "Tài chính - ngân hàng" },
    { icon: "🏢", label: "Bất động sản" },
    { icon: "📁", label: "Chăm sóc khách hàng" },
  ];

  const companies = [samsung, fpt, viettel, mbb];

  return (
    <div className="featured-wrapper">
      {/* TOP NGÀNH NGHỀ */}
      <h3 className="section-title">Top ngành nghề nổi bật</h3>

      <div className="industry-grid">
        {industries.map((item, idx) => (
          <Link key={idx} to="/jobs" className="industry-box">
            <div className="industry-icon">{item.icon}</div>
            <span className="industry-label">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* NHÀ TUYỂN DỤNG NỔI BẬT */}
      <h3 className="section-title">Nhà tuyển dụng nổi bật</h3>

      <div className="company-grid">
        {companies.map((logo, idx) => (
          <div key={idx} className="company-box">
            <img src={logo} alt="logo" />
          </div>
        ))}
      </div>
    </div>
  );
}

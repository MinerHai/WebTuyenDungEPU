import "../assets/styles/AboutPage.css";
import epu1 from "../assets/epu1.jpg";
import epu2 from "../assets/epu2.jpg";
export default function AboutPage() {
  return (
    <div className="about-page">
      {/* BANNER */}
      <section className="about-banner">
        <h1>EPU Connect</h1>
        <p>
          Cổng kết nối việc làm dành riêng cho sinh viên Trường Đại học Điện Lực
        </p>
      </section>

      <div className="about-container">
        {/* GIỚI THIỆU */}
        <section className="about-section">
          <h2>Giới thiệu</h2>
          <p>
            <strong>EPU Connect</strong> là nền tảng hỗ trợ sinh viên Trường Đại
            học Điện Lực tìm kiếm việc làm, thực tập và cơ hội nghề nghiệp phù
            hợp. Đồng thời giúp các
            <strong> doanh nghiệp</strong> dễ dàng đăng tin tuyển dụng, kết nối
            và tiếp cận nguồn nhân lực trẻ chất lượng cao.
          </p>
        </section>

        {/* LÝ DO RA ĐỜI */}
        <section className="about-section">
          <h2>Tại sao EPU phát triển EPU Connect?</h2>
          <ul className="bullet-list">
            <li>Tạo cầu nối trực tiếp giữa nhà tuyển dụng và sinh viên EPU.</li>
            <li>
              Giúp sinh viên tiếp cận cơ hội thực tập và việc làm đúng chuyên
              ngành.
            </li>
            <li>Giảm thời gian, chi phí tuyển dụng cho doanh nghiệp.</li>
            <li>Tối ưu quản lý và xác thực thông tin ứng viên.</li>
          </ul>
        </section>

        {/* LỢI ÍCH SINH VIÊN */}
        <section className="about-section grid-2">
          <div>
            <h2>Lợi ích cho sinh viên</h2>
            <ul className="bullet-list">
              <li>Tìm kiếm việc làm theo ngành, kỹ năng, mức lương.</li>
              <li>Tạo và quản lý CV online dễ dàng.</li>
              <li>Ứng tuyển trực tiếp vào hàng trăm doanh nghiệp uy tín.</li>
              <li>Nhận thông báo khi có việc phù hợp.</li>
              <li>Xây dựng hồ sơ năng lực để chuẩn bị ra trường.</li>
            </ul>
          </div>

          <img src={epu1} className="about-img" />
        </section>

        {/* LỢI ÍCH DOANH NGHIỆP */}
        <section className="about-section grid-2 reverse">
          <img src={epu2} className="about-img" />

          <div>
            <h2>Lợi ích cho nhà tuyển dụng</h2>
            <ul className="bullet-list">
              <li>Đăng tin tuyển dụng miễn phí hoặc theo gói nâng cao.</li>
              <li>Tiếp cận hơn 10.000 sinh viên – cựu sinh viên EPU.</li>
              <li>Lọc ứng viên theo chuyên ngành đào tạo.</li>
              <li>Quản lý hồ sơ và ứng viên trên một nền tảng duy nhất.</li>
            </ul>
          </div>
        </section>

        {/* TÍNH NĂNG CHÍNH */}
        <section className="about-section">
          <h2>Tính năng nổi bật</h2>
          <div className="feature-grid">
            <div className="feature-box">
              <h3>🔎 Tìm kiếm việc làm</h3>
              <p>Lọc theo ngành, mức lương, kỹ năng, địa điểm…</p>
            </div>

            <div className="feature-box">
              <h3>📄 Tạo CV Online</h3>
              <p>Hỗ trợ sinh viên tạo CV đẹp và chuẩn.</p>
            </div>

            <div className="feature-box">
              <h3>🏢 Quản lý tuyển dụng</h3>
              <p>Doanh nghiệp dễ dàng đăng tin và quản lý ứng tuyển.</p>
            </div>

            <div className="feature-box">
              <h3>🔔 Thông báo tự động</h3>
              <p>Gợi ý việc phù hợp ngay khi có tin tuyển dụng mới.</p>
            </div>
          </div>
        </section>

        {/* SỐ LIỆU */}
        <section className="stats-section">
          <div className="stat-box">
            <h3>10.000+</h3>
            <p>Sinh viên & cựu sinh viên</p>
          </div>

          <div className="stat-box">
            <h3>300+</h3>
            <p>Doanh nghiệp hợp tác</p>
          </div>

          <div className="stat-box">
            <h3>2.000+</h3>
            <p>Cơ hội việc làm mỗi năm</p>
          </div>
        </section>

        {/* LIÊN HỆ */}
        <section className="about-section">
          <h2>Liên hệ</h2>
          <p>Email: epucareer@epu.edu.vn</p>
          <p>Hotline: 0123 456 789</p>
          <p>Địa chỉ: Trường Đại học Điện Lực, 235 Hoàng Quốc Việt, Hà Nội</p>
        </section>
      </div>
    </div>
  );
}

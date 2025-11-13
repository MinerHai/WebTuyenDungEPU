import "../assets/styles/EmployerPage.css";
import fpt from "../assets/fpt.png";
import banner from "../assets/banner-2.png";
import f1 from "../assets/fpt-telecom.png";
import f2 from "../assets/van-hoa-doanh-nghiep-fpt-happytime-8.jpg";
import f3 from "../assets/fpt3.png";
import f4 from "../assets/fpt2.jpeg";
import { useNavigate } from "react-router-dom";
export default function EmployerPage() {
  const navigate = useNavigate();
  const jobs = [
    {
      _id: "1",
      title: "Frontend Developer",
      salary: "12 - 20 triệu",
      location: "Hà Nội",
    },
    {
      _id: "2",
      title: "Backend Developer (NodeJS)",
      salary: "15 - 25 triệu",
      location: "Hà Nội",
    },
    {
      _id: "3",
      title: "Tester / QA",
      salary: "10 - 18 triệu",
      location: "Hà Nội",
    },
  ];

  return (
    <div className="employer-page">
      {/* BANNER */}
      <div className="employer-banner">
        <img src={banner} className="cover-img" alt="cover" />

        <div className="employer-header">
          <img src={fpt} className="company-avatar" alt="logo" />

          <div className="company-info">
            <h2>LAPTECH SOFTWARE</h2>
            <p>Công nghệ thông tin · 300+ nhân viên</p>
            <button className="follow-btn">+ Theo dõi</button>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* ABOUT */}
        <section className="company-about">
          <h3>Giới thiệu công ty</h3>
          <p>
            FPT là công ty công nghệ hàng đầu với đội ngũ hơn 300 kỹ sư Việt
            Nam. Chúng tôi cung cấp giải pháp phần mềm, AI, Cloud, IoT và dịch
            vụ gia công phần mềm cho thị trường Nhật Bản – Châu Âu – Mỹ.
          </p>
        </section>

        {/* JOB LIST */}
        <section className="company-jobs">
          <h3>Việc làm đang tuyển</h3>

          <div className="job-list">
            {jobs.map((job) => (
              <div
                className="job-item"
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <div className="job-left">
                  <h4>{job.title}</h4>
                  <p>📍 {job.location}</p>
                </div>

                <div className="job-right">
                  <span className="salary">{job.salary}</span>
                  <button className="apply-btn">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="company-gallery">
          <h3>Hình ảnh văn hóa doanh nghiệp</h3>

          <div className="gallery-grid">
            <img src={f1} />
            <img src={f2} />
            <img src={f3} />
            <img src={f4} />
          </div>
        </section>
      </div>
    </div>
  );
}

import React from "react";

import "../assets/styles/home.css";
import type { JobCardProps } from "./CardJob";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/Banner";
import CardJob from "./CardJob";

const Home: React.FC = () => {
  const { user } = useAuth();

  const jobs: JobCardProps[] = [
    {
      title: "Java Developer",
      company: "FPT IS",
      salary: "20 - 40 triệu",
      logo: "/images/java.png",
    },
    {
      title: "Software Developer",
      company: "USOL VIETNAM",
      salary: "9 - 40 triệu",
      logo: "/images/usol.png",
    },
    {
      title: "Kỹ sư AI",
      company: "Viettel",
      salary: "8,000 - 3,500 USD",
      logo: "/images/viettel.png",
    },
  ];

  return (
    <div className="homepage">
      <div className="welcome-box">
        <h1>
          Chào mừng {user?.username || "bạn"} đến với hệ thống tuyển dụng EPU 🎓
        </h1>
        <p>Đây là trang chính, chỉ hiển thị khi bạn đã đăng nhập.</p>
      </div>

      <Banner />

      <section className="job-section">
        <h2>Việc làm mới tương tự việc bạn đã ứng tuyển</h2>

        <div className="job-list">
          {jobs.map((job, index) => (
            <CardJob key={index} {...job} />
          ))}
        </div>

        <div className="view-more">Xem tất cả</div>
      </section>
    </div>
  );
};

export default Home;

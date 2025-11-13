import React from "react";
import "../assets/styles/banner.css";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>KẾT NỐI CƠ HỘI VIỆC LÀM CHO SINH VIÊN ĐIỆN LỰC</h2>

        <div className="search-box">
          <input type="text" placeholder="Vị trí tuyển dụng, tên công ty" />
          <button>Tìm kiếm</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

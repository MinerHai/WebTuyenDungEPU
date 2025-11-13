import React, { useState, type JSX } from "react";
import "../assets/styles/Homebanner.css";
import banner1 from "../assets/banner-1.png";
import banner2 from "../assets/banner-2.png";
import banner3 from "../assets/banner-3.png";

export default function HomeBanner(): JSX.Element {
  const leftItems: string[] = [
    "Thiết kế công trình",
    "Điện tử viễn thông",
    "Quản trị dự án",
    "Kỹ thuật điện",
    "Content/Editor/SEO",
    "Công nghệ thông tin",
    "Điện - Điện tử",
    "Tự động hóa",
    "Công nghệ thông tin ",
    "Điện - Điện tử",
    "Tự động hóa",
    "Cơ khí- Ô tô",
    "Năng lượng - Môi trường",
  ];

  const rightItems: string[] = [banner1, banner2, banner3];

  // index của item đầu tiên đang hiển thị trong left (nhảy 4 mỗi lần)
  const [leftIndex, setLeftIndex] = useState<number>(0);
  // index image bên phải
  const [rightIndex, setRightIndex] = useState<number>(0);

  const LEFT_PAGE_SIZE = 4;

  function nextLeft() {
    setLeftIndex((prev) => (prev + LEFT_PAGE_SIZE) % leftItems.length);
  }
  function prevLeft() {
    setLeftIndex(
      (prev) => (prev - LEFT_PAGE_SIZE + leftItems.length) % leftItems.length
    );
  }

  function nextRight() {
    setRightIndex((prev) => (prev + 1) % rightItems.length);
  }
  function prevRight() {
    setRightIndex((prev) => (prev - 1 + rightItems.length) % rightItems.length);
  }

  // Lấy 4 item để hiển thị, nếu vượt cuối thì wrap về đầu
  const getLeftWindow = (): string[] => {
    const res: string[] = [];
    for (let i = 0; i < LEFT_PAGE_SIZE; i++) {
      res.push(leftItems[(leftIndex + i) % leftItems.length]);
    }
    return res;
  };

  return (
    <div className="banner-wrapper">
      {/* Background / Title / Search */}
      <div className="banner-overlay">
        <h1 className="banner-title">
          KẾT NỐI CƠ HỘI VIỆC LÀM CHO SINH VIÊN ĐIỆN LỰC
        </h1>

        <div className="search-box">
          <input
            aria-label="Tìm kiếm công việc"
            placeholder="Vị trí tuyển dụng, tên công ty"
          />
          <button aria-label="Tìm kiếm">Tìm kiếm</button>
        </div>
      </div>

      {/* Bottom area containing two boxes */}
      <div className="banner-bottom">
        {/* LEFT BOX */}
        <div className="left-box-container box">
          <button
            className="box-arrow-left"
            onClick={prevLeft}
            aria-label="Prev left"
          >
            ←
          </button>

          <div className="left-list">
            {getLeftWindow().map((it, idx) => (
              <div key={idx} className="left-list-item">
                {it}
              </div>
            ))}
          </div>

          <button
            className="box-arrow-right"
            onClick={nextLeft}
            aria-label="Next left"
          >
            →
          </button>
        </div>

        {/* RIGHT BOX */}
        <div className="right-box-container box">
          <button
            className="box-arrow-left"
            onClick={prevRight}
            aria-label="Previous banner"
            type="button"
          >
            ←
          </button>

          <div className="right-image-wrap">
            <img
              src={rightItems[rightIndex]}
              alt={`banner-${rightIndex}`}
              className="right-image"
            />
          </div>

          <button
            className="box-arrow-right"
            onClick={nextRight}
            aria-label="Next banner"
            type="button"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

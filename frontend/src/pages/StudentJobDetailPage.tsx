import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobApi } from "../api/jobApi";
import { applicationApi } from "../api/applicationApi";
import "../assets/styles/jobdetail.css";

export default function StudentJobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Lấy thông tin job hiện tại
        const res = await jobApi.getById(id!);
        setJob(res);

        // 2️⃣ Lấy danh sách job tương tự
        const related = await jobApi.getAll();
        const filtered = related.filter(
          (j: any) => j.jobType === res.jobType && j._id !== res._id
        );
        setRelatedJobs(filtered.slice(0, 3));

        // 3️⃣ Kiểm tra xem user đã apply chưa
        const appliedJobs = await applicationApi.getMine();
        const isApplied = appliedJobs.some((app: any) => app.job._id === id);
        setApplied(isApplied);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };

    fetchData();
  }, [id]);

  // 👉 Hàm xử lý ứng tuyển
  const handleApply = async () => {
    if (applied) return alert("Bạn đã ứng tuyển công việc này rồi.");
    setLoading(true);
    try {
      await applicationApi.apply(id!);
      setApplied(true);
      alert("Ứng tuyển thành công!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Có lỗi khi ứng tuyển!");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <p>Đang tải thông tin công việc...</p>;

  // 👉 Tính số ngày còn lại
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="job-detail-page">
      <div className="page-layout">
        {/* PHẦN CHÍNH */}
        <div className="job-detail-container">
          <div className="job-header">
            <h2 className="job-title">{job.title}</h2>
            <div className="job-meta-list">
              <p className="job-meta">
                📍 <strong>Địa điểm:</strong>{" "}
                {job.location || "Không ghi địa điểm"}
              </p>
              <p className="job-meta">
                🕒 <strong>Loại hình:</strong> {job.jobType}
              </p>
              <p className="job-meta">
                💰 <strong>Mức lương:</strong> {job.salaryFrom.toLocaleString()}{" "}
                - {job.salaryTo?.toLocaleString()} VND
              </p>
              <p className="job-meta">
                ⏳ <strong>Hạn nộp hồ sơ:</strong>{" "}
                {new Date(job.deadline).toLocaleDateString("vi-VN")} ({daysLeft}{" "}
                ngày còn lại)
              </p>
            </div>
          </div>

          <div className="job-section">
            <h3>Mô tả công việc</h3>
            <p className="job-desc">{job.description}</p>
          </div>

          <div className="job-section">
            <h3>Yêu cầu công việc</h3>
            {job.requirements?.length ? (
              <ul>
                {job.requirements.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            ) : (
              <p>Không có yêu cầu cụ thể</p>
            )}
          </div>

          <div className="job-section">
            <h3>Quyền lợi</h3>
            {job.benefits?.length ? (
              <ul>
                {job.benefits.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <p>Không có thông tin quyền lợi</p>
            )}
          </div>

          <button
            className={`apply-btn ${applied ? "disabled" : ""}`}
            onClick={handleApply}
            disabled={loading || applied}
          >
            {applied
              ? "✅ Đã ứng tuyển"
              : loading
              ? "Đang gửi..."
              : "Ứng tuyển ngay"}
          </button>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <h4>🏢 Thông tin công ty</h4>
          <div className="company-box">
            <img
              src={
                job.owner?.avatar.secure_url ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="company-logo"
              className="company-logo"
            />
            <p>
              <strong>Tên:</strong> {job.owner?.username}
            </p>
            <p>
              <strong>Email:</strong> {job.owner?.email}
            </p>
            <p>
              <strong>Ngày đăng:</strong>{" "}
              {new Date(job.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </div>

      {/* GỢI Ý VIỆC LÀM */}
      <div className="related-jobs">
        <h3>💼 Việc làm tương tự</h3>
        <div className="related-list">
          {relatedJobs.map((item) => (
            <div className="related-card" key={item._id}>
              <h4>{item.title}</h4>
              <p>{item.location}</p>
              <p>
                💰 {item.salaryFrom.toLocaleString()} -{" "}
                {item.salaryTo.toLocaleString()} VND
              </p>
              <p>
                ⏳ Còn{" "}
                {Math.ceil(
                  (new Date(item.deadline).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                ngày
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

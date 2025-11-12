import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobApi } from "../api/jobApi";
import { applicationApi } from "../api/applicationApi";
import "../assets/styles/jobdetail.css";

export default function StudentJobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await jobApi.getById(id!);
      setJob(res);
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (applied) return alert("Bạn đã ứng tuyển công việc này rồi.");
    setLoading(true);
    try {
      await applicationApi.apply(id!);
      setApplied(true);
      alert("Ứng tuyển thành công!");
    } catch {
      alert("Có lỗi khi ứng tuyển!");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <p>Đang tải thông tin công việc...</p>;

  return (
    <div className="job-detail-page">
      <div className="job-detail-container">
        <h2 className="job-title">{job.title}</h2>
        <p className="job-meta">
          <strong>Địa điểm:</strong> {job.location || "Không ghi địa điểm"}
        </p>
        <p className="job-meta">
          <strong>Loại hình:</strong> {job.jobType}
        </p>
        {job.salaryFrom && (
          <p className="job-meta">
            <strong>Mức lương:</strong> {job.salaryFrom.toLocaleString()} -{" "}
            {job.salaryTo?.toLocaleString()} VND
          </p>
        )}
        <p className="job-desc">{job.description}</p>

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
    </div>
  );
}

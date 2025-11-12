import { useState } from "react";
import JobForm from "../components/JobForm";
import { jobApi } from "../api/jobApi";
import { useNavigate } from "react-router-dom";
import "../assets/styles/createjob.css";

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await jobApi.create(data);
      alert("Đăng tuyển thành công!");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đăng tuyển!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-page">
      <div className="create-job-container">
        <h2 className="create-job-title">📝 Đăng bài tuyển dụng mới</h2>
        <p className="create-job-subtitle">
          Hãy điền thông tin chi tiết để thu hút ứng viên phù hợp nhất.
        </p>

        <JobForm onSubmit={handleSubmit} loading={loading} />

        <button className="back-btn" onClick={() => navigate("/employer/jobs")}>
          ← Quay lại danh sách bài đăng
        </button>
      </div>
    </div>
  );
}

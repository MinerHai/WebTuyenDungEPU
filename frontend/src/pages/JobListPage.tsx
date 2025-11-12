import { useEffect, useState } from "react";
import { jobApi } from "../api/jobApi";
import JobCard from "../components/JobCard";
import "../assets/styles/joblist.css";
import { useNavigate } from "react-router-dom";

export default function EmployerJobListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const data = await jobApi.getMine();
      setJobs(data);
    } catch (err) {
      console.error("Fetch jobs failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài tuyển dụng này?")) return;
    try {
      await jobApi.remove(id);
      setJobs(jobs.filter((j) => j._id !== id));
      alert("Đã xóa thành công!");
    } catch (err) {
      alert("Lỗi khi xóa bài tuyển dụng!");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list-page">
      <div className="job-header">
        <h2 className="page-title">📋 Bài tuyển dụng của bạn</h2>
        <button
          className="add-job-btn"
          onClick={() => navigate("/employer/jobs/create")}
        >
          + Đăng tuyển dụng mới
        </button>
      </div>

      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onView={(id) => navigate(`/employer/jobs/${id}`)}
              onEdit={(id) => navigate(`/employer/jobs/edit/${id}`)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="empty-text">Chưa có bài tuyển dụng nào.</p>
        )}
      </div>
    </div>
  );
}

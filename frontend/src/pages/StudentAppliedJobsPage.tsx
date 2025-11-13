import { useEffect, useState } from "react";
import { applicationApi } from "../api/applicationApi";
import { Link } from "react-router-dom";
import "../assets/styles/appliedjobs.css";

interface Application {
  _id: string;
  job: {
    _id: string;
    title: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    jobType: string;
    owner: {
      _id: string;
      username: string;
      avatar: {
        public_id: string;
        secure_url: string;
      };
    };
  };
  status: string;
  appliedAt: string;
}

export default function StudentAppliedJobsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await applicationApi.getMine();
        setApplications(res);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Không thể tải danh sách ứng tuyển."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="center-container">
        <div className="loader"></div>
        <p>Đang tải danh sách công việc...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="center-container">
        <p>Bạn chưa ứng tuyển công việc nào.</p>
      </div>
    );
  }

  return (
    <div className="applied-jobs-container">
      <h2 className="page-title">Công việc bạn đã ứng tuyển</h2>

      <div className="jobs-list">
        {applications.map((app) => {
          const job = app.job;
          const employer = job.owner;
          const logo =
            employer.avatar?.secure_url ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png";

          return (
            <div key={app._id} className="job-card">
              <div className="job-header">
                <img src={logo} alt="Company logo" className="company-logo" />
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="company-name">{employer.username}</p>
                </div>
              </div>

              <div className="job-info">
                <p>📍 {job.location}</p>
                <p>
                  💰 {job.salaryFrom.toLocaleString()} -{" "}
                  {job.salaryTo.toLocaleString()} VNĐ
                </p>
                <p>🕒 {job.jobType}</p>
              </div>

              <div className="job-footer">
                <div className="footer-left">
                  <span
                    className={`status-badge status-${app.status.toLowerCase()}`}
                  >
                    {app.status}
                  </span>
                  <span className="applied-date">
                    Nộp ngày:{" "}
                    {new Date(app.appliedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="footer-right">
                  <Link to={`/jobs/${job._id}`} className="detail-button">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

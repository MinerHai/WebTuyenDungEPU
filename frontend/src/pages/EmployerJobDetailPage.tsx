import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobApi } from "../api/jobApi";
import { applicationApi } from "../api/applicationApi";
import "../assets/styles/jobdetail.css";

export default function EmployerJobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobRes = await jobApi.getById(id!);
      setJob(jobRes);
      const applicantsRes = await applicationApi.getApplicants(id!);
      setApplicants(applicantsRes);
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (appId: string, status: string) => {
    await applicationApi.updateStatus(appId, status);
    setApplicants((prev) =>
      prev.map((a) => (a._id === appId ? { ...a, status } : a))
    );
  };

  if (!job) return <p>Đang tải thông tin công việc...</p>;

  return (
    <div className="job-detail-page">
      <div className="job-detail-container">
        <h2 className="job-title">{job.title}</h2>
        <p>
          <strong>Địa điểm:</strong> {job.location}
        </p>
        <p>
          <strong>Loại hình:</strong> {job.jobType}
        </p>
        <p>
          <strong>Mô tả:</strong> {job.description}
        </p>

        <h3 className="applicant-title">📋 Danh sách ứng viên</h3>
        {applicants.length > 0 ? (
          <div className="applicant-list">
            {applicants.map((app) => (
              <div key={app._id} className="applicant-card">
                <div className="applicant-info">
                  <h4>{app.applicantSnapshot?.name}</h4>
                  <p>📧 {app.applicantSnapshot?.email}</p>
                  <p>🎓 {app.applicantSnapshot?.major}</p>
                  <p>📈 GPA: {app.applicantSnapshot?.gpa}</p>
                  {app.applicantSnapshot?.cv?.secure_url && (
                    <a
                      href={app.applicantSnapshot.cv.secure_url}
                      target="_blank"
                      rel="noreferrer"
                      className="cv-link"
                    >
                      📄 Xem CV
                    </a>
                  )}
                </div>

                <div className="applicant-actions">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="shortlist">Vòng phỏng vấn</option>
                    <option value="reject">Từ chối</option>
                    <option value="hire">Nhận làm</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có ứng viên nào ứng tuyển.</p>
        )}
      </div>
    </div>
  );
}

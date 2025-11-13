import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobApi } from "../api/jobApi";
import { applicationApi } from "../api/applicationApi";
import "../assets/styles/jobdetail.css";

export default function EmployerJobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jobRes = await jobApi.getById(id!);
      setJob(jobRes);
      const applicantsRes = await applicationApi.getApplicants(id!);
      setApplicants(applicantsRes.data || applicantsRes);
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (appId: string, status: string) => {
    await applicationApi.updateStatus(appId, status);
    setApplicants((prev) =>
      prev.map((a) => (a._id === appId ? { ...a, status } : a))
    );
    if (selectedApplicant?._id === appId)
      setSelectedApplicant({ ...selectedApplicant, status });
  };

  const openModal = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplicant(null);
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
              <div
                key={app._id}
                className="applicant-card"
                onClick={() => openModal(app)}
              >
                <div className="applicant-header">
                  <img
                    src={
                      app.applicant?.avatar?.secure_url ||
                      "https://via.placeholder.com/40"
                    }
                    alt=""
                    className="applicant-avatar"
                  />
                  <div>
                    <h4>{app.applicant?.username}</h4>
                    <p>{app.applicant?.email}</p>
                  </div>
                </div>
                <div className="applicant-actions">
                  <span className={`status-badge status-${app.status}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có ứng viên nào ứng tuyển.</p>
        )}
      </div>

      {/* MODAL HIỂN THỊ CHI TIẾT ỨNG VIÊN */}
      {isModalOpen && selectedApplicant && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-header">
              <img
                src={
                  selectedApplicant.applicant?.avatar?.secure_url ||
                  "https://via.placeholder.com/80"
                }
                alt="avatar"
                className="modal-avatar"
              />
              <div>
                <h3>{selectedApplicant.applicant?.username}</h3>
                <p>{selectedApplicant.applicant?.email}</p>
              </div>
            </div>

            <div className="modal-body">
              <p>
                <strong>Chuyên ngành:</strong>{" "}
                {selectedApplicant.applicant?.studentProfile?.major}
              </p>
              <p>
                <strong>GPA:</strong>{" "}
                {selectedApplicant.applicant?.studentProfile?.gpa}
              </p>
              <p>
                <strong>Ngày nộp đơn:</strong>{" "}
                {new Date(selectedApplicant.appliedAt).toLocaleString()}
              </p>

              {selectedApplicant.resume?.secure_url && (
                <a
                  href={selectedApplicant.resume.secure_url}
                  target="_blank"
                  rel="noreferrer"
                  className="cv-link"
                >
                  📄 Xem CV
                </a>
              )}

              <div className="status-section">
                <label>Trạng thái:</label>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) =>
                    handleStatusChange(selectedApplicant._id, e.target.value)
                  }
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="shortlisted">Vòng phỏng vấn</option>
                  <option value="rejected">Từ chối</option>
                  <option value="hired">Nhận làm</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

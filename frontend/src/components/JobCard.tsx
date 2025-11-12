import "../assets/styles/joblist.css";

interface JobCardProps {
  job: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function JobCard({
  job,
  onEdit,
  onDelete,
  onView,
}: JobCardProps) {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-desc">{job.description}</p>

      <div className="job-meta">
        <span>{job.location || "Không ghi địa điểm"}</span>
        <span>{job.jobType}</span>
        {job.salaryFrom && (
          <span>
            💰 {job.salaryFrom.toLocaleString()} -{" "}
            {job.salaryTo?.toLocaleString()} VND
          </span>
        )}
        {job.createdAt && (
          <span>🕓 {new Date(job.createdAt).toLocaleDateString("vi-VN")}</span>
        )}
      </div>

      {(onEdit || onDelete || onView) && (
        <div className="job-actions">
          {onView && (
            <button className="btn-view" onClick={() => onView(job._id)}>
              👁 Xem chi tiết
            </button>
          )}
          {onEdit && (
            <button className="btn-edit" onClick={() => onEdit(job._id)}>
              ✏️ Sửa
            </button>
          )}
          {onDelete && (
            <button className="btn-delete" onClick={() => onDelete(job._id)}>
              🗑 Xóa
            </button>
          )}
        </div>
      )}
    </div>
  );
}

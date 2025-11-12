import { useEffect, useState } from "react";
import { jobApi } from "../api/jobApi";
import "../assets/styles/jobexplore.css";
import { useNavigate } from "react-router-dom";

export default function JobExplorePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
  });

  const fetchJobs = async (pageNum = 1) => {
    try {
      const params = {
        keyword: filters.keyword || undefined,
        location: filters.location || undefined,
        jobType: filters.jobType || undefined,
        page: pageNum,
        limit: 6, // mỗi trang 6 job
      };
      const res = await jobApi.getAll(params);
      setJobs(res.data);
      setTotalPages(res.meta.totalPages || 1);
      setPage(res.meta.page);
    } catch (err) {
      console.error("Fetch jobs failed:", err);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchJobs(newPage);
  };

  return (
    <div className="job-explore-page">
      <div className="job-header">
        <h2>🔥 Việc làm tốt nhất hôm nay</h2>
        <p>Khám phá hàng trăm cơ hội nghề nghiệp phù hợp với bạn!</p>
      </div>

      <form className="filter-bar" onSubmit={handleSearch}>
        <input
          placeholder="🔍 Từ khóa (VD: React, Node.js...)"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />
        <input
          placeholder="📍 Địa điểm"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
        >
          <option value="">Tất cả loại công việc</option>
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
          <option value="intern">Intern</option>
          <option value="contract">Contract</option>
        </select>
        <button type="submit" className="search-btn">
          Tìm kiếm
        </button>
      </form>

      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-top">
                <img
                  src={
                    job.owner?.avatar?.secure_url ||
                    "https://via.placeholder.com/60?text=Logo"
                  }
                  alt="company-logo"
                  className="company-logo"
                />
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="company-name">{job.owner?.username}</p>
                </div>
              </div>

              <p className="job-desc">{job.description?.slice(0, 100)}...</p>

              <div className="job-meta">
                {job.salaryFrom && (
                  <span className="salary">
                    💰 {job.salaryFrom.toLocaleString()} -{" "}
                    {job.salaryTo?.toLocaleString()} VND
                  </span>
                )}
                <span className="location">📍 {job.location}</span>
              </div>

              <div className="job-footer">
                <span className={`badge ${job.jobType}`}>{job.jobType}</span>
                <button
                  className="apply-btn"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-job">Không tìm thấy công việc nào.</p>
        )}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            ← Trước
          </button>
          <span>
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}

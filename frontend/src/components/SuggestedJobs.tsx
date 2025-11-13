import "../assets/styles/SuggestedJobs.css";
import { useNavigate } from "react-router-dom";

interface Props {
  jobs: any;
}

export default function SuggestedJobs({ jobs }: Props) {
  const navigate = useNavigate();

  return (
    <div className="suggest-wrapper">
      <h3 className="suggest-title">Việc làm gợi ý</h3>

      <div className="suggest-grid">
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="suggest-card"
            onClick={() => navigate(`/jobs/${job._id}`)}
          >
            <img
              src={
                job.owner?.avatar?.secure_url ||
                "https://via.placeholder.com/80?text=Logo"
              }
              alt="logo"
              className="suggest-logo"
            />

            <div className="suggest-info">
              <h4 className="suggest-job-title">{job.title}</h4>
              <p className="suggest-company">{job.company}</p>
              <p className="suggest-salary">{` 💰 ${job.salaryFrom?.toLocaleString()} - ${job.salaryTo?.toLocaleString()} VND`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

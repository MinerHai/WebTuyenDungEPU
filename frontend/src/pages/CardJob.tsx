import React from "react";
import "../assets/styles/cardjob.css";

export interface JobCardProps {
  title: string;
  company: string;
  salary: string;
  logo: string;
}

const CardJob: React.FC<JobCardProps> = ({ title, company, salary, logo }) => {
  return (
    <div className="job-card">
      <img src={logo} alt="logo" className="job-logo" />

      <div className="job-info">
        <h3>{title}</h3>
        <p className="company">{company}</p>
        <p className="salary">{salary}</p>
      </div>
    </div>
  );
};

export default CardJob;

import React, { useEffect, useState } from "react";

import { jobApi } from "../api/jobApi";
import "../assets/styles/home.css";
import Banner from "../components/Banner";
import FeaturedSections from "../components/FeaturedSections";
import SuggestedJobs from "../components/SuggestedJobs";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const fetchJobs = async () => {
    try {
      const params = {
        limit: 6,
      };
      const res = await jobApi.getAll(params);
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch jobs failed:", err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="homepage">
      <Banner />

      <SuggestedJobs jobs={jobs} />

      <FeaturedSections />
    </div>
  );
};

export default Home;

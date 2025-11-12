import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { jobApi } from "../api/jobApi";

export default function EditJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await jobApi.getById(id!);
        setJob(res);
      } catch {
        alert("Không tìm thấy bài tuyển dụng");
        navigate("/employer/jobs");
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await jobApi.update(id!, data);
      alert("Cập nhật thành công!");
      navigate("/employer/jobs");
    } catch {
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <p style={{ padding: "2rem" }}>Đang tải...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chỉnh sửa bài tuyển dụng</h2>
      <JobForm initialValues={job} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../assets/styles/jobform.css";

interface JobFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
  initialValues?: any; // ✅ thêm dòng này để cho phép nhận dữ liệu khi edit
}

export default function JobForm({
  onSubmit,
  loading,
  initialValues,
}: JobFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    jobType: "fulltime",
    deadline: "",
  });

  // ✅ Khi có initialValues (trang Edit), đổ dữ liệu vào form
  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        description: initialValues.description || "",
        location: initialValues.location || "",
        salaryFrom: initialValues.salaryFrom || "",
        salaryTo: initialValues.salaryTo || "",
        jobType: initialValues.jobType || "fulltime",
        deadline: initialValues.deadline
          ? initialValues.deadline.slice(0, 10) // định dạng yyyy-mm-dd
          : "",
      });
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <label>Tiêu đề công việc</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>Mô tả công việc</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <label>Địa điểm</label>
      <input name="location" value={form.location} onChange={handleChange} />

      <label>Mức lương (từ)</label>
      <input
        name="salaryFrom"
        type="number"
        value={form.salaryFrom}
        onChange={handleChange}
      />

      <label>Mức lương (đến)</label>
      <input
        name="salaryTo"
        type="number"
        value={form.salaryTo}
        onChange={handleChange}
      />

      <label>Hình thức làm việc</label>
      <select name="jobType" value={form.jobType} onChange={handleChange}>
        <option value="fulltime">Full-time</option>
        <option value="parttime">Part-time</option>
        <option value="intern">Intern</option>
        <option value="contract">Contract</option>
      </select>

      <label>Hạn nộp hồ sơ</label>
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Đang lưu..." : "Lưu công việc"}
      </button>
    </form>
  );
}

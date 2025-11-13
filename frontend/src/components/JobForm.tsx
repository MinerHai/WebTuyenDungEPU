import React, { useState, useEffect } from "react";
import "../assets/styles/jobform.css";

interface JobFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
  initialValues?: any;
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
    requirements: "",
    benefits: "",
    deadline: "",
  });

  // ✅ Khi có initialValues (dành cho trang Edit)
  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        description: initialValues.description || "",
        location: initialValues.location || "",
        salaryFrom: initialValues.salaryFrom || "",
        salaryTo: initialValues.salaryTo || "",
        jobType: initialValues.jobType || "fulltime",
        requirements: initialValues.requirements
          ? initialValues.requirements.join("\n")
          : "",
        benefits: initialValues.benefits
          ? initialValues.benefits.join("\n")
          : "",
        deadline: initialValues.deadline
          ? initialValues.deadline.slice(0, 10)
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

    // ✅ Chuẩn hóa dữ liệu trước khi gửi
    const dataToSend = {
      ...form,
      salaryFrom: form.salaryFrom ? Number(form.salaryFrom) : undefined,
      salaryTo: form.salaryTo ? Number(form.salaryTo) : undefined,
      requirements: form.requirements
        ? form.requirements.split("\n").map((s) => s.trim())
        : [],
      benefits: form.benefits
        ? form.benefits.split("\n").map((s) => s.trim())
        : [],
      deadline: form.deadline ? new Date(form.deadline) : undefined,
    };

    onSubmit(dataToSend);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <label>Tiêu đề công việc *</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>Mô tả công việc *</label>
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
      </select>

      <label>Yêu cầu công việc (mỗi dòng 1 mục)</label>
      <textarea
        name="requirements"
        value={form.requirements}
        onChange={handleChange}
        rows={3}
        placeholder="VD: Có kinh nghiệm ReactJS ít nhất 6 tháng..."
      />

      <label>Quyền lợi (mỗi dòng 1 mục)</label>
      <textarea
        name="benefits"
        value={form.benefits}
        onChange={handleChange}
        rows={3}
        placeholder="VD: Thưởng lễ tết, Du lịch công ty..."
      />

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

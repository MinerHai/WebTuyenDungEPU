import { useState, type Dispatch, type SetStateAction } from "react";
import { userApi } from "../api/userApi";

interface Props {
  user: any; // 👈 hoặc dùng kiểu rõ ràng hơn nếu bạn có
  editMode: boolean;
  setUser: Dispatch<SetStateAction<any>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function StudentProfileForm({
  user,
  editMode,
  setUser,
  setEditMode,
}: Props) {
  const [form, setForm] = useState({
    studentId: user.student?.studentId || "",
    className: user.student?.className || "",
    major: user.student?.major || "",
    gpa: user.student?.gpa || "",
    description: user.student?.description || "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));
      if (cvFile) formData.append("cv", cvFile);

      const res = await userApi.updateStudentProfile(formData);
      setUser((prev: any) =>
        prev ? { ...prev, student: res.data.profile } : prev
      );
      alert("✅ Hồ sơ sinh viên đã được cập nhật!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("❌ Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!editMode) {
    return (
      <div className="info-card">
        <p>
          <span>Mã sinh viên:</span> {user.student?.studentId || "—"}
        </p>
        <p>
          <span>Lớp:</span> {user.student?.className || "—"}
        </p>
        <p>
          <span>Chuyên ngành:</span> {user.student?.major || "—"}
        </p>
        <p>
          <span>GPA:</span> {user.student?.gpa || "—"}
        </p>
        <p>
          <span>Mô tả:</span> {user.student?.description || "—"}
        </p>
        <div className="cv-section">
          <span className="cv-label">CV:</span>
          {user.student?.cv?.secure_url ? (
            <div className="cv-preview-card">
              {user.student.cv.secure_url.endsWith(".pdf") ? (
                <iframe
                  src={user.student.cv.secure_url}
                  title="CV Preview"
                  className="cv-frame"
                />
              ) : (
                <img
                  src={user.student.cv.secure_url}
                  alt="CV Preview"
                  className="cv-image"
                />
              )}
            </div>
          ) : (
            <p className="cv-empty">Chưa tải lên</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="info-card">
      <input
        name="studentId"
        placeholder="Mã sinh viên"
        value={form.studentId}
        onChange={handleChange}
      />
      <input
        name="className"
        placeholder="Lớp"
        value={form.className}
        onChange={handleChange}
      />
      <input
        name="major"
        placeholder="Chuyên ngành"
        value={form.major}
        onChange={handleChange}
      />
      <input
        name="gpa"
        type="number"
        placeholder="GPA"
        value={form.gpa}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Mô tả bản thân"
        value={form.description}
        onChange={handleChange}
      />
      <label htmlFor="cv">CV mới:</label>
      <input
        id="cv"
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
      />
      <button className="btn-save" onClick={handleSave} disabled={loading}>
        💾 Lưu
      </button>
    </div>
  );
}

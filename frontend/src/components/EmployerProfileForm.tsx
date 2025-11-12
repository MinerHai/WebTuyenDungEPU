import { useState, type Dispatch, type SetStateAction } from "react";
import { userApi } from "../api/userApi";

interface Props {
  user: any; // 👈 hoặc dùng kiểu rõ ràng hơn nếu bạn có
  editMode: boolean;
  setUser: Dispatch<SetStateAction<any>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function EmployerProfileForm({
  user,
  editMode,
  setUser,
  setEditMode,
}: Props) {
  const [form, setForm] = useState({
    companyName: user.employer?.companyName || "",
    companyAddress: user.employer?.companyAddress || "",
    website: user.employer?.website || "",
    phoneNumber: user.employer?.phoneNumber || "",
    description: user.employer?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await userApi.updateEmployerProfile(form);
      setUser((prev: any) =>
        prev ? { ...prev, employer: res.data.profile } : prev
      );
      alert("✅ Hồ sơ công ty đã được cập nhật!");
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
          <span>Tên công ty:</span> {user.employer?.companyName || "—"}
        </p>
        <p>
          <span>Địa chỉ:</span> {user.employer?.companyAddress || "—"}
        </p>
        <p>
          <span>Website:</span> {user.employer?.website || "—"}
        </p>
        <p>
          <span>Số điện thoại:</span> {user.employer?.phoneNumber || "—"}
        </p>
        <p>
          <span>Mô tả:</span> {user.employer?.description || "—"}
        </p>
      </div>
    );
  }

  return (
    <div className="info-card">
      <input
        name="companyName"
        placeholder="Tên công ty"
        value={form.companyName}
        onChange={handleChange}
      />
      <input
        name="companyAddress"
        placeholder="Địa chỉ"
        value={form.companyAddress}
        onChange={handleChange}
      />
      <input
        name="website"
        placeholder="Website"
        value={form.website}
        onChange={handleChange}
      />
      <input
        name="phoneNumber"
        placeholder="Số điện thoại"
        value={form.phoneNumber}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Giới thiệu công ty"
        value={form.description}
        onChange={handleChange}
      />
      <button className="btn-save" onClick={handleSave} disabled={loading}>
        💾 Lưu
      </button>
    </div>
  );
}

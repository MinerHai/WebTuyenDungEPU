import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth-middleware";
import { User } from "../models/User";
import { deleteImage, uploadImage } from "../utils/cloudinary-util";
import { Student } from "../models/Student";
import { Employer } from "../models/Employer";
import bcrypt from "bcryptjs/umd/types";
import { createAccessToken, sendTokenAsCookie } from "../utils/jwt-ulti";

/**
 * Đổi avatar user
 * @route PATCH /api/user/avatar
 * @access Private
 */
export const changeAvatar = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });

    const file = req.file;
    if (!file)
      return res.status(400).json({ message: "Vui lòng chọn ảnh avatar" });

    const user = await User.findById(req.user.userId);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    // Xoá ảnh cũ trên Cloudinary (nếu có)
    if (user.avatar?.public_id) {
      await deleteImage(user.avatar.public_id);
    }

    // Upload ảnh mới
    const uploaded = await uploadImage(file.path, "avatars");

    // Cập nhật DB
    user.avatar = {
      public_id: uploaded.public_id,
      secure_url: uploaded.secure_url,
    };
    await user.save();

    res.status(200).json({
      message: "Cập nhật avatar thành công!",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Change avatar error:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật avatar" });
  }
};

/**
 * Sinh viên cập nhật hồ sơ + CV
 * @route PATCH /api/user/profile/student
 * @access Private (role: student)
 */
export const updateStudentProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user!;
    const file = req.file;
    const data = req.body;

    const student = await Student.findOne({ userId });
    if (!student)
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });

    // Nếu có file CV mới
    if (file) {
      // Xoá CV cũ nếu có
      if (student.cv?.public_id) {
        await deleteImage(student.cv.public_id);
      }
      const uploadedCV = await uploadImage(file.path, "cv");
      student.cv = {
        public_id: uploadedCV.public_id,
        secure_url: uploadedCV.secure_url,
      };
    }

    // Cập nhật thông tin khác
    student.studentId = data.studentId || student.major;
    student.major = data.major || student.major;
    student.className = data.className || student.className;
    student.gpa = data.gpa ?? student.gpa;
    student.description = data.description || student.description;

    await student.save();

    res.status(200).json({
      message: "Cập nhật hồ sơ sinh viên thành công!",
      profile: student,
    });
  } catch (error) {
    console.error("Update student profile error:", error);
    res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật hồ sơ sinh viên" });
  }
};

/**
 * Nhà tuyển dụng cập nhật hồ sơ công ty
 * @route PATCH /api/user/profile/employer
 * @access Private (role: employer)
 */
export const updateEmployerProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user!;
    const data = req.body;

    const employer = await Employer.findOne({ userId });
    if (!employer)
      return res.status(404).json({ message: "Không tìm thấy nhà tuyển dụng" });

    employer.companyName = data.companyName || employer.companyName;
    employer.companyAddress = data.companyAddress || employer.companyAddress;
    employer.website = data.website || employer.website;
    employer.phoneNumber = data.phoneNumber || employer.phoneNumber;
    employer.description = data.description || employer.description;

    await employer.save();

    res.status(200).json({
      message: "Cập nhật hồ sơ nhà tuyển dụng thành công!",
      profile: employer,
    });
  } catch (error) {
    console.error("Update employer profile error:", error);
    res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật hồ sơ nhà tuyển dụng" });
  }
};

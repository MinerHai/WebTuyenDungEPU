import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import EmployerJobListPage from "../pages/JobListPage";
import JobExplorePage from "../pages/JobExplorePage";
import EditJobPage from "../pages/EditJobPage";
import CreateJobPage from "../pages/CreateJobPage";
import EmployerJobDetailPage from "../pages/EmployerJobDetailPage";
import StudentJobDetailPage from "../pages/StudentJobDetailPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Bắt buộc đăng nhập mới vào Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Employer */}

        <Route path="/employer/jobs/:id" element={<EmployerJobDetailPage />} />
        <Route path="/employer/jobs" element={<EmployerJobListPage />} />
        <Route path="/employer/jobs/create" element={<CreateJobPage />} />
        <Route path="/employer/jobs/edit/:id" element={<EditJobPage />} />

        {/* Student */}
        <Route path="/jobs" element={<JobExplorePage />} />
        <Route path="/jobs/:id" element={<StudentJobDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

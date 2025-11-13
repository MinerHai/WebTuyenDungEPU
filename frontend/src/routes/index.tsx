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
import StudentAppliedJobsPage from "../pages/StudentAppliedJobsPage";
import EmployerPage from "../pages/EmployerPage";
import AboutPage from "../pages/AboutPage";

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
        <Route
          path="/employers"
          element={
            <ProtectedRoute>
              <EmployerPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        ></Route>

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

        <Route
          path="/employer/jobs/:id"
          element={
            <ProtectedRoute>
              <EmployerJobDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute>
              <EmployerJobListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/jobs/edit/:id"
          element={
            <ProtectedRoute>
              <EditJobPage />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobExplorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <StudentJobDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/applied-jobs"
          element={
            <ProtectedRoute>
              <StudentAppliedJobsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

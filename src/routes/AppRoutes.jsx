import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Services from "../pages/Services";
import WorkerDetails from "../pages/WorkerDetails";
import Profile from "../pages/Profile";
import UserDashboard from "../pages/UserDashboard";
import WorkerDashboard from "../pages/WorkerDashboard";
import WorkerRegistration from "../pages/WorkerRegistration";
import BookingHistory from "../pages/BookingHistory";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={token ? <Navigate to="/home" replace /> : <Landing />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={token ? <Navigate to="/home" replace /> : <Signup />}
      />

      {/* Protected Pages */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/:id"
        element={
          <ProtectedRoute>
            <WorkerDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker-dashboard"
        element={
          <ProtectedRoute>
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker-register"
        element={
          <ProtectedRoute>
            <WorkerRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-history"
        element={
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        }
      />

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to={token ? "/home" : "/"} replace />} />
    </Routes>
  );
}

export default AppRoutes;

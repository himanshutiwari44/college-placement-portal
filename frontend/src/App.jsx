import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import HomePage from './components/HomePage';
import StudentLayout from './student/StudentLayout';
import StudentDashboard from './student/StudentDashboard';
import JobListings from './student/JobListings';
import Applications from './student/Applications';
import Events from './student/Events';
import Interviews from './student/Interviews';
import Notifications from './student/Notifications';
import Resources from './student/Resources';
import Settings from './student/Settings';
import FacultyLayout from './faculty/FacultyLayout';
import FacultyDashboard from './faculty/FacultyDashboard';
import JobManagement from './faculty/JobManagement';
import FacultyStudents from './faculty/Students';
import FacultyApplications from './faculty/Applications';
import FacultyInterviews from './faculty/Interviews';
import Company from './faculty/Company';
import Reports from './faculty/Reports';
import FacultySettings from './faculty/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute requiredRole="student">
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="jobs" element={<JobListings />} />
            <Route path="applications" element={<Applications />} />
            <Route path="events" element={<Events />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="resources" element={<Resources />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Protected Faculty Routes */}
          <Route path="/faculty" element={
            <ProtectedRoute requiredRole="faculty">
              <FacultyLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/faculty/dashboard" replace />} />
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="students" element={<FacultyStudents />} />
            <Route path="applications" element={<FacultyApplications />} />
            <Route path="interviews" element={<FacultyInterviews />} />
            <Route path="company" element={<Company />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<FacultySettings />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

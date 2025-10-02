import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={<StudentLayout />}>
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
                <Route path="/faculty" element={<FacultyLayout />}>
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          );
        }

        export default App;

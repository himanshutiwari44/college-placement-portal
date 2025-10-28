import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleStudentClick = () => {
    if (isAuthenticated && user?.role === 'student') {
      navigate('/student');
    } else {
      navigate('/login');
    }
  };

  const handleFacultyClick = () => {
    if (isAuthenticated && user?.role === 'faculty') {
      navigate('/faculty');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">CP</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">College Placement Portal</h1>
          <p className="text-gray-600 mb-8">Select your role to continue</p>
          
          {isAuthenticated ? (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Welcome back, {user?.name || user?.email}!
              </p>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-500 mb-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mb-6 space-y-2">
              <Link
                to="/login"
                className="block text-sm text-blue-600 hover:text-blue-500"
              >
                Already have an account? Sign in
              </Link>
              <Link
                to="/signup"
                className="block text-sm text-green-600 hover:text-green-500"
              >
                New user? Create account
              </Link>
            </div>
          )}
          
          <div className="space-y-4">
            <button
              onClick={handleStudentClick}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span className="mr-3 text-lg">🎓</span>
              Student
            </button>
            
            <button
              onClick={handleFacultyClick}
              className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span className="mr-3 text-lg">👨‍🏫</span>
              Faculty/Placement Cell
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Choose your role to access the appropriate dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

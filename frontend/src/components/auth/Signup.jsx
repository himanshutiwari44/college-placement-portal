import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StudentSignup from './StudentSignup';
import FacultySignup from './FacultySignup';

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState('student');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">CP</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Your Role</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={selectedRole === 'student'}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                🎓 Student
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="faculty"
                checked={selectedRole === 'faculty'}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                👨‍🏫 Faculty/Placement Cell
              </span>
            </label>
          </div>
        </div>

        {/* Dynamic Signup Form */}
        {selectedRole === 'student' ? (
          <StudentSignup />
        ) : (
          <FacultySignup />
        )}
      </div>
    </div>
  );
};

export default Signup;

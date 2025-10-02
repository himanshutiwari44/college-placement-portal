import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/student');
  };

  const handleFacultyClick = () => {
    navigate('/faculty');
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

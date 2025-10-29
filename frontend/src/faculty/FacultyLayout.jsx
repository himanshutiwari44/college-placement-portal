import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const FacultyLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/faculty/dashboard' },
    { id: 'jobs', name: 'Job Management', icon: '💼', path: '/faculty/jobs' },
    { id: 'students', name: 'Students', icon: '👥', path: '/faculty/students' },
    { id: 'applications', name: 'Applications', icon: '📋', path: '/faculty/applications' },
    // { id: 'interviews', name: 'Interviews', icon: '🎯', path: '/faculty/interviews' },
    // { id: 'company', name: 'Companies', icon: '🏢', path: '/faculty/company' },
    { id: 'reports', name: 'Reports', icon: '📈', path: '/faculty/reports' },
    { id: 'settings', name: 'Settings', icon: '⚙️', path: '/faculty/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const getCurrentPage = () => {
    const currentPath = location.pathname;
    const currentNav = navigation.find(nav => nav.path === currentPath);
    return currentNav ? currentNav.id : 'dashboard';
  };

  return (
    <div className="min-h-screen mt-2 bg-gray-50">
      <div>
        <nav className="bg-white shadow-lg p-2 flex items-center justify-between border-b border-gray-200">
          {/* Logo */}
         

          {/* Navigation Links */}
          <div className="flex overflow-x-auto scrollhidden items-center gap-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  getCurrentPage() === item.id
                    ? '!bg-black !text-white'
                    : '!text-white hover:!bg-gray-600 !bg-green-600'
                }`}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          {/* Logout Button */}
          <div className="flex items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium !text-white !bg-red-600 rounded-lg hover:!bg-red-700 transition-colors"
            >
              <span className="mr-2 text-lg">🚪</span>
              Logout
            </button>
          </div>
          </div>

        </nav>
      </div>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-600 text-xl">🚪</span>
              </div>
              <div>
                <h1 className="text-sm text-gray-600">Are you sure you want to logout?</h1>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 text-sm font-medium !text-gray-700 !bg-gray-100 rounded-lg hover:!bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 text-sm font-medium !text-white !bg-red-600 rounded-lg hover:!bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyLayout;
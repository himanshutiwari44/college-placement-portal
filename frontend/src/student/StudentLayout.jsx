import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠', path: '/student/dashboard' },
    { id: 'jobs', name: 'Jobs', icon: '💼', path: '/student/jobs' },
    { id: 'applications', name: 'Applications', icon: '📋', path: '/student/applications' },
    { id: 'events', name: 'Events', icon: '📅', path: '/student/events' },
    // { id: 'interviews', name: 'Interviews', icon: '🎯', path: '/student/interviews' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', path: '/student/notifications' },
    // { id: 'resources', name: 'Resources', icon: '📚', path: '/student/resources' },
    { id: 'settings', name: 'Settings', icon: '⚙️', path: '/student/settings' }
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

  const notifications = [
    { id: 1, message: 'Interview scheduled with Tech Corp', time: '2 hours ago', unread: true },
    { id: 2, message: 'New job posting matches your profile', time: '5 hours ago', unread: true },
    { id: 3, message: 'Application status updated', time: '1 day ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen mt-2 bg-gray-50">
      {/* Top Navigation Bar */}
      


    
        <div>
       <nav className="bg-white shadow-lg p-2 flex items-center justify-between border-b border-gray-200">
              {/* Navigation Links */}
             <div className="flex overflow-x-auto scrollhidden items-center gap-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      getCurrentPage() === item.id
                        ? '!bg-black !text-white'
                        : '!text-white hover:!bg-var(--primary-hover) !bg-var(--primary-color)'
                    }`}
                  >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.name}
                    {item.id === 'notifications' && unreadCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
          

            
              <div className="flex items-center">
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium !text-white !bg-red-600 rounded-lg hover:!bg-red-700  transition-colors"
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
                {/* <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3> */}
                <h1 className="text-lg font-bold text-gray-600">Are you sure you want to logout?</h1>
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
                className="flex-1 px-4 py-2 text-sm font-medium text-white !bg-red-600 rounded-lg hover:!bg-red-700 transition-colors"
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

export default StudentLayout;

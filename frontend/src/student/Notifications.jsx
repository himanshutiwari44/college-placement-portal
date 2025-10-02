import React, { useState } from 'react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Interview Scheduled',
      message: 'Your technical interview with Tech Corp has been scheduled for January 25th at 10:00 AM.',
      type: 'interview',
      priority: 'high',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      action: 'View Details',
      actionUrl: '/student/interviews'
    },
    {
      id: 2,
      title: 'New Job Match',
      message: 'A new job posting for "Frontend Developer" at FinTech Solutions matches your profile.',
      type: 'job',
      priority: 'medium',
      timestamp: '2024-01-20T09:15:00Z',
      read: false,
      action: 'View Job',
      actionUrl: '/student/jobs'
    },
    {
      id: 3,
      title: 'Application Status Update',
      message: 'Your application for Data Analyst at DataSoft has been moved to "Interview Scheduled" status.',
      type: 'application',
      priority: 'high',
      timestamp: '2024-01-19T16:45:00Z',
      read: true,
      action: 'View Application',
      actionUrl: '/student/applications'
    },
    {
      id: 4,
      title: 'Profile Completion Reminder',
      message: 'Complete your profile to increase your chances of getting noticed by recruiters.',
      type: 'profile',
      priority: 'low',
      timestamp: '2024-01-19T14:20:00Z',
      read: true,
      action: 'Complete Profile',
      actionUrl: '/student/profile'
    },
    {
      id: 5,
      title: 'Offer Received',
      message: 'Congratulations! You have received an offer from CloudTech for the DevOps Engineer position.',
      type: 'offer',
      priority: 'high',
      timestamp: '2024-01-18T11:00:00Z',
      read: true,
      action: 'View Offer',
      actionUrl: '/student/applications'
    },
    {
      id: 6,
      title: 'Interview Reminder',
      message: 'Your interview with AI Innovations is tomorrow at 11:00 AM. Don\'t forget to prepare!',
      type: 'reminder',
      priority: 'medium',
      timestamp: '2024-01-17T18:30:00Z',
      read: true,
      action: 'View Details',
      actionUrl: '/student/interviews'
    },
    {
      id: 7,
      title: 'New Resources Available',
      message: 'New interview preparation materials have been added to the resources section.',
      type: 'resource',
      priority: 'low',
      timestamp: '2024-01-16T12:00:00Z',
      read: true,
      action: 'View Resources',
      actionUrl: '/student/resources'
    },
    {
      id: 8,
      title: 'Application Deadline Approaching',
      message: 'The application deadline for Software Engineer at Tech Corp is tomorrow. Apply now!',
      type: 'deadline',
      priority: 'high',
      timestamp: '2024-01-15T15:45:00Z',
      read: true,
      action: 'Apply Now',
      actionUrl: '/student/jobs'
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'high', label: 'High Priority', count: notifications.filter(n => n.priority === 'high').length },
    { id: 'interview', label: 'Interviews', count: notifications.filter(n => n.type === 'interview').length },
    { id: 'job', label: 'Jobs', count: notifications.filter(n => n.type === 'job').length }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'interview': return '🎯';
      case 'job': return '💼';
      case 'application': return '📋';
      case 'profile': return '👤';
      case 'offer': return '🎉';
      case 'reminder': return '⏰';
      case 'resource': return '📚';
      case 'deadline': return '⏳';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'job': return 'bg-green-100 text-green-800';
      case 'application': return 'bg-purple-100 text-purple-800';
      case 'profile': return 'bg-orange-100 text-orange-800';
      case 'offer': return 'bg-pink-100 text-pink-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'resource': return 'bg-indigo-100 text-indigo-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch(activeTab) {
      case 'unread': return !notification.read;
      case 'high': return notification.priority === 'high';
      case 'interview': return notification.type === 'interview';
      case 'job': return notification.type === 'job';
      default: return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your placement activities</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mark All as Read
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all ${
                !notification.read ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{getTypeIcon(notification.type)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                          {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {notification.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                          {notification.action}
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No notifications message */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🔔</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {activeTab === 'unread' 
                ? "You're all caught up! No unread notifications." 
                : `No notifications found for "${activeTab}"`}
            </p>
          </div>
        )}

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Interview Reminders</h4>
                <p className="text-sm text-gray-600">Get reminded about upcoming interviews</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Job Matches</h4>
                <p className="text-sm text-gray-600">Notify when new jobs match your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

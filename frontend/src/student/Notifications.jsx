import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../components/auth/AuthContext';

const API_BASE = 'https://college-placement-portal-iick.onrender.com/api';

const Notifications = () => {
  const { user } = useAuth();
  const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userEmail) {
      fetchNotifications();
    }
  }, [userEmail]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      if (!userEmail) {
        throw new Error('User email not found');
      }
      const res = await fetch(`${API_BASE}/student/notifications?email=${encodeURIComponent(userEmail)}`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (recipientId) => {
    try {
      setError('');
      const res = await fetch(
        `${API_BASE}/student/notifications/${recipientId}/read?email=${encodeURIComponent(userEmail)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to mark as read');
      }

      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notification.recipient_id === recipientId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (e) {
      setError(e.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    // Display full date and time
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Separate unread and read notifications, both sorted by newest first
  const unreadNotifications = notifications.filter(n => !n.is_read);
  const readNotifications = notifications.filter(n => n.is_read);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading notifications...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with announcements from faculty</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-3xl">🔔</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You don't have any notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Unread Notifications Section */}
            {unreadNotifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Unread ({unreadNotifications.length})
                </h2>
                <div className="space-y-4">
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.recipient_id}
                      className="bg-white rounded-lg border-l-4 border-l-blue-500 border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          </div>
                          <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>From: {notification.teacher_name}</span>
                            {notification.teacher_department && (
                              <span>({notification.teacher_department})</span>
                            )}
                            <span>•</span>
                            <span>{formatDate(notification.created_at)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => markAsRead(notification.recipient_id)}
                          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium whitespace-nowrap"
                        >
                          Mark as Read
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Read Notifications Section */}
            {readNotifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Read ({readNotifications.length})
                </h2>
                <div className="space-y-4">
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.recipient_id}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow opacity-75"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 mb-3 whitespace-pre-wrap">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>From: {notification.teacher_name}</span>
                            {notification.teacher_department && (
                              <span>({notification.teacher_department})</span>
                            )}
                            <span>•</span>
                            <span>{formatDate(notification.created_at)}</span>
                          </div>
                        </div>
                        <div className="ml-4 px-4 py-2 text-sm text-gray-500">
                          ✓ Read
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../components/auth/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const Notifications = () => {
  const { user } = useAuth();
  const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNotificationId, setEditingNotificationId] = useState(null);
  const [showRecipientsModal, setShowRecipientsModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [recipients, setRecipients] = useState([]);
  
  const [form, setForm] = useState({
    title: '',
    message: ''
  });

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
      const res = await fetch(`${API_BASE}/faculty/notifications?email=${encodeURIComponent(userEmail)}`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };


  const fetchRecipients = async (notificationId) => {
    try {
      const res = await fetch(`${API_BASE}/faculty/notifications/${notificationId}/recipients`);
      if (!res.ok) throw new Error('Failed to fetch recipients');
      const data = await res.json();
      setRecipients(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const method = editingNotificationId ? 'PUT' : 'POST';
      const url = editingNotificationId
        ? `${API_BASE}/faculty/notifications/${editingNotificationId}`
        : `${API_BASE}/faculty/notifications`;

      const body = editingNotificationId
        ? { title: form.title, message: form.message }
        : { email: userEmail, title: form.title, message: form.message };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save notification');
      }

      await fetchNotifications();
      setShowModal(false);
      setEditingNotificationId(null);
      setForm({ title: '', message: '' });
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (notification) => {
    setEditingNotificationId(notification.notification_id);
    setForm({
      title: notification.title,
      message: notification.message
    });
    setShowModal(true);
  };

  const handleDelete = async (notificationId) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) {
      return;
    }

    try {
      setError('');
      const res = await fetch(`${API_BASE}/faculty/notifications/${notificationId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete notification');
      await fetchNotifications();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleViewRecipients = async (notification) => {
    setSelectedNotification(notification);
    await fetchRecipients(notification.notification_id);
    setShowRecipientsModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading notifications...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Manage and track notifications sent to students</p>
          </div>
          <button
            onClick={() => {
              setEditingNotificationId(null);
              setForm({ title: '', message: '' });
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Add Notification
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
            <p className="text-gray-600">No notifications found. Create your first notification!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.notification_id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{notification.title}</h3>
                      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{notification.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Created: {formatDate(notification.created_at)}</span>
                        <span className="text-blue-600 font-medium">
                          Total Recipients: {parseInt(notification.total_recipients) || 0}
                        </span>
                        <span className="text-green-600 font-medium">
                          Viewed: {parseInt(notification.viewed_count) || 0}
                        </span>
                        <span className="text-orange-600 font-medium">
                          Not Viewed: {parseInt(notification.not_viewed_count) || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleViewRecipients(notification)}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        View Recipients
                      </button>
                      <button
                        onClick={() => handleEdit(notification)}
                        className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notification.notification_id)}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingNotificationId ? 'Edit Notification' : 'Add New Notification'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {!editingNotificationId && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This notification will be sent to all students automatically.
                    </p>
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingNotificationId(null);
                      setForm({ title: '', message: '' });
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {editingNotificationId ? 'Update' : 'Create'} Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recipients Modal */}
        {showRecipientsModal && selectedNotification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Recipients: {selectedNotification.title}
                </h2>
                <button
                  onClick={() => {
                    setShowRecipientsModal(false);
                    setSelectedNotification(null);
                    setRecipients([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4 flex gap-4 text-sm">
                <span className="text-blue-600 font-medium">
                  Total: {recipients.length}
                </span>
                <span className="text-green-600 font-medium">
                  Viewed: {recipients.filter(r => r.is_read).length}
                </span>
                <span className="text-orange-600 font-medium">
                  Not Viewed: {recipients.filter(r => !r.is_read).length}
                </span>
              </div>
              <div className="space-y-2">
                {recipients.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No recipients found</p>
                ) : (
                  recipients.map((recipient) => (
                    <div
                      key={recipient.recipient_id}
                      className={`p-3 rounded-lg border ${
                        recipient.is_read
                          ? 'bg-green-50 border-green-200'
                          : 'bg-orange-50 border-orange-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{recipient.student_name}</p>
                          <p className="text-sm text-gray-600">{recipient.student_email}</p>
                          {recipient.rollno && (
                            <p className="text-xs text-gray-500">Roll No: {recipient.rollno}</p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            recipient.is_read
                              ? 'bg-green-200 text-green-800'
                              : 'bg-orange-200 text-orange-800'
                          }`}
                        >
                          {recipient.is_read ? 'Viewed' : 'Not Viewed'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;


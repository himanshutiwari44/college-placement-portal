import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', department: '', contact: '' });

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  const { user } = useAuth();
  const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        if (!userEmail) {
          setError('No user email found. Please log in again.');
          setLoading(false);
          return;
        }
        const res = await fetch(`${API_BASE}/faculty/profile/${encodeURIComponent(userEmail)}`);
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body.message || `Failed to load profile (${res.status})`);
        }
        setProfile(body);
        setForm({ name: body.name || '', department: body.department || '', contact: body.contact || '' });
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userEmail]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      const payload = {
        name: form.name || null,
        department: form.department || null,
        contact: form.contact || null
      };
      const res = await fetch(`${API_BASE}/faculty/profile/${encodeURIComponent(userEmail)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || 'Failed to update profile');
      }
      setProfile(body);
      setForm({ name: body.name || '', department: body.department || '', contact: body.contact || '' });
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/faculty/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || 'Failed to change password');
      }
      alert(body.message || 'Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.message || 'Password change failed');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return <div className="p-4">No profile data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                      activeTab === tab.id ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input value={profile.email || ''} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input name="name" value={form.name} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input name="department" value={form.department} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <input name="contact" value={form.contact} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div className="flex space-x-2">
                    <button type="submit" disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                    <button type="button" onClick={() => setForm({ name: profile.name || '', department: profile.department || '', contact: profile.contact || '' })} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); changePassword(); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" value={passwordForm.currentPassword} onChange={(e) => handlePasswordChange('currentPassword', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" value={passwordForm.newPassword} onChange={(e) => handlePasswordChange('newPassword', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input type="password" value={passwordForm.confirmPassword} onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Change Password</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
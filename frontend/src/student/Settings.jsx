import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@student.edu',
    phone: '+91 9876543210',
    rollNumber: 'CS2021001',
    branch: 'Computer Science',
    year: '2024',
    cgpa: '8.5',
    address: '123 Main Street, City, State - 123456',
    bio: 'Passionate computer science student with interest in web development and data science.',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    website: 'https://johndoe.dev'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    interviewReminders: true,
    jobMatches: true,
    applicationUpdates: true,
    deadlineAlerts: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showContactInfo: true,
    showAcademicInfo: true,
    showProjects: true,
    allowDirectMessages: true,
    showOnlineStatus: true
  });

  // Security: only change password UI is kept, so we remove extra security settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🛡️' }
  ];

  const handleProfileChange = (field, value) => {
    setProfileSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = () => {
    console.log('Saving settings...');
    setIsEditingProfile(false);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={profileSettings.firstName}
              onChange={(e) => handleProfileChange('firstName', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={profileSettings.lastName}
              onChange={(e) => handleProfileChange('lastName', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profileSettings.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={profileSettings.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              value={profileSettings.rollNumber}
              onChange={(e) => handleProfileChange('rollNumber', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <input
              type="text"
              value={profileSettings.branch}
              onChange={(e) => handleProfileChange('branch', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={profileSettings.year}
              onChange={(e) => handleProfileChange('year', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
            <input
              type="text"
              value={profileSettings.cgpa}
              onChange={(e) => handleProfileChange('cgpa', e.target.value)}
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="url"
              value={profileSettings.linkedin}
              onChange={(e) => handleProfileChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
            <input
              type="url"
              value={profileSettings.github}
              onChange={(e) => handleProfileChange('github', e.target.value)}
              placeholder="https://github.com/yourusername"
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
            <input
              type="url"
              value={profileSettings.website}
              onChange={(e) => handleProfileChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              disabled={!isEditingProfile}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bio</h3>
        <textarea
          value={profileSettings.bio}
          onChange={(e) => handleProfileChange('bio', e.target.value)}
          rows={4}
          placeholder="Tell us about yourself..."
          disabled={!isEditingProfile}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>

      <div className="flex justify-end">
        {!isEditingProfile ? (
          <button
            type="button"
            onClick={() => setIsEditingProfile(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-3">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveSettings}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'interviewReminders' && 'Get reminded about upcoming interviews'}
                  {key === 'jobMatches' && 'Notify when new jobs match your profile'}
                  {key === 'applicationUpdates' && 'Get updates on your application status'}
                  {key === 'deadlineAlerts' && 'Alert when application deadlines are approaching'}
                  {key === 'weeklyDigest' && 'Receive weekly summary of activities'}
                  {key === 'marketingEmails' && 'Receive promotional emails and updates'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Everyone</option>
              <option value="recruiters">Recruiters Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Information Sharing</h3>
        <div className="space-y-4">
          {Object.entries(privacySettings).slice(1).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'showContactInfo' && 'Display your contact information'}
                  {key === 'showAcademicInfo' && 'Show your academic details'}
                  {key === 'showProjects' && 'Display your projects and portfolio'}
                  {key === 'allowDirectMessages' && 'Allow recruiters to message you directly'}
                  {key === 'showOnlineStatus' && 'Show when you are online'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Export Data</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Download a copy of your data including profile, applications, and activity history.
            </p>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Export My Data
            </button>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-3">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

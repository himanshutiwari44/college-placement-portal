import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Thompson',
    email: 'sarah.thompson@college.edu',
    phone: '+91 9876543210',
    department: 'Computer Science',
    designation: 'Head of Placements',
    officeLocation: 'Block A, Room 201',
    joiningDate: '2020-06-15',
    experience: '8 years'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Removed notifications/system; only profile and security kept

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
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

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = () => {
    console.log('Profile saved:', profile);
    // Add success message
  };

  const changePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const saveSettings = () => {
    console.log('Profile saved:', profile);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your faculty account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <nav className="space-y-1 p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-900 border-r-2 border-green-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                  <p className="text-gray-600 mt-1">Update your faculty profile information</p>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          disabled={!isEditingProfile}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          disabled={!isEditingProfile}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          disabled={!isEditingProfile}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                        <input
                          type="text"
                          value={profile.department}
                          onChange={(e) => handleProfileChange('department', e.target.value)}
                          disabled={!isEditingProfile}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <input
                          type="text"
                          value={profile.designation}
                          onChange={(e) => handleProfileChange('designation', e.target.value)}
                          disabled={!isEditingProfile}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
                        <input
                          type="text"
                          value={profile.officeLocation}
                          onChange={(e) => handleProfileChange('officeLocation', e.target.value)}
                          disabled={!isEditingProfile}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${!isEditingProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </div>
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
                  </form>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-gray-600 mt-1">Manage your password security</p>
                </div>
                <div className="p-6">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={changePassword}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
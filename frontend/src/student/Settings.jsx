import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const Settings = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});

    const [activeTab, setActiveTab] = useState('profile');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pwMessage, setPwMessage] = useState('');

    const { user } = useAuth();
    const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'security', label: 'Security', icon: '🔒' }
    ];

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                setError('');

                if (!userEmail) {
                    setError('No user email found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${API_BASE}/student/profile/${encodeURIComponent(userEmail)}`);
                if (!res.ok) {
                    const body = await res.json().catch(() => ({}));
                    if (res.status === 404) {
                        throw new Error(body.message || `Profile not found for ${userEmail}`);
                    }
                    throw new Error(body.message || `Failed to load profile (${res.status})`);
                }
                const data = await res.json();
                setProfile(data);
                setForm(data);
            } catch (err) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate, userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess('');
        setError('');
        try {
            const payload = {
                name: form.name || null,
                university: form.university || null,
                rollno: form.rollno ? Number(form.rollno) : null,
                cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
                contact: form.contact || null,
                branch: form.branch || null,
                admission_year: form.admission_year ? Number(form.admission_year) : null,
                grad_year: form.grad_year ? Number(form.grad_year) : null,
                semester: form.semester ? Number(form.semester) : null,
                linkedin: form.linkedin || null,
                github: form.github || null,
                portfolio: form.portfolio || null
            };

            const res = await fetch(`${API_BASE}/student/profile/${encodeURIComponent(userEmail)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.message || `Failed to update profile (${res.status})`);
            }

            const updated = await res.json();
            setProfile(updated);
            setForm(updated);
            setSuccess('Profile updated successfully');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwMessage('');
        try {
            const res = await fetch(`${API_BASE}/student/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, currentPassword, newPassword })
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(body.message || `Failed to change password (${res.status})`);
            }
            setPwMessage(body.message || 'Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            setPwMessage(err.message || 'Password change failed');
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

                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <div>
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                                        <input
                                            name="studentid"
                                            value={profile.studentid || ''}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            name="email"
                                            value={profile.email || ''}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            name="name"
                                            value={form.name ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                        <input
                                            name="university"
                                            value={form.university ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
                                        <input
                                            name="rollno"
                                            value={form.rollno ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                                        <input
                                            name="cgpa"
                                            type="number"
                                            step="0.01"
                                            value={form.cgpa ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                        <input
                                            name="contact"
                                            value={form.contact ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                                        <input
                                            name="branch"
                                            value={form.branch ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Admission Year</label>
                                        <input
                                            name="admission_year"
                                            value={form.admission_year ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                                        <input
                                            name="grad_year"
                                            value={form.grad_year ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                                        <input
                                            name="semester"
                                            value={form.semester ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                        <input
                                            name="linkedin"
                                            value={form.linkedin ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                                        <input
                                            name="github"
                                            value={form.github ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                                        <input
                                            name="portfolio"
                                            value={form.portfolio ?? ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="flex space-x-2">
                                        <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            {saving ? 'Saving...' : 'Save Profile'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setForm(profile); setError(''); setSuccess(''); }}
                                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    {success && <p className="text-green-600">{success}</p>}
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Change Password
                                    </button>
                                    {pwMessage && <p>{pwMessage}</p>}
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

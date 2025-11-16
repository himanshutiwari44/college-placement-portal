import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentApplications, setRecentApplications] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE = 'https://college-placement-portal-iick.onrender.com';

  const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);

  const fetchRecentApplications = async () => {
    try {
      setLoading(true);
      setError('');
      if (!userEmail) throw new Error('Student email not found');
      const res = await fetch(`${API_BASE}/api/student/applications?email=${encodeURIComponent(userEmail)}&limit=2`);
      if (!res.ok) throw new Error('Failed to load applications');
      const data = await res.json();
      setRecentApplications(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllApplications = async () => {
    try {
      if (!userEmail) return;
      const res = await fetch(`${API_BASE}/api/student/applications?email=${encodeURIComponent(userEmail)}`);
      if (!res.ok) throw new Error('Failed to load applications');
      const data = await res.json();
      setAllApplications(data);
    } catch (e) {
      // Do not override error banner for recent section unless empty
      if (!error) setError(e.message);
    }
  };

  useEffect(() => {
    fetchRecentApplications();
    fetchAllApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'applied') return 'bg-blue-100 text-blue-800';
    if (s === 'interview scheduled') return 'bg-yellow-100 text-yellow-800';
    if (s === 'offer received') return 'bg-green-100 text-green-800';
    if (s === 'placed') return 'bg-purple-100 text-purple-800';
    if (s === 'rejected') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const appliedCount = allApplications.length;
  const interviewCount = allApplications.filter(a => (a.status || '').toLowerCase() === 'interview scheduled').length;
  const offersCount = allApplications.filter(a => (a.status || '').toLowerCase() === 'offer received').length;
  const rejectedCount = allApplications.filter(a => (a.status || '').toLowerCase() === 'rejected').length;

  const stats = [
    { title: 'Applied Jobs', value: String(appliedCount), color: 'bg-blue-500' },
    { title: 'Interviews Scheduled', value: String(interviewCount), color: 'bg-green-500' },
    { title: 'Offers Received', value: String(offersCount), color: 'bg-purple-500' },
    { title: 'Rejected', value: String(rejectedCount), color: 'bg-red-400' }
  ];

 

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your placement activity overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-semibold text-lg">{stat.value}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1  gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            </div>
            <div className="p-6">
              {error && (
                <div className="text-red-600 text-sm mb-4">{error}</div>
              )}
              {loading ? (
                <div className="text-gray-600 text-sm">Loading applications...</div>
              ) : (
                <>
                  <div className="space-y-4">
                    {recentApplications.length > 0 ? (
                      recentApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{app.jobdescription || 'Job Application'}</h3>
                            <p className="text-sm text-gray-600">{app.companyname || 'Company'} • {app.location || 'Location'}</p>
                            <p className="text-sm text-gray-500">Status: {app.status || 'Applied'}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                              {app.status || 'Applied'}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1">{app.salary || '—'}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No applications yet</p>
                        <p className="text-sm mt-2">Start applying to jobs to see your recent applications here</p>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => navigate('/student/applications')}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View All Applications
                  </button>
                </>
              )}
            </div>
          </div>

       
        </div>

       
      </div>
    </div>
  );
};

export default StudentDashboard;

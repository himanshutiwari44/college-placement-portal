import React, { useEffect, useMemo, useState } from 'react';

const FacultyDashboard = () => {
  const API_BASE = 'http://localhost:5000/api';
  const [cards, setCards] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const stats = useMemo(() => {
    const counts = cards || {};
    return [
      { title: 'Total Students', value: String(counts.totalStudents ?? 0), color: 'bg-blue-500', icon: '👥', change: '', period: '' },
      { title: 'Active Jobs', value: String(counts.activeJobs ?? 0), color: 'bg-green-500', icon: '💼', change: '', period: '' },
      { title: 'Applications', value: String(counts.applications ?? 0), color: 'bg-purple-500', icon: '📋', change: '', period: '' },
      { title: 'Placements', value: String(counts.placements ?? 0), color: 'bg-orange-500', icon: '🎉', change: '', period: '' },
      { title: 'Interviews Scheduled', value: String(counts.interviewsScheduled ?? 0), color: 'bg-indigo-500', icon: '🎯', change: '', period: '' },
      { title: 'Companies Active', value: String(counts.companiesActive ?? 0), color: 'bg-teal-500', icon: '🏢', change: '', period: '' },
    ];
  }, [cards]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const [cardsRes, recentRes] = await Promise.all([
          fetch(`${API_BASE}/faculty/dashboard/cards`),
          fetch(`${API_BASE}/faculty/dashboard/recent-applications?limit=3`),
        ]);
        const cardsBody = await cardsRes.json().catch(() => ({}));
        const recentBody = await recentRes.json().catch(() => ([]));
        if (!cardsRes.ok) throw new Error(cardsBody.message || 'Failed to load dashboard');
        if (!recentRes.ok) throw new Error(recentBody.message || 'Failed to load recent applications');
        setCards(cardsBody);
        setRecentApplications(recentBody || []);
      } catch (e) {
        setError(e.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusWeight = (status) => {
    switch(status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted': return 'bg-blue-100 text-blue-800';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Dashboard</h1>
          <p className="text-gray-600">Overview of placement activities and student progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-xl">{stat.icon}</span>
                </div>
                {stat.change ? (<span className="text-xs text-gray-500">{stat.change}</span>) : <span />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.period ? (<p className="text-xs text-gray-500">{stat.period}</p>) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                
              </div>
            </div>
            <div className="p-6">
              {error ? (
                <div className="text-sm text-red-600">{error}</div>
              ) : (
                <div className="space-y-4">
                  {(recentApplications || []).map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{application.student_name || 'Unknown Student'}</h3>
                          {application.status ? (
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusWeight(application.status)}`}>
                              {application.status}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm text-gray-600">{application.roll_number ? `Roll: ${application.roll_number}` : ''}</p>
                        <p className="text-sm text-gray-700">{application.company_name || ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Recent Activity */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✅</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Doe selected for Software Engineer at Tech Corp</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📋</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New application submitted by Sarah Johnson</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">🎯</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Interview scheduled for Mike Chen at CloudTech</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FacultyDashboard;

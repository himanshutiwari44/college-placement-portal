import React, { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../components/auth/AuthContext';
const Applications = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE = 'http://localhost:5000';

  const statusOptions = [
    'applied',
    'interview scheduled',
    'offer received',
    'placed',
    'rejected',
  ];

  const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError('');
      if (!userEmail) throw new Error('Student email not found');
      const res = await fetch(`${API_BASE}/api/student/applications?email=${encodeURIComponent(userEmail)}`);
      if (!res.ok) throw new Error('Failed to load applications');
      const data = await res.json();
      setApplications(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const tabs = useMemo(() => {
    return [
      { id: 'all', label: 'All Applications', count: applications.length },
      { id: 'applied', label: 'Applied', count: applications.filter(app => app.status?.toLowerCase() === 'applied').length },
      { id: 'interview', label: 'Interview', count: applications.filter(app => app.status?.toLowerCase() === 'interview scheduled').length },
      { id: 'offer', label: 'Offers', count: applications.filter(app => app.status?.toLowerCase() === 'offer received').length },
      { id: 'rejected', label: 'Rejected', count: applications.filter(app => app.status?.toLowerCase() === 'rejected').length }
    ];
  }, [applications]);

  const filteredApplications = activeTab === 'all' 
    ? applications 
    : applications.filter(app => {
        switch(activeTab) {
          case 'applied': return app.status?.toLowerCase() === 'applied';
          case 'interview': return app.status?.toLowerCase() === 'interview scheduled';
          case 'offer': return app.status?.toLowerCase() === 'offer received';
          case 'rejected': return app.status?.toLowerCase() === 'rejected';
          default: return true;
        }
      });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'applied': return '📝';
      case 'interview scheduled': return '📅';
      case 'offer received': return '🎉';
      case 'rejected': return '❌';
      case 'under review': return '👀';
      default: return '📋';
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setError('');
      const res = await fetch(`${API_BASE}/api/student/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setApplications(prev => prev.map(a => a.id === updated.id ? { ...a, status: updated.status } : a));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleWithdrawApplication = (applicationId) => {
    console.log(`Withdrawing application ${applicationId}`);
    // Here you would typically handle the withdrawal logic
  };

  const handleAcceptOffer = (applicationId) => {
    console.log(`Accepting offer for application ${applicationId}`);
    // Here you would typically handle the offer acceptance logic
  };

  const handleDeclineOffer = (applicationId) => {
    console.log(`Declining offer for application ${applicationId}`);
    // Here you would typically handle the offer decline logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the status of your job applications</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border p-4 border-gray-200 mb-8">
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

        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}
        {loading && (
          <div className="mb-4 text-gray-600">Loading applications...</div>
        )}

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {application.companyname?.slice(0,2)?.toUpperCase() || 'CO'}
                  </div>
                  
                  {/* Application Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{application.jobdescription}</h3>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800`}>
                        {getStatusIcon(application.status?.toLowerCase())} {application.status}
                      </span>
                    </div>
                    
                    <p className="text-lg font-medium text-gray-700 mb-2">{application.companyname}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <span className="mr-1">📍</span>
                        {application.location}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">💰</span>
                        {application.salary}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">📅</span>
                        Deadline: {application.deadline ? formatDate(application.deadline) : '—'}
                      </span>
                    </div>
                    
                    {/* Status Information */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
                          <select
                            value={application.status?.toLowerCase() || 'applied'}
                            onChange={(e) => updateStatus(application.id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            {statusOptions.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Application Link</p>
                          <a href={application.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{application.link}</a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Extra details can go here */}
                  </div>
                </div>
                
                {/* Action Buttons
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-colors">
                    View Job
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* No Applications */}
        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            
          
          </div>
        )}

        {/* Application Statistics */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tabs.slice(1).map((tab) => {
              const count = applications.filter(app => {
                switch(tab.id) {
                  case 'applied': return app.status?.toLowerCase() === 'applied';
                  case 'interview': return app.status?.toLowerCase() === 'interview scheduled';
                  case 'offer': return app.status?.toLowerCase() === 'offer received';
                  case 'rejected': return app.status?.toLowerCase() === 'rejected';
                  default: return true;
                }
              }).length;
              
              return (
                <div key={tab.id} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{tab.label}</div>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Applications;

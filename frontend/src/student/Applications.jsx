import React, { useState } from 'react';

const Applications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const applications = [
    {
      id: 1,
      company: 'Tech Corp',
      logo: 'TC',
      position: 'Software Engineer',
      location: 'Bangalore',
      salary: '8-12 LPA',
      appliedDate: '2024-01-15',
      status: 'Applied',
      statusColor: 'bg-blue-100 text-blue-800',
      lastUpdate: '2024-01-15',
      notes: 'Application submitted successfully',
      nextStep: 'Resume Review',
      interviewDate: null,
      interviewTime: null,
      interviewType: null
    },
    {
      id: 2,
      company: 'DataSoft',
      logo: 'DS',
      position: 'Data Analyst',
      location: 'Mumbai',
      salary: '6-10 LPA',
      appliedDate: '2024-01-12',
      status: 'Interview Scheduled',
      statusColor: 'bg-yellow-100 text-yellow-800',
      lastUpdate: '2024-01-18',
      notes: 'Technical interview scheduled',
      nextStep: 'Technical Interview',
      interviewDate: '2024-01-25',
      interviewTime: '10:00 AM',
      interviewType: 'Video Call'
    },
    {
      id: 3,
      company: 'CloudTech',
      logo: 'CT',
      position: 'DevOps Engineer',
      location: 'Pune',
      salary: '10-15 LPA',
      appliedDate: '2024-01-10',
      status: 'Offer Received',
      statusColor: 'bg-green-100 text-green-800',
      lastUpdate: '2024-01-20',
      notes: 'Congratulations! Offer letter received',
      nextStep: 'Accept/Decline Offer',
      interviewDate: null,
      interviewTime: null,
      interviewType: null
    },
    {
      id: 4,
      company: 'FinTech Solutions',
      logo: 'FS',
      position: 'Frontend Developer',
      location: 'Delhi',
      salary: '7-11 LPA',
      appliedDate: '2024-01-08',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      lastUpdate: '2024-01-16',
      notes: 'Application rejected after initial screening',
      nextStep: 'Apply to other positions',
      interviewDate: null,
      interviewTime: null,
      interviewType: null
    },
    {
      id: 5,
      company: 'AI Innovations',
      logo: 'AI',
      position: 'Machine Learning Engineer',
      location: 'Hyderabad',
      salary: '12-18 LPA',
      appliedDate: '2024-01-05',
      status: 'Under Review',
      statusColor: 'bg-purple-100 text-purple-800',
      lastUpdate: '2024-01-19',
      notes: 'Application is being reviewed by HR team',
      nextStep: 'Wait for response',
      interviewDate: null,
      interviewTime: null,
      interviewType: null
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Applications', count: applications.length },
    { id: 'applied', label: 'Applied', count: applications.filter(app => app.status === 'Applied').length },
    { id: 'interview', label: 'Interview', count: applications.filter(app => app.status === 'Interview Scheduled').length },
    { id: 'offer', label: 'Offers', count: applications.filter(app => app.status === 'Offer Received').length },
    { id: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'Rejected').length }
  ];

  const filteredApplications = activeTab === 'all' 
    ? applications 
    : applications.filter(app => {
        switch(activeTab) {
          case 'applied': return app.status === 'Applied';
          case 'interview': return app.status === 'Interview Scheduled';
          case 'offer': return app.status === 'Offer Received';
          case 'rejected': return app.status === 'Rejected';
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
      case 'Applied': return '📝';
      case 'Interview Scheduled': return '📅';
      case 'Offer Received': return '🎉';
      case 'Rejected': return '❌';
      case 'Under Review': return '👀';
      default: return '📋';
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

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {application.logo}
                  </div>
                  
                  {/* Application Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{application.position}</h3>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${application.statusColor}`}>
                        {getStatusIcon(application.status)} {application.status}
                      </span>
                    </div>
                    
                    <p className="text-lg font-medium text-gray-700 mb-2">{application.company}</p>
                    
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
                        Applied: {formatDate(application.appliedDate)}
                      </span>
                    </div>
                    
                    {/* Status Information */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Last Updated</p>
                          <p className="text-sm text-gray-600">{formatDate(application.lastUpdate)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Next Step</p>
                          <p className="text-sm text-gray-600">{application.nextStep}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                        <p className="text-sm text-gray-600">{application.notes}</p>
                      </div>
                    </div>
                    
                    {/* Interview Details */}
                    {application.interviewDate && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-blue-900 mb-2">Interview Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-blue-800">Date</p>
                            <p className="text-blue-700">{formatDate(application.interviewDate)}</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Time</p>
                            <p className="text-blue-700">{application.interviewTime}</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Type</p>
                            <p className="text-blue-700">{application.interviewType}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  {application.status === 'Applied' && (
                    <button
                      onClick={() => handleWithdrawApplication(application.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors"
                    >
                      Withdraw
                    </button>
                  )}
                  
                  {application.status === 'Offer Received' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptOffer(application.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                      >
                        Accept Offer
                      </button>
                      <button
                        onClick={() => handleDeclineOffer(application.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  
                  {application.status === 'Interview Scheduled' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                      View Details
                    </button>
                  )}
                  
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-colors">
                    View Job
                  </button>
                </div>
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
            <p className="text-gray-600 mb-4">
              {activeTab === 'all' 
                ? "You haven't applied to any jobs yet" 
                : `No applications with status "${activeTab}"`}
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Browse Jobs
            </button>
          </div>
        )}

        {/* Application Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tabs.slice(1).map((tab) => {
              const count = applications.filter(app => {
                switch(tab.id) {
                  case 'applied': return app.status === 'Applied';
                  case 'interview': return app.status === 'Interview Scheduled';
                  case 'offer': return app.status === 'Offer Received';
                  case 'rejected': return app.status === 'Rejected';
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
        </div>
      </div>
    </div>
  );
};

export default Applications;

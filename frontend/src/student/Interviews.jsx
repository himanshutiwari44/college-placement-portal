import React, { useState } from 'react';

const Interviews = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingInterviews = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Software Engineer',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Technical Interview',
      mode: 'Video Call',
      interviewer: 'John Smith',
      status: 'Confirmed',
      notes: 'Prepare for coding questions on data structures and algorithms'
    },
    {
      id: 2,
      company: 'DataSoft',
      position: 'Data Analyst',
      date: '2024-01-28',
      time: '2:00 PM',
      type: 'HR Interview',
      mode: 'In-Person',
      interviewer: 'Sarah Johnson',
      status: 'Confirmed',
   
      notes: 'Office location: 123 Business Park, Mumbai'
    },
    {
      id: 3,
      company: 'CloudTech',
      position: 'DevOps Engineer',
      date: '2024-02-01',
      time: '11:00 AM',
      type: 'Panel Interview',
      mode: 'Video Call',
      interviewer: 'Mike Chen, Lisa Wang',
      status: 'Pending Confirmation',
    
      notes: 'Awaiting confirmation from HR team'
    }
  ];

  const completedInterviews = [
    {
      id: 4,
      company: 'FinTech Solutions',
      position: 'Frontend Developer',
      date: '2024-01-20',
      time: '3:00 PM',
      type: 'Technical Interview',
      mode: 'Video Call',
      interviewer: 'Alex Rodriguez',
      status: 'Completed',
      result: 'Selected for next round',
      feedback: 'Strong technical skills, good problem-solving approach',
      nextStep: 'Final HR Round'
    },
    {
      id: 5,
      company: 'AI Innovations',
      position: 'Machine Learning Engineer',
      date: '2024-01-18',
      time: '10:30 AM',
      type: 'Technical Interview',
      mode: 'Video Call',
      interviewer: 'Dr. Emily Watson',
      status: 'Completed',
      result: 'Rejected',
      feedback: 'Good ML knowledge but needs improvement in system design',
      nextStep: 'Apply to other positions'
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingInterviews.length },
    { id: 'completed', label: 'Completed', count: completedInterviews.length }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending Confirmation': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result) => {
    switch(result) {
      case 'Selected for next round': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderUpcomingInterviews = () => (
    <div className="space-y-6">
      {upcomingInterviews.map((interview) => (
        <div key={interview.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{interview.position}</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                  {interview.status}
                </span>
              </div>
              
              <p className="text-lg font-medium text-gray-700 mb-4">{interview.company}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{formatDate(interview.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🕐</span>
                    <span>{interview.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">👥</span>
                    <span>{interview.type}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">💻</span>
                    <span>{interview.mode}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">👤</span>
                    <span>{interview.interviewer}</span>
                  </div>
                </div>
              </div>
              
              {interview.notes && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{interview.notes}</p>
                </div>
              )}
              
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedInterviews = () => (
    <div className="space-y-6">
      {completedInterviews.map((interview) => (
        <div key={interview.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{interview.position}</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                  {interview.status}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getResultColor(interview.result)}`}>
                  {interview.result}
                </span>
              </div>
              
              <p className="text-lg font-medium text-gray-700 mb-4">{interview.company}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{formatDate(interview.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🕐</span>
                    <span>{interview.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">👥</span>
                    <span>{interview.type}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">💻</span>
                    <span>{interview.mode}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">👤</span>
                    <span>{interview.interviewer}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                  <p className="text-sm text-gray-600">{interview.feedback}</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Next Step</h4>
                  <p className="text-sm text-blue-700">{interview.nextStep}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // View-only: removed schedule new UI

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interviews</h1>
          <p className="text-gray-600">Manage your interview schedule and track progress</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
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

        {/* Content */}
        {activeTab === 'upcoming' && renderUpcomingInterviews()}
        {activeTab === 'completed' && renderCompletedInterviews()}
        {/* View-only: no schedule tab */}

        {/* No interviews message */}
        {activeTab === 'upcoming' && upcomingInterviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming interviews</h3>
            <p className="text-gray-600">You don't have any scheduled interviews at the moment.</p>
          </div>
        )}

        {activeTab === 'completed' && completedInterviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No completed interviews</h3>
            <p className="text-gray-600">Your completed interviews will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;

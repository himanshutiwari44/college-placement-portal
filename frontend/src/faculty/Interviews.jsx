import React, { useState } from 'react';

const Interviews = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingInterviews = [
    {
      id: 1,
      studentName: 'John Doe',
      rollNumber: 'CS2021001',
      company: 'Tech Corp',
      position: 'Software Engineer',
      interviewDate: '2024-01-25',
      interviewTime: '10:00 AM',
      interviewType: 'Technical Interview',
      interviewer: 'John Smith',
      status: 'Confirmed',
      location: 'Online - Google Meet',
      duration: '60 minutes',
      preparationNotes: 'Focus on coding challenges and problem-solving approach'
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      rollNumber: 'CS2021002',
      company: 'DataSoft',
      position: 'Data Analyst',
      interviewDate: '2024-01-26',
      interviewTime: '2:00 PM',
      interviewType: 'HR Interview',
      interviewer: 'Sarah Williams',
      status: 'Confirmed',
      location: 'Company Office - Mumbai',
      duration: '45 minutes',
      preparationNotes: 'Discuss previous projects and career goals'
    },
    {
      id: 3,
      studentName: 'Mike Chen',
      rollNumber: 'IT2021001',
      company: 'CloudTech',
      position: 'DevOps Engineer',
      interviewDate: '2024-01-27',
      interviewTime: '11:00 AM',
      interviewType: 'Panel Interview',
      interviewer: 'Mike Davis, Lisa Johnson',
      status: 'Confirmed',
      location: 'Hybrid - Office + Online',
      duration: '90 minutes',
      preparationNotes: 'Technical panel discussion and hands-on tasks'
    },
    {
      id: 4,
      studentName: 'Alex Rodriguez',
      rollNumber: 'EC2021001',
      company: 'FinTech Solutions',
      position: 'Frontend Developer',
      interviewDate: '2024-01-28',
      interviewTime: '3:00 PM',
      interviewType: 'Technical Interview',
      interviewer: 'David Brown',
      status: 'Pending Confirmation',
      location: 'Online - Zoom',
      duration: '75 minutes',
      preparationNotes: 'Frontend frameworks and UI/UX focus'
    }
  ];

  const completedInterviews = [
    {
      id: 5,
      studentName: 'Emily Watson',
      rollNumber: 'CS2021003',
      company: 'AI Innovations',
      position: 'ML Engineer',
      interviewDate: '2024-01-20',
      interviewTime: '11:00 AM',
      interviewType: 'Technical Interview',
      interviewer: 'Emily Clark',
      status: 'Completed',
      result: 'Selected',
      feedback: 'Excellent technical skills, strong communication. Recommended for final round.',
      score: 9.2,
      duration: '75 minutes'
    },
    {
      id: 6,
      studentName: 'Lisa Wang',
      rollNumber: 'CS2021004',
      company: 'DataSoft',
      position: 'Data Analyst',
      interviewDate: '2024-01-18',
      interviewTime: '2:00 PM',
      interviewType: 'HR + Technical',
      interviewer: 'Sarah Thompson',
      status: 'Completed',
      result: 'Shortlisted for Final Round',
      feedback: 'Good analytical thinking, needs improvement in presentation skills.',
      score: 7.8,
      duration: '60 minutes'
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingInterviews.length },
    { id: 'completed', label: 'Completed', count: completedInterviews.length },
    { id: 'all', label: 'All Interviews', count: upcomingInterviews.length + completedInterviews.length }
  ];

  const currentInterviews = activeTab === 'upcoming' ? upcomingInterviews :
                           activeTab === 'completed' ? completedInterviews :
                           [...upcomingInterviews, ...completedInterviews];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending Confirmation': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result) => {
    switch(result) {
      case 'Selected': return 'text-green-600 font-bold';
      case 'Shortlisted for Final Round': return 'text-blue-600 font-semibold';
      case 'Rejected': return 'text-red-600 font-semibold';
      case 'Pending': return 'text-yellow-600 font-semibold';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getInterviewTypeIcon = (type) => {
    switch(type) {
      case 'Technical Interview': return '🔧';
      case 'HR Interview': return '👥';
      case 'Panel Interview': return '👨‍👩‍👧‍👦';
      case 'HR + Technical': return '⚡';
      default: return '💼';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Interviews</h1>
              <p className="text-gray-600">View interview details</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingInterviews.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedInterviews.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
             
             </div>
            </div>
          </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Interviews List */}
        <div className="space-y-6">
          {currentInterviews.map((interview) => (
            <div key={interview.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
             <div className="flex items-start justify-between mb-4">
               <div className="flex-1">
                 <div className="flex items-center space-x-3 mb-2">
                   <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                     <span className="text-gray-600 font-medium">
                       {interview.studentName.split(' ').map(n => n[0]).join('')}
                     </span>
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">{interview.studentName}</h3>
                     <p className="text-gray-600">{interview.rollNumber}</p>
                   </div>
                 </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-medium text-gray-700">Company:</span>
                    <span className="ml-2 text-gray-900">{interview.company}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Position:</span>
                    <span className="ml-2 text-gray-900">{interview.position}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <span className="ml-2 text-gray-900 flex items-center">
                      {getInterviewTypeIcon(interview.interviewType)} {interview.interviewType}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="ml-2 text-gray-900">{formatDate(interview.interviewDate)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Time:</span>
                    <span className="ml-2 text-gray-900">{interview.interviewTime}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="ml-2 text-gray-900">{interview.duration}</span>
                  </div>
                  <div className="md:col-span-3">
                    <span className="font-medium text-gray-700">Interviewer(s):</span>
                    <span className="ml-2 text-gray-900">{interview.interviewer}</span>
                  </div>
                  <div className="md:col-span-3">
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-900">{interview.location}</span>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Preparation Notes or Feedback */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              {interview.status === 'Completed' && interview.feedback ? (
                <>
                  <h4 className="font-medium text-gray-700 mb-2">Interview Feedback</h4>
                  <p className="text-gray-600 text-sm mb-2">{interview.feedback}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    {interview.result && (
                      <span className={getResultColor(interview.result)}>
                        Result: {interview.result}
                      </span>
                    )}
                    {interview.score && (
                      <span className="font-medium text-gray-700">
                        Score: {interview.score}/10
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h4 className="font-medium text-gray-700 mb-2">Preparation Notes</h4>
                  <p className="text-gray-600 text-sm">{interview.preparationNotes}</p>
                </>
              )}
            </div>

            {/* View-only: no actions */}
            </div>
          ))}
        </div>

        {/* No interviews message */}
        {currentInterviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews found</h3>
            <p className="text-gray-600">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming interviews scheduled" 
                : activeTab === 'completed'
                ? "No completed interviews found"
                : "No interviews found for the selected criteria"}
            </p>
            {/* View-only: no schedule button */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;

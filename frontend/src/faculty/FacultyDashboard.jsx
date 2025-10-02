import React from 'react';

const FacultyDashboard = () => {
  const stats = [
    { 
      title: 'Total Students', 
      value: '245', 
      color: 'bg-blue-500',
      icon: '👥',
      change: '+12%',
      period: 'vs last month'
    },
    { 
      title: 'Active Jobs', 
      value: '18', 
      color: 'bg-green-500',
      icon: '💼',
      change: '+3',
      period: 'new openings'
    },
    { 
      title: 'Applications', 
      value: '156', 
      color: 'bg-purple-500',
      icon: '📋',
      change: '+23%',
      period: 'vs last month'
    },
    { 
      title: 'Placements', 
      value: '89', 
      color: 'bg-orange-500',
      icon: '🎉',
      change: '+15%',
      period: 'vs last month'
    },
    { 
      title: 'Interviews Scheduled', 
      value: '67', 
      color: 'bg-indigo-500',
      icon: '🎯',
      change: '+8',
      period: 'this week'
    },
    { 
      title: 'Companies Active', 
      value: '12', 
      color: 'bg-teal-500',
      icon: '🏢',
      change: '+2',
      period: 'new partnerships'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: 'John Doe',
      rollNumber: 'CS2021001',
      company: 'Tech Corp',
      position: 'Software Engineer',
      appliedDate: '2024-01-20',
      status: 'Under Review',
      matchScore: 85
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      rollNumber: 'CS2021002',
      company: 'DataSoft',
      position: 'Data Analyst',
      appliedDate: '2024-01-19',
      status: 'Shortlisted',
      matchScore: 92
    },
    {
      id: 3,
      studentName: 'Mike Chen',
      rollNumber: 'CS2021003',
      company: 'CloudTech',
      position: 'DevOps Engineer',
      appliedDate: '2024-01-18',
      status: 'Interview Scheduled',
      matchScore: 78
    },
    {
      id: 4,
      studentName: 'Emily Watson',
      rollNumber: 'CS2021004',
      company: 'AI Innovations',
      position: 'ML Engineer',
      appliedDate: '2024-01-17',
      status: 'Selected',
      matchScore: 95
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      student: 'Alex Rodriguez',
      rollNumber: 'CS2021005',
      company: 'FinTech Solutions',
      position: 'Frontend Developer',
      interviewDate: '2024-01-25',
      interviewTime: '10:00 AM',
      type: 'Technical Interview',
      interviewer: 'John Smith',
      status: 'Confirmed'
    },
    {
      id: 2,
      student: 'Lisa Wang',
      rollNumber: 'CS2021006',
      company: 'Tech Corp',
      position: 'Software Engineer',
      interviewDate: '2024-01-26',
      interviewTime: '2:00 PM',
      type: 'HR Interview',
      interviewer: 'Sarah Johnson',
      status: 'Confirmed'
    },
    {
      id: 3,
      student: 'David Brown',
      rollNumber: 'CS2021007',
      company: 'DataSoft',
      position: 'Data Analyst',
      interviewDate: '2024-01-27',
      interviewTime: '11:00 AM',
      type: 'Panel Interview',
      interviewer: 'Mike Chen, Lisa Wang',
      status: 'Pending Confirmation'
    }
  ];

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

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInterviewStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending Confirmation': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-109 text-red-800';
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
                <span className="text-xs text-gray-500">{stat.change}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.period}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{application.studentName}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusWeight(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{application.rollNumber}</p>
                      <p className="text-sm text-gray-700">{application.company} • {application.position}</p>
                      <p className="text-xs text-gray-500">Applied: {formatDate(application.appliedDate)}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getMatchScoreColor(application.matchScore)}`}>
                        {application.matchScore}%
                      </div>
                      <p className="text-xs text-gray-500">Match Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Interviews</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{interview.student}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getInterviewStatusColor(interview.status)}`}>
                          {interview.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{interview.rollNumber}</p>
                      <p className="text-sm text-gray-700">{interview.company} • {interview.position}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                        <span>📅 {formatDate(interview.interviewDate)}</span>
                        <span>🕐 {interview.interviewTime}</span>
                        <span>👤 {interview.interviewer}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{interview.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

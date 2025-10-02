import React, { useState } from 'react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Corp Interview',
      type: 'Interview',
      company: 'Tech Corp',
      date: '2024-01-25',
      time: '10:00 AM',
      location: 'Video Call',
      description: 'Technical interview for Software Engineer position',
      status: 'Confirmed',
      priority: 'High',
      duration: '60 minutes',
      interviewer: 'John Smith',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Prepare for coding questions on data structures and algorithms'
    },
    {
      id: 2,
      title: 'DataSoft HR Round',
      type: 'Interview',
      company: 'DataSoft',
      date: '2024-01-28',
      time: '2:00 PM',
      location: 'In-Person',
      description: 'HR interview for Data Analyst position',
      status: 'Confirmed',
      priority: 'High',
      duration: '45 minutes',
      interviewer: 'Sarah Johnson',
      meetingLink: null,
      notes: 'Office location: 123 Business Park, Mumbai'
    },
    {
      id: 3,
      title: 'CloudTech Panel Interview',
      type: 'Interview',
      company: 'CloudTech',
      date: '2024-02-01',
      time: '11:00 AM',
      location: 'Video Call',
      description: 'Panel interview for DevOps Engineer position',
      status: 'Pending Confirmation',
      priority: 'Medium',
      duration: '90 minutes',
      interviewer: 'Mike Chen, Lisa Wang',
      meetingLink: null,
      notes: 'Awaiting confirmation from HR team'
    },
    {
      id: 4,
      title: 'Career Fair 2024',
      type: 'Career Fair',
      company: 'Multiple Companies',
      date: '2024-02-05',
      time: '9:00 AM',
      location: 'College Auditorium',
      description: 'Annual career fair with top companies',
      status: 'Registered',
      priority: 'High',
      duration: '8 hours',
      interviewer: null,
      meetingLink: null,
      notes: 'Bring multiple copies of resume and dress professionally'
    },
    {
      id: 5,
      title: 'Mock Interview Session',
      type: 'Training',
      company: 'Placement Cell',
      date: '2024-01-30',
      time: '3:00 PM',
      location: 'Room 201',
      description: 'Mock interview practice session',
      status: 'Confirmed',
      priority: 'Medium',
      duration: '30 minutes',
      interviewer: 'Dr. Emily Watson',
      meetingLink: null,
      notes: 'Practice common interview questions'
    }
  ];

  const completedEvents = [
    {
      id: 6,
      title: 'FinTech Solutions Interview',
      type: 'Interview',
      company: 'FinTech Solutions',
      date: '2024-01-20',
      time: '3:00 PM',
      location: 'Video Call',
      description: 'Technical interview for Frontend Developer position',
      status: 'Completed',
      priority: 'High',
      duration: '60 minutes',
      interviewer: 'Alex Rodriguez',
      meetingLink: null,
      notes: 'Strong technical skills demonstrated',
      result: 'Selected for next round',
      feedback: 'Good problem-solving approach and communication skills'
    },
    {
      id: 7,
      title: 'AI Innovations Technical Round',
      type: 'Interview',
      company: 'AI Innovations',
      date: '2024-01-18',
      time: '10:30 AM',
      location: 'Video Call',
      description: 'Technical interview for Machine Learning Engineer position',
      status: 'Completed',
      priority: 'High',
      duration: '75 minutes',
      interviewer: 'Dr. Emily Watson',
      meetingLink: null,
      notes: 'Focus on ML algorithms and system design',
      result: 'Rejected',
      feedback: 'Good ML knowledge but needs improvement in system design'
    },
    {
      id: 8,
      title: 'Resume Workshop',
      type: 'Workshop',
      company: 'Placement Cell',
      date: '2024-01-15',
      time: '2:00 PM',
      location: 'Library Conference Room',
      description: 'Workshop on resume writing and optimization',
      status: 'Completed',
      priority: 'Low',
      duration: '2 hours',
      interviewer: null,
      meetingLink: null,
      notes: 'Learn best practices for resume formatting',
      result: 'Completed',
      feedback: 'Very informative session'
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', count: upcomingEvents.length },
    { id: 'completed', label: 'Completed Events', count: completedEvents.length },
    { id: 'all', label: 'All Events', count: upcomingEvents.length + completedEvents.length }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending Confirmation': return 'bg-yellow-100 text-yellow-800';
      case 'Registered': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Interview': return 'bg-blue-100 text-blue-800';
      case 'Career Fair': return 'bg-purple-100 text-purple-800';
      case 'Training': return 'bg-green-100 text-green-800';
      case 'Workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderEventCard = (event) => (
    <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(event.priority)}`}>
              {event.priority} Priority
            </span>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(event.type)}`}>
              {event.type}
            </span>
          </div>
          
          <p className="text-lg font-medium text-gray-700 mb-2">{event.company}</p>
          <p className="text-gray-600 mb-4">{event.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📅</span>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">🕐</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📍</span>
                <span>{event.location}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">⏱️</span>
                <span>{event.duration}</span>
              </div>
              {event.interviewer && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">👤</span>
                  <span>{event.interviewer}</span>
                </div>
              )}
            </div>
          </div>
          
          {event.notes && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-600">{event.notes}</p>
            </div>
          )}

          {event.status === 'Completed' && (
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Result</h4>
                <p className="text-sm text-blue-700">{event.result}</p>
              </div>
              {event.feedback && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                  <p className="text-sm text-gray-600">{event.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 ml-4">
          {event.meetingLink && (
            <a
              href={event.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Join Meeting
            </a>
          )}
          
          {event.status === 'Confirmed' && !event.meetingLink && (
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              View Details
            </button>
          )}
          
          {event.status === 'Pending Confirmation' && (
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
              Follow Up
            </button>
          )}
          
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );

  const renderUpcomingEvents = () => (
    <div className="space-y-6">
      {upcomingEvents.map(renderEventCard)}
    </div>
  );

  const renderCompletedEvents = () => (
    <div className="space-y-6">
      {completedEvents.map(renderEventCard)}
    </div>
  );

  const renderAllEvents = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map(renderEventCard)}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Events</h3>
        <div className="space-y-4">
          {completedEvents.map(renderEventCard)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Manage all your placement-related events and activities</p>
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
        {activeTab === 'upcoming' && renderUpcomingEvents()}
        {activeTab === 'completed' && renderCompletedEvents()}
        {activeTab === 'all' && renderAllEvents()}

        {/* No events message */}
        {activeTab === 'upcoming' && upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
            <p className="text-gray-600">You don't have any scheduled events at the moment.</p>
          </div>
        )}

        {activeTab === 'completed' && completedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No completed events</h3>
            <p className="text-gray-600">Your completed events will appear here.</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">📅</span>
                </div>
                <span className="text-sm font-medium text-blue-900">Schedule Event</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">📊</span>
                </div>
                <span className="text-sm font-medium text-green-900">Export Calendar</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">🔔</span>
                </div>
                <span className="text-sm font-medium text-purple-900">Set Reminders</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

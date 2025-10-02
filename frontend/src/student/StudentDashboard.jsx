import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { title: 'Applied Jobs', value: '12', color: 'bg-blue-500' },
    { title: 'Interviews Scheduled', value: '5', color: 'bg-green-500' },
    { title: 'Offers Received', value: '2', color: 'bg-purple-500' },
    { title: 'Profile Views', value: '28', color: 'bg-orange-500' }
  ];

  const recentJobs = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Software Engineer',
      location: 'Bangalore',
      salary: '8-12 LPA',
      status: 'Applied',
      appliedDate: '2024-01-15'
    },
    {
      id: 2,
      company: 'DataSoft',
      position: 'Data Analyst',
      location: 'Mumbai',
      salary: '6-10 LPA',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-12'
    },
    {
      id: 3,
      company: 'CloudTech',
      position: 'DevOps Engineer',
      location: 'Pune',
      salary: '10-15 LPA',
      status: 'Offer Received',
      appliedDate: '2024-01-10'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Interview with Tech Corp',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Technical Interview'
    },
    {
      title: 'HR Round - DataSoft',
      date: '2024-01-22',
      time: '2:00 PM',
      type: 'HR Interview'
    },
    {
      title: 'Coding Test - CloudTech',
      date: '2024-01-25',
      time: '11:00 AM',
      type: 'Online Assessment'
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{job.position}</h3>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <p className="text-sm text-gray-500">Applied on {job.appliedDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                        job.status === 'Interview Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {job.status}
                      </span>
                      <p className="text-sm font-medium text-gray-900 mt-1">{job.salary}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/student/applications')}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Applications
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.type}</p>
                      <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Upcoming
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/student/events')}
                className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                View All Events
              </button>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default StudentDashboard;

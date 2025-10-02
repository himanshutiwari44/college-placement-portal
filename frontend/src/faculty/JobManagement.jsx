import React, { useState } from 'react';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full Time',
    experience: '',
    description: '',
    requirements: '',
    skills: [],
    deadline: '',
    contactEmail: '',
    applicationLink: ''
  });

  const [allJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Bangalore',
      salary: '8-12 LPA',
      type: 'Full Time',
      experience: '0-2 years',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      status: 'Active',
      applications: 45,
      views: 234,
      applicationLink: 'https://example.com/apply/techcorp-se'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'DataSoft',
      location: 'Mumbai',
      salary: '6-10 LPA',
      type: 'Full Time',
      experience: '1-3 years',
      postedDate: '2024-01-12',
      deadline: '2024-02-12',
      status: 'Active',
      applications: 32,
      views: 189,
      applicationLink: 'https://example.com/apply/datasoft-da'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Pune',
      salary: '10-15 LPA',
      type: 'Full Time',
      experience: '2-4 years',
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      status: 'Expired',
      applications: 28,
      views: 156,
      applicationLink: 'https://example.com/apply/cloudtech-devops'
    },
    {
      id: 4,
      title: 'Frontend Developer',
      company: 'FinTech Solutions',
      location: 'Delhi',
      salary: '7-11 LPA',
      type: 'Full Time',
      experience: '1-3 years',
      postedDate: '2024-01-08',
      deadline: '2024-02-08',
      status: 'Active',
      applications: 51,
      views: 298,
      applicationLink: 'https://example.com/apply/fintech-fe'
    },
    {
      id: 5,
      title: 'Machine Learning Engineer',
      company: 'AI Innovations',
      location: 'Hyderabad',
      salary: '12-18 LPA',
      type: 'Full Time',
      experience: '2-5 years',
      postedDate: '2024-01-05',
      deadline: '2024-02-05',
      status: 'Expired',
      applications: 67,
      views: 412,
      applicationLink: 'https://example.com/apply/ai-ml'
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All Jobs', count: allJobs.length },
    { id: 'active', label: 'Active', count: allJobs.filter(job => job.status === 'Active').length },
    { id: 'expired', label: 'Expired', count: allJobs.filter(job => job.status === 'Expired').length },
    { id: 'draft', label: 'Drafts', count: 0 }
  ];

  const filteredJobs = activeTab === 'all' 
    ? allJobs 
    : allJobs.filter(job => job.status.toLowerCase() === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
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

  const handleInputChange = (field, value) => {
    setNewJob(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitJob = (e) => {
    e.preventDefault();
    console.log('New job submitted:', newJob);
    setShowAddJobModal(false);
    setNewJob({
      title: '',
      company: '',
      location: '',
      salary: '',
      type: 'Full Time',
      experience: '',
      description: '',
      requirements: '',
      skills: [],
      deadline: '',
      contactEmail: '',
      applicationLink: ''
    });
  };

  const handleEditJob = (jobId) => {
    console.log('Edit job:', jobId);
  };

  const handleDeleteJob = (jobId) => {
    console.log('Delete job:', jobId);
  };

  const handleCloseModal = () => {
    setShowAddJobModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Management</h1>
              <p className="text-gray-600">Manage job postings and track applications</p>
            </div>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              <span className="mr-2">➕</span>
              Post New Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{allJobs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allJobs.filter(job => job.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allJobs.reduce((sum, job) => sum + job.applications, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👀</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allJobs.reduce((sum, job) => sum + job.views, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border p-2 border-gray-200 mb-8">
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

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-lg font-medium text-gray-700 mb-2">{job.company}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                    <span>⏰ {job.experience}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Applications</p>
                  <p className="text-lg font-semibold text-gray-900">{job.applications}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Views</p>
                  <p className="text-lg font-semibold text-gray-900">{job.views}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Posted: {formatDate(job.postedDate)}</span>
                <span>Deadline: {formatDate(job.deadline)}</span>
              </div>

              <div className="flex space-x-2">
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Open Application Link
                </a>
                <button
                  onClick={() => handleEditJob(job.id)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Job Modal */}
        {showAddJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Post New Job Opening</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              <form onSubmit={handleSubmitJob} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      value={newJob.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      value={newJob.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range *</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="e.g., 8-12 LPA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Required *</label>
                    <input
                      type="text"
                      value={newJob.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="e.g., 0-2 years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements *</label>
                  <textarea
                    value={newJob.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline *</label>
                    <input
                      type="date"
                      value={newJob.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                    <input
                      type="email"
                      value={newJob.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Link *</label>
                  <input
                    type="url"
                    value={newJob.applicationLink}
                    onChange={(e) => handleInputChange('applicationLink', e.target.value)}
                    placeholder="https://company.com/apply/job-id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Applicants will use this link to submit applications on the organization’s site.</p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* No jobs message */}
        {filteredJobs.length === 0 && activeTab !== 'draft' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">
              {activeTab === 'active' 
                ? "You don't have any active job postings" 
                : "No expired jobs found"}
            </p>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Post New Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement;

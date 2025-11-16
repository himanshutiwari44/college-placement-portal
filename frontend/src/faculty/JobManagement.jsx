import React, { useEffect, useState } from 'react';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobForm, setJobForm] = useState({
    jobid: '',
    companyname: '',
    location: '',
    salary: '',
    expereience: '',
    deadline: '',
    jobdescription: '',
    requirements: '',
    link: ''
  });

  const API_BASE = 'https://college-placement-portal-iick.onrender.com';

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/api/faculty/jobs`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const tabs = [
    { id: 'all', label: 'All Jobs', count: jobs.length }
  ];

  const filteredJobs = jobs;

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
    setJobForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const method = editingJobId ? 'PUT' : 'POST';
      const url = editingJobId
        ? `${API_BASE}/api/faculty/jobs/${editingJobId}`
        : `${API_BASE}/api/faculty/jobs`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobForm)
      });
      if (!res.ok) throw new Error('Failed to save job');
      await fetchJobs();
      setShowModal(false);
      setEditingJobId(null);
      setJobForm({
        jobid: '',
        companyname: '',
        location: '',
        salary: '',
        expereience: '',
        deadline: '',
        jobdescription: '',
        requirements: '',
        link: ''
      });
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.jobid);
    setJobForm({
      jobid: job.jobid,
      companyname: job.companyname,
      location: job.location,
      salary: job.salary,
      expereience: job.expereience,
      deadline: job.deadline ? String(job.deadline).slice(0,10) : '',
      jobdescription: job.jobdescription,
      requirements: job.requirements,
      link: job.link
    });
    setShowModal(true);
  };

  const handleDeleteJob = (jobId) => {
    console.log('Delete job:', jobId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJobId(null);
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
              onClick={() => { setShowModal(true); setEditingJobId(null); }}
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
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
            </div>
          </div>
          {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jobs with upcoming deadlines</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.filter(j => j.deadline).length}
                </p>
              </div>
            </div>
          </div> */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique companies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(jobs.map(j => j.companyname)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔗</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jobs with links</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.filter(j => j.link).length}
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

        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}
        {loading && (
          <div className="mb-4 text-gray-600">Loading jobs...</div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl-grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.jobid} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.jobdescription}</h3>
                  <p className="text-lg font-medium text-gray-700 mb-2">{job.companyname}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                    <span>⏰ {job.expereience}</span>
                  </div>
                </div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  Apply Link
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Job ID</p>
                  <p className="text-lg font-semibold text-gray-900">{job.jobid}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(job.deadline)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="truncate">Req: {job.requirements}</span>
                <span></span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditJob(job)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Job Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{editingJobId ? 'Edit Job' : 'Post New Job'}</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job ID *</label>
                    <input
                      type="number"
                      value={jobForm.jobid}
                      onChange={(e) => handleInputChange('jobid', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required={!editingJobId}
                      disabled={!!editingJobId}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      value={jobForm.companyname}
                      onChange={(e) => handleInputChange('companyname', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={jobForm.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                    <input
                      type="text"
                      value={jobForm.expereience}
                      onChange={(e) => handleInputChange('expereience', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline *</label>
                    <input
                      type="date"
                      value={jobForm.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    value={jobForm.jobdescription}
                    onChange={(e) => handleInputChange('jobdescription', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements *</label>
                  <textarea
                    value={jobForm.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Link *</label>
                  <input
                    type="url"
                    value={jobForm.link}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    placeholder="https://company.com/apply/job-id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
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
                    {editingJobId ? 'Save Changes' : 'Post Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* No jobs message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Click below to post a new job</p>
            <button
              onClick={() => { setShowModal(true); setEditingJobId(null); }}
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

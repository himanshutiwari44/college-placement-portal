import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';

const JobListings = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE = 'https://college-placement-portal-iick.onrender.com';
  const userEmail = useMemo(() => (user?.email || localStorage.getItem('userEmail') || ''), [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      if (!userEmail) throw new Error('Student email not found');
      const res = await fetch(`${API_BASE}/api/student/jobs?email=${encodeURIComponent(userEmail)}`);
      if (!res.ok) throw new Error('Failed to load jobs');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const locations = useMemo(() => ['All', ...Array.from(new Set((jobs || []).map(j => j.location).filter(Boolean)))], [jobs]);
  const salaryRanges = useMemo(() => ['All', ...Array.from(new Set((jobs || []).map(j => j.salary).filter(Boolean)))], [jobs]);
  const companies = useMemo(() => ['All', ...Array.from(new Set((jobs || []).map(j => j.companyname).filter(Boolean)))], [jobs]);

  const filteredJobs = (jobs || []).filter(job => {
    const matchesSearch = (job.jobdescription || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.companyname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.requirements || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All' || job.location === selectedLocation;
    const matchesSalary = selectedSalary === '' || selectedSalary === 'All' || job.salary === selectedSalary;
    const matchesCompany = selectedCompany === '' || selectedCompany === 'All' || job.companyname === selectedCompany;
    
    return matchesSearch && matchesLocation && matchesSalary && matchesCompany;
  });

  const handleApply = async (jobId) => {
    try {
      setError('');
      if (!userEmail) throw new Error('Student email not found');
      
      // Check if already applied
      const job = jobs.find(j => j.jobid === jobId);
      if (job?.is_applied) {
        return; // Already applied, don't do anything
      }
      
      const res = await fetch(`${API_BASE}/api/student/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, jobid: jobId, status: 'applied' })
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.message || 'Failed to apply');
      }
      // Update the job to mark it as applied
      setJobs(prev => prev.map(j => j.jobid === jobId ? { ...j, is_applied: true } : j));
    } catch (e) {
      setError(e.message);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Listings</h1>
          <p className="text-gray-600">Discover exciting career opportunities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Jobs</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by position, company, or keywords..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Salary Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <select
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {salaryRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {error && (
            <div className="text-red-600">{error}</div>
          )}
          {loading && (
            <div className="text-gray-600">Loading jobs...</div>
          )}
          {filteredJobs.map((job) => (
            <div key={job.jobid} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {job.companyname?.slice(0,2)?.toUpperCase() || 'CO'}
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.jobdescription}</h3>
                    </div>
                    
                    <p className="text-lg font-medium text-gray-700 mb-1">{job.companyname}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <span className="mr-1">📍</span>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">💰</span>
                        {job.salary}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏰</span>
                        {job.expereience}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.jobdescription}</p>
                    
                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{job.requirements || 'No specific requirements listed'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col items-end space-y-3">
                  <div className="text-right text-sm text-gray-500">
                    <p>Deadline: {job.deadline ? formatDate(job.deadline) : '—'}</p>
                  </div>
                  
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2 bg-gray-100 text-blue-700 rounded-lg font-medium hover:underline break-all"
                  >
                    Application Link
                  </a>

                  {job.is_applied ? (
                    <button
                      disabled
                      className="px-6 py-2 !bg-green-600 !text-white rounded-lg font-medium !cursor-not-allowed"
                    >
                      Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(job.jobid)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      Mark as Applied
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;

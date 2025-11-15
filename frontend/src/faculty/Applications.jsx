import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const Applications = () => {
  const [expanded, setExpanded] = useState({});
  const [jobsWithApplicants, setJobsWithApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE}/faculty/applications`);
        if (!res.ok) {
          throw new Error('Failed to load applications');
        }
        const data = await res.json();
        setJobsWithApplicants(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch applications');
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const toggleExpand = (jobid) => setExpanded(prev => ({ ...prev, [jobid]: !prev[jobid] }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading applications...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
          <p className="text-gray-600">View job roles and the list of students who have applied for each position.</p>
        </div>

        {jobsWithApplicants.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
            <p className="text-gray-600">No job applications found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobsWithApplicants.map(job => (
              <div key={job.jobid} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{job.companyname}</h3>
                    <p className="text-sm text-gray-600 mt-1">{job.jobdescription}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>Location: {job.location}</span>
                      <span>Salary: {job.salary}</span>
                      <span>Experience: {job.expereience}</span>
                      {job.application_count > 0 && (
                        <span className="text-blue-600 font-medium">
                          {job.application_count} {job.application_count === 1 ? 'application' : 'applications'}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(job.jobid)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium whitespace-nowrap"
                  >
                    {expanded[job.jobid] ? 'Hide' : 'View'}
                  </button>
                </div>
                {expanded[job.jobid] && (
                  <div className="px-4 pb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Students Applied ({job.applicants.length})
                      </h4>
                      {job.applicants.length === 0 ? (
                        <p className="text-gray-500 text-sm">No students have applied for this job yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {job.applicants.map((applicant) => {
                            const getStatusColor = (status) => {
                              const statusLower = (status || '').toLowerCase();
                              if (statusLower === 'placed') return 'bg-green-100 text-green-800 border-green-200';
                              if (statusLower === 'offer received') return 'bg-blue-100 text-blue-800 border-blue-200';
                              if (statusLower === 'interview scheduled') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                              if (statusLower === 'rejected') return 'bg-red-100 text-red-800 border-red-200';
                              return 'bg-gray-100 text-gray-800 border-gray-200';
                            };

                            return (
                              <div key={applicant.application_id} className="p-3 bg-white rounded border border-gray-200">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900">{applicant.name}</span>
                                  <div className="flex items-center gap-2">
                                    {applicant.cgpa && (
                                      <span className="text-sm text-gray-600">CGPA: {applicant.cgpa}</span>
                                    )}
                                    {applicant.status && (
                                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(applicant.status)}`}>
                                        {applicant.status}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-700">
                                  {applicant.rollno && (
                                    <div><span className="text-gray-500">Roll No:</span> {applicant.rollno}</div>
                                  )}
                                  {applicant.branch && (
                                    <div><span className="text-gray-500">Branch:</span> {applicant.branch}</div>
                                  )}
                                  {applicant.semester && (
                                    <div><span className="text-gray-500">Semester:</span> {applicant.semester}</div>
                                  )}
                                  {applicant.university && (
                                    <div><span className="text-gray-500">University:</span> {applicant.university}</div>
                                  )}
                                </div>
                                {applicant.email && (
                                  <div className="mt-2 text-xs text-gray-600">
                                    <span className="text-gray-500">Email:</span> {applicant.email}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;

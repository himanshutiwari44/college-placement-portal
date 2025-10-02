import React, { useState } from 'react';

const Applications = () => {
  // Minimal view: jobs with company and a list of applicant names only
  const [expanded, setExpanded] = useState({});
  const jobsWithApplicants = [
    { 
      id: 'job-1',
      title: 'Software Engineer',
      company: 'Tech Corp',
      applicants: [
        { name: 'John Doe', course: 'B.Tech', branch: 'CSE', semester: '8', section: 'A', cgpa: '8.5' },
        { name: 'Priya Singh', course: 'B.Tech', branch: 'IT', semester: '8', section: 'B', cgpa: '8.9' },
        { name: 'Aman Kumar', course: 'B.Tech', branch: 'CSE', semester: '8', section: 'C', cgpa: '8.2' },
        { name: 'Sara Khan', course: 'B.Tech', branch: 'ECE', semester: '8', section: 'A', cgpa: '8.7' }
      ]
    },
    { 
      id: 'job-2',
      title: 'Data Analyst',
      company: 'DataSoft',
      applicants: [
        { name: 'Sarah Johnson', course: 'B.Tech', branch: 'CSE', semester: '8', section: 'A', cgpa: '8.8' },
        { name: 'Mike Chen', course: 'B.Tech', branch: 'IT', semester: '8', section: 'B', cgpa: '8.2' },
        { name: 'Ravi Verma', course: 'B.Tech', branch: 'CSE', semester: '8', section: 'D', cgpa: '8.0' }
      ]
    },
    { 
      id: 'job-3',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      applicants: [
        { name: 'Emily Watson', course: 'B.Tech', branch: 'CSE', semester: '8', section: 'B', cgpa: '9.1' },
        { name: 'Ankit Sharma', course: 'B.Tech', branch: 'ECE', semester: '8', section: 'C', cgpa: '8.3' }
      ]
    }
  ];

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
          <p className="text-gray-600">View only applicant names for each job. No statuses or details shown.</p>
        </div>

        <div className="space-y-4">
          {jobsWithApplicants.map(job => (
            <div key={job.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <button
                  onClick={() => toggleExpand(job.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  {expanded[job.id] ? 'Hide Applications' : 'View Applications'}
                </button>
              </div>
              {expanded[job.id] && (
                <div className="px-4 pb-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Applicants</h4>
                    <div className="space-y-3">
                      {job.applicants.map((a, idx) => (
                        <div key={idx} className="p-3 bg-white rounded border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{a.name}</span>
                            <span className="text-sm text-gray-600">CGPA: {a.cgpa}</span>
                          </div>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-700">
                            <div><span className="text-gray-500">Course:</span> {a.course}</div>
                            <div><span className="text-gray-500">Branch:</span> {a.branch}</div>
                            <div><span className="text-gray-500">Semester:</span> {a.semester}</div>
                            <div><span className="text-gray-500">Section:</span> {a.section}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;

import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Report data states
  const [overviewData, setOverviewData] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [statusBreakdown, setStatusBreakdown] = useState([]);

  const reportTypes = [
    { id: 'overview', name: 'Overview Report', description: 'Overall placement statistics and trends' },
    { id: 'companies', name: 'Company Performance', description: 'Job posting and hiring trends by company' },
    { id: 'students', name: 'Student Performance', description: 'Individual student placement progress' },
    { id: 'branches', name: 'Branch-wise Analysis', description: 'Placement statistics by academic branch' },
    { id: 'status', name: 'Status Breakdown', description: 'Application status distribution' },
  ];

  // Fetch overview data
  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/faculty/reports/overview`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to load overview data' }));
        throw new Error(errorData.message || `HTTP ${res.status}: Failed to load overview data`);
      }
      const data = await res.json();
      setOverviewData(data);
    } catch (err) {
      console.error('Error fetching overview:', err);
      setError(err.message || 'Failed to load overview data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch branch data
  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/faculty/reports/branches`);
      if (!res.ok) throw new Error('Failed to load branch data');
      const data = await res.json();
      setBranchData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch company data
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/faculty/reports/companies`);
      if (!res.ok) throw new Error('Failed to load company data');
      const data = await res.json();
      setCompanyData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student data
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/faculty/reports/students`);
      if (!res.ok) throw new Error('Failed to load student data');
      const data = await res.json();
      setStudentData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch status breakdown
  const fetchStatusBreakdown = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/faculty/reports/status-breakdown`);
      if (!res.ok) throw new Error('Failed to load status breakdown');
      const data = await res.json();
      setStatusBreakdown(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data when report type or date range changes
  useEffect(() => {
    const loadData = async () => {
      switch (selectedReport) {
        case 'overview':
          await fetchOverview();
          break;
        case 'branches':
          await fetchBranches();
          break;
        case 'companies':
          await fetchCompanies();
          break;
        case 'students':
          await fetchStudents();
          break;
        case 'status':
          await fetchStatusBreakdown();
          break;
        default:
          break;
      }
    };
    loadData();
  }, [selectedReport]);

  const getProgressColor = (percentage) => {
    if (percentage >= 40) return 'bg-green-500';
    if (percentage >= 30) return 'bg-blue-500';
    if (percentage >= 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower === 'placed') return 'bg-green-100 text-green-800';
    if (statusLower === 'offer received') return 'bg-blue-100 text-blue-800';
    if (statusLower === 'interview scheduled') return 'bg-yellow-100 text-yellow-800';
    if (statusLower === 'rejected') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatStatus = (status) => {
    return (status || 'applied').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            {/* <p className="text-gray-600">Comprehensive placement statistics and insights</p> */}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Report Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Report Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  selectedReport === report.id
                    ? '!border-blue-500 !bg-blue-50 !text-blue-900'
                    : '!border-gray-200 !bg-white hover:!border-gray-300 !text-gray-900'
                }`}
              >
                <h3 className="font-semibold mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading report data...</div>
          </div>
        )}

        {/* Overview Report */}
        {!loading && selectedReport === 'overview' && overviewData && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewData.totalStudents}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎉</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Placed Students</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewData.placedStudents}</p>
                    <p className="text-xs text-green-600">{overviewData.placementPercentage}% placement rate</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewData.totalApplications}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Interviews</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewData.totalInterviews}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Companies</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewData.totalCompanies}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewData.activeJobs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Branch-wise Report */}
        {!loading && selectedReport === 'branches' && branchData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Branch-wise Placement Performance</h3>
            </div>
            <div className="space-y-4">
              {branchData.map((branch, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{branch.branch}</span>
                      <span className="text-sm text-gray-600">
                        {branch.placed}/{branch.students} placed ({branch.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(branch.percentage)}`}
                        style={{ width: `${Math.min(branch.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex gap-4 text-xs text-gray-600">
                      <span>Applications: {branch.applications}</span>
                      <span>Interviews: {branch.interviews}</span>
                      {branch.avgCgpa > 0 && <span>Avg CGPA: {branch.avgCgpa.toFixed(2)}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Companies Report */}
        {!loading && selectedReport === 'companies' && companyData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Company Performance Analysis</h3>
            </div>
            <div className="space-y-4">
              {companyData.map((company, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{company.company}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        company.conversion >= 30 ? 'bg-green-100 text-green-800' :
                        company.conversion >= 20 ? 'bg-blue-100 text-blue-800' :
                        company.conversion >= 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {company.conversion}% conversion
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-600">Jobs Posted</span>
                      <span className="text-lg font-semibold">{company.jobsPosted}</span>
                    </div>
                    <div>
                      <span className="block text-gray-600">Applications</span>
                      <span className="text-lg font-semibold">{company.applications}</span>
                    </div>
                    <div>
                      <span className="block text-gray-600">Interviews</span>
                      <span className="text-lg font-semibold">{company.interviews}</span>
                    </div>
                    <div>
                      <span className="block text-gray-600">Offers</span>
                      <span className="text-lg font-semibold">{company.offersReceived}</span>
                    </div>
                    <div>
                      <span className="block text-gray-600">Placements</span>
                      <span className="text-lg font-semibold text-green-600">{company.placements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Report */}
        {!loading && selectedReport === 'students' && studentData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Student Performance Report</h3>
              {/* <span className="text-sm text-gray-600">Showing {studentData.length} students</span> */}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviews</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placements</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentData.map((student) => (
                    <tr key={student.studentid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollno || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.cgpa ? student.cgpa.toFixed(2) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.applications}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.interviews}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{student.offers}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          student.placements > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.placements}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Status Breakdown Report */}
        {!loading && selectedReport === 'status' && statusBreakdown.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Application Status Breakdown</h3>
            </div>
            <div className="space-y-4">
              {statusBreakdown.map((item, index) => {
                const total = statusBreakdown.reduce((sum, s) => sum + s.count, 0);
                const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {formatStatus(item.status)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.count} applications ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(parseFloat(percentage))}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty States */}
        {!loading && (
          <>
            {selectedReport === 'branches' && branchData.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <p className="text-gray-600">No branch data available.</p>
              </div>
            )}
            {selectedReport === 'companies' && companyData.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <p className="text-gray-600">No company data available.</p>
              </div>
            )}
            {selectedReport === 'students' && studentData.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <p className="text-gray-600">No student data available.</p>
              </div>
            )}
            {selectedReport === 'status' && statusBreakdown.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                <p className="text-gray-600">No status data available.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;


import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('3months');

  const reportTypes = [
    { id: 'overview', name: 'Overview Report', description: 'Overall placement statistics and trends' },
    { id: 'companies', name: 'Company Performance', description: 'Job posting and hiring trends by company' },
    { id: 'students', name: 'Student Performance', description: 'Individual student placement progress' },
    { id: 'branches', name: 'Branch-wise Analysis', description: 'Placement statistics by academic branch' },
    { id: 'skill-demand', name: 'Skill Demand Analysis', description: 'Most demanded skills and technologies' }
   
  ];

  const dateRanges = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const overviewData = {
    totalStudents: 245,
    placedStudents: 89,
    placementPercentage: 36.3,
    totalApplications: 1245,
    totalInterviews: 367,
    totalCompanies: 28,
    activeJobs: 45
  };

  const branchData = [
    { branch: 'Computer Science', students: 95, placed: 42, percentage: 44.2 },
    { branch: 'Information Technology', students: 78, placed: 28, percentage: 35.9 },
    { branch: 'Electronics & Communication', students: 45, placed: 12, percentage: 26.7 },
    { branch: 'Mechanical Engineering', students: 27, placed: 7, percentage: 25.9 }
  ];

  const topCompanies = [
    { 
      company: 'Tech Corp', 
      jobsPosted: 12, 
      applications: 245, 
      interviews: 67, 
      placements: 15, 
      rating: 4.8,
      conversion: 22.4
    },
    { 
      company: 'AI Innovations', 
      jobsPosted: 15, 
      applications: 289, 
      interviews: 89, 
      placements: 23, 
      rating: 4.9,
      conversion: 25.8
    },
    { 
      company: 'DataSoft Solutions', 
      jobsPosted: 8, 
      applications: 156, 
      interviews: 45, 
      placements: 18, 
      rating: 4.6,
      conversion: 40.0
    },
    { 
      company: 'CloudTech Innovations', 
      jobsPosted: 6, 
      applications: 134, 
      interviews: 38, 
      placements: 12, 
      rating: 4.7,
      conversion: 31.6
    }
  ];

  const skillDemands = [
    { skill: 'JavaScript', demand: 85, applications: 234 },
    { skill: 'Python', demand: 78, applications: 198 },
    { skill: 'React.js', demand: 72, applications: 186 },
    { skill: 'Node.js', demand: 68, applications: 145 },
    { skill: 'SQL', demand: 65, applications: 167 },
    { skill: 'Machine Learning', demand: 58, applications: 123 },
    { skill: 'AWS/Cloud', demand: 55, applications: 98 },
    { skill: 'Docker', demand: 52, applications: 87 }
  ];

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${dateRange} period`);
  };

  const downloadReport = (format) => {
    console.log(`Downloading ${selectedReport} report as ${format}`);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 40) return 'bg-green-500';
    if (percentage >= 30) return 'bg-blue-500';
    if (percentage >= 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
              
            </div>
            <div className="flex space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
             
            </div>
          </div>
        </div>

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
                    ? '!border-green-500 !bg-green-50 !text-green-900'
                    : '!border-gray-200 !bg-white hover:!border-gray-300 !text-gray-900'
                }`}
              >
                <h3 className="font-semibold mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Report */}
        {selectedReport === 'overview' && (
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

            {/* Branch-wise Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Branch-wise Placement Performance</h3>
                <button
                  onClick={() => downloadReport('Excel')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Export
                </button>
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
                          style={{ width: `${branch.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Branch-wise Report */}
        {selectedReport === 'branches' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Branch Analysis</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadReport('PDF')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  PDF
                </button>
                <button
                  onClick={() => downloadReport('Excel')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Excel
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placement %</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Skills</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {branchData.map((branch, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{branch.branch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.students}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.placed}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          branch.percentage >= 40 ? 'bg-green-100 text-green-800' :
                          branch.percentage >= 30 ? 'bg-blue-100 text-blue-800' :
                          branch.percentage >= 20 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {branch.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8.5 LPA</td>
                      <td className="px-6 py-4 text-sm text-gray-500">JavaScript, Python, React</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Companies Report */}
        {selectedReport === 'companies' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Company Performance Analysis</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export Report
              </button>
            </div>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{company.company}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{company.rating}/5 ⭐</span>
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        {company.conversion}% conversion
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                      <span className="block text-gray-600">Placements</span>
                      <span className="text-lg font-semibold">{company.placements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skill Demand Report */}
        {selectedReport === 'skill-demand' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Most Demanded Skills</h3>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Export Skills Report
              </button>
            </div>
            <div className="space-y-3">
              {skillDemands.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{skill.skill}</span>
                      <span className="text-sm text-gray-600">{skill.demand}% demand</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{skill.applications} applications requiring this skill</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Download Options */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Report</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => downloadReport('PDF')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              📄 Download PDF
            </button>
            <button
              onClick={() => downloadReport('Excel')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              📊 Download Excel
            </button>
            <button
              onClick={() => downloadReport('PowerPoint')}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
            >
              💻 Download PowerPoint
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Reports are generated for the selected date range and will be emailed to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;

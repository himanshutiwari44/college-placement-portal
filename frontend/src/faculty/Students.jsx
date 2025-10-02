import React, { useState } from 'react';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const students = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'CS2021001',
      email: 'john.doe@student.edu',
      branch: 'Computer Science',
      year: '2024',
      cgpa: '8.5',
      phone: '+91 9876543210',
      status: 'Active',
      placements: 0,
      applications: 12,
      interviews: 3,
      lastActive: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rollNumber: 'CS2021002',
      email: 'sarah.johnson@student.edu',
      branch: 'Computer Science',
      year: '2024',
      cgpa: '8.8',
      phone: '+91 9876543211',
      status: 'Active',
      placements: 1,
      applications: 8,
      interviews: 2,
      lastActive: '2024-01-20T09:15:00Z'
    },
    {
      id: 3,
      name: 'Mike Chen',
      rollNumber: 'IT2021001',
      email: 'mike.chen@student.edu',
      branch: 'Information Technology',
      year: '2024',
      cgpa: '8.2',
      phone: '+91 9876543212',
      status: 'Active',
      placements: 0,
      applications: 15,
      interviews: 4,
      lastActive: '2024-01-20T08:45:00Z'
    },
    {
      id: 4,
      name: 'Emily Watson',
      rollNumber: 'CS2021003',
      email: 'emily.watson@student.edu',
      branch: 'Computer Science',
      year: '2024',
      cgpa: '9.1',
      phone: '+91 9876543213',
      status: 'Placed',
      placements: 1,
      applications: 6,
      interviews: 2,
      lastActive: '2024-01-19T16:30:00Z'
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      rollNumber: 'EC2021001',
      email: 'alex.rodriguez@student.edu',
      branch: 'Electronics & Communication',
      year: '2024',
      cgpa: '8.7',
      phone: '+91 9876543214',
      status: 'Active',
      placements: 0,
      applications: 10,
      interviews: 3,
      lastActive: '2024-01-19T14:20:00Z'
    },
    {
      id: 6,
      name: 'Lisa Wang',
      rollNumber: 'CS2021004',
      email: 'lisa.wang@student.edu',
      branch: 'Computer Science',
      year: '2024',
      cgpa: '8.9',
      phone: '+91 9876543215',
      status: 'Placed',
      placements: 1,
      applications: 4,
      interviews: 1,
      lastActive: '2024-01-19T11:00:00Z'
    }
  ];

  const branches = ['All', 'Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering'];
  const years = ['All', '2024', '2023', '2022'];
  const statuses = ['All', 'Active', 'Placed', 'Inactive'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === '' || selectedBranch === 'All' || student.branch === selectedBranch;
    const matchesYear = selectedYear === '' || selectedYear === 'All' || student.year === selectedYear;
    const matchesStatus = selectedStatus === '' || selectedStatus === 'All' || student.status === selectedStatus;
    
    return matchesSearch && matchesBranch && matchesYear && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Placed': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
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

  const getCGPAColor = (cgpa) => {
    const score = parseFloat(cgpa);
    if (score >= 9.0) return 'text-green-600 font-bold';
    if (score >= 8.5) return 'text-blue-600 font-semibold';
    if (score >= 8.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const averageCGPA = (students.reduce((sum, s) => sum + parseFloat(s.cgpa), 0) / students.length).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Students Management</h1>
          <p className="text-gray-600">Manage student data and track placement progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{activeStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎉</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Placed Students</p>
                <p className="text-2xl font-bold text-gray-900">{placedStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average CGPA</p>
                <p className="text-2xl font-bold text-gray-900">{averageCGPA}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Students</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, roll number, or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredStudents.length} of {totalStudents} students
          </p>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placement Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.rollNumber}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.branch}</div>
                      <div className="text-sm text-gray-500">Year: {student.year}</div>
                      <div className={`text-sm font-medium ${getCGPAColor(student.cgpa)}`}>
                        CGPA: {student.cgpa}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex space-x-4">
                          <span className="flex items-center">
                            <span className="mr-1">📋</span>
                            {student.applications}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">🎯</span>
                            {student.interviews}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">✅</span>
                            {student.placements}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(student.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Edit
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          Applications
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No students message */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export to Excel
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Export to PDF
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;

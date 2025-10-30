import React, { useEffect, useMemo, useState } from 'react';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [students, setStudents] = useState([]);
  const [cards, setCards] = useState({ totalStudents: 0, placedStudents: 0, averageCgpa: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE = 'http://localhost:5000/api/faculty';

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'details' | 'applications'
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalData, setModalData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchCards = async () => {
    const res = await fetch(`${API_BASE}/students/cards`);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.message || 'Failed to load cards');
    setCards(body);
  };

  const fetchStudents = async (term) => {
    const url = term ? `${API_BASE}/students?search=${encodeURIComponent(term)}` : `${API_BASE}/students`;
    const res = await fetch(url);
    const body = await res.json().catch(() => ([]));
    if (!res.ok) throw new Error(body.message || 'Failed to load students');
    // Normalize for UI expectations
    const normalized = (body || []).map((s) => ({
      id: s.studentid,
      name: s.name,
      rollNumber: s.rollno,
      email: s.email,
      branch: s.branch,
      year: s.year,
      cgpa: String(s.cgpa ?? ''),
      phone: s.phone || '',
      applications: s.applications || 0,
      interviews: s.interviews || 0,
      placements: s.placements || 0,
      status: (s.placements || 0) > 0 ? 'Placed' : 'Active',
      lastActive: null,
    }));
    setStudents(normalized);
  };

  const openDetails = async (student) => {
    try {
      setSelectedStudent(student);
      setShowModal(true);
      setModalType('details');
      setModalLoading(true);
      setModalError('');
      const res = await fetch(`${API_BASE}/students/${encodeURIComponent(student.id)}`);
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || 'Failed to load student details');
      setModalData(body);
    } catch (e) {
      setModalError(e.message || 'Failed to load details');
    } finally {
      setModalLoading(false);
    }
  };

  const openApplications = async (student) => {
    try {
      setSelectedStudent(student);
      setShowModal(true);
      setModalType('applications');
      setModalLoading(true);
      setModalError('');
      const res = await fetch(`${API_BASE}/students/${encodeURIComponent(student.id)}/applications`);
      const body = await res.json().catch(() => ([]));
      if (!res.ok) throw new Error(body.message || 'Failed to load applications');
      setModalData(body);
    } catch (e) {
      setModalError(e.message || 'Failed to load applications');
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalData(null);
    setSelectedStudent(null);
    setModalError('');
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        await Promise.all([fetchCards(), fetchStudents('')]);
      } catch (e) {
        setError(e.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        await fetchStudents(searchTerm);
      } catch (e) {
        setError(e.message || 'Failed to search students');
      } finally {
        setLoading(false);
      }
    };
    // basic debounce
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const branches = useMemo(() => ['All', ...Array.from(new Set((students || []).map(s => s.branch).filter(Boolean)))], [students]);
  const years = useMemo(() => ['All', ...Array.from(new Set((students || []).map(s => s.year).filter(Boolean)))], [students]);
  const statuses = ['All', 'Active', 'Placed', 'Inactive'];

  const filteredStudents = (students || []).filter((student) => {
    const st = (searchTerm || '').toLowerCase();
    const name = (student.name || '').toLowerCase();
    const roll = (student.rollNumber != null ? String(student.rollNumber) : '').toLowerCase();
    const email = (student.email || '').toLowerCase();
    const matchesSearch = !st || name.includes(st) || roll.includes(st) || email.includes(st);
    const matchesBranch = selectedBranch === '' || selectedBranch === 'All' || student.branch === selectedBranch;
    const matchesYear = selectedYear === '' || selectedYear === 'All' || String(student.year) === String(selectedYear);
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

  const totalStudents = cards.totalStudents || students.length;
  const placedStudents = cards.placedStudents || students.filter(s => s.status === 'Placed').length;
  const averageCGPA = (cards.averageCgpa ?? 0).toFixed ? cards.averageCgpa.toFixed(2) : String(cards.averageCgpa);

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
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* <div>
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
            </div> */}
            {/* <div>
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
            </div> */}
            {/* <div>
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
            </div> */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placement Activity</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" onClick={() => openDetails(student)}>
                          View Details
                        </button>
                       
                        <button className="text-purple-600 hover:text-purple-900" onClick={() => openApplications(student)}>
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

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg border border-gray-200">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === 'details' ? 'Student Details' : 'Student Applications'}
                </h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>✖</button>
              </div>
              <div className="p-4">
                {modalLoading ? (
                  <div className="text-gray-600">Loading...</div>
                ) : modalError ? (
                  <div className="text-red-600 text-sm">{modalError}</div>
                ) : modalType === 'details' && modalData ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-900"><span className="font-medium">Name:</span> {modalData.name || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Email:</span> {modalData.email || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Roll No:</span> {modalData.rollno || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Branch:</span> {modalData.branch || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">University:</span> {modalData.university || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Admission Year:</span> {modalData.admission_year || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Graduation Year:</span> {modalData.grad_year || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Semester:</span> {modalData.semester || ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">CGPA:</span> {modalData.cgpa ?? ''}</div>
                    <div className="text-sm text-gray-900"><span className="font-medium">Contact:</span> {modalData.contact || ''}</div>
                    <div className="text-sm text-blue-700"><a href={modalData.linkedin || '#'} target="_blank" rel="noreferrer">LinkedIn</a></div>
                    <div className="text-sm text-blue-700"><a href={modalData.github || '#'} target="_blank" rel="noreferrer">GitHub</a></div>
                    <div className="text-sm text-blue-700"><a href={modalData.portfolio || '#'} target="_blank" rel="noreferrer">Portfolio</a></div>
                  </div>
                ) : modalType === 'applications' && Array.isArray(modalData) ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {modalData.length === 0 && (
                      <div className="text-gray-600 text-sm">No applications found.</div>
                    )}
                    {modalData.map((app) => (
                      <div key={app.id} className="p-3 bg-gray-50 rounded border">
                        <div className="text-sm font-medium text-gray-900">{app.companyname}</div>
                        <div className="text-xs text-gray-600">Job ID: {app.jobid}</div>
                        <div className="text-xs text-gray-600">Status: {app.status}</div>
                        <div className="text-xs text-gray-600">Location: {app.location}</div>
                        <div className="text-xs text-gray-600">Salary: {app.salary}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="p-4 border-t text-right">
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        
      </div>
    </div>
  );
};

export default Students;

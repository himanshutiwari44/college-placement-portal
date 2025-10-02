import React, { useState } from 'react';

const Company = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    location: '',
    size: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    website: '',
    status: 'Active'
  });

  const companies = [
    {
      id: 1,
      name: 'Tech Corp',
      industry: 'Technology',
      location: 'Bangalore',
      size: 'Large (5000+ employees)',
      contactPerson: 'John Smith',
      contactEmail: 'john.smith@techcorp.com',
      contactPhone: '+91 9876543210',
      website: 'https://www.techcorp.com',
      jobsPosted: 12,
      applicationsReceived: 245,
      placements: 45,
      status: 'Active',
      partnershipStartDate: '2023-01-15',
      rating: 4.8
    },
    {
      id: 2,
      name: 'DataSoft Solutions',
      industry: 'Data Analytics',
      location: 'Mumbai',
      size: 'Medium (500-2000 employees)',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@datasoft.com',
      contactPhone: '+91 9876543211',
      website: 'https://www.datasoft.com',
      jobsPosted: 8,
      applicationsReceived: 156,
      placements: 28,
      status: 'Active',
      partnershipStartDate: '2023-03-20',
      rating: 4.6
    },
    {
      id: 3,
      name: 'CloudTech Innovations',
      industry: 'Cloud Computing',
      location: 'Pune',
      size: 'Medium (500-2000 employees)',
      contactPerson: 'Mike Chen',
      contactEmail: 'mike.chen@cloudtech.com',
      contactPhone: '+91 9876543212',
      website: 'https://www.cloudtech.com',
      jobsPosted: 6,
      applicationsReceived: 134,
      placements: 22,
      status: 'Active',
      partnershipStartDate: '2023-06-10',
      rating: 4.7
    },
    {
      id: 4,
      name: 'AI Innovations Ltd',
      industry: 'Artificial Intelligence',
      location: 'Hyderabad',
      size: 'Large (5000+ employees)',
      contactPerson: 'Emily Watson',
      contactEmail: 'emily.watson@aiinnovations.com',
      contactPhone: '+91 9876543213',
      website: 'https://www.aiinnovations.com',
      jobsPosted: 15,
      applicationsReceived: 289,
      placements: 67,
      status: 'Active',
      partnershipStartDate: '2022-11-05',
      rating: 4.9
    },
    {
      id: 5,
      name: 'FinTech Solutions',
      industry: 'Financial Technology',
      location: 'Delhi',
      size: 'Medium (500-2000 employees)',
      contactPerson: 'David Brown',
      contactEmail: 'david.brown@fintech.com',
      contactPhone: '+91 9876543214',
      website: 'https://www.fintechsolutions.com',
      jobsPosted: 4,
      applicationsReceived: 89,
      placements: 12,
      status: 'Inactive',
      partnershipStartDate: '2023-09-12',
      rating: 4.2
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Companies', count: companies.length },
    { id: 'active', label: 'Active', count: companies.filter(company => company.status === 'Active').length },
    { id: 'inactive', label: 'Inactive', count: companies.filter(company => company.status === 'Inactive').length },
    { id: 'new', label: 'New Partnerships', count: 2 }
  ];

  const filteredCompanies = activeTab === 'all' ? companies :
                           companies.filter(company => 
                             activeTab === 'active' ? company.status === 'Active' :
                             activeTab === 'inactive' ? company.status === 'Inactive' :
                             company.status === 'Active'
                           );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars.join('');
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
    setNewCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    console.log('New company submitted:', newCompany);
    setShowAddCompanyModal(false);
    setNewCompany({
      name: '',
      industry: '',
      location: '',
      size: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      website: '',
      status: 'Active'
    });
  };

  const totalJobs = companies.reduce((sum, company) => sum + company.jobsPosted, 0);
  const totalApplications = companies.reduce((sum, company) => sum + company.applicationsReceived, 0);
  const totalPlacements = companies.reduce((sum, company) => sum + company.placements, 0);
  const averageRating = (companies.reduce((sum, company) => sum + company.rating, 0) / companies.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Management</h1>
              <p className="text-gray-600">Manage company partnerships and collaborations</p>
            </div>
            <button
              onClick={() => setShowAddCompanyModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              <span className="mr-2">➕</span>
              Add Company
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
                <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vacancies</p>
                <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
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
                <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎉</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Placements</p>
                <p className="text-2xl font-bold text-gray-900">{totalPlacements}</p>
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
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-gray-600 mb-2">{company.industry} • {company.location}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500">Size: {company.size}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Jobs Posted</p>
                  <p className="text-lg font-semibold text-gray-900">{company.jobsPosted}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Applications</p>
                  <p className="text-lg font-semibold text-gray-900">{company.applicationsReceived}</p>
              </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Placements</p>
                  <p className="text-lg font-semibold text-gray-900">{company.placements}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Partnership since: {formatDate(company.partnershipStartDate)}</span>
                <div className="flex items-center">
                  <span className="mr-1">{getRatingStars(company.rating)}</span>
                  <span className="font-medium">{company.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div><span className="font-medium">Contact:</span> {company.contactPerson}</div>
                <div><span className="font-medium">Email:</span> {company.contactEmail}</div>
                <div><span className="font-medium">Phone:</span> {company.contactPhone}</div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                  Manage Jobs
                </button>
                <button className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Company Modal */}
        {showAddCompanyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Company</h2>
                <button
                  onClick={() => setShowAddCompanyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              <form onSubmit={handleSubmitCompany} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      value={newCompany.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      value={newCompany.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Financial Technology">Financial Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="E-commerce">E-commerce</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={newCompany.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <select
                      value={newCompany.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Size</option>
                      <option value="Small (1-50 employees)">Small (1-50 employees)</option>
                      <option value="Medium (50-500 employees)">Medium (50-500 employees)</option>
                      <option value="Large (500-2000 employees)">Large (500-2000 employees)</option>
                      <option value="Enterprise (5000+ employees)">Enterprise (5000+ employees)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      value={newCompany.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                    <input
                      type="email"
                      value={newCompany.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      value={newCompany.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={newCompany.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newCompany.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                  <textarea
                    value={newCompany.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    placeholder="Brief description of the company..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCompanyModal(false)}
                    className="flex-1 px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* No companies message */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">
              {activeTab === 'active' 
                ? "You don't have any active company partnerships" 
                : activeTab === 'inactive'
                ? "No inactive companies found"
                : "No companies found for the selected criteria"}
            </p>
            <button
              onClick={() => setShowAddCompanyModal(true)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add New Company
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Company;

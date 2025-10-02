import React, { useState } from 'react';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const jobs = [
    {
      id: 1,
      company: 'Tech Corp',
      logo: 'TC',
      position: 'Software Engineer',
      location: 'Bangalore',
      salary: '8-12 LPA',
      type: 'Full Time',
      experience: '0-2 years',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      description: 'We are looking for a passionate Software Engineer to join our team. You will be responsible for developing and maintaining web applications.',
      requirements: ['Bachelor\'s degree in Computer Science', 'Strong programming skills', 'Experience with React/Node.js'],
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      applied: false
    },
    {
      id: 2,
      company: 'DataSoft',
      logo: 'DS',
      position: 'Data Analyst',
      location: 'Mumbai',
      salary: '6-10 LPA',
      type: 'Full Time',
      experience: '1-3 years',
      postedDate: '2024-01-12',
      deadline: '2024-02-12',
      description: 'Join our data team to analyze business data and provide insights for decision making.',
      requirements: ['Bachelor\'s degree in Data Science/Statistics', 'Proficiency in Python/R', 'SQL knowledge'],
      skills: ['Python', 'R', 'SQL', 'Tableau'],
      applied: true
    },
    {
      id: 3,
      company: 'CloudTech',
      logo: 'CT',
      position: 'DevOps Engineer',
      location: 'Pune',
      salary: '10-15 LPA',
      type: 'Full Time',
      experience: '2-4 years',
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      description: 'We need a DevOps Engineer to manage our cloud infrastructure and deployment pipelines.',
      requirements: ['Bachelor\'s degree in Computer Science', 'AWS/Azure certification', 'Docker/Kubernetes experience'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      applied: false
    },
    {
      id: 4,
      company: 'FinTech Solutions',
      logo: 'FS',
      position: 'Frontend Developer',
      location: 'Delhi',
      salary: '7-11 LPA',
      type: 'Full Time',
      experience: '1-3 years',
      postedDate: '2024-01-08',
      deadline: '2024-02-08',
      description: 'Create beautiful and responsive user interfaces for our financial applications.',
      requirements: ['Bachelor\'s degree in Computer Science', 'Strong HTML/CSS/JS skills', 'React/Vue.js experience'],
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      applied: false
    },
    {
      id: 5,
      company: 'AI Innovations',
      logo: 'AI',
      position: 'Machine Learning Engineer',
      location: 'Hyderabad',
      salary: '12-18 LPA',
      type: 'Full Time',
      experience: '2-5 years',
      postedDate: '2024-01-05',
      deadline: '2024-02-05',
      description: 'Develop and implement machine learning models for various business applications.',
      requirements: ['Master\'s degree in ML/AI', 'Python programming', 'TensorFlow/PyTorch experience'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
      applied: false
    }
  ];

  const locations = ['All', 'Bangalore', 'Mumbai', 'Pune', 'Delhi', 'Hyderabad'];
  const salaryRanges = ['All', '5-8 LPA', '8-12 LPA', '12-18 LPA', '18+ LPA'];
  const companies = ['All', 'Tech Corp', 'DataSoft', 'CloudTech', 'FinTech Solutions', 'AI Innovations'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All' || job.location === selectedLocation;
    const matchesSalary = selectedSalary === '' || selectedSalary === 'All' || job.salary === selectedSalary;
    const matchesCompany = selectedCompany === '' || selectedCompany === 'All' || job.company === selectedCompany;
    
    return matchesSearch && matchesLocation && matchesSalary && matchesCompany;
  });

  const handleApply = (jobId) => {
    // Here you would typically handle the application logic
    console.log(`Applying for job ${jobId}`);
    // Update the job's applied status
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
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {job.logo}
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.position}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {job.type}
                      </span>
                    </div>
                    
                    <p className="text-lg font-medium text-gray-700 mb-1">{job.company}</p>
                    
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
                        <span className="mr-1">👤</span>
                        {job.experience}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col items-end space-y-3">
                  <div className="text-right text-sm text-gray-500">
                    <p>Posted: {formatDate(job.postedDate)}</p>
                    <p>Deadline: {formatDate(job.deadline)}</p>
                  </div>
                  
                  {job.applied ? (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                      Applied ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      Apply Now
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

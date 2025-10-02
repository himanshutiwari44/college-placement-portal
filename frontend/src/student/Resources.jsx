import React, { useState } from 'react';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('study-materials');
  const [searchTerm, setSearchTerm] = useState('');

  const studyMaterials = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      description: 'Comprehensive guide to DSA concepts with examples and practice problems',
      type: 'PDF',
      size: '2.5 MB',
      category: 'Technical',
      uploadDate: '2024-01-15',
      downloads: 1250,
      rating: 4.8,
      author: 'Dr. John Smith'
    },
    {
      id: 2,
      title: 'System Design Interview Guide',
      description: 'Complete guide to system design interviews with real-world examples',
      type: 'PDF',
      size: '3.2 MB',
      category: 'Technical',
      uploadDate: '2024-01-12',
      downloads: 890,
      rating: 4.9,
      author: 'Sarah Johnson'
    },
    {
      id: 3,
      title: 'Behavioral Interview Questions',
      description: 'Common behavioral questions and how to answer them effectively',
      type: 'PDF',
      size: '1.8 MB',
      category: 'Soft Skills',
      uploadDate: '2024-01-10',
      downloads: 2100,
      rating: 4.7,
      author: 'Mike Chen'
    },
    {
      id: 4,
      title: 'Resume Writing Tips',
      description: 'Best practices for creating an effective resume',
      type: 'PDF',
      size: '1.2 MB',
      category: 'Career',
      uploadDate: '2024-01-08',
      downloads: 1800,
      rating: 4.6,
      author: 'Lisa Wang'
    }
  ];

  const interviewTips = [
    {
      id: 1,
      title: 'Technical Interview Preparation',
      content: 'Prepare for technical interviews by practicing coding problems, reviewing system design concepts, and understanding the company\'s tech stack.',
      category: 'Technical',
      difficulty: 'Intermediate',
      duration: '5 min read'
    },
    {
      id: 2,
      title: 'How to Answer STAR Questions',
      content: 'Learn the STAR method (Situation, Task, Action, Result) to structure your answers to behavioral interview questions effectively.',
      category: 'Behavioral',
      difficulty: 'Beginner',
      duration: '3 min read'
    },
    {
      id: 3,
      title: 'Salary Negotiation Tips',
      content: 'Master the art of salary negotiation with these proven strategies and techniques.',
      category: 'Career',
      difficulty: 'Advanced',
      duration: '7 min read'
    },
    {
      id: 4,
      title: 'Remote Interview Best Practices',
      content: 'Tips for acing remote interviews including technical setup, body language, and communication.',
      category: 'Technical',
      difficulty: 'Beginner',
      duration: '4 min read'
    }
  ];

  const practiceTests = [
    {
      id: 1,
      title: 'JavaScript Fundamentals Quiz',
      description: 'Test your knowledge of JavaScript basics',
      questions: 25,
      duration: '30 minutes',
      difficulty: 'Beginner',
      attempts: 1250,
      averageScore: 78
    },
    {
      id: 2,
      title: 'Data Structures Practice Test',
      description: 'Practice problems on arrays, linked lists, trees, and graphs',
      questions: 40,
      duration: '60 minutes',
      difficulty: 'Intermediate',
      attempts: 890,
      averageScore: 72
    },
    {
      id: 3,
      title: 'System Design Mock Interview',
      description: 'Simulate a real system design interview scenario',
      questions: 5,
      duration: '45 minutes',
      difficulty: 'Advanced',
      attempts: 450,
      averageScore: 68
    },
    {
      id: 4,
      title: 'Behavioral Questions Assessment',
      description: 'Practice answering common behavioral interview questions',
      questions: 15,
      duration: '20 minutes',
      difficulty: 'Beginner',
      attempts: 1100,
      averageScore: 82
    }
  ];

  const careerGuidance = [
    {
      id: 1,
      title: 'Choosing Your Career Path',
      description: 'Guidance on selecting the right career path in technology',
      type: 'Article',
      author: 'Career Counselor',
      readTime: '8 min',
      views: 2500
    },
    {
      id: 2,
      title: 'Building Your Professional Network',
      description: 'Tips for networking and building professional relationships',
      type: 'Article',
      author: 'Industry Expert',
      readTime: '6 min',
      views: 1800
    },
    {
      id: 3,
      title: 'Transitioning from College to Industry',
      description: 'How to smoothly transition from academic to professional life',
      type: 'Article',
      author: 'HR Manager',
      readTime: '10 min',
      views: 3200
    },
    {
      id: 4,
      title: 'Freelancing vs Full-time Employment',
      description: 'Pros and cons of different employment models',
      type: 'Article',
      author: 'Freelance Consultant',
      readTime: '7 min',
      views: 1500
    }
  ];

  const tabs = [
    { id: 'study-materials', label: 'Study Materials', count: studyMaterials.length },
    { id: 'interview-tips', label: 'Interview Tips', count: interviewTips.length },
    { id: 'practice-tests', label: 'Practice Tests', count: practiceTests.length },
    { id: 'career-guidance', label: 'Career Guidance', count: careerGuidance.length }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Soft Skills': return 'bg-purple-100 text-purple-800';
      case 'Career': return 'bg-green-100 text-green-800';
      case 'Behavioral': return 'bg-orange-100 text-orange-800';
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

  const renderStudyMaterials = () => (
    <div className="space-y-6">
      {studyMaterials.map((material) => (
        <div key={material.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{material.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(material.category)}`}>
                  {material.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{material.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <span className="mr-1">📄</span>
                  {material.type} • {material.size}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">👤</span>
                  {material.author}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">📅</span>
                  {formatDate(material.uploadDate)}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">⬇️</span>
                  {material.downloads} downloads
                </span>
                <span className="flex items-center">
                  <span className="mr-1">⭐</span>
                  {material.rating}/5
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Download
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Preview
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInterviewTips = () => (
    <div className="space-y-6">
      {interviewTips.map((tip) => (
        <div key={tip.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{tip.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(tip.category)}`}>
                  {tip.category}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                  {tip.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{tip.content}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-1">⏱️</span>
                  {tip.duration}
                </span>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPracticeTests = () => (
    <div className="space-y-6">
      {practiceTests.map((test) => (
        <div key={test.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{test.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                <div>
                  <span className="font-medium text-gray-700">Questions:</span>
                  <p>{test.questions}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <p>{test.duration}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Attempts:</span>
                  <p>{test.attempts}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Avg Score:</span>
                  <p>{test.averageScore}%</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Start Test
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                View Results
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCareerGuidance = () => (
    <div className="space-y-6">
      {careerGuidance.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {article.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{article.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-1">👤</span>
                  {article.author}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">⏱️</span>
                  {article.readTime}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">👁️</span>
                  {article.views} views
                </span>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Read Article
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
          <p className="text-gray-600">Access study materials, practice tests, and career guidance</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
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

        {/* Content */}
        {activeTab === 'study-materials' && renderStudyMaterials()}
        {activeTab === 'interview-tips' && renderInterviewTips()}
        {activeTab === 'practice-tests' && renderPracticeTests()}
        {activeTab === 'career-guidance' && renderCareerGuidance()}

      </div>
    </div>
  );
};

export default Resources;

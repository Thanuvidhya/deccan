import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, BookOpen, ArrowRight, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SkillScore {
  skill: string;
  score: number;
  category: string;
  required: number;
  gap: number;
}

interface AssessmentResult {
  overallScore: number;
  skills: SkillScore[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const mockResults: AssessmentResult = {
  overallScore: 72,
  skills: [
    { skill: 'React', score: 85, category: 'Frontend', required: 90, gap: 5 },
    { skill: 'TypeScript', score: 78, category: 'Frontend', required: 85, gap: 7 },
    { skill: 'Node.js', score: 65, category: 'Backend', required: 80, gap: 15 },
    { skill: 'Testing', score: 60, category: 'QA', required: 75, gap: 15 },
    { skill: 'System Design', score: 70, category: 'Architecture', required: 80, gap: 10 },
    { skill: 'DevOps', score: 55, category: 'Operations', required: 70, gap: 15 }
  ],
  strengths: [
    'Strong React fundamentals and component architecture',
    'Good understanding of modern frontend patterns',
    'Solid problem-solving approach',
    'Clear communication skills'
  ],
  weaknesses: [
    'Limited backend development experience',
    'Testing practices need improvement',
    'DevOps and deployment knowledge gaps',
    'System design at scale'
  ],
  recommendations: [
    'Focus on Node.js and Express for backend development',
    'Implement comprehensive testing strategies',
    'Learn Docker and CI/CD pipelines',
    'Study distributed systems design patterns'
  ]
};

export const Results: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const categories = ['all', ...Array.from(new Set(mockResults.skills.map(s => s.category)))];
  
  const filteredSkills = selectedCategory === 'all' 
    ? mockResults.skills 
    : mockResults.skills.filter(s => s.category === selectedCategory);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const exportResults = () => {
    // Simulate export functionality
    const dataStr = JSON.stringify(mockResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'skillbridge-assessment-results.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Results</h1>
          <p className="text-gray-600">Your personalized skill evaluation and learning recommendations</p>
        </div>

        {/* Overall Score Card */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Overall Score</h2>
            <div className="flex space-x-2">
              <button 
                onClick={exportResults}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-8 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(mockResults.overallScore)}`}>
                    {mockResults.overallScore}%
                  </div>
                  <div className="text-gray-600 mt-2">Score</div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(mockResults.overallScore)} ${getScoreColor(mockResults.overallScore)}`}>
                  {mockResults.overallScore >= 80 ? 'Excellent' : mockResults.overallScore >= 60 ? 'Good' : 'Needs Work'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skills Chart */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Skills Breakdown</h3>
              <BarChart3 className="w-6 h-6 text-gray-400" />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{skill.skill}</span>
                    <span className={`text-sm font-medium ${getScoreColor(skill.score)}`}>
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        skill.score >= 80 ? 'bg-green-500' : 
                        skill.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Required: {skill.required}%</span>
                    <span>Gap: {skill.gap}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="space-y-6">
            {/* Strengths */}
            <div className="card">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {mockResults.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="card">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Areas for Improvement</h3>
              </div>
              <ul className="space-y-3">
                {mockResults.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">Personalized Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockResults.recommendations.map((rec, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Bridge Your Skill Gaps?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get a personalized learning roadmap with curated resources and realistic time estimates to reach your target role.
            </p>
            <button 
              onClick={() => navigate('/learning')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              View Learning Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

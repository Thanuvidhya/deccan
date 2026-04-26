import React, { useState } from 'react';
import { BookOpen, Clock, PlayCircle, CheckCircle, ExternalLink, Star, Calendar, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'tutorial' | 'book' | 'video' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  provider: string;
  rating: number;
  url: string;
  description: string;
  skills: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  resources: LearningResource[];
  milestones: string[];
  progress: number;
}

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Full-Stack JavaScript Development',
    description: 'Master both frontend and backend development with JavaScript',
    totalDuration: '12-16 weeks',
    progress: 25,
    milestones: [
      'Advanced React & TypeScript',
      'Node.js & Express Fundamentals',
      'Database Design & Management',
      'RESTful API Development',
      'Testing & Deployment'
    ],
    resources: [
      {
        id: 'r1',
        title: 'React - The Complete Guide',
        type: 'course',
        difficulty: 'intermediate',
        duration: '40 hours',
        provider: 'Udemy',
        rating: 4.8,
        url: '#',
        description: 'Deep dive into React with hooks, context, and advanced patterns',
        skills: ['React', 'JavaScript', 'TypeScript']
      },
      {
        id: 'r2',
        title: 'Node.js Design Patterns',
        type: 'book',
        difficulty: 'advanced',
        duration: '20 hours',
        provider: 'O\'Reilly',
        rating: 4.6,
        url: '#',
        description: 'Master Node.js architecture and design patterns',
        skills: ['Node.js', 'JavaScript', 'Architecture']
      },
      {
        id: 'r3',
        title: 'Testing JavaScript Applications',
        type: 'tutorial',
        difficulty: 'intermediate',
        duration: '15 hours',
        provider: 'TestingJavaScript.com',
        rating: 4.7,
        url: '#',
        description: 'Comprehensive testing strategies for modern JavaScript apps',
        skills: ['Testing', 'Jest', 'Cypress']
      }
    ]
  },
  {
    id: '2',
    title: 'Cloud & DevOps Essentials',
    description: 'Learn cloud deployment and DevOps practices',
    totalDuration: '8-10 weeks',
    progress: 0,
    milestones: [
      'Cloud Fundamentals (AWS/Azure)',
      'Containerization with Docker',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Monitoring & Observability'
    ],
    resources: [
      {
        id: 'r4',
        title: 'AWS Certified Solutions Architect',
        type: 'course',
        difficulty: 'intermediate',
        duration: '30 hours',
        provider: 'Coursera',
        rating: 4.7,
        url: '#',
        description: 'Prepare for AWS certification and learn cloud architecture',
        skills: ['AWS', 'Cloud Computing', 'Architecture']
      },
      {
        id: 'r5',
        title: 'Docker & Kubernetes: The Complete Guide',
        type: 'video',
        difficulty: 'intermediate',
        duration: '25 hours',
        provider: 'Pluralsight',
        rating: 4.5,
        url: '#',
        description: 'Master containerization and orchestration',
        skills: ['Docker', 'Kubernetes', 'DevOps']
      }
    ]
  }
];

export const Learning: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(mockLearningPaths[0]);
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);
  const navigate = useNavigate();

  const getTypeIcon = (type: LearningResource['type']) => {
    switch (type) {
      case 'course': return <BookOpen className="w-5 h-5" />;
      case 'video': return <PlayCircle className="w-5 h-5" />;
      case 'tutorial': return <Target className="w-5 h-5" />;
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'project': return <Award className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: LearningResource['type']) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700';
      case 'video': return 'bg-purple-100 text-purple-700';
      case 'tutorial': return 'bg-green-100 text-green-700';
      case 'book': return 'bg-yellow-100 text-yellow-700';
      case 'project': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: LearningResource['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Learning Roadmap</h1>
          <p className="text-gray-600">Curated resources to bridge your skill gaps and reach your career goals</p>
        </div>

        {/* Learning Path Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Paths</h2>
            <div className="space-y-4">
              {mockLearningPaths.map((path) => (
                <div
                  key={path.id}
                  onClick={() => setSelectedPath(path)}
                  className={`card cursor-pointer transition-all ${
                    selectedPath.id === path.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <h3 className="font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {path.totalDuration}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Target className="w-4 h-4 mr-1" />
                      {path.resources.length} resources
                    </div>
                  </div>
                  {path.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-blue-600 font-medium">{path.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${path.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Path Overview */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPath.title}</h2>
              <p className="text-gray-600 mb-6">{selectedPath.description}</p>
              
              {/* Milestones */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Milestones</h3>
                <div className="space-y-3">
                  {selectedPath.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        index < Math.floor(selectedPath.progress / 20)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {index < Math.floor(selectedPath.progress / 20) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <span className={`${
                        index < Math.floor(selectedPath.progress / 20)
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}>
                        {milestone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center text-blue-800">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-medium">Estimated completion: {selectedPath.totalDuration}</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Resources</h3>
              <div className="space-y-4">
                {selectedPath.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                            {getTypeIcon(resource.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                            <p className="text-sm text-gray-600">{resource.provider}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{resource.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className={`px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {resource.duration}
                          </div>
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            {resource.rating}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {resource.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="btn-secondary p-2">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Start Your Learning Journey</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Follow your personalized roadmap and track your progress as you bridge skill gaps.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Start New Assessment
              <ExternalLink className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

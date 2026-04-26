import React, { useState } from 'react';
import { Upload, FileText, ArrowRight, Brain, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingData {
  resume: File | null;
  jobDescription: string;
  targetRole: string;
}

export const Onboarding: React.FC = () => {
  const [data, setData] = useState<OnboardingData>({
    resume: null,
    jobDescription: '',
    targetRole: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.resume || !data.jobDescription) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store data in sessionStorage for demo purposes
    sessionStorage.setItem('onboardingData', JSON.stringify(data));
    
    setIsAnalyzing(false);
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">SkillBridge AI</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your career with AI-powered skill assessment and personalized learning
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Resume Analysis</h3>
            <p className="text-sm text-gray-600">AI parses your experience and skills</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Skill Assessment</h3>
            <p className="text-sm text-gray-600">Conversational evaluation of your knowledge</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Learning</h3>
            <p className="text-sm text-gray-600">Custom roadmap to bridge skill gaps</p>
          </div>
        </div>

        {/* Onboarding Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Resume
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  {data.resume ? (
                    <div className="flex items-center justify-center">
                      <FileText className="w-8 h-8 text-green-600 mr-2" />
                      <span className="text-green-600 font-medium">{data.resume.name}</span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload your resume (PDF)</p>
                      <p className="text-sm text-gray-500 mt-1">Max file size: 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Target Role */}
            <div>
              <label htmlFor="target-role" className="block text-sm font-medium text-gray-700 mb-2">
                Target Role
              </label>
              <input
                type="text"
                id="target-role"
                value={data.targetRole}
                onChange={(e) => setData(prev => ({ ...prev, targetRole: e.target.value }))}
                placeholder="e.g., Data Science "
                className="input-field"
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                id="job-description"
                value={data.jobDescription}
                onChange={(e) => setData(prev => ({ ...prev, jobDescription: e.target.value }))}
                placeholder="Paste the job description you're targeting..."
                rows={6}
                className="input-field resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!data.resume || !data.jobDescription || isAnalyzing}
              className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

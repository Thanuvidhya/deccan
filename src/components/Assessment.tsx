import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  followUp?: string[];
}

const mockQuestions: Question[] = [
  {
    id: '1',
    question: "Can you explain your experience with React and describe a challenging project you've worked on?",
    category: 'Frontend Development',
    difficulty: 'medium',
    followUp: [
      "What specific React patterns did you use?",
      "How did you handle state management?",
      "What performance optimizations did you implement?"
    ]
  },
  {
    id: '2',
    question: "Describe your approach to testing web applications. What testing frameworks have you used?",
    category: 'Testing & QA',
    difficulty: 'medium',
    followUp: [
      "How do you decide what to test vs what not to test?",
      "What's your experience with unit testing vs integration testing?",
      "How do you handle testing in CI/CD pipelines?"
    ]
  },
  {
    id: '3',
    question: "How do you approach debugging complex issues in production? Can you walk me through your process?",
    category: 'Problem Solving',
    difficulty: 'hard',
    followUp: [
      "What tools do you use for debugging?",
      "How do you prioritize bug fixes?",
      "Can you describe a particularly challenging bug you solved?"
    ]
  }
];

export const Assessment: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Start assessment with welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: "Welcome to your skill assessment! I'll be asking you some questions about your experience and skills. Take your time to provide detailed responses. Let's begin!",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    // Ask first question after a short delay
    setTimeout(() => {
      askQuestion(mockQuestions[0]);
    }, 2000);
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timeRemaining > 0 && !assessmentComplete) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !assessmentComplete) {
      completeAssessment();
    }
  }, [timeRemaining, assessmentComplete]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const askQuestion = (question: Question) => {
    setIsTyping(true);
    setTimeout(() => {
      const questionMessage: Message = {
        id: `q-${question.id}`,
        type: 'ai',
        content: question.question,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, questionMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI processing and response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const responseMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);

      // Move to next question or complete assessment
      if (currentQuestion < mockQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          askQuestion(mockQuestions[currentQuestion + 1]);
        }, 1000);
      } else {
        setTimeout(() => {
          completeAssessment();
        }, 2000);
      }
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's interesting! Can you elaborate more on that approach?",
      "Great explanation. How did you handle any challenges that came up?",
      "I see. What was the impact of your solution on the project?",
      "Excellent insight. How would you approach this differently now?",
      "Thank you for sharing that. Let's move on to our next question."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const completeAssessment = () => {
    setAssessmentComplete(true);
    const completionMessage: Message = {
      id: 'complete',
      type: 'ai',
      content: "Thank you for completing the assessment! I'm analyzing your responses now. You'll receive your personalized skill evaluation and learning recommendations shortly.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, completionMessage]);

    // Navigate to results after analysis
    setTimeout(() => {
      navigate('/results');
    }, 3000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return ((mockQuestions.length - currentQuestion) / mockQuestions.length) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Skill Assessment</h1>
              <p className="text-sm text-gray-600">Conversational Interview</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className={`font-mono font-medium ${timeRemaining < 120 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 px-6 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              {message.type === 'ai' && (
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="bg-gray-200 rounded-full p-2">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 rounded-full p-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          {assessmentComplete && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Complete!</h3>
              <p className="text-gray-600">Generating your personalized results...</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {!assessmentComplete && (
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your response here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  disabled={isTyping}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {timeRemaining < 120 && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                Time is running out! Please complete your response.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

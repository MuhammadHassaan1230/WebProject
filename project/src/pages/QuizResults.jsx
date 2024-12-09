import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Award, Brain, Lightbulb } from 'lucide-react';
import CareerPathCard from '../components/quiz/CareerPathCard';
import { analyzeQuizResults } from '../utils/quizAnalyzer';
import { careerPaths } from '../data/careerPaths';

export default function QuizResults() {
  
  const mockAnswers = [0, 1, 2]; 
  const results = analyzeQuizResults(mockAnswers);

  return (
    <div className="min-h-screen bg-white rounded-lg shadow p-6 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Career Path Analysis</h1>
          <p className="text-lg text-gray-600">Based on your responses, we've identified the following insights</p>
        </div>

        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Brain className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Your Key Strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.strengths.map((strength, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
                <Award className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-gray-800">{strength}</span>
              </div>
            ))}
          </div>
        </div>

      
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Recommended Career Paths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.careerPaths.map((path) => (
              <CareerPathCard key={path.id} careerPath={path} />
            ))}
          </div>
        </div>

        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Next Steps</h2>
          <ul className="space-y-4">
            {results.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <Link
              to="/mentors"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Connect with Mentors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
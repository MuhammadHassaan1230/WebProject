import React from 'react';
import { Target, ChevronRight } from 'lucide-react';

export default function GoalsSection() {
  const goals = {
    shortTerm: 'Complete Web Development Bootcamp',
    longTerm: 'Become a Full Stack Developer',
    industries: ['Technology', 'E-commerce', 'Education'],
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Target className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Career Goals</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Short-term Goal</h3>
          <p className="mt-1 text-gray-900">{goals.shortTerm}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Long-term Goal</h3>
          <p className="mt-1 text-gray-900">{goals.longTerm}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Preferred Industries</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {goals.industries.map((industry, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
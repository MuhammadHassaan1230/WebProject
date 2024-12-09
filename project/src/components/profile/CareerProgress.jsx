import React from 'react';
import { Award, Book, Users, Medal } from 'lucide-react';

export default function CareerProgress() {
  const progressStats = [
    { icon: Book, label: 'Quizzes Completed', value: 3 },
    { icon: Users, label: 'Mentor Sessions', value: 2 },
    { icon: Medal, label: 'Certificates Earned', value: 1 },
    { icon: Award, label: 'Skills Verified', value: 5 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Progress</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {progressStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-3">
              <stat.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
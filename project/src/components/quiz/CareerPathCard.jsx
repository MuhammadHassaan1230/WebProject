import React from 'react';
import { Briefcase, CheckCircle } from 'lucide-react';

export default function CareerPathCard({ careerPath }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 rounded-full p-2 mr-4">
          <Briefcase className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{careerPath.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{careerPath.description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {careerPath.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Suggested Roles:</h4>
        <ul className="space-y-2">
          {careerPath.suggestedRoles.map((role, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              {role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

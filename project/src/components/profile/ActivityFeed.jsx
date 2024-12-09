import React from 'react';
import { Clock } from 'lucide-react';

export default function ActivityFeed() {
  const activities = [
    {
      type: 'quiz',
      title: 'Completed Career Assessment Quiz',
      date: '2 days ago',
    },
    {
      type: 'mentor',
      title: 'Attended Mentoring Session',
      date: '1 week ago',
    },
    {
      type: 'resource',
      title: 'Accessed Web Development Course',
      date: '2 weeks ago',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => (
            <li key={index}>
              <div className="relative pb-8">
                {index !== activities.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-indigo-600" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">{activity.title}</p>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {activity.date}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
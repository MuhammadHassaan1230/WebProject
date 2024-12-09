import React from 'react';
import { useSelector } from 'react-redux';
import { Camera } from 'lucide-react';
import { Edit2 } from 'lucide-react';

export default function MentorProfileHeader() {
  const { user } = useSelector((state) => state.auth);

  // Debug user object
  console.log(user);

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Profile Header Section */}
      <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
              alt={user?.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pt-20 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name} (Mentor)</h1>
            <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <p className="text-gray-900 font-medium text-sm">
                <span className="font-semibold">Email: </span>{user?.email}
              </p>
              <p className="text-gray-900 font-medium text-sm">
                <span className="font-semibold">City: </span>{user?.city}
              </p>
              <p className="text-gray-900 font-medium text-sm">
                <span className="font-semibold">LinkedIn: </span>
                <a
                  href={user?.linkedin}
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  {user?.linkedin}
                </a>
              </p>
              <p className="text-gray-900 font-medium text-sm">
                <span className="font-semibold">Expertise: </span>{user?.expertise}
              </p>
              <p className="text-gray-900 font-medium text-sm">
                <span className="font-semibold">Description: </span>{user?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Follow and Message Buttons */}
        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Follow
          </button>
          <button
            type="button"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

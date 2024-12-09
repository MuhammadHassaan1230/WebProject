import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Edit2 } from 'lucide-react';

export default function StudentHeader() {
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
            <h1 className="text-2xl font-bold text-gray-900">{user?.name} (Student)</h1>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Education</h3>
                <p className="mt-1 text-sm text-gray-900">Bachelor of Computer Science</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Interests</h3>
                <p className="mt-1 text-sm text-gray-900">Web Development, AI, Data Science</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="mt-1 text-sm text-gray-900">March 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Follow
          </button>
        
        </div>
      </div>
    </div>
  );
}

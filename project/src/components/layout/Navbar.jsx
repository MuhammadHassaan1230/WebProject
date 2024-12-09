
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GraduationCap, Menu } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
         
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-14 w-12 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-600">Growth</span>
            </Link>
          </div>

         
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {!isAuthenticated ? (
              <>
               
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Get Started
                </Link>
              </>
            ) : (
              <>
               
                <Link to="/workshop-search" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Find Workshops
                </Link>
                {user.role === 'mentor' ? (
                  <Link to="/student-search" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                    Find Students
                  </Link>
                ) : user.role === 'student' ? (
                  <Link to="/mentors" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                    Find Mentors
                  </Link>
                ) : user.role === 'admin' ? (
                  <Link to="/admin-counsel" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                    Counsel
                  </Link>
                ) : null}
                <Link to="/student-profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Profile
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
              </>
            )}
          </div>

      
          <div className="sm:hidden flex items-center">
            <button className="text-gray-700 hover:text-indigo-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

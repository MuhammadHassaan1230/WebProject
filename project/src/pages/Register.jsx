import React, { useState } from 'react';
import StudentRegistrationForm from '../components/registration/StudentRegistrationForm';
import MentorRegisterationForm from '../components/registration/MentorRegisterationForm';
import { Link } from 'react-router-dom';


export default function Register() {
  const [isStudent, setIsStudent] = useState(true); 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to={"/"}>
      <button
           
          className="flex items-center text-indigo-600 hover:text-indigo-700 transition mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-4 flex justify-center gap-4">
         
          <button
            onClick={() => setIsStudent(true)}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register as a Student
          </button>

         
          <button
            onClick={() => setIsStudent(false)}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register as a Mentor
          </button>
        </div>

        {isStudent ? <StudentRegistrationForm /> : <MentorRegisterationForm />}
      </div>
    </div>
  );
}

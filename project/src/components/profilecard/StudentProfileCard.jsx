import React from "react";
import { Link } from "react-router-dom";
export default function StudentProfileCard({ student }) {
  return (
    <>
    <Link to={`/student-profile2/${student.id}`} style={{ textDecoration: 'none' }}>
    <div className="max-w-xl mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg w-full">
      <div className="flex flex-col items-center">
        <img
          src="https://placehold.co/50x50"
          alt="Profile picture"
          className="w-12 h-12 rounded-full"
        />
        <h1 className="text-lg font-semibold mt-2">{student.name}</h1>
        <p className="text-sm text-gray-600">{student.education}</p>
        <p className="text-sm text-gray-500 truncate mt-1">{student.city}</p>
        <p className="text-sm text-gray-500 mt-2">{student.description}</p>
      </div>
    </div>
    </Link>
    </>
    
  );
}

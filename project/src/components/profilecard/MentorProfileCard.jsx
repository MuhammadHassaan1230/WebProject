import React from "react";
import { Link } from "react-router-dom";
export default function ProfileCard({profile}) {
  return (
    <>
   <Link to={`/mentor-profile/${profile.id}`} style={{ textDecoration: 'none' }}>
    <div className="max-w-xl mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg w-full">

<div className="flex flex-col sm:flex-row items-center">
    <img 
        src="https://placehold.co/50x50" 
        alt="Profile picture of the user" 
        className="w-12 h-12 rounded-full mr-4" 
    />
    <div className="flex-grow">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold">name</h1>
            <i className="fas fa-shield-alt text-gray-500 ml-2" aria-hidden="true"></i>
            
        </div>
        <p className="text-sm text-gray-600">
            Experties
        </p>
        <p className="text-sm text-gray-500">Islamabad</p>
        <p className="text-sm text-gray-500 truncate-text">
            
        </p>
    </div>
   
</div>
</div>
</Link>
      
      </>
  );
}

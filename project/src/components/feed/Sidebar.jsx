import React from 'react';

function Sidebar() {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-cover bg-center h-16 bg-indigo-600"></div>
      <div className="text-center -mt-8">
        <img
          src="https://via.placeholder.com/64"
          alt="Profile"
          className="w-16 h-16 rounded-full border-4 border-white mx-auto"
        />
        <h3 className="mt-2 font-semibold">John Doe</h3>
        <p className="text-sm text-gray-500">Software Developer</p>
      </div>
      
     
      
      <div className="px-4 py-4 border-t">
        <h4 className="text-sm font-semibold mb-3">Interests</h4>
        <div className="space-y-3">
          {['React Developers', 'JavaScript', 'Web Development'].map((item, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
            
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
import React from 'react';
import ProfileCard from '../profilecard/ProfileCard';


function Recommendation() {
  const connections = [
    {
      name: 'Sarah Johnson',
      headline: 'Full Stack Developer at Tech Solutions Inc.',
      avatar: 'https://via.placeholder.com/48',
      mutual: 12
    },
    {
      name: 'Mike Chen',
      headline: 'Product Manager at Innovation Labs',
      avatar: 'https://via.placeholder.com/48',
      mutual: 8
    }
  ];

  const trending = [
    {
      topic: '#ReactJS',
      category: 'Programming',
      readers: '24.5K'
    },
    {
      topic: '#TechCareers',
      category: 'Career',
      readers: '12.8K'
    }
  ];

  const jobs = [
    {
      title: 'Senior React Developer',
      company: 'Innovation Tech',
      location: 'Remote'
    },
    {
      title: 'Frontend Engineer',
      company: 'Global Solutions',
      location: 'New York, NY'
    }
  ];

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-4">People you may know</h3>
        {connections.map((connection, index) => (
          <ProfileCard key={index} {...connection} />
        ))}
      </div>

    
    </div>
  );
}

export default Recommendation;
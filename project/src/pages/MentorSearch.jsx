import React, { useState } from "react";
import SearchBar from "../components/search/Search";
import MentorProfileCard from "../components/profilecard/MentorProfileCard";

const dummyProfiles = [
  {
    id: 1,
    name: "John Doe",
    expertise: "Business",
    level: "Expert",
    city: "New York",
    description: "Seasoned business consultant with over 10 years of experience.",
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "Development",
    level: "Intermediate",
    city: "London",
    description: "Full-stack developer specializing in React and Node.js.",
  },
  
];

export default function SearchPage() {
  const [profiles, setProfiles] = useState(dummyProfiles);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 2;

  const handleSearch = (filters) => {
   
    const filteredProfiles = dummyProfiles.filter((profile) => {
      return (
        (!filters.query || profile.name.toLowerCase().includes(filters.query.toLowerCase())) &&
        (!filters.expertise || profile.expertise === filters.expertise) &&
        (!filters.level || profile.level === filters.level) &&
        (!filters.city || profile.city === filters.city)
      );
    });
    setProfiles(filteredProfiles);
    setCurrentPage(1); 
  };

  const indexOfLastProfile = currentPage * resultsPerPage;
  const indexOfFirstProfile = indexOfLastProfile - resultsPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  return (
    <div className="max-w-7xl mx-auto p-4">
      
      <SearchBar onSearch={handleSearch} />

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentProfiles.map((profile) => (
          <MentorProfileCard key={profile.id} profile={profile} />
        ))}
      </div>


      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded-l-lg disabled:bg-gray-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100">{currentPage}</span>
        <button
          disabled={indexOfLastProfile >= profiles.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded-r-lg disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function Search({ onSearch }) {
  const [filters, setFilters] = useState({
    query: "",
    expertise: "",
    level: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleChange}
          placeholder="Search mentors..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="expertise"
          value={filters.expertise}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Expertise</option>
          <option value="Business">Business</option>
          <option value="Development">Development</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Arts">Arts</option>
        </select>

        <select
          name="level"
          value={filters.level}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        <select
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">City</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="London">London</option>
          <option value="Dubai">Dubai</option>
        </select>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSearch}
          className="w-full md:w-1/4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

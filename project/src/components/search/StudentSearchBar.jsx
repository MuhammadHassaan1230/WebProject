import React, { useState } from "react";

export default function StudentSearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    query: "",
    education: "",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleChange}
          placeholder="Search students by name..."
          className="border rounded-lg px-3 py-2"
        />
        <select
          name="education"
          value={filters.education}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Education</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Graduate</option>
          <option value="High School">High School</option>
        </select>
        <select
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Location</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="London">London</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 bg-indigo-600 text-white rounded-lg py-2 w-full"
      >
        Search
      </button>
    </div>
  );
}

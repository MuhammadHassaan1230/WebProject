import React, { useState } from "react";

export default function WorkshopSearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Title Search */}
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          placeholder="Search by title"
          className="border rounded-lg px-3 py-2"
        />

        {/* Date Selector */}
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        {/* Location Selector */}
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Location</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="London">London</option>
        </select>

        {/* Description Search */}
        <input
          type="text"
          name="description"
          value={filters.description}
          onChange={handleChange}
          placeholder="Search by description"
          className="border rounded-lg px-3 py-2"
        />

        {/* Link Input */}
        <input
          type="url"
          name="link"
          value={filters.link}
          onChange={handleChange}
          placeholder="Workshop link"
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white rounded-lg px-6 py-2 shadow-md hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

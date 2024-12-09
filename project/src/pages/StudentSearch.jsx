import React, { useState } from "react";
import StudentSearchBar from "../components/search/StudentSearchBar";
import StudentProfileCard from "../components/profilecard/StudentProfileCard";

const dummyStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    education: "Undergraduate",
    city: "New York",
    description: "Computer Science major with a passion for coding.",
  },
  {
    id: 2,
    name: "Bob Smith",
    education: "Graduate",
    city: "San Francisco",
    description: "Mechanical Engineering student with a focus on robotics.",
  },
];

export default function StudentSearchPage() {
  const [students, setStudents] = useState(dummyStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 2;

  const handleSearch = (filters) => {
    const filteredStudents = dummyStudents.filter((student) => {
      return (
        (!filters.query || student.name.toLowerCase().includes(filters.query.toLowerCase())) &&
        (!filters.education || student.education === filters.education) &&
        (!filters.city || student.city === filters.city)
      );
    });
    setStudents(filteredStudents);
    setCurrentPage(1);
  };

  const indexOfLastStudent = currentPage * resultsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - resultsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <StudentSearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentStudents.map((student) => (
          <StudentProfileCard key={student.id} student={student} />
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
          disabled={indexOfLastStudent >= students.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded-r-lg disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

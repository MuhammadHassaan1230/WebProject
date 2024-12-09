import React from "react";

const dummyResources = [
  {
    id: 1,
    title: "React Basics PDF",
    type: "pdf",
    description: "Comprehensive guide on React fundamentals.",
    link: "https://example.com/react-basics.pdf",
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    type: "video",
    description: "A video tutorial on Machine Learning concepts.",
    link: "https://www.example.com/ml-introduction",
  },
  {
    id: 3,
    title: "Career Development Article",
    type: "article",
    description: "An insightful article on career growth strategies.",
    link: "https://www.example.com/career-development",
  },
  {
    id: 4,
    title: "Data Science PDF Resources",
    type: "pdf",
    description: "PDF resources on Data Science tools and concepts.",
    link: "https://example.com/data-science.pdf",
  },
];

const Resources = () => {
  return (
    <div className="container mx-auto px-6 mt-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        Uploaded Resources
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-lg shadow-lg p-4 overflow-hidden flex flex-col justify-between"
          >
            {/* Resource Icon */}
            <div className="h-40 flex items-center justify-center">
              {resource.type === "pdf" && (
                <span className="text-6xl text-gray-500">📄</span>
              )}
              {resource.type === "video" && (
                <span className="text-6xl text-red-500">🎥</span>
              )}
              {resource.type === "article" && (
                <span className="text-6xl text-blue-500">🔗</span>
              )}
            </div>

            {/* Resource Title and Description */}
            <h3 className="text-gray-900 font-bold mt-2 truncate">
              {resource.title}
            </h3>
            <p className="text-gray-600 mt-1 text-sm truncate">
              {resource.description}
            </p>

            {/* Action Button */}
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700 transition"
            >
              {resource.type === "article" ? "View Article" : "Download"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;

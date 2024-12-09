import React, { useState } from "react";

const Achievements = () => {
  const [modalImage, setModalImage] = useState(null);

  
  const achievements = [
    {
      id: 1,
      title: "Best Mentor Award 2023",
      date: "2023-07-15",
      description: "Recognized for guiding 500+ students successfully.",
      image: "https://via.placeholder.com/150", 
    },
    {
      id: 2,
      title: "Top Career Coach",
      date: "2022-10-10",
      description:
        "Awarded for innovative coaching techniques in career development.",
      image: null,
    },
    {
      id: 3,
      title: "Certified Life Coach",
      date: "2021-05-20",
      description:
        "Completed certification with honors. Expertise in personal and career growth.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Certified Life Coach",
      date: "2021-05-20",
      description:
        "Completed certification with honors. Expertise in personal and career growth.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Mentor Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              {achievement.image ? (
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setModalImage(achievement.image)}
                />
              ) : (
                <span className="text-gray-400 text-6xl">🏆</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{achievement.date}</p>
              <p className="text-gray-700">
                {achievement.description.length > 50
                  ? `${achievement.description.substring(0, 50)}...`
                  : achievement.description}
                {achievement.description.length > 50 && (
                  <span className="text-blue-500 cursor-pointer"> Read More</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

    
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Achievement Full View"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Achievements;

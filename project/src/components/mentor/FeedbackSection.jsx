import React, { useState } from "react";

const FeedbackSection = () => {
  // Dummy feedback data
  const feedbacks = [
    {
      id: 1,
      user: "John Doe",
      date: "2023-12-01",
      rating: 5,
      comment: "Amazing mentor! Really helped me clarify my career goals.",
    },
    {
      id: 2,
      user: "Jane Smith",
      date: "2023-11-20",
      rating: 4,
      comment:
        "Very insightful and helpful session. Could be a bit more structured.",
    },
    {
      id: 3,
      user: "Anonymous",
      date: "2023-11-15",
      rating: 3,
      comment: "Decent session, but not as engaging as I expected.",
    },
  ];

  const [filter, setFilter] = useState(null); // Filter by rating
  const [sortOrder, setSortOrder] = useState("newest"); // Sort order

  // Filter and sort feedback
  const filteredFeedbacks = feedbacks
    .filter((f) => (filter ? f.rating === filter : true))
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Feedback Overview */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Feedback Summary</h2>
        <div className="mt-2 text-yellow-500 text-3xl">⭐ 4.3 / 5</div>
        <p className="text-gray-500 text-sm">Based on 25 reviews</p>
        <div className="mt-4 flex justify-center gap-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              className={`py-1 px-3 rounded-full text-sm ${
                filter === star
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setFilter(filter === star ? null : star)}
            >
              {star} Star
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">{filteredFeedbacks.length} Feedback(s)</p>
        <select
          className="py-1 px-3 border rounded text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Sort by: Newest</option>
          <option value="oldest">Sort by: Oldest</option>
        </select>
      </div>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  {feedback.user === "Anonymous"
                    ? "👤"
                    : feedback.user[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold">
                    {feedback.user === "Anonymous"
                      ? "Anonymous"
                      : feedback.user}
                  </h4>
                  <p className="text-sm text-gray-500">{feedback.date}</p>
                </div>
              </div>
              <div className="flex items-center mb-2 text-yellow-500">
                {"⭐".repeat(feedback.rating)}
                <span className="text-gray-400 ml-2">
                  ({feedback.rating} / 5)
                </span>
              </div>
              <p className="text-gray-700">
                {feedback.comment.length > 50
                  ? `${feedback.comment.substring(0, 50)}...`
                  : feedback.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No feedback available.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;

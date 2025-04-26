import React from 'react';
import { Link } from 'react-router-dom';

const LearningSessionCard = ({ session }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link
      to={`/library/session/${session.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {session.title}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDate(session.createdAt)}
            </p>
          </div>
          <div className="flex space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {session.summary?.length || 0} Points
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {session.flashcards?.length || 0} Cards
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {session.summary?.[0] || 'No summary available'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LearningSessionCard; 
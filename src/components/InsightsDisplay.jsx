import React from 'react';

const InsightsDisplay = ({ insights, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Generated Insights</h3>
      <div className="prose prose-indigo max-w-none">
        {insights.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InsightsDisplay; 
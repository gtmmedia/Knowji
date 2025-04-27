import React from 'react';

const InsightsDisplay = ({ summary, insights, actionSteps, flashcards }) => {
  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {summary.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Key Insights Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-indigo-50 rounded-lg p-4 border border-indigo-100"
            >
              <p className="text-indigo-900">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Steps Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Action Plan</h2>
        <div className="space-y-4">
          {actionSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 bg-green-50 rounded-lg p-4 border border-green-100"
            >
              <span className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                {index + 1}
              </span>
              <p className="text-green-900">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {flashcards && flashcards.length > 0 && (
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flashcards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Q: {card.question}</h3>
                <p className="text-gray-700">A: {card.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default InsightsDisplay; 
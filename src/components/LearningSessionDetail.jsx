import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlashcardViewer from './FlashcardViewer';

const LearningSessionDetail = ({ session }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{session.title}</h1>
          <p className="text-sm text-gray-500">Created on {formatDate(session.createdAt)}</p>
        </div>
        <button
          onClick={() => navigate('/library')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-2xs text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Library
        </button>
      </div>

      {/* Summary Section */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {session.summary?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Key Insights Section */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {session.insights?.map((insight, index) => (
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
      {session.actionSteps && session.actionSteps.length > 0 && (
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Action Plan</h2>
          <div className="space-y-4">
            {session.actionSteps.map((step, index) => (
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
      )}

      {/* Flashcards Section */}
      {session.flashcards && session.flashcards.length > 0 && (
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flashcards</h2>
          <FlashcardViewer flashcards={session.flashcards} />
        </section>
      )}
    </div>
  );
};

export default LearningSessionDetail; 
import React, { useState } from 'react';
import { generateActionSteps } from '../utils/gemini';

const ApplyModeForm = ({ summary, onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [habitStruggle, setHabitStruggle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionSteps, setActionSteps] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const steps = await generateActionSteps(summary, goal, habitStruggle);
      setActionSteps(steps);
      onSubmit(steps);
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply Mode</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
            What's your current life goal?
          </label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-2xs focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Share your current life goal or aspiration..."
          />
        </div>

        <div>
          <label htmlFor="habitStruggle" className="block text-sm font-medium text-gray-700">
            What's a daily habit you are struggling with?
          </label>
          <textarea
            id="habitStruggle"
            value={habitStruggle}
            onChange={(e) => setHabitStruggle(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-2xs focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Share a habit you're trying to build or break..."
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !goal || !habitStruggle}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading || !goal || !habitStruggle
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </div>
          ) : (
            'Generate Action Steps'
          )}
        </button>
      </form>

      {actionSteps.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Action Plan</h3>
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
        </div>
      )}
    </div>
  );
};

export default ApplyModeForm; 
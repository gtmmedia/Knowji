import React from 'react';
import { Link } from 'react-router-dom';
import ContentInputForm from '../components/ContentInputForm';

const Home = () => {
  const handleContentSubmit = async (formData) => {
    // Handle content submission logic here
    console.log('Content submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Knowji
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Your AI-powered learning companion for creating and studying flashcards.
          </p>
        </div>

        <div className="mt-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <ContentInputForm onSubmit={handleContentSubmit} />
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/library"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
            >
              Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
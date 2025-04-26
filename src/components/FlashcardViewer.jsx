import React, { useState } from 'react';

const FlashcardViewer = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No flashcards available
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative h-64 perspective-1000">
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
            <p className="text-xl text-center text-gray-900">
              {flashcards[currentIndex].question}
            </p>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md p-6 flex items-center justify-center rotate-y-180">
            <p className="text-lg text-center text-gray-700">
              {flashcards[currentIndex].answer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Click the card to flip
        </p>
      </div>
    </div>
  );
};

export default FlashcardViewer; 
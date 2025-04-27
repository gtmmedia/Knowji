import React, { useState } from 'react';

const ContentInputForm = ({ onSubmit }) => {
  const [inputType, setInputType] = useState('text');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateContent = () => {
    if (!content.trim()) {
      setError('Please enter some content');
      return false;
    }

    switch (inputType) {
      case 'youtube':
        if (!content.includes('youtube.com') && !content.includes('youtu.be')) {
          setError('Please enter a valid YouTube URL');
          return false;
        }
        break;
      case 'article':
        if (!content.startsWith('http://') && !content.startsWith('https://')) {
          setError('Please enter a valid URL');
          return false;
        }
        break;
      case 'pdf':
        if (!content.name?.endsWith('.pdf')) {
          setError('Please select a PDF file');
          return false;
        }
        break;
      default:
        if (content.length < 10) {
          setError('Content is too short. Please provide more details.');
          return false;
        }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateContent()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({ type: inputType, content });
    } catch (error) {
      console.error('Error submitting content:', error);
      setError(error.message || 'An error occurred while processing your content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContent(file);
      setError(null);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Your Learning Content</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Type
          </label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['text', 'youtube', 'pdf', 'article'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setInputType(type);
                  setContent('');
                  setError(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  inputType === type
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {inputType === 'text' && (
          <div>
            <label htmlFor="textContent" className="block text-sm font-medium text-gray-700">
              Text Content
            </label>
            <textarea
              id="textContent"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
              }}
              rows={6}
              placeholder="Paste your notes or content here..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        )}

        {inputType === 'youtube' && (
          <div>
            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
              YouTube Video URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        )}

        {inputType === 'pdf' && (
          <div>
            <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">
              PDF File
            </label>
            <input
              type="file"
              id="pdfFile"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                transition-all duration-200"
            />
          </div>
        )}

        {inputType === 'article' && (
          <div>
            <label htmlFor="articleUrl" className="block text-sm font-medium text-gray-700">
              Article URL
            </label>
            <input
              type="url"
              id="articleUrl"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
              }}
              placeholder="https://..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 animate-fade-in">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !content}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-300 ${
            isLoading || !content
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Generate Insights'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContentInputForm; 
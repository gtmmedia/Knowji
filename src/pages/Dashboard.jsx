import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { getFlashcards, getStudySessions, saveLearningSession } from '../firebase/firestore';
import ContentInputForm from '../components/ContentInputForm';
import InsightsDisplay from '../components/InsightsDisplay';
import ApplyModeForm from '../components/ApplyModeForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { processContent } from '../utils/gemini';

const Dashboard = () => {
  // const { currentUser } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Temporarily use a mock user ID
        const mockUserId = 'mock-user-id';
        const userFlashcards = await getFlashcards(mockUserId);
        const userStudySessions = await getStudySessions(mockUserId);
        setFlashcards(userFlashcards);
        setStudySessions(userStudySessions);
      } catch (error) {
        console.error('Error loading user data:', error);
        setError('Failed to load user data. Please try again later.');
      }
    };

    loadUserData();
  }, []);

  const handleContentSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await processContent(formData.content, formData.type);
      setContent(result);
    } catch (error) {
      console.error('Error processing content:', error);
      setError('Failed to process content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionStepsSubmit = async (steps) => {
    try {
      const sessionData = {
        title: content.summary[0] || 'Untitled Session',
        summary: content.summary,
        insights: content.insights,
        actionSteps: steps,
        flashcards: content.flashcards,
      };

      // Temporarily use a mock user ID
      const mockUserId = 'mock-user-id';
      await saveLearningSession(mockUserId, sessionData);
      setToast({ message: 'Session saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error saving session:', error);
      setToast({ message: 'Failed to save session. Please try again.', type: 'error' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Processing your content..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-md p-4 animate-fade-in">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Content Input and Insights */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <ContentInputForm onSubmit={handleContentSubmit} />
            </div>
            
            {content && (
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <InsightsDisplay
                  summary={content.summary}
                  insights={content.insights}
                  flashcards={content.flashcards}
                />
              </div>
            )}
          </div>

          {/* Right Column - Apply Mode and Recent Activity */}
          <div className="space-y-8">
            {content && (
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <ApplyModeForm
                  summary={content.summary}
                  onSubmit={handleActionStepsSubmit}
                />
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {studySessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <p className="text-sm text-gray-500">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-900">{session.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Dashboard; 
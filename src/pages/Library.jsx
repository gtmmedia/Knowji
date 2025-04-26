import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import { getLearningSessions, getLearningSession } from '../firebase/firestore';
import LearningSessionCard from '../components/LearningSessionCard';
import LearningSessionDetail from '../components/LearningSessionDetail';
import LoadingSpinner from '../components/LoadingSpinner';

const Library = () => {
  // const { currentUser } = useAuth();
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        // Temporarily use a mock user ID
        const mockUserId = 'mock-user-id';
        const userSessions = await getLearningSessions(mockUserId);
        setSessions(userSessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
        setError('Failed to load sessions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, []);

  useEffect(() => {
    const loadSessionDetails = async () => {
      if (sessionId) {
        try {
          const session = await getLearningSession(sessionId);
          setSelectedSession(session);
        } catch (error) {
          console.error('Error loading session details:', error);
          setError('Failed to load session details. Please try again later.');
        }
      }
    };

    loadSessionDetails();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9fafb] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 animate-fade-in">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sessionId ? (
          selectedSession ? (
            <div className="animate-fade-in">
              <LearningSessionDetail session={selectedSession} />
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <p className="text-gray-500">Session not found</p>
              <button
                onClick={() => navigate('/library')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Back to Library
              </button>
            </div>
          )
        ) : (
          <>
            <div className="flex justify-between items-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-900">Your Learning Library</h1>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                New Session
              </button>
            </div>

            {sessions.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-gray-500 mb-4">No learning sessions yet</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                  Start Your First Session
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <LearningSessionCard session={session} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library; 
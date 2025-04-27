import React, { useState, useEffect } from 'react';
import ContentInputForm from '../components/ContentInputForm';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContentSubmit = async (formData) => {
    // Handle content submission logic here
    console.log('Content submitted:', formData);
  };

  const quickStartSteps = [
    {
      title: 'Choose Your Content',
      description: 'Select the type of content you want to learn from (text, video, article, or PDF).',
      icon: '📚',
    },
    {
      title: 'Generate Insights',
      description: 'Our AI will analyze your content and create personalized learning materials.',
      icon: '🤖',
    },
    {
      title: 'Study Smart',
      description: 'Use the generated flashcards and insights to learn efficiently.',
      icon: '🎯',
    },
    {
      title: 'Track Progress',
      description: 'Monitor your learning progress and adjust your study plan accordingly.',
      icon: '📊',
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-background to-gray-100 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800/20 to-gray-900/20' 
            : 'bg-gradient-to-br from-indigo-100/20 to-blue-100/20'
        }`} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-t from-gray-900 to-transparent' 
            : 'bg-gradient-to-t from-white to-transparent'
        }`} />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className={`text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400' 
                : 'bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500'
            } bg-clip-text text-transparent animate-gradient`}>
              Welcome to Knowji
            </h1>
            <p className={`mt-5 max-w-xl mx-auto text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Your AI-powered learning companion for creating and studying flashcards.
            </p>
          </div>

          <div className={`mt-8 transition-all duration-1000 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <ContentInputForm onSubmit={handleContentSubmit} />
          </div>

          {/* Quick Start Guide */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowQuickStart(!showQuickStart)}
              className={`inline-flex items-center px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-900'
              } transition-all duration-300`}
            >
              {showQuickStart ? 'Hide Quick Start Guide' : 'Show Quick Start Guide'}
              <svg
                className={`ml-2 w-5 h-5 transform transition-transform duration-300 ${
                  showQuickStart ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {showQuickStart && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickStartSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`p-6 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  } shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 0.5s ease-out forwards',
                  }}
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 ${
        isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
      } backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Why Choose Knowji?</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'AI-Powered Learning',
                description: 'Our advanced AI analyzes your content and creates personalized learning materials.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                color: 'from-indigo-500 to-blue-500',
              },
              {
                title: 'Smart Flashcards',
                description: 'Create interactive flashcards that adapt to your learning style and progress.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                color: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Progress Tracking',
                description: 'Monitor your learning progress with detailed analytics and insights.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: 'from-blue-500 to-cyan-500',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                } ${activeFeature === index ? 'ring-2 ring-indigo-500' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{
                  animationDelay: `${(index + 1) * 100}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards',
                }}
              >
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{feature.title}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={`py-16 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Medical Student',
                content: 'Knowji has revolutionized how I study for my medical exams. The AI-generated flashcards are incredibly accurate and helpful.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Software Engineer',
                content: 'As someone who learns best through flashcards, Knowji has been a game-changer. The smart learning algorithm adapts perfectly to my pace.',
                image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                role: 'Language Teacher',
                content: 'I use Knowji to create vocabulary flashcards for my students. The AI suggestions are spot-on and save me hours of preparation time.',
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
                style={{
                  animationDelay: `${(index + 1) * 100}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards',
                }}
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full ring-2 ring-indigo-500"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h4 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{testimonial.name}</h4>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className={`py-16 ${
        isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
      } backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>About Knowji</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="animate-fade-in">
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Knowji is an AI-powered learning platform designed to help students, professionals, and lifelong learners master new concepts through smart flashcards and personalized learning experiences.
              </p>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our mission is to make learning more efficient, engaging, and accessible to everyone. We combine cutting-edge AI technology with proven learning methodologies to create a powerful learning tool.
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Whether you're studying for exams, learning a new language, or exploring new topics, Knowji adapts to your learning style and helps you achieve your goals faster.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {[
                { number: '10K+', label: 'Active Users', color: 'from-indigo-500 to-blue-500' },
                { number: '1M+', label: 'Flashcards Created', color: 'from-purple-500 to-pink-500' },
                { number: '95%', label: 'User Satisfaction', color: 'from-blue-500 to-cyan-500' },
                { number: '24/7', label: 'AI Support', color: 'from-green-500 to-emerald-500' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gradient-to-br from-white to-gray-50'
                  }`}
                >
                  <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-indigo-600 to-blue-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of learners who are already using Knowji to master new concepts.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSummaryPrompt, getInsightsPrompt, getFlashcardPrompt, getApplyModePrompt } from './prompts';

// Initialize Gemini API with proper error handling
const initGeminiAPI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please check your environment variables.');
  }
  return new GoogleGenerativeAI(apiKey);
};

const genAI = initGeminiAPI();

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const callGeminiAPI = async (prompt, retryCount = 0) => {
  try {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt provided');
    }

    console.log('Calling Gemini API...');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }

    console.log('API call successful');
    return result.response.text();
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.message.includes('API key')) {
      throw new Error('API key configuration error. Please check your environment variables.');
    }
    
    if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
      await sleep(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      return callGeminiAPI(prompt, retryCount + 1);
    }
    
    throw new Error(`Failed to generate content: ${error.message}`);
  }
};

// Helper function to extract video ID from YouTube URL
const extractYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to read file content
const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const processContent = async (content, type) => {
  try {
    if (!content) {
      throw new Error('No content provided');
    }

    // Process different content types
    let processedContent = content;
    switch (type) {
      case 'youtube':
        const videoId = extractYouTubeVideoId(content);
        if (!videoId) {
          throw new Error('Invalid YouTube URL');
        }
        // TODO: Implement actual YouTube transcript extraction
        processedContent = `YouTube video content for video ID: ${videoId}`;
        break;

      case 'pdf':
        try {
          processedContent = await readFileContent(content);
        } catch (error) {
          throw new Error('Failed to read PDF file');
        }
        break;

      case 'article':
        // TODO: Implement actual article content extraction
        processedContent = `Article content from URL: ${content}`;
        break;

      default:
        processedContent = content;
    }

    if (!processedContent) {
      throw new Error('Failed to process content');
    }

    // Generate summary with error handling
    const summaryText = await callGeminiAPI(getSummaryPrompt(processedContent));
    const summary = summaryText.split('\n').filter(line => line.trim());

    // Generate insights with error handling
    const insightsText = await callGeminiAPI(getInsightsPrompt(processedContent));
    const insights = insightsText.split('\n').filter(line => line.trim());

    // Generate flashcards with error handling
    const flashcardsText = await callGeminiAPI(getFlashcardPrompt(processedContent));
    let flashcards;
    try {
      flashcards = JSON.parse(flashcardsText);
    } catch (error) {
      console.error('Error parsing flashcards:', error);
      flashcards = [];
    }

    return {
      summary,
      insights,
      flashcards,
    };
  } catch (error) {
    console.error('Error processing content:', error);
    throw new Error(`Failed to process content: ${error.message}`);
  }
};

export const generateActionSteps = async (summary, goal, habitStruggle) => {
  try {
    if (!summary || !goal || !habitStruggle) {
      throw new Error('Missing required parameters');
    }

    const stepsText = await callGeminiAPI(getApplyModePrompt(summary, goal, habitStruggle));
    return stepsText.split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Error generating action steps:', error);
    throw new Error(`Failed to generate action steps: ${error.message}`);
  }
}; 
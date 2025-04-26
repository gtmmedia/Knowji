import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const MAX_RETRIES = 1;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const callGeminiAPI = async (prompt, retryCount = 0) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await sleep(RETRY_DELAY);
      return callGeminiAPI(prompt, retryCount + 1);
    }
    throw new Error('Failed to generate content. Please try again later.');
  }
};

export const processContent = async (content, type) => {
  try {
    // Process different content types
    let processedContent = content;
    switch (type) {
      case 'youtube':
        processedContent = await extractYouTubeTranscript(content);
        break;
      case 'pdf':
        processedContent = await extractPDFText(content);
        break;
      case 'article':
        processedContent = await extractArticleContent(content);
        break;
      default:
        processedContent = content;
    }

    // Generate summary
    const summaryText = await callGeminiAPI(getSummaryPrompt(processedContent));
    const summary = summaryText.split('\n').filter(line => line.trim());

    // Generate insights
    const insightsText = await callGeminiAPI(getInsightsPrompt(processedContent));
    const insights = insightsText.split('\n').filter(line => line.trim());

    // Generate flashcards
    const flashcardsText = await callGeminiAPI(getFlashcardPrompt(processedContent));
    const flashcards = JSON.parse(flashcardsText);

    return {
      summary,
      insights,
      flashcards,
    };
  } catch (error) {
    console.error('Error processing content:', error);
    throw new Error('Failed to process content. Please try again later.');
  }
};

export const generateActionSteps = async (summary, goal, habitStruggle) => {
  try {
    const stepsText = await callGeminiAPI(getApplyModePrompt(summary, goal, habitStruggle));
    return stepsText.split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Error generating action steps:', error);
    throw new Error('Failed to generate action steps. Please try again later.');
  }
};

// Placeholder functions for content extraction
const extractYouTubeTranscript = async (url) => {
  // TODO: Implement YouTube transcript extraction
  return 'YouTube transcript placeholder';
};

const extractPDFText = async (file) => {
  // TODO: Implement PDF text extraction
  return 'PDF text placeholder';
};

const extractArticleContent = async (url) => {
  // TODO: Implement article content extraction
  return 'Article content placeholder';
}; 
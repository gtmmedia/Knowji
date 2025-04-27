import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateInsights(content) {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a prompt based on the content type
    let prompt = '';
    switch (content.type) {
      case 'text':
        prompt = `Analyze the following text and provide key insights, main points, and potential learning opportunities:\n\n${content.content}`;
        break;
      case 'youtube':
        prompt = `Based on the YouTube video at ${content.content}, provide key insights, main points, and potential learning opportunities.`;
        break;
      case 'article':
        prompt = `Analyze the article at ${content.content} and provide key insights, main points, and potential learning opportunities.`;
        break;
      case 'pdf':
        prompt = `Analyze the PDF content and provide key insights, main points, and potential learning opportunities.`;
        break;
      default:
        throw new Error('Unsupported content type');
    }

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      insights: text,
    };
  } catch (error) {
    console.error('Error generating insights:', error);
    throw new Error('Failed to generate insights');
  }
} 
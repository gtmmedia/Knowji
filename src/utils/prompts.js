export const getSummaryPrompt = (text) => `
Summarize the following content in 4-5 clear and concise bullet points:\n\n${text}
`;

export const getInsightsPrompt = (text) => `
From this content, extract 5 insightful and thought-provoking takeaways:\n\n${text}
`;

export const getApplyModePrompt = (summary, goal, habitStruggle) => `
A user consumed this content:\n\n${summary}

They shared their current life goal: "${goal}"
And their daily habit struggle: "${habitStruggle}"

Generate 3-4 personalized, practical micro-steps they can take this week to:
1. Make progress toward their life goal
2. Overcome their habit struggle
3. Apply the insights from the content

Each step should be specific, actionable, and connect the content insights with their personal situation.
`;

export const getFlashcardPrompt = (text) => `
Create 5 simple Q&A flashcards from this content. Follow these rules:
1. Each question must be 15 words or less
2. Each answer must be 1-2 sentences maximum
3. Focus on key concepts and important details
4. Make questions clear and direct
5. Keep answers concise but informative

Format each flashcard as a JSON object with 'question' and 'answer' fields.
Return an array of these objects.

Content:\n\n${text}
`;

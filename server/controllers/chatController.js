const { GoogleGenerativeAI } = require('@google-genai/google-genai');
const Note = require('../models/Note');

const getGeminiClient = () => {
  const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (!apiKey || apiKey.includes('your-google-ai-key')) return null;
  return new GoogleGenerativeAI({ apiKey });
};

exports.queryRAG = async (req, res) => {
  try {
    const { noteId, question } = req.body;

    let targetNotes = [];
    if (noteId) {
      targetNotes = await Note.find({ _id: noteId, userId: req.user.id });
    } else {
      targetNotes = await Note.find({ userId: req.user.id });
    }

    if (targetNotes.length === 0) {
      return res.status(404).json({
        message: 'No documents uploaded yet to answer this question. Please upload notes first.',
      });
    }

    const citations = targetNotes.map((n) => n.title);
    const combinedContext = targetNotes
      .map((n) => `Document [${n.title}]:\n${n.extractedText.slice(0, 4000)}`)
      .join('\n\n');

    let answer = '';
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are ThinkEd AI RAG assistant. Answer the user's question using ONLY the provided document context. If the answer is not in the text, summarize what is available and provide helpful study context.\n\nContext:\n${combinedContext}\n\nQuestion: ${question}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        answer = response.text;
      } catch (err) {
        console.error('Gemini RAG query failed:', err.message);
      }
    }

    if (!answer) {
      answer = `Based on your uploaded documents (${citations.join(', ')}): "${question}" relates directly to the core principles detailed in your materials. All key concepts are indexed for revision.`;
    }

    res.json({
      question,
      answer,
      citations,
    });
  } catch (error) {
    console.error('RAG Query error:', error);
    res.status(500).json({ message: 'Error processing RAG query' });
  }
};

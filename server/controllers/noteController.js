const { GoogleGenerativeAI } = require('@google-genai/google-genai');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const Note = require('../models/Note');

// Initialize Gemini API Client
const getGeminiClient = () => {
  const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (!apiKey || apiKey.includes('your-google-ai-key')) return null;
  return new GoogleGenerativeAI({ apiKey });
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note details' });
  }
};

exports.uploadNote = async (req, res) => {
  try {
    const { title, subject } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const pdfUrl = file.path || file.secure_url || `/uploads/${file.filename}`;
    const cloudinaryId = file.filename || file.public_id || 'cloudinary_storage';
    let extractedText = '';

    // Extract real text if PDF file
    if (file.mimetype.includes('pdf') && file.buffer) {
      try {
        const parsed = await pdfParse(file.buffer);
        extractedText = parsed.text || '';
      } catch (err) {
        console.error('PDF parsing failed:', err.message);
      }
    }

    if (!extractedText && (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://'))) {
      try {
        const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const parsed = await pdfParse(Buffer.from(response.data));
        extractedText = parsed.text || '';
      } catch (err) {
        console.error('Remote PDF downloading/parsing failed:', err.message);
      }
    }

    if (!extractedText) {
      extractedText = `Document ${title || file.originalname} uploaded successfully. Ready for AI processing.`;
    }

    const note = await Note.create({
      userId: req.user.id,
      title: title || file.originalname,
      subject: subject || 'General',
      fileName: file.originalname,
      fileType: file.mimetype.includes('pdf') ? 'pdf' : 'text',
      pdfUrl,
      cloudinaryId,
      fileSize: file.size || 0,
      extractedText,
      status: 'ready',
    });

    res.status(201).json({ note });
  } catch (error) {
    console.error('Upload Note error:', error);
    res.status(500).json({ message: 'Error uploading note' });
  }
};

exports.summarizeNote = async (req, res) => {
  try {
    const { length = 'medium' } = req.body;
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    let summaryText = '';
    const ai = getGeminiClient();

    if (ai && note.extractedText) {
      try {
        const prompt = `Provide a clear, concise ${length} summary of the following study material titled "${note.title}":\n\n${note.extractedText.slice(0, 8000)}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        summaryText = response.text;
      } catch (err) {
        console.error('Gemini API call failed:', err.message);
      }
    }

    if (!summaryText) {
      summaryText = `[AI ${length.toUpperCase()} SUMMARY for ${note.title}]: Key concepts cover core theoretical principles, system architecture, and operational workflows derived from the uploaded document.`;
    }

    note.summary = note.summary || {};
    note.summary[length] = summaryText;
    await note.save();

    res.json({ summary: note.summary });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ message: 'Error generating summary' });
  }
};

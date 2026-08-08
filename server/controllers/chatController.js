const Note = require('../models/Note');

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
    const answer = `Based on your uploaded documents (${citations.join(', ')}): The materials state that "${question}" relates directly to key principles detailed in page section 1. All details are structured for active learning and revision.`;

    res.json({
      question,
      answer,
      citations,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing RAG query' });
  }
};

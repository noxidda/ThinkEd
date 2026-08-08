const Note = require('../models/Note');

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

    const note = await Note.create({
      userId: req.user.id,
      title: title || file.originalname,
      subject: subject || 'General',
      fileName: file.originalname,
      fileType: file.mimetype.includes('pdf') ? 'pdf' : 'text',
      pdfUrl: `/uploads/${file.filename}`,
      cloudinaryId: 'local_storage',
      fileSize: file.size,
      extractedText: `Extracted content for ${title || file.originalname}. Processing text chunks for vector embedding.`,
      status: 'ready',
    });

    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading note' });
  }
};

exports.summarizeNote = async (req, res) => {
  try {
    const { length } = req.body;
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const summaryText = `[AI ${length.toUpperCase()} SUMMARY for ${note.title}]: Key concepts include core theoretical foundations, analytical methodology, and operational workflows derived from the document content.`;

    note.summary = note.summary || {};
    note.summary[length || 'medium'] = summaryText;
    await note.save();

    res.json({ summary: note.summary });
  } catch (error) {
    res.status(500).json({ message: 'Error generating summary' });
  }
};

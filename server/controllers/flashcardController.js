const Flashcard = require('../models/Flashcard');
const Note = require('../models/Note');

exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user.id });
    res.json({ flashcards });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flashcards' });
  }
};

exports.generateFlashcards = async (req, res) => {
  try {
    const { noteId, count } = req.body;
    const note = await Note.findOne({ _id: noteId, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const newCards = [
      {
        userId: req.user.id,
        noteId: note._id,
        question: `What is the primary concept covered in ${note.title}?`,
        answer: `The main focus is understanding core operations and structured methodologies.`,
      },
      {
        userId: req.user.id,
        noteId: note._id,
        question: `How does ${note.title} define key performance indicators?`,
        answer: `Through quantitative measurements and systematic validation routines.`,
      },
    ];

    const savedCards = await Flashcard.insertMany(newCards);
    res.status(201).json({ flashcards: savedCards });
  } catch (error) {
    res.status(500).json({ message: 'Error generating flashcards' });
  }
};

const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Não é possivel encontrar a Nota' });
    }
    await note.remove();
    res.json({ message: 'Deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
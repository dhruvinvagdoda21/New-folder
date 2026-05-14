const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id });
    res.json({ success: true, pets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const pet = await Pet.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });
    res.json({ success: true, message: 'Pet removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

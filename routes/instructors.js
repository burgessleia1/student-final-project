const express = require('express');
const router = express.Router();
const Instructor = require('../models/instructor');
const { auth, authorize } = require('../middleware/auth');

// Get all instructors (public)
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single instructor by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create instructor (admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(201).json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update instructor (admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete instructor (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
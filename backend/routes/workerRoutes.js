const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/aadhaar'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `aadhaar_${req.params.id}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// ✅ Updated GET /:id route with aadhaarPhotoUrl
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    const workerObj = worker.toObject();
    workerObj.aadhaarPhotoUrl = worker.aadhaarPhoto
      ? `${req.protocol}://${req.get('host')}${worker.aadhaarPhoto}`
      : '';

    res.json(workerObj);
  } catch (error) {
    console.error('Error fetching worker profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT route for updating profile and Aadhaar image
router.put('/:id', upload.single('aadhaarPhoto'), async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    if (!worker.aadhaarPhoto && !req.file) {
      return res.status(400).json({ error: 'Uploading Aadhaar card photo is compulsory.' });
    }

    const { name, email, phone, location, experience, hourlyRate, availability, skills, bio } = req.body;

    worker.name = name || worker.name;
    worker.email = email || worker.email;
    worker.phone = phone || worker.phone;
    worker.location = location || worker.location;
    worker.experience = experience || worker.experience;
    worker.hourlyRate = hourlyRate || worker.hourlyRate;
    worker.availability = availability || worker.availability;
    worker.skills = skills ? skills.split(',').map(skill => skill.trim()) : worker.skills;
    worker.bio = bio || worker.bio;

    if (req.file) {
      worker.aadhaarPhoto = `/uploads/aadhaar/${req.file.filename}`;
    }

    await worker.save();

    const workerObj = worker.toObject();
    workerObj.aadhaarPhotoUrl = worker.aadhaarPhoto
      ? `${req.protocol}://${req.get('host')}${worker.aadhaarPhoto}`
      : '';

    res.json(workerObj);
  } catch (error) {
    console.error('Error updating worker profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
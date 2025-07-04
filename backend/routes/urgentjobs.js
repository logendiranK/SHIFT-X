const express = require('express');
const router = express.Router();
const Job = require('../models/UrgentJob');


router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      jobType,
      requirements,
      contactEmail,
      contactPhone,
      durationHours,
      shiftDate,
      shiftStartTime,
      shiftEndTime
    } = req.body;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      requirements,
      contactEmail,
      contactPhone,
      durationHours,
      shiftDate,
      shiftStartTime,
      shiftEndTime
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

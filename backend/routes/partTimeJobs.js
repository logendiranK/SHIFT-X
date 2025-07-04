const express = require('express');
const router = express.Router();
const PartTimeJob = require('../models/PartTimeJob');

router.post('/', async (req, res) => {
    try {
        const partTimeJob = new PartTimeJob(req.body);
        const savedJob = await partTimeJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const jobs = await PartTimeJob.find().sort({ postedDate: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const job = await PartTimeJob.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedJob = await PartTimeJob.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;

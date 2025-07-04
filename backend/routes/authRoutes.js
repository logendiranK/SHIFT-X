const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const Employer = require('../models/Employer');

router.post('/signup-worker', async (req, res) => {
  const { name, email, password, phone, location } = req.body;
  
  try {

    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(400).json({ error: 'Worker already exists with this email' });
    }

    const worker = new Worker({
      name,
      email,
      password,
      phone,
      location
    });

    await worker.save();

    res.status(201).json({
      message: 'Worker account created successfully',
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login-worker', async (req, res) => {
  const { email, password } = req.body;
  try {
    const worker = await Worker.findOne({ email });
    if (!worker || worker.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ 
      message: 'Worker login successful',
      worker: {
        _id: worker._id,
        email: worker.email,
        name: worker.name
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login-employer', async (req, res) => {
  const { email, password } = req.body;
  try {
    const employer = await Employer.findOne({ email });
    if (!employer || employer.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ 
      message: 'Employer login successful',
      employer: {
        _id: employer._id,
        email: employer.email,
        name: employer.name
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

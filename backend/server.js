const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'test'
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');
const urgentjobsRouter = require('./routes/urgentjobs');
const partTimeJobsRouter = require('./routes/partTimeJobs');

app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/urgentjobs', urgentjobsRouter);
app.use('/api/part-time-jobs', partTimeJobsRouter);

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);

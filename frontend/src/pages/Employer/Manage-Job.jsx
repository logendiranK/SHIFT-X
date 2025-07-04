import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Emploer/ManageJobs.css'
const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employerId = localStorage.getItem('employerId');

  useEffect(() => {
    if (!employerId) {
      setError('You must be logged in as an employer.');
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`https://shift-x.onrender.com/api/part-time-jobs/employer/${employerId}`);
        setJobs(response.data);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [employerId]);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job._id}>
              <strong>{job.title}</strong> - {job.location} <br />
              {job.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageJob;

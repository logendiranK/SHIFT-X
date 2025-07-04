import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SearchJobs.css';
import { Link } from 'react-router-dom';
const SearchJobs = () => {
  const [urgentJobs, setUrgentJobs] = useState([]);
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const [urgentRes, partTimeRes] = await Promise.all([
        axios.get('http://localhost:5000/api/urgentjobs'),
        axios.get('http://localhost:5000/api/part-time-jobs'),
      ]);
      setUrgentJobs(urgentRes.data);
      setPartTimeJobs(partTimeRes.data);
      setLoading(false);
    } catch {
      setError('Error fetching jobs. Please try again later.');
      setLoading(false);
    }
  };
  
  const getJobEmoji = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("cook") || titleLower.includes("chef")) return "👨‍🍳";
    if (titleLower.includes("delivery")) return "🚚";
    if (titleLower.includes("electrician")) return "🔌";
    if (titleLower.includes("cleaner") || titleLower.includes("cleaning"))
      return "🧹";
    if (titleLower.includes("mechanic")) return "🛠️";
    if (titleLower.includes("driver")) return "🚗";
    return "💼";
  };

  let jobsToShow = [...urgentJobs, ...partTimeJobs];


  if (searchTerm.trim().toLowerCase() === 'urgent') {
    jobsToShow = urgentJobs;
  } else if (searchTerm.trim().toLowerCase() === 'parttime') {
    jobsToShow = partTimeJobs;
  } else if (searchTerm.trim() !== '') {
    jobsToShow = jobsToShow.filter(
      (job) =>
        (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (job.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (job.company?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="search-job-container">
      <div className="search-job-header">
        <h1>Search Jobs</h1>
        <div className='search-bar'>
          <input
          type="text"
          placeholder="Search jobs by title, location, company, or type (urgent/parttime)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ minWidth: 260, padding: '10px', borderRadius: 8, border: '1.5px solid #ccc', fontSize: 16 }}
        />
        </div>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : jobsToShow.length === 0 ? (
        <div className="no-jobs">No jobs found.</div>
      ) : (
        <div className="search-job-grid">
          {jobsToShow.map((job) => (
            <div key={job._id} className="search-jobs-card">
              <h2>{getJobEmoji(job.title)}</h2>
              <h3>{job.company}</h3>
              <div className="search-jobs-details">
                <p><strong>Location:</strong> {job.location}</p>
                {job.salary && <p><strong>Salary:</strong> ₹{job.salary}/hour</p>}
                {job.hoursPerWeek && <p><strong>Hours:</strong> {job.hoursPerWeek} hours/week</p>}
                {job.postedDate && <p><strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>}
              </div>
              <div className="search-jobs-contact">
                {job.contactPhone && <p><strong>Phone:</strong> {job.contactPhone}</p>}
              </div>
              {job.status && (
                <div className="search-jobs-status">
                  <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span>
                </div>
              )}
              <div style={{ marginTop: 8 }}>
                <span className="search-status-badge" style={{ background: job.jobType === 'Urgent' ? '#ffb3b3' : '#b3e6ff', color: '#333' }}>
                  {job.jobType === 'Urgent' ? 'Urgent' : 'Part-Time'}
                </span>
              </div>
              <Link
                className='view-button'
                to={job.jobType === 'Part-time'
                  ? `/part-time-jobs/${job._id}`
                  : `/urgent-time-jobs/${job._id}`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchJobs;

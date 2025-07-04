import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Parttime/PartTimeJobs.css";

const PartTimeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/part-time-jobs"
      );
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching jobs. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (job.location?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (job.company?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "salary-high":
        return b.salary - a.salary;
      case "salary-low":
        return a.salary - b.salary;
      default:
        return 0;
    }
  });

  return (
    <div className="part-container">
      <div className="jobs-header">
        <h1>Part-Time Jobs</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search jobs by title, location, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="salary-high">Highest Salary</option>
          <option value="salary-low">Lowest Salary</option>
        </select>
      </div>
      {jobs.length === 0 ? (
        <div className="no-jobs">
          No part-time jobs available at the moment.
        </div>
      ) : (
        <div className="job-grid">
          {sortedJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h2>{getJobEmoji(job.title)}</h2>
              <h3>{job.company}</h3>
              <div className="job-details">
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Salary:</strong> ₹{job.salary}/hour
                </p>
              </div>
              <div className="job-contact">
                <p>
                  <strong>Phone:</strong> {job.contactPhone}
                </p>
              </div>
              <div className="job-status">
                <span className={`status-badge ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </div>
              <Link className="view-button" to={`/part-time-jobs/${job._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PartTimeJobs;

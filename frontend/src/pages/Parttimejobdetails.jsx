import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Parttime/PartTimeJobDetails.css";
import axios from "axios";

const PartTimeJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/part-time-jobs/${id}`);
        setJob(response.data);
      } catch {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <h2>{job.company}</h2>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ₹{job.salary}/hour</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>HoursPerWeek:</strong> {job.hoursPerWeek}</p>
      <p><strong>JobType:</strong> {job.jobType}</p>
      <p><strong>Date:</strong> {job.shiftDate}</p>
      <p><strong>Requirements:</strong> {Array.isArray(job.requirements) ? job.requirements.join(", ") : job.requirements}</p>
      <p><strong>Contact Email:</strong> {job.contactEmail}</p>
      <p><strong>Contact Phone:</strong> {job.contactPhone}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <div className="apply">
        <button onClick={() => window.alert('Application submitted!')}>Apply Now</button>
      </div>
    </div>
  );
};

export default PartTimeJobDetails;

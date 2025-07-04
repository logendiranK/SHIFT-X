import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/MainPage/Home.css";

const Home = () => {
  const [urgentJobs, setUrgentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrgentJobs = async () => {
      try {
        const response = await axios.get("https://shift-x.onrender.com/api/urgentjobs");
        const urgentJobsData = response.data
          .filter(job => job.jobType === "Urgent")
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 4); // Show only 4 most recent
        setUrgentJobs(urgentJobsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch urgent jobs");
        setLoading(false);
      }
    };

    fetchUrgentJobs();
  }, []);

  const cards = [
    {
      id: 1,
      title: "Urgent Shifts Today",
      image: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
      link: "/urgent-jobs",
    },
    {
      id: 2,
      title: "Part-Time Jobs",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      link: "/part-time-jobs",
    },
  ];

  const getJobEmoji = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("cook") || titleLower.includes("chef")) return "👨‍🍳";
    if (titleLower.includes("delivery")) return "🚚";
    if (titleLower.includes("electrician")) return "🔌";
    if (titleLower.includes("cleaner") || titleLower.includes("cleaning")) return "🧹";
    if (titleLower.includes("mechanic")) return "🛠️";
    if (titleLower.includes("driver")) return "🚗";
    return "💼";
  };

  return (
    <div className="home-container">

      <section className="hero-section">
        <h1 className="hero-title">Find Work Instantly, Hire in Minutes!</h1>
        <p className="hero-subtitle">
          Connecting businesses with part-time workers for urgent shifts.
        </p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs (e.g., Delivery, Cook, Helper)"
          />
          <button>Find Jobs</button>
        </div>

        <div className="actions">
          <button className="worker-btn">Find Jobs Now</button>
        </div>
      </section>

      <div className="home">
        <h1 className="home-heading">Trending on ShiftX</h1>
        <div className="card-container">
          {cards.map((card, index) => (
            <div key={card.id} className="job-card">
              <div className="card-rank">Trending at #{index + 1}</div>
              <img src={card.image} alt={card.title} className="card-image" />
              <h2 className="card-title">{card.title}</h2>
              <Link to={card.link} className="view-all-link">
                View all &gt;
              </Link>
            </div>
          ))}
        </div>
      </div>

      <section className="urgent-jobs-section">
        <h2 className="section-title">🔥 Workers Needed Urgently</h2>
        {loading ? (
          <div className="loading">Loading urgent jobs...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="urgent-jobs-grid">
            {urgentJobs.map((job) => (
              <div key={job._id} className="job-card">
                <span className="job-icon">{getJobEmoji(job.title)}</span>
                <h3>{job.title}</h3>
                <p>📍 {job.location}</p>
                <p className="job-salary">💰 {job.salary}</p>
                <p className="job-company">🏢 {job.company}</p>
                <Link to={`/job/${job._id}`} className="view-job-link">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="view-all-container">
        <Link to="/urgent-jobs" className="view-all-button">
          View All Urgent Jobs
        </Link>
      </div>

      <section className="download-section">
        <h2>Download the ShiftX App</h2>
        <p>Get notified about new shifts anytime, anywhere.</p>
        <button>Google Play</button>
        <button>App Store</button>
      </section>
    </div>
  );
};

export default Home;

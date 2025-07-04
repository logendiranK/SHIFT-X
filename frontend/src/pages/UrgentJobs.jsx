import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Urgent/UrgentJobs.css';

const UrgentJobs = () => {
    const [urgentJobs, setUrgentJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');   
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchUrgentJobs = async () => {
            try {
                const response = await axios.get('https://shift-x.onrender.com/api/urgentjobs');
                const urgentJobsData = response.data.filter(job => job.jobType === 'Urgent');
                setUrgentJobs(urgentJobsData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch urgent jobs');
                setLoading(false);
            }
        };

        fetchUrgentJobs();
    }, []);

    const getJobEmoji = (title) => {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('cook') || titleLower.includes('chef')) return '👨‍🍳';
        if (titleLower.includes('delivery')) return '🚚';
        if (titleLower.includes('electrician')) return '🔌';
        if (titleLower.includes('cleaner') || titleLower.includes('cleaning')) return '🧹';
        if (titleLower.includes('mechanic')) return '🛠️';
        if (titleLower.includes('driver')) return '🚗';
        return '💼';
    };


    const filteredJobs = urgentJobs.filter(job =>
    (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (job.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (job.company?.toLowerCase() || '').includes(searchTerm.toLowerCase()));

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'salary-high':
                return b.salary - a.salary;
            case 'salary-low':
                return a.salary - b.salary;
            default:
                return 0;
        }
    });

    return (
        <div className="urgent-jobs-container">
            <div className="urgent-jobs-header">
                <h1>🔥 Urgent Jobs Available</h1>
                <div className="search-sort-container">
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
            </div>

            {loading ? (
                <div className="loading">Loading urgent jobs...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="urgent-jobs-grid">
                    {sortedJobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <div className="job-header">
                                <span className="job-icon">{getJobEmoji(job.title)}</span>
                                <span className="urgent-badge">Urgent</span>
                            </div>
                            <h3>{job.title}</h3>
                            <div className="job-details">
                                <p className="location">📍 {job.location}</p>
                                <p className="salary">💰 {job.salary}</p>
                            </div>
                            <div className="job-actions">
                                <Link to={`/urgent-jobs/${job._id}`} className="view-details-btn">
                                    View Full Details
                                </Link>
                                <button className="apply-btn">Apply Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && sortedJobs.length === 0 && (
                <div className="no-jobs">
                    <p>No urgent jobs found matching your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default UrgentJobs; 

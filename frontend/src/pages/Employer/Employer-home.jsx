import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Emploer/Employerhome.css';

const EmployerDashboard = () => {
  const navigate = useNavigate(); 

  const handlePostJobClick = () => {
    navigate('/job');
  };

  const handleManageJobsClick = () => {
    navigate('/manage-jobs');
  };

  return (
    <div className="dashboard-container">
      <h2>👨‍💼 Employer Dashboard</h2>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Post a Job</h3>
          <p>Create urgent shift-based job postings for your business.</p>
          <button onClick={handlePostJobClick}>Post New Job</button>
        </div>
        <div className="dashboard-card">
          <h3>Manage Posted Jobs</h3>
          <p>View, edit or delete your posted jobs here.</p>
          <button onClick={handleManageJobsClick}>Manage Jobs</button>
        </div>
        <div className="dashboard-card">
          <h3>Applications</h3>
          <p>Check applications received from job seekers.</p>
          <button>View Applications</button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

import React, { useState } from "react";
import axios from "axios";
import "../../styles/Urgent/UrgentJobForm.css";

const UrgentJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "Urgent",
    requirements: "",
    contactEmail: "",
    contactPhone: "",
    durationHours: "",
    shiftDate: "",
    shiftStartTime: "",
    shiftEndTime: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const jobData = {
        ...formData,
        salary: Number(formData.salary),
        durationHours: Number(formData.durationHours),
        requirements: formData.requirements.split(",").map((req) => req.trim()),
      };

      const response = await axios.post(
        "https://shift-x.onrender.com/api/urgentjobs",
        jobData
      );
      setMessage("Urgent job posted successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "Urgent",
        requirements: "",
        contactEmail: "",
        contactPhone: "",
        durationHours: "",
        shiftDate: "",
        shiftStartTime: "",
        shiftEndTime: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error while posting job");
    }
  };

  return (
    <div className="urgent-job-form-container">
      <h2 className="urgent-job-form-container-head">🚨 Post an Urgent Job</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="urgent-job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Job Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary (₹ per hour)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="durationHours">Working Duration (in hours)</label>
          <input
            type="number"
            name="durationHours"
            value={formData.durationHours}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shiftDate">Shift Date</label>
          <input
            type="date"
            name="shiftDate"
            value={formData.shiftDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shiftStartTime">Shift Start Time</label>
          <input
            type="time"
            name="shiftStartTime"
            value={formData.shiftStartTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shiftEndTime">Shift End Time</label>
          <input
            type="time"
            name="shiftEndTime"
            value={formData.shiftEndTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements (comma-separated)</label>
          <input
            type="text"
            name="requirements"
            placeholder="e.g., punctual, team player"
            value={formData.requirements}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          🚀 Post Urgent Job
        </button>
      </form>
    </div>
  );
};

export default UrgentJobForm;

import React, { useState } from "react";
import axios from "axios";
import "../../styles/Parttime/PartTimeJobForm.css";

const PartTimeJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    shiftDate: "",
    salary: "",
    hoursPerWeek: "",
    contactEmail: "",
    contactPhone: "",
    jobType: "Part-time",
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
      const employerId = localStorage.getItem('employerId');
      if (!employerId) {
        setError("Please login as an employer to post jobs");
        return;
      }

      const jobData = {
        ...formData,
        employer: employerId,
        salary: Number(formData.salary),
        hoursPerWeek: Number(formData.hoursPerWeek),
        requirements: formData.requirements.split(",").map((req) => req.trim()),
      };

      await axios.post("http://localhost:5000/api/part-time-jobs", jobData);
      setMessage("Part-time job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
        shiftDate: "",
        salary: "",
        hoursPerWeek: "",
        contactEmail: "",
        contactPhone: "",
        jobType: "Part-time",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error while posting job");
    }
  };

  return (
    <div className="part-time-job-form-container">
      <h2>⏰ Post a Part-Time Job</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="part-time-job-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="requirements"
          placeholder="Requirements (comma separated)"
          value={formData.requirements}
          onChange={handleChange}
          required
        />
          <input
            type="date"
            name="shiftDate"
            value={formData.shiftDate}
            onChange={handleChange}
            required
          />
        <input
          type="number"
          name="salary"
          placeholder="Salary per Hour"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="hoursPerWeek"
          placeholder="Hours per Week"
          value={formData.hoursPerWeek}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contactPhone"
          placeholder="Contact Phone"
          value={formData.contactPhone}
          onChange={handleChange}
          required
        />
        <button type="submit">📤 Post Job</button>
      </form>
    </div>
  );
};

export default PartTimeJobForm;

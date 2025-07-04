import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Worker/WorkerProfile.css';

const WorkerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [workerData, setWorkerData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    availability: '',
    bio: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    availability: '',
    bio: ''
  });

  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [aadhaarPhotoUrl, setAadhaarPhotoUrl] = useState('');

  useEffect(() => {
    const workerId = localStorage.getItem('workerId');
    if (!workerId) {
      navigate('/login?role=worker');
      return;
    }

    fetchWorkerProfile(workerId);
  }, [navigate]);

  const fetchWorkerProfile = async (workerId) => {
    try {
      const response = await axios.get(`https://shift-x.onrender.com/api/workers/${workerId}`);
      const worker = response.data;
      
      setWorkerData({
        name: worker.name || '',
        email: worker.email || '',
        phone: worker.phone || '',
        location: worker.location || '',
        skills: Array.isArray(worker.skills) ? worker.skills.join(', ') : worker.skills || '',
        experience: worker.experience || '',
        availability: worker.availability || '',
        bio: worker.bio || ''
      });
      
      setFormData({
        name: worker.name || '',
        email: worker.email || '',
        phone: worker.phone || '',
        location: worker.location || '',
        skills: Array.isArray(worker.skills) ? worker.skills.join(', ') : worker.skills || '',
        experience: worker.experience || '',
        availability: worker.availability || '',
        bio: worker.bio || ''
      });
      
      setAadhaarPhotoUrl(worker.aadhaarPhotoUrl || '');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching worker profile:', err);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(workerData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (!aadhaarPhotoUrl && !aadhaarPhoto) {
        alert('Uploading Aadhaar card photo is compulsory.');
        return;
      }
      const workerId = localStorage.getItem('workerId');
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (aadhaarPhoto) {
        form.append('aadhaarPhoto', aadhaarPhoto);
      }
      const response = await axios.put(
        `https://shift-x.onrender.com/api/workers/${workerId}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setWorkerData({ ...formData });
      setAadhaarPhoto(null);
      setAadhaarPhotoUrl(response.data.aadhaarPhotoUrl || '');
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="worker-profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="worker-profile-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="worker-profile-container">
      <div className="profile-header">
        <h1>Worker Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
          )}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              ) : (
                <span>{workerData.name}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              ) : (
                <span>{workerData.email}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Phone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                <span>{workerData.phone}</span>
              )}
            </div>

            <div className="profile-field">
              <label>Location:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                />
              ) : (
                <span>{workerData.location}</span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Professional Information</h2>
          <div className="profile-grid">
            <div className="profile-field full-width">
              <label>Skills:</label>
              {isEditing ? (
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Enter your skills (e.g., Cooking, Delivery, Cleaning, etc.)"
                  rows="3"
                />
              ) : (
                <span>{workerData.skills || 'No skills listed'}</span>
              )}
            </div>

            <div className="profile-field full-width">
              <label>Experience:</label>
              {isEditing ? (
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Describe your work experience"
                  rows="3"
                />
              ) : (
                <span>{workerData.experience || 'No experience listed'}</span>
              )}
            </div>

            <div className="profile-field full-width">
              <label>Availability:</label>
              {isEditing ? (
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder="Describe your availability (e.g., Weekdays 9-5, Weekends, etc.)"
                  rows="3"
                />
              ) : (
                <span>{workerData.availability || 'No availability listed'}</span>
              )}
            </div>

            <div className="profile-field full-width">
              <label>Bio:</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              ) : (
                <span>{workerData.bio || 'No bio available'}</span>
              )}
            </div>

            <div className="profile-field full-width">
              <label>Aadhaar Card Photo:</label>
              {isEditing ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      setAadhaarPhoto(e.target.files[0]);
                      if (e.target.files[0]) {
                        setAadhaarPhotoUrl(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                  {aadhaarPhotoUrl && (
                    <img src={aadhaarPhotoUrl} alt="Aadhaar Preview" style={{ width: 200, marginTop: 10 }} />
                  )}
                </>
              ) : (
                aadhaarPhotoUrl ? (
                  <img src={aadhaarPhotoUrl} alt="Aadhaar" style={{ width: 200 }} />
                ) : (
                  <span>No Aadhaar card uploaded</span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={() => navigate('/')} className="action-btn">
                View Appliled Jobs
            </button>
            <button onClick={() => navigate('/urgent-jobs')} className="action-btn">
              View Urgent Jobs
            </button>
            <button onClick={() => navigate('/part-time-jobs')} className="action-btn">
              View Part-Time Jobs
            </button>
            <button onClick={() => navigate('/search-jobs')} className="action-btn">
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;

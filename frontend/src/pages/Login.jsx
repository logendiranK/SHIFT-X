import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MainPage/Login.css';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState('worker');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromURL = params.get('role');
    if (roleFromURL === 'employer' || roleFromURL === 'worker') {
      setRole(roleFromURL);
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      role === 'worker'
        ? 'https://shift-x.onrender.com/api/auth/login-worker'
        : 'https://shift-x.onrender.com/api/auth/login-employer';

    try {
      const response = await axios.post(endpoint, formData);
      console.log('Login Response:', response.data);

      if (response.data.employer) {

        localStorage.setItem('employerId', response.data.employer._id);
        localStorage.setItem('userRole', 'employer');
        navigate('/');
      } else if (response.data.worker) {
        localStorage.setItem('workerId', response.data.worker._id);
        localStorage.setItem('userRole', 'worker');
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Welcome Back to ShiftX`);
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to ShiftX as {role === 'employer' ? 'Employer' : 'Worker'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account?{' '}
          <Link to={role === 'employer' ? '/signup-employer' : '/signup-worker'}>
            Sign up as {role}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

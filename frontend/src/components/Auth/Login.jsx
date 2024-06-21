import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData);
      const { token } = response.data;
      // Save token to localStorage
      localStorage.setItem('token', token);
      // Optionally, save token to cookie using document.cookie
      alert('Login successful.'); // Show success message
      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed.'); // Show error message
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    const theTokenThing = localStorage.getItem('token');
    if (theTokenThing) navigate('/dashboard')
  }, [])

  return (
    <div>
      <h2>Login</h2>
      <form className="form-container" onSubmit={handleLogin}>
        <input autoComplete="off" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      don't have an account? <Link to="/">
        sign up
      </Link>
    </div>
  );
};

export default Login;

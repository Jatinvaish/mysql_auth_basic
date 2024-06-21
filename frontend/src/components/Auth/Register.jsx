import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';

const Register = () => {
  const { role } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', { ...formData, role });
      alert(response.data); // Show success message
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      alert('Registration failed.'); // Show error message
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 style={{ color: '#000000' }}>Register as {role}</h2>
        <input autoComplete="off" name="firstName" onChange={handleChange} placeholder="First Name" required />
        <input autoComplete="off" name="lastName" onChange={handleChange} placeholder="Last Name" required />
        <input autoComplete="off" name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <input autoComplete="off" name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      already have an account  <Link to="/login">
                sign up
            </Link>
    </>
  );
};

export default Register;

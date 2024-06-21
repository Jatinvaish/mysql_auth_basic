import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3001/api/auth/verify-email?token=${token}`);
          alert(response.data); // Show success message
          // Redirect to login page after verification
          navigate('/login'); // or use navigate('/login', { replace: true }) for navigation
        } catch (error) {
          alert('Email verification failed.'); // Show error message
          console.error('Verification error:', error);
        }
      } else {
        alert('Token not found.');
      }
    };
    verifyEmail();
  }, [location.search, navigate]);

  return <div>Verifying email...</div>;
};

export default VerifyEmail;

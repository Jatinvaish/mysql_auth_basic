import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to Registration</h2>
      <div>
        <Link to="/register/customer">
          <button>Register as Customer</button>
        </Link>
        <Link to="/register/admin">
          <button style={{marginLeft:'20px'}}>Become an Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

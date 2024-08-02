
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleSignupClick = () => {
    navigate('/signup'); 
  };

  return (
    <div className="homepage">
      <h1>Welcome to Our Application</h1>
      <div className="buttons">
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Signup</button>
      </div>
    </div>
  );
};

export default HomePage;

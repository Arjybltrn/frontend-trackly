import React, { useState } from 'react';
import '../styles/landing-page.css';


const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(true);
    setIsLogIn(false);
  };

  const toggleLogIn = () => {
    setIsSignUp(false);
    setIsLogIn(true);
  };

  return (
    <div className="landing-page">
      <div className="banner">
        <img src="taskly-banner.jpg" alt="Taskly Banner" />
        <h2>Taskly</h2>
      </div>
      <div className="toggle-buttons">
        <button className={`toggle-button ${isSignUp ? 'active' : ''}`} onClick={toggleSignUp}>
          Sign Up
        </button>
        <button className={`toggle-button ${isLogIn ? 'active' : ''}`} onClick={toggleLogIn}>
          Log In
        </button>
      </div>
      <div className="form-container">
        {isSignUp && (
          <>
            <h2>Sign Up</h2>
            <form>
              <fieldset>
                <legend>User Information</legend>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
              </fieldset>
              <button type="submit">Sign Up</button>
            </form>
          </>
        )}
        {isLogIn && (
          <>
            <h2>Log In</h2>
            <form>
              <fieldset>
                <legend>Login Information</legend>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
              </fieldset>
              <button type="submit">Log In</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

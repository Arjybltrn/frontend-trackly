
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, auth } from '../services/firebase';

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    
    };
    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
          await auth.signInWithEmailAndPassword(email, password);
          setError(null);
          navigate('/jobs'); // Redirect to /jobs after successful login
        } catch (error) {
          setError(error.message);
        }
      };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsLogIn(false);
    setError(null);
  };

  const toggleLogIn = () => {
    setIsLogIn(!isLogIn);
    setIsSignUp(false);
    setError(null);
  };

  return (
    <div className="landing-page">
      <div className="banner">
        <img src="taskly-banner.jpg" alt="Taskly Banner" />
        <h2>Taskly</h2>
      </div>


      <div className="toggle-buttons">
        <div><button onClick={login}>Sign In With Google</button></div>
            <div>
                <span>Don't have an account?</span>
                <button onClick={toggleSignUp}>Sign Up</button>
            </div>
            <div>
                <span>Already have an account?</span>
                <button onClick={toggleLogIn}>Log In</button>
            </div>
      </div>

        {/* signup state */}
      {isSignUp && (
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}

         {/* login state */}
      {isLogIn && (
        <div className="form-container">
          <h2>Log In</h2>
          <form onSubmit={handleLogIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LandingPage;




  
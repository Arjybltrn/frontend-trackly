import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'

const LandingPage = ({ user }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLogIn, setIsLogIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  };
  // login with email and password
  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      setError(null)
      navigate('/jobs') // redirect to /jobs after successful login
    } catch (error) {
      setError(error.message)
    }
  };

  // connect with google login
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setError(null)
        navigate('/jobs') // Redirect to /jobs after successful login
      })
      .catch((error) => {
        setError(error.message)
      });
  };
  
  // connect with facebook
  const handleFBLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setError(null)
        navigate('/jobs') // Redirect to /jobs after successful login
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //toggle button to open sign up form
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
    setIsLogIn(false)
    setError(null)
  };

  //toggle button to open log in form
  const toggleLogIn = () => {
    setIsLogIn(!isLogIn)
    setIsSignUp(false)
    setError(null)
  };


  return (
    <div className="landing-page">
      <div className="banner">
        <img src="taskly-banner.jpg" alt="Taskly Banner" />
        <h2>Taskly</h2>
      </div>

      <div>
        <button onClick={handleGoogleLogin}>Sign In With Google</button>
      </div>
      <div>
        <button onClick={handleFBLogin}>Sign In With Facebook</button>
      </div>

      <div className="toggle-buttons">
        {!user && (
          <div>
            <span>Don't have an account?</span>
            <button onClick={toggleSignUp}>Sign Up</button>
          </div>
        )}
        {!user && (
          <div>
            <span>Already have an account?</span>
            <button onClick={toggleLogIn}>Log In</button>
          </div>
        )}
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
  )
}

export default LandingPage

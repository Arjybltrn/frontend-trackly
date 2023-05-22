import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import '../styles/landing-page.css'

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
      await auth.signInWithEmailAndPassword(email, password);
      setError(null)
      navigate('/jobs') // redirect to /jobs after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  // connect with Google login
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setError(null)
        navigate('/jobs') //redirect to /jobs after successful login
      })
      .catch((error) => {
        setError(error.message)
      });
  };

  // connect with Facebook login
  const handleFBLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setError(null)
        navigate('/jobs') //redirect to /jobs after successful login
      })
      .catch((error) => {
        setError(error.message)
      });
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
    setIsLogIn(false)
    setError(null)
  };

  const toggleLogIn = () => {
    setIsLogIn(!isLogIn)
    setIsSignUp(false)
    setError(null)
  };

  return (
    <div className="landing-page">
      <div className="forms-section">
        <div className="toggle-buttons">
          {!user && (
            <div>
              <span>Don't have an account?</span>
              <button className='signup-button' onClick={toggleSignUp}>Sign Up</button>
            </div>
          )}
          {!user && (
            

            <div>
              <span>Already have an account?</span>
              <button className='signup-button' onClick={toggleLogIn}>Log In</button>
            </div>
          )}
        </div>

        {/* signup state */}
        {isSignUp && (
          <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <input 
                className='form-field'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                className='form-field'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="signup-button"type="submit">Sign Up</button>
            </form>
          </div>
        )}

        {/* login state */}
        {isLogIn && (
          <div className="form-container">
            <h2>Log In</h2>
            <form onSubmit={handleLogIn}>
              <input
                className='form-field'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='form-field'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" type="submit">Log In</button>
            </form>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <div className="firebase-buttons">

          {/* google login button */}
          <button className="google-button" onClick={handleGoogleLogin}>
            <img className="google-logo" src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c96701d9ca53fae09d146_google.svg" alt="" />
            <span className="text">Continue with Google</span>
          </button>

          {/* facebook login button */}
          <button className="facebook-button"onClick={handleFBLogin}>
            <img className="facebook-logo" src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c960d4839cf20aeafcad2_facebook.svg" alt=""/>
            <span className="text">Continue with Facebook</span>
          </button>

        </div>
      </div>

      <div className="photo-section">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_52ebqe6w.json" background="transparent"  speed="1" loop autoplay></lottie-player>
      </div>
    </div>
  )
}





export default LandingPage

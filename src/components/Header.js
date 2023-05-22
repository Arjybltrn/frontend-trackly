import React from 'react'
import { fbLogin, googleLogin, logout } from '../services/firebase'
import { Link } from 'react-router-dom'
import '../styles/nav.css'

const Header = (props,{ user }) => {
    
  return (
    <header>
      <nav>
        <div className="logo">
          <ul className="nav-links">
          <li><Link to="/jobs"><img src="https://cdn-icons-png.flaticon.com/128/10849/10849305.png" alt="Logo" /></Link></li>
          <li><Link to="/jobs"><h1>Taskly</h1></Link></li>
          </ul>
        </div>
        <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>

            {
                props.user ?
                <>
                    <li> <p>Welcome, {props.user.displayName} </p></li>
                    <li>
                        <img className='profilePhoto' src={props.user.photoURL} alt = {props.user.displayName} />
                    </li>
                <li onClick={logout}>Logout</li>
                </>
                :
                <>
                  <li onClick={ googleLogin }>Sign in with Google</li>
                  <li onClick={ fbLogin }>Sign in with Facebook</li>
                </>
            }
        </ul>
        
      </nav>
      
    </header>
  );
}

export default Header;

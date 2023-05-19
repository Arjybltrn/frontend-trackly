import React from 'react'
import { fbLogin, googleLogin, logout } from '../services/firebase'
import { Link } from 'react-router-dom'
import '../styles/nav.css'

const Header = (props,{ user }) => {
    
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="" alt="Logo" />
        </div>
        <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>

            {
                props.user ?
                <>
                    <li> Welcome,  {props.user.displayName} </li>
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

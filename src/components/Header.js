import React from 'react'
import { fbLogin, googleLogin, logout } from '../services/firebase'
import { Link } from 'react-router-dom'
import '../styles/nav.css'

const Header = (props,{ user }) => {
    
  return (
    <header>
      <nav className='navbar'>
        <div className="logo">
          <ul className="nav-links">
          <li><Link to="/jobs"><img src="https://cdn-icons-png.flaticon.com/128/10849/10849305.png" alt="Logo" /></Link></li>
          <li><Link to="/jobs"><h1>TRACKLY</h1></Link></li>
          </ul>
        </div>
        <ul className="nav-links">
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/jobs">JOBS</Link></li>

            {
                props.user ?
                <>
                    <li> <p>{props.user.displayName} </p></li>
                    <li>
                        <img className='profilePhoto' src={props.user.photoURL} alt = {props.user.displayName} />
                    </li>
                <li onClick={logout}>SIGN OUT</li>
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

import React from 'react';
import { login, logout } from '../services/firebase';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Header = (props) => {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="" alt="Logo" />
        </div>
        <ul className="nav-links">
        <li><Link to="/">About</Link></li>

            {
                props.user ?
                <>
                    <li> Welcome,  {props.user.displayName}</li>
                    <li>
                        <img className='profilePhoto' src={props.user.photoURL} alt = {props.user.displayName} />
                    </li>
                <li onClick={logout}>Logout</li>
                </>
                :
                <li onClick={login}>Sign In</li>
            }
        </ul>
      </nav>
    </header>
  );
}

export default Header;

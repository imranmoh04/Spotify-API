import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav className='navbar'>
            <div className='navabar-title'>
                <Link to="/" className='navbar-name'>Mohid's Spotify</Link>
            </div>
            <div className='navbar-links'>
                <Link to="/" className='nav-link'>Home</Link>
                <Link to="/about" className='nav-link'>About</Link>
                <Link to="/Playlists" className='nav-link'>Playlists</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
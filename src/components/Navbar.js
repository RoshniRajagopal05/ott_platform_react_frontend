import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>🎬 MOOVIX</h2>
      <div>
        <Link to="/signup">SIGNUP</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/change-password" style={{ color: 'white' }}>CHANGE PASSWORD</Link>
        <Link to="/movielisting">MOVIE LISTS</Link>
        <Link to="/mywatchlist">WATCHLISTS</Link>
        <Link to="/watchhistory">WATCH HISTORY</Link>
        

      </div>
    </div>
  );
};

export default Navbar;


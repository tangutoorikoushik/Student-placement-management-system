import * as React from 'react';
const { useContext } = React;
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🚀</span>
          Placement<span className="logo-bold">Hub</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/jobs" className="nav-item">Find Jobs</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-item">Dashboard</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-item admin-badge">Admin Portal</Link>
              )}
              <div className="nav-divider"></div>
              <div className="user-profile">
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

import * as React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content compact">
        <div className="footer-brand">
          <div className="nav-logo">
            <span className="logo-icon">🚀</span>
            Placement<span className="logo-bold">Hub</span>
          </div>
          <p className="footer-tagline">
            Empowering students to achieve their career goals.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Platform</h4>
          <div className="links-row">
            <a href="/jobs">Jobs</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Social & Contact</h4>
          <div className="social-links">
            <a href="#" className="social-icon">Li</a>
            <a href="#" className="social-icon">Tw</a>
            <a href="#" className="social-icon">Ig</a>
          </div>
          <div className="contact-info mt-2">
            <p>📧 support@placementhub.com</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container flex-center">
          <p>&copy; {new Date().getFullYear()} PlacementHub</p>
        </div>
      </div>
    </footer>
  );
}

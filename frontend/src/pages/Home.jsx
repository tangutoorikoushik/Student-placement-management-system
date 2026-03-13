import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero flex-center">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="badge-animated">Now powered by AI ⚡</span>
            <h1>Land Your Dream Job with <span className="text-gradient">PlacementHub</span></h1>
            <p className="hero-subtitle">
              The most advanced placement management system for modern colleges. 
              Connecting ambitious students with global opportunities through data-driven matching.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Now</Link>
              <Link to="/jobs" className="btn btn-outline btn-lg">Browse Opportunities</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">500+</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">12k+</span>
                <span className="stat-label">Placed Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="visual-card main-visual glass-card">
              <div className="card-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="card-body">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="visual-chart mt-4">
                  <div className="bar" style={{height: '60%'}}></div>
                  <div className="bar" style={{height: '80%'}}></div>
                  <div className="bar" style={{height: '40%'}}></div>
                  <div className="bar" style={{height: '90%'}}></div>
                </div>
              </div>
            </div>
            <div className="floating-badge badge-1 glass-card">
              <span className="icon">🏆</span>
              <div>
                <p className="badge-title">Top Placed</p>
                <p className="badge-desc">Amazon • $45k</p>
              </div>
            </div>
            <div className="floating-badge badge-2 glass-card">
              <span className="icon">📈</span>
              <div>
                <p className="badge-title">Live Tracking</p>
                <p className="badge-desc">Real-time status</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding features">
        <div className="container">
          <div className="section-header flex-center">
            <h2 className="text-center">Revolutionizing College Placements</h2>
            <p className="text-center text-muted">A comprehensive ecosystem designed for students, administrators, and recruiters.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon icon-blue">🎯</div>
              <h3>Curated Job Matching</h3>
              <p>Tailored job recommendations based on your unique skill set and academic performance.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon icon-green">📄</div>
              <h3>Automated Resumes</h3>
              <p>Build and host professional resumes that stand out to top-tier recruiters.</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon icon-purple">🔄</div>
              <h3>Real-time Tracking</h3>
              <p>Track your application status from initial screening to the final offer letter.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

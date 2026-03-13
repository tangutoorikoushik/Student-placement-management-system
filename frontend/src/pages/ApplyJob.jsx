import * as React from 'react';
const { useState } = React;
import { useLocation, useNavigate } from 'react-router-dom';
import { applicationsAPI } from '../api/api';
import './Jobs.css';

export default function ApplyJob() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const job = state?.job;

  const [resumeUrl, setResumeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) {
    return (
      <div className="container flex-center section-padding flex-col">
        <h2 className="mb-4">No job selected</h2>
        <button onClick={() => navigate('/jobs')} className="btn btn-primary">Go to Job Board</button>
      </div>
    );
  }

  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await applicationsAPI.apply({
        jobId: job._id,
        resumeUrl
      });
      alert("Application submitted successfully! Redirecting to dashboard...");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container apply-container">
      <div className="job-info-banner glass-card" style={{backgroundColor: 'var(--primary)', color: 'white'}}>
        <span className="badge-animated" style={{backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'}}>Applying for</span>
        <h1 style={{color: 'white', marginBottom: '0.5rem'}}>{job.title}</h1>
        <p style={{fontSize: '1.25rem', opacity: 0.9}}>{job.company} • {job.location}</p>
      </div>

      <div className="apply-card-body glass-card">
        <div className="job-details-overview">
          <h4 className="mb-2" style={{textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--text-muted)'}}>Role Description</h4>
          <p className="text-muted leading-relaxed mb-8">{job.description}</p>
        </div>

        <div className="nav-divider" style={{width: '100%', marginBottom: '2.5rem'}}></div>

        <form onSubmit={handleApply} className="apply-form">
          <div className="form-group mb-6">
            <label>Resume Link (Google Drive, Dropbox, etc.)</label>
            <input 
              type="url"
              required
              placeholder="https://drive.google.com/file/d/..."
              className="search-input"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
            <p style={{fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.5rem'}}>
              Make sure the link is accessible by recruiters.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary btn-lg flex-1"
            >
              {isSubmitting ? 'Processing Application...' : 'Confirm My Application'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn btn-lg"
              style={{backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)'}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

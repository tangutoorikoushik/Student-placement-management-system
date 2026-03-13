import * as React from 'react';
const { useState, useEffect } = React;
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../api/api';
import './Jobs.css';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobsAPI.getAll();
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container jobs-page">
      <header className="jobs-header">
        <h1>Explore Opportunities</h1>
        <p className="text-muted">Discover the perfect role to kickstart your career.</p>
        
        <div className="search-bar-container mt-8">
          <input 
            type="text" 
            placeholder="Search by role, company or keyword..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>

      {loading ? (
        <div className="flex-center section-padding">
           <div className="text-muted">Discovering newest opportunities for you...</div>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.length === 0 ? (
             <div className="col-span-full text-center py-20 text-muted">
               No jobs match your search. Try searching for something else!
             </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} className="job-card glass-card">
                <span className="job-type-badge">Full Time</span>
                <h3>{job.title}</h3>
                <span className="company-name">{job.company}</span>
                
                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
                
                <button 
                  onClick={() => navigate('/apply-job', { state: { job } })}
                  className="btn btn-outline"
                >
                  View & Apply
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

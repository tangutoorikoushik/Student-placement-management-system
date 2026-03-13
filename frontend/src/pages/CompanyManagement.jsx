import * as React from 'react';
const { useState, useEffect } = React;
import { jobsAPI } from '../api/api';
import './Dashboard.css';
import './Jobs.css';

export default function CompanyManagement() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary: '',
    requirements: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobsAPI.getAll();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const jobData = {
        ...newJob,
        requirements: newJob.requirements.split(',').map(r => r.trim()).filter(r => r !== '')
      };
      await jobsAPI.create(jobData);
      setIsModalOpen(false);
      fetchJobs();
      setNewJob({ title: '', company: '', description: '', location: '', salary: '', requirements: '' });
    } catch (err) {
      alert("Failed to create job. Administrator privileges required.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container dashboard-container">
      <div className="dashboard-main">
        <div className="flex-between mb-8">
          <div className="auth-header" style={{textAlign: 'left', margin: 0}}>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-muted">Create and manage job postings for the platform</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-lg"
            style={{padding: '0.75rem 1.5rem'}}
          >
            + Post New Job
          </button>
        </div>

        <div className="content-card glass-card">
          <div className="card-header">
            <h4>Active Job Postings</h4>
            <div className="admin-badge">{jobs.length} Total</div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-muted">Loading job directory...</div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-muted">
              <p>No jobs posted yet. Start by listing a new opportunity.</p>
            </div>
          ) : (
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job._id} className="job-item-admin" style={{padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h3 style={{fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.25rem'}}>{job.title}</h3>
                    <p style={{color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem'}}>{job.company}</p>
                    <p className="text-muted" style={{fontSize: '0.85rem'}}>{job.location} • {job.salary}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="btn btn-sm btn-outline" style={{borderColor: 'var(--primary)', color: 'var(--primary)'}}>Edit</button>
                    <button className="btn btn-sm" style={{backgroundColor: '#fee2e2', color: '#dc2626'}}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-card animate-slide-up" style={{maxWidth: '600px', width: '100%', padding: '2.5rem'}}>
            <div className="auth-header" style={{marginBottom: '2rem'}}>
              <h2>Post a New Job</h2>
              <p>Fill in the details to list a new opportunity</p>
            </div>
            
            <form onSubmit={handleCreateJob} className="auth-form">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Job Title</label>
                  <input 
                    placeholder="e.g. Frontend Developer" 
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input 
                    placeholder="e.g. TechCorp" 
                    value={newJob.company}
                    onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    placeholder="Remote/Office" 
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Salary Range</label>
                  <input 
                    placeholder="e.g. 50k - 80k" 
                    value={newJob.salary}
                    onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <textarea 
                  placeholder="Describe the role and responsibilities..." 
                  style={{minHeight: '120px'}}
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Requirements (comma separated)</label>
                <input 
                  placeholder="React, Node.js, 2yr Experience" 
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" className="btn btn-primary btn-lg flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Create Listing'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-lg flex-1" style={{backgroundColor: '#f3f4f6', color: '#4b5563'}}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

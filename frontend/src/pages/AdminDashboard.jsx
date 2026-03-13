import * as React from 'react';
const { useState, useEffect } = React;
import { Link } from 'react-router-dom';
import { applicationsAPI, jobsAPI } from '../api/api';
import './Dashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pendingApps: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const jobs = await jobsAPI.getAll();
        setStats(prev => ({ ...prev, totalJobs: jobs.data.length }));
        setStats(prev => ({ ...prev, totalApplications: 12, pendingApps: 5 }));
        
        setRecentApplications([
          { _id: '1', student: { name: 'John Doe' }, job: { title: 'Software Engineer', company: 'Google' }, status: 'pending', createdAt: new Date().toISOString() },
          { _id: '2', student: { name: 'Jane Smith' }, job: { title: 'Designer', company: 'Apple' }, status: 'reviewed', createdAt: new Date().toISOString() },
        ]);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setRecentApplications(prev => 
      prev.map(app => app._id === id ? { ...app, status: newStatus } : app)
    );
  };

  return (
    <div className="container dashboard-container">
      <div className="dashboard-main">
        <div className="auth-header" style={{textAlign: 'left', marginBottom: '2rem'}}>
          <h1 className="text-3xl font-bold">Admin Central</h1>
          <p className="text-muted">Manage college placements and track student progress</p>
          <div className="mt-4">
            <Link to="/admin/jobs" className="btn btn-primary" style={{padding: '0.6rem 1.2rem'}}>
              + Post & Manage Jobs
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <p className="label">Total Jobs</p>
            <p className="value" style={{color: 'var(--primary)'}}>{stats.totalJobs}</p>
          </div>
          <div className="stat-card glass-card">
            <p className="label">Total Applications</p>
            <p className="value" style={{color: 'var(--accent)'}}>{stats.totalApplications}</p>
          </div>
          <div className="stat-card glass-card">
            <p className="label">Pending Review</p>
            <p className="value" style={{color: '#f59e0b'}}>{stats.pendingApps}</p>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="content-card glass-card">
          <div className="card-header">
            <h4>Recent Student Applications</h4>
            <div className="admin-badge">Admin View</div>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Job / Company</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{textAlign: 'right'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map(app => (
                  <tr key={app._id}>
                    <td style={{fontWeight: '600'}}>{app.student.name}</td>
                    <td>
                      <div>{app.job.title}</div>
                      <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{app.job.company}</div>
                    </td>
                    <td style={{color: 'var(--text-muted)'}}>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`status-indicator status-${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                        <button 
                          onClick={() => handleUpdateStatus(app._id, 'accepted')}
                          className="btn btn-primary"
                          style={{padding: '0.4rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'var(--accent)'}}
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(app._id, 'rejected')}
                          className="btn btn-outline"
                          style={{padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444'}}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

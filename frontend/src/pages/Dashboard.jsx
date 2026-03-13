import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { applicationsAPI } from '../api/api';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user && user.role === 'student') {
          const res = await applicationsAPI.getStudentApplications();
          setApplications(res.data);
        }
      } catch (err) {
        console.error('Error fetching applications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [user]);

  if (!user) {
    return (
      <div className="container flex-center section-padding">
        <div className="text-muted">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="container dashboard-container">
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="profile-sidebar glass-card">
          <div className="user-info-section">
            <div className="avatar flex-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <span className="role-badge">{user.role}</span>
          </div>

          <div className="profile-actions">
            <Link to="/dashboard" className="sidebar-link active">Overview</Link>
            <Link to="/jobs" className="sidebar-link">Browse Jobs</Link>
            {user.role === 'admin' && (
              <>
                <Link to="/admin" className="sidebar-link">Admin Tracking</Link>
                <Link to="/admin/jobs" className="sidebar-link">Post new job</Link>
              </>
            )}
            <div className="nav-divider"></div>
            <Link to="/profile" className="sidebar-link">Profile Settings</Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <header className="dashboard-header">
            <h2>System Overview</h2>
            <p className="text-muted">Welcome back, {user.name.split(' ')[0]}! Here's what's happening today.</p>
          </header>

          <div className="stats-grid">
            <div className="stat-card glass-card">
              <p className="label">Applications</p>
              <p className="value">{applications.length}</p>
            </div>
            <div className="stat-card glass-card">
              <p className="label">Interviews</p>
              <p className="value">0</p>
            </div>
            <div className="stat-card glass-card">
              <p className="label">Offers</p>
              <p className="value">0</p>
            </div>
          </div>

          <div className="content-card glass-card">
            <div className="card-header">
              <h4>Recent Activity</h4>
              <Link to="/jobs" className="btn-small text-primary">View Jobs</Link>
            </div>
            
            <div className="card-body">
              {loading ? (
                <div className="p-8 text-center text-muted">Loading activity...</div>
              ) : applications.length === 0 ? (
                <div className="p-8 text-center text-muted">
                  No applications yet. Start your journey by applying for your first job!
                  <div className="mt-4">
                    <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map(app => (
                        <tr key={app._id}>
                          <td style={{fontWeight: 600}}>{app.job.title}</td>
                          <td>{app.job.company}</td>
                          <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-indicator status-${app.status}`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

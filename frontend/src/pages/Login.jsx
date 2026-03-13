import * as React from 'react';
const { useState, useContext } = React;
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../api/api';
import { signInWithGoogle } from '../firebase';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const firebaseUser = await signInWithGoogle();
      // Handle backend sync if needed, for now just log in via frontend
      // In a real app, you'd send the firebase ID token to the backend
      login({ 
        name: firebaseUser.displayName, 
        email: firebaseUser.email, 
        role: 'student' 
      }, 'google-auth-token');
      navigate('/dashboard');
    } catch (err) {
      setError('Google Sign-in failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to access your placement dashboard</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button 
            type="button" 
            className="btn btn-google btn-lg" 
            onClick={handleGoogleSignIn}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Continue with Google
          </button>
        </form>

        <div className="form-footer">
          Don't have an account? <Link to="/register">Create one</Link>
          <div className="mt-4 pt-4 border-t" style={{borderTop: '1px solid var(--border)', fontSize: '0.8rem'}}>
            Are you a recruiter? <Link to="/login" style={{color: 'var(--primary)', fontWeight: '600'}}>Sign in as Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

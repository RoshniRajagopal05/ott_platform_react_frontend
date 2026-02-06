import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaCalendarAlt, FaLock, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/glass-landing.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('userPassword');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }

    if (storedPassword) {
      setCurrentPassword(storedPassword);
    }

    // Fetch detailed user information from API
    axios.get('http://127.0.0.1:8000/api/user/', {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => {
        setUserDetails(res.data);
      })
      .catch(err => {
        console.error('Error fetching user details:', err);
      });
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAccountAge = () => {
    if (!userDetails?.date_joined) return 'N/A';
    const joinDate = new Date(userDetails.date_joined);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''}`;
  };

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ paddingTop: '100px', paddingBottom: '100px', display: 'flex', justifyContent: 'center' }}>
        {user && (
          <div className="profile-container" style={{ maxWidth: '600px', width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
            {/* Header with Avatar */}
            <div style={{
              textAlign: 'center',
              paddingBottom: '40px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '40px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: 'white',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                fontWeight: 'bold'
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h1 style={{ color: 'white', fontSize: '32px', margin: '20px 0 10px 0' }}>
                {user.name || 'User'}
              </h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                Member
              </p>
            </div>

            {/* Profile Details */}
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Email */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                  <FaEnvelope style={{ color: '#ff6b6b', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Email Address
                  </span>
                </div>
                <p style={{ color: 'white', fontSize: '16px', margin: '0', paddingLeft: '33px' }}>
                  {user.email || 'N/A'}
                </p>
              </div>

              {/* Username/Full Name */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                  <FaUser style={{ color: '#4ecdc4', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Full Name
                  </span>
                </div>
                <p style={{ color: 'white', fontSize: '16px', margin: '0', paddingLeft: '33px' }}>
                  {user.name || 'N/A'}
                </p>
              </div>

              {/* Current Password */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <FaLock style={{ color: '#f87171', fontSize: '18px' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Current Password
                    </span>
                  </div>
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <p style={{ color: 'white', fontSize: '16px', margin: '0', paddingLeft: '33px', letterSpacing: showPassword ? '1px' : '2px' }}>
                  {showPassword ? currentPassword : '•'.repeat(currentPassword.length || 8)}
                </p>
              </div>

              {/* Account Status */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                  <FaUser style={{ color: '#95e1d3', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Account Status
                  </span>
                </div>
                <p style={{ color: 'white', fontSize: '16px', margin: '0', paddingLeft: '33px' }}>
                  <span style={{ background: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                    Active
                  </span>
                </p>
              </div>

              {/* Account Created Date */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                  <FaCalendarAlt style={{ color: '#fbbf24', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Account Created
                  </span>
                </div>
                <p style={{ color: 'white', fontSize: '16px', margin: '0', paddingLeft: '33px' }}>
                  {userDetails ? formatDate(userDetails.date_joined) : 'Loading...'}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', margin: '5px 0 0 33px', paddingLeft: '0' }}>
                  Member for {getAccountAge()}
                </p>
              </div>

              {/* Last Password Changed */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <FaLock style={{ color: '#f87171', fontSize: '18px', marginTop: '2px' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Last Password Change
                    </span>
                  </div>
                  <p style={{ color: 'white', fontSize: '14px', margin: '0', textAlign: 'right', maxWidth: '280px' }}>
                    {userDetails?.last_password_change ? formatDate(userDetails.last_password_change) : 'Never changed'}
                  </p>
                </div>
              </div>

              {/* Account Type */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                  <FaUser style={{ color: '#c084fc', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Account Type
                  </span>
                </div>
                <p style={{ color: 'white', fontSize: '16px', margin: '0', paddingLeft: '33px' }}>
                  {userDetails?.is_superuser ? 'Administrator' : 'Standard User'}
                </p>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => navigate('/change-password')}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <FaEdit /> Change Password
              </button>

              {/* Back Button at Bottom */}
              <button
                onClick={() => navigate('/landingpage')}
                style={{
                  marginTop: '30px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FaArrowLeft /> Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

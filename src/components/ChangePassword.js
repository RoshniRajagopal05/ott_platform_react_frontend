import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import '../styles/glass-landing.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match!");
      setShowToast(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setToastMessage("You must be logged in to change your password.");
      setToastType('error');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/changepassword/',
        {
          current_password: currentPassword,
          new_password: newPassword
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      setToastMessage("Password changed successfully! Redirecting...");
      setToastType('success');
      setShowToast(true);
      setErrorMessage('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Update password in localStorage
      localStorage.setItem('userPassword', newPassword);

      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userPassword');
        navigate('/login');
      }, 2500);

    } catch (error) {
      console.log("Error response:", error.response?.data);
      setErrorMessage(
        error.response?.data?.detail || 'Failed to update password. Please try again.'
      );
      setShowToast(false);
    }
  };

  return (
    <div className="glass-bg">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '100px', paddingBottom: '100px' }}>
        <form className="change-password-form" onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Change Password</h2>

          {errorMessage && <p className="error" style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '15px' }}>{errorMessage}</p>}

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '16px' }}
              />
              <span onClick={() => setShowCurrent(!showCurrent)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '16px' }}
              />
              <span onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '16px' }}
              />
              <span onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s ease' }}>Update Password</button>
        </form>

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
  );
};

export default ChangePassword;
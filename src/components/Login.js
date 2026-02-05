


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../styles/login.css";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const attemptLogin = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login/', {
      email: email,
      password: password
    })
      .then(response => {
        setErrorMessage('');
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setSuccessMessage('User logged in');

        setTimeout(() => {
          navigate('/landingpage');
        }, 1500);
      })
      .catch(error => {
        setSuccessMessage('');
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to login user. Please try again or contact admin.');
        }
      });
  };

  return (
  <div className="auth-bg auth-login-bg">
    <div className="auth-card">
      <h2 className="signup-title">Login</h2>

      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form className="signup-form" onSubmit={attemptLogin}>
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="signup-button">
          Login
        </button>
      </form>

      <p className="login-link">
        Don't have an account? <Link to="/">Signup</Link>
      </p>
    </div>
  </div>
)};
export default Login;

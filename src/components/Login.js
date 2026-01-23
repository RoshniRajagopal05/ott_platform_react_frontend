


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';


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
        const user = response.data.userid;

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', user);

        setSuccessMessage('User logged in'); 

        setTimeout(() => {
          navigate('/movielisting');
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
  <>
    <Navbar />
    <div className="signup-container">
      <h2 className="signup-title">Login</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form className="signup-form" onSubmit={attemptLogin}>
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onInput={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onInput={(e) => setPassword(e.target.value)} />
        <button type="submit" className="signup-button">Login</button>
      </form>

      <p className="login-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  </>
  );
};

export default Login;




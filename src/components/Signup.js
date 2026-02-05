import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

function Signup() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
function registerUser(event){
    event.preventDefault(); 

    if (password !== passwordConf) {
        setErrorMessage("Passwords do not match.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password,
    };

    axios.post('http://127.0.0.1:8000/api/signup/', user)
        .then(response => {
            setErrorMessage('');
            console.log("Successfully signed up");
            navigate('/login');
        })
        .catch(error => {
            if (error.response?.data?.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else {
                setErrorMessage('Failed to connect to API');
            }
        });
}

return (
    <div className="auth-bg">
  <div className="auth-card">
    
    <h2 className="signup-title">Sign Up</h2>

    {errorMessage && (
      <div className="alert alert-danger">{errorMessage}</div>
    )}

    <form className="signup-form">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} required />

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <button className="signup-button" onClick={registerUser}>
        Sign Up
      </button>
    </form>
  </div>
</div>
    );
}

export default Signup;

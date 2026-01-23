import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

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
    <>
    <Navbar />
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
      <form className="signup-form">
        <input type="text" placeholder="Name" required value={name} onInput={(event) => setName(event.target.value)} />
        <input type="email" placeholder="E-mail" required value={email} onInput={(event) => setEmail(event.target.value)} />
        <input type="password" placeholder="Password" required value={password} onInput={(event) => setPassword(event.target.value)} />
        <input type="password" placeholder="Confirm Password" required value={passwordConf} onInput={(event) => setPasswordConf(event.target.value)} />
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button type="submit" className="signup-button" onClick={registerUser}>Sign Up</button>
      </form>
    </div>
    </>
  );
}

export default Signup;

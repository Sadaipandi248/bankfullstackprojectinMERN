import React, { useState } from "react";
import axios from "axios";
import "./badbank.css";
import Deposite from './deposit.js';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const login = () => {
    if (email && password) {
      console.log("login", `Email: ${email}, Password: ${password}`);

      axios.post('http://localhost:4000/Login', {
        email: email,
        password: password
      }).then((response) => {
        if (response.data.message === 'Login successful') {
          navigate("/Deposite"); 
        } else {
          setErrorMessage('Authentication failed');
        }
      }).catch((error) => {
        console.error('Error:', error);
      });

      setEmail('');
      setPassword('');
    }
  }

  return (
    <>
      <div className="login">
        <h1>Login Page</h1>
        <div className="input">
          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          /><br />
        </div>

        <div className="input">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="button" className="button" onClick={login}>Login</button>
      </div>
    </>
  );
}

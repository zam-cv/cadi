// src/pages/SignUp.tsx
import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { signUp as signUpService } from '../services/authService';

const SignUp: React.FC<{ switchToLogin: () => void }> = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signUpService(username, password);
      auth.login(response.token);
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <form className="DisplayCMenu" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <label>Username</label>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />

      <label>Password</label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />

      <button type="submit">Sign Up</button>
      <p>Already have an account?</p>
      <button type="button" className="signup-button" onClick={switchToLogin}>Login</button>
    </form>
  );
};

export default SignUp;

// // src/pages/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Importa useNavigate
// import './Login.css';
// import { useAuth } from '../context/AuthContext';
// import { login as loginService } from '../services/authService';

// const Login: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const auth = useAuth();
//   const navigate = useNavigate(); // Usa useNavigate

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await loginService(username, password);
//       auth.login(response.token);
//       navigate('/dashboard'); // Redirige al usuario al dashboard después de un login exitoso
//     } catch (err) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <form className="DisplayCMenu" onSubmit={handleSubmit}>
//       <h1>Login</h1>
//       {error && <p className="error">{error}</p>}
//       <label>Username</label>
//       <input 
//         type="text" 
//         value={username} 
//         onChange={(e) => setUsername(e.target.value)} 
//         required 
//       />

//       <label>Password</label>
//       <input 
//         type="password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//         required 
//       />

//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import SignUp from './SignUp';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginService(username, password);
      auth.login(response.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const switchToSignUp = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return isLogin ? (
    <form className="DisplayCMenu" onSubmit={handleSubmit}>
      <h1>Login</h1>
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

      <button type="submit">Login</button>
      <p>Don't have an account?</p>
      <button type="button" className="signup-button" onClick={switchToSignUp}>Sign Up</button>
    </form>
  ) : (
    <SignUp switchToLogin={switchToLogin} />
  );
};

export default Login;

// Login.js
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../css/login.css';
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import axios from 'axios'; // Import axios library
import Register from './register'; // Import the Register component

const Login = ({ onClose, onLoginSuccess }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.222.145:8000/api/login/', {
        username,
        password,
      });
      console.log(response.data); // Handle the response from the backend
      onLoginSuccess(response.data.username)
      // Show success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You are now logged in.',
      });
    } catch (error) {
      console.error('Error logging in:', error);
      // Show error alert using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your credentials and try again.',
      });
    }
  };

  return (
    <div className={`loginContainer ${showRegister ? 'hidden' : ''}`}>
      {!showRegister ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='username' >
              <label><FaUser/></label>
              <input
                type="text"
                placeholder='Username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='password'>
              <label><MdLock/></label>
              <input
                type="password"
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
            <div className='register-link'>
              <span>Don't have an account yet? </span>
              <button onClick={toggleRegister}>Register Here</button>
            </div>
          </form>
        </>
      ) : (
        <Register />
      )}
    </div>
  );
};

export default Login;

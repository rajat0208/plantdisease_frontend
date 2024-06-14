// Register.js
import React, { useState } from 'react';
import '../css/register.css';
import axios from 'axios'; // Import axios for making HTTP requests
import Swal from 'sweetalert2'; // Import SweetAlert2

const Register = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.222.145:8000/api/register/', {
        email,
        password,
        username, // Include username in the request
      });

      console.log('Registration successful:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Register Successful!',
        text: 'You are now registered.',
      });
      // Optionally, you can redirect the user to another page or show a success message
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please check your credentials and try again.',
      });
    }
  };

  return (
    <div className='registerContainer'>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div className='email'>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='password'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='username'>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

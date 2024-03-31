// Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import '../../css/dashboard.css';
import Blog from './home';
import Detect from '../detect';
import Login from '../../auth/login';
import Register from '../../auth/register';
import "../../index.css"
import { TiArrowSortedDown } from "react-icons/ti";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for tracking login status
  const [username, setUsername] = useState(''); // Add state for storing username
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false); // State to track logout dropdown menu
  const modalRef = useRef(null);

  const toggleLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  }

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowLoginModal(false);
        setShowRegisterModal(false);
      }
    };

    if (showLoginModal || showRegisterModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showLoginModal, showRegisterModal]);

  // Function to handle successful login
  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true); // Set login status to true
    setUsername(username); // Set username
    setShowLoginModal(false); // Close the login modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Clear login status
    setUsername(''); // Clear username
    setShowLogoutDropdown(false); // Close logout dropdown
  };

  return (
    <div className='dashboard-container'>
      <div className='header'>
        <div className="top">
          <div className={selectedTab === 'home' ? 'active' : ''}>
            <button onClick={() => setSelectedTab('home')}>Home</button>
          </div>
          <div className={selectedTab === 'detect' ? 'active' : ''}>
            <button onClick={() => setSelectedTab('detect')}>Detect</button>
          </div>
          {/* Conditionally render welcome message with username if logged in */}
        </div>
        {isLoggedIn && (
            <div className="dropdown">
              <button onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}>
                <TiArrowSortedDown />
              </button>
              {showLogoutDropdown && (
                <div className="dropdown-content">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        <div className='login-container'>
        {isLoggedIn ? (
            <div className='loginBtn'>
              <div className='welcomeMsg'>Welcome, {username}<button><TiArrowSortedDown /></button></div>
            </div>
          ) : (
            <div className='loginBtn'>
              <button onClick={toggleLoginModal}>Login</button>
            </div>
          )}
        </div>
      </div>
      <div className='main-content'>
        {/* Main content based on selected tab */}
        {selectedTab === 'home' && <Blog />}
        {selectedTab === 'detect' && <Detect />}
      </div>
      {(showLoginModal || showRegisterModal) && (
        <div className='modal' ref={modalRef}>
          {/* Pass handleLoginSuccess function to Login component */}
          {showLoginModal && <Login onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}
          {showRegisterModal && <Register onClose={handleCloseModal} />}
          {/*Render signup */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

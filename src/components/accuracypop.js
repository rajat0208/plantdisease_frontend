import { useEffect,useRef } from 'react';
import React  from 'react';
import '../css/accuracypop.css'

const AccuracyPopup = ({ onClose }) => {
    const popupRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose(); // Close popup if clicked outside
          }
        };
    
        window.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          window.removeEventListener('mousedown', handleClickOutside);
        };
      }, [onClose]);
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <h2 className="popup-title">Accuracy Graph</h2>
          <span className="popup-close-btn" onClick={onClose}>Close</span>
        </div>
        <div className="popup-body">
          {/* Add content for accuracy graph */}
          {/* You can display the accuracy data or graph here */}
          {/* Example: <p>Accuracy: 90%</p> */}
        </div>
        {/* Add footer content if needed */}
      </div>
    </div>
  );
};

export default AccuracyPopup;

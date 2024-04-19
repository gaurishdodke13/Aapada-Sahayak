// AlertForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './SendAlert.css';

const SendAlert = () => {
  const [location, setLocation] = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the alert to the backend
      await axios.post('http://localhost:3001/api/alerts', {
        location,
        disasterType,
        alertMessage,
      });

      // Reset form fields after successful submission
      setLocation('');
      setDisasterType('');
      setAlertMessage('');

      console.log('Alert sent successfully');
    } catch (error) {
      console.error('Error sending alert:', error);
    }
  };

  return (
    <div className="alert-container-container">

      <div className="alert-container">
        <h2>Alert Form</h2>
        <form onSubmit={handleSubmit}>
          <label className="alert-label">
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="alert-input"
            />
          </label>

          <label className="alert-label">
            Disaster Type:
            <input
              type="text"
              value={disasterType}
              onChange={(e) => setDisasterType(e.target.value)}
              className="alert-input"
            />
          </label>

          <label className="alert-label">
            Alert Message:
            <textarea
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              className="alert-textarea"
            />
          </label>

          <button type="submit" className="alert-button">
            Send Alert
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendAlert;

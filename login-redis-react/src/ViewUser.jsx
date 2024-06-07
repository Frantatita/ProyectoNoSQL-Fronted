import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewUser.css'

const ViewUser = () => {
  const [usernames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usernames');
        setUsernames(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Lista de Usuarios</h2>
      {loading ? (
        <p className="loading-indicator">Loading...</p>
      ) : (
        <ul className="user-list">
          {usernames.map((username, index) => (
            <li key={index} className="user-list-item">{username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewUser;

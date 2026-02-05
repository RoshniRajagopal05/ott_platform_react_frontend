import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/glass-landing.css';

const WatchHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://127.0.0.1:8000/api/watchhistory/", {
        headers: {
          Authorization: `Token ${token}`,
        }
      })
      .then(res => {
        setHistory(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error("Error fetching watch history:", err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ paddingTop: '100px' }}>
        <button className="back-btn" onClick={() => navigate('/landingpage')}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Watch History</h1>

        <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {history.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center', fontSize: '18px', gridColumn: '1 / -1' }}>No watch history yet.</p>
          ) : (
            history.map(item => (
              <div key={item.id} className="glass-movie-card">
                <img
                  src={`http://127.0.0.1:8000/${item.movie.thumbnail}`}
                  alt={item.movie.title}
                />
                <div className="movie-info">
                  <div className="movie-title">{item.movie.title}</div>
                  <div className="movie-meta">
                    <span>Watched on: {new Date(item.watched_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchHistoryPage;

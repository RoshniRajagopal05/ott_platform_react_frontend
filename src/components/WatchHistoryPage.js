import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaEye, FaStar } from 'react-icons/fa';
import '../styles/glass-landing.css';

const WatchHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [aggregatedHistory, setAggregatedHistory] = useState([]);
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
        console.log('Watch history data:', res.data);
        setHistory(res.data);
        
        // Aggregate movies - group by movie_id and get count and latest watch date
        const aggregated = {};
        res.data.forEach(item => {
          if (aggregated[item.movie.id]) {
            aggregated[item.movie.id].count += 1;
            aggregated[item.movie.id].lastWatched = item.watched_at;
          } else {
            aggregated[item.movie.id] = {
              ...item,
              count: 1,
              lastWatched: item.watched_at
            };
          }
        });
        setAggregatedHistory(Object.values(aggregated).sort((a, b) => 
          new Date(b.lastWatched) - new Date(a.lastWatched)
        ));
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

  const formatWatchDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ paddingTop: '100px' }}>
        <button className="back-btn" onClick={() => navigate('/landingpage')}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '10px', fontSize: '36px', fontWeight: 'bold' }}>
          Watch History
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
          {aggregatedHistory.length} {aggregatedHistory.length === 1 ? 'movie' : 'movies'} watched
        </p>

        {aggregatedHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <FaClock style={{ fontSize: '64px', color: 'rgba(255, 255, 255, 0.3)', marginBottom: '20px' }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px' }}>No watch history yet</p>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginBottom: '20px' }}>Start watching movies to build your history</p>
            <button
              onClick={() => navigate('/landingpage')}
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(139, 92, 246, 0.8))',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 1), rgba(139, 92, 246, 1))';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(139, 92, 246, 0.8))';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Watch Now
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {aggregatedHistory.map((item) => (
              <div 
                key={`${item.movie.id}`}
                onClick={() => navigate(`/moviedetails/${item.movie.id}`)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(168, 85, 247, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                }}
              >
                {/* Movie Thumbnail */}
                <div style={{
                  position: 'relative',
                  paddingTop: '140%',
                  overflow: 'hidden',
                  background: 'rgba(0, 0, 0, 0.3)'
                }}>
                  <img
                    src={`http://127.0.0.1:8000${item.movie.thumbnail}`}
                    alt={item.movie.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Movie Info Section */}
                <div style={{
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flex: 1
                }}>
                  {/* Title */}
                  <div style={{
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {item.movie.title}
                  </div>

                  {/* Rating */}
                  {item.movie.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaStar style={{ color: '#fbbf24', fontSize: '13px' }} />
                      <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: '600' }}>
                        {parseFloat(item.movie.rating).toFixed(1)}/10
                      </span>
                    </div>
                  )}

                  {/* Watch Stats - Below content without overlapping */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    flexWrap: 'wrap'
                  }}>
                    {/* Watch Count Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(139, 92, 246, 0.5))',
                      padding: '6px 10px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: '600'
                    }}>
                      <FaEye style={{ fontSize: '11px' }} />
                      {item.count} {item.count === 1 ? 'watch' : 'watches'}
                    </div>

                    {/* Last Watched Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.5), rgba(6, 182, 212, 0.5))',
                      padding: '6px 10px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: '600'
                    }}>
                      <FaClock style={{ fontSize: '11px' }} />
                      {formatWatchDate(item.lastWatched)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistoryPage;

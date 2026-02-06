







import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPlay, FaHeart, FaShare, FaStar, FaCalendarAlt, FaClock, FaFilm } from 'react-icons/fa';
import '../styles/glass-landing.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://127.0.0.1:8000/api/moviedetail/${id}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching movie:", err);
        setLoading(false);
      });
  }, [id]);

  const handleWatchlist = () => {
    const token = localStorage.getItem("token");
    axios.post("http://127.0.0.1:8000/api/watchlist/", {
      movie_id: movie.id,
    }, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        setIsInWatchlist(true);
        console.log("Added to watchlist");
      })
      .catch(error => {
        console.error("Error adding to watchlist:", error);
      });
  };

  const handleWatch = () => {
    // Scroll to video player
    const videoElement = document.getElementById('movie-video-player');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth' });
      videoElement.play();
    }
  };

  if (loading) {
    return (
      <div className="glass-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="glass-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Movie not found</div>
      </div>
    );
  }

  const rating = movie.rating || 8.5;
  const duration = movie.duration || 120;
  const year = movie.release_year || 2024;
  const genre = movie.genre || 'Action';

  return (
    <div className="glass-bg" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.8)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.6)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px 20px' }}>
        {/* Hero Section with Poster and Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 1.4fr', gap: '60px', alignItems: 'start', marginBottom: '60px' }}>
          {/* Movie Poster - Left Side */}
          <div style={{
            perspective: '1000px'
          }}>
            <style>{`
              @keyframes slideInDown {
                from {
                  opacity: 0;
                  transform: translateY(-20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes pulse-button {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }
            `}</style>
            <div style={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(102, 126, 234, 0.15)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              aspectRatio: '9/13'
            }}
            >
              <img
                src={`http://127.0.0.1:8000${movie.thumbnail}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Movie Details - Right Side */}
          <div style={{ animation: 'slideInDown 0.6s ease-out' }}>
            {/* Title */}
            <h1 style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              lineHeight: '1.2',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>
              {movie.title}
            </h1>

            {/* Rating and Meta Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
              flexWrap: 'wrap'
            }}>
              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <FaStar style={{ color: '#fbbf24', fontSize: '16px' }} />
                <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                  {rating}/10
                </span>
              </div>

              {/* Year */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <FaCalendarAlt style={{ color: '#4ecdc4', fontSize: '14px' }} />
                <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                  {year}
                </span>
              </div>

              {/* Duration */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <FaClock style={{ color: '#ff6b6b', fontSize: '14px' }} />
                <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                  {duration} min
                </span>
              </div>

              {/* Genre */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <FaFilm style={{ color: '#c084fc', fontSize: '14px' }} />
                <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                  {genre}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '40px',
              maxHeight: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {movie.description}
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              marginBottom: '30px'
            }}>
              {/* Watch Button */}
              <button
                onClick={handleWatch}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  color: 'white',
                  padding: '16px 40px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
              >
                <FaPlay /> Watch Now
              </button>

              {/* Watchlist Button */}
              <button
                onClick={handleWatchlist}
                disabled={isInWatchlist}
                style={{
                  background: isInWatchlist ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${isInWatchlist ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
                  color: isInWatchlist ? '#10b981' : 'white',
                  padding: '16px 40px',
                  borderRadius: '10px',
                  cursor: isInWatchlist ? 'default' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  opacity: isInWatchlist ? 1 : 0.9
                }}
                onMouseEnter={(e) => {
                  if (!isInWatchlist) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isInWatchlist) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <FaHeart /> {isInWatchlist ? 'Added' : 'Watchlist'}
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '16px 40px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '15px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          marginBottom: '40px'
        }}>
          <h2 style={{ color: 'white', marginTop: '0', marginBottom: '20px', fontSize: '20px' }}>
            Now Playing
          </h2>
          <video
            id="movie-video-player"
            controls
            style={{
              width: '100%',
              borderRadius: '10px',
              background: '#000',
              maxHeight: '600px'
            }}
          >
            <source src={`http://127.0.0.1:8000${movie.video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Additional Info Section */}
        {(movie.director || movie.cast) && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '15px',
            padding: '30px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {movie.director && (
                <div>
                  <h3 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Director
                  </h3>
                  <p style={{ color: 'white', fontSize: '16px', margin: '0' }}>
                    {movie.director}
                  </p>
                </div>
              )}
              {movie.cast && (
                <div>
                  <h3 style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Cast
                  </h3>
                  <p style={{ color: 'white', fontSize: '16px', margin: '0' }}>
                    {movie.cast}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;



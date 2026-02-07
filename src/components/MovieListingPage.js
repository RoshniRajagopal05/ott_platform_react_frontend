



import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import Toast from './Toast';
import '../styles/glass-landing.css';

const MovieListingPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [toast, setToast] = useState(null);
  const [watchlistedMovies, setWatchlistedMovies] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:8000/api/movies/', {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(res => {
        setMovies(res.data);
        setFilteredMovies(res.data);
      })
      .catch(err => {
        console.error("Error fetching movies:", err);
      });

    // Fetch watchlist to mark which movies are already watchlisted
    axios.get('http://localhost:8000/api/watchlist/', {
      headers: { 'Authorization': `Token ${token}` }
    })
      .then(res => {
        const watchlistedIds = new Set(res.data.map(item => item.movie.id));
        setWatchlistedMovies(watchlistedIds);
      })
      .catch(err => {
        console.error("Error fetching watchlist:", err);
      });
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchText, movies]);

  // Function to record watch history when a movie card is clicked
  function handleMovieClick(movie) {
    const token = localStorage.getItem("token");

    axios.post("http://127.0.0.1:8000/api/watchhistory/", {
      movie_id: movie.id,
    }, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      console.log("Movie added to watch history:", response.data);
    })
    .catch(error => {
      console.error("Error adding movie to watch history:", error);
    });
  }

  function addToWatchlist(movie) {
    const token = localStorage.getItem("token");

    axios.post("http://127.0.0.1:8000/api/watchlist/", {
      movie: movie.id,
    }, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (response.data.action === 'removed') {
        setToast({ message: `Removed "${movie.title}" from watchlist`, type: 'info' });
        setWatchlistedMovies(prev => {
          const updated = new Set(prev);
          updated.delete(movie.id);
          return updated;
        });
      } else {
        setToast({ message: `"${movie.title}" added to watchlist`, type: 'success' });
        setWatchlistedMovies(new Set([...watchlistedMovies, movie.id]));
      }
    })
    .catch(error => {
      console.error("Error adding to watchlist:", error);
      setToast({ message: "Failed to update watchlist", type: 'error' });
    });
  }

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ marginTop: '20px' }}>
        <button className="back-btn" onClick={() => navigate('/landingpage')}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1 className="movie-heading" style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>All Movies</h1>

        <div className="search-container" style={{ margin: '20px 0', position: 'relative' }}>
          <FaSearch className="search-icon" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.8)', fontSize: '18px', zIndex: 10 }} />
          <input
            type="text"
            placeholder="Search movies..."
            className="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 15px 15px 50px',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              backdropFilter: 'blur(10px)',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', group: 'hover' }} className="glass-movie-card" onClick={() => handleMovieClick(movie)}>
                <Link to={`/moviedetails/${movie.id}`} className="movie-link" style={{ textDecoration: 'none' }}>
                  <img
                    src={`http://127.0.0.1:8000${movie.thumbnail}`}
                    alt={movie.title}
                    className="movie-thumbnail"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div className="movie-info">
                    <div className="movie-title">{movie.title}</div>
                  </div>
                </Link>

                {/* Watchlist Button - Positioned at Bottom with Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%)',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button
                    className="watchlist-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWatchlist(movie);
                    }}
                    style={{
                      flex: 1,
                      background: watchlistedMovies.has(movie.id) 
                        ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.8), rgba(59, 130, 246, 0.8))'
                        : 'linear-gradient(135deg, rgba(168, 85, 247, 0.7), rgba(139, 92, 246, 0.7))',
                      border: '1.5px solid rgba(255, 255, 255, 0.4)',
                      color: 'white',
                      padding: '12px 16px',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '700',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: watchlistedMovies.has(movie.id)
                        ? '0 8px 32px rgba(34, 211, 238, 0.3)'
                        : '0 8px 32px rgba(168, 85, 247, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = watchlistedMovies.has(movie.id)
                        ? '0 12px 40px rgba(34, 211, 238, 0.5)'
                        : '0 12px 40px rgba(168, 85, 247, 0.5)';
                      e.target.style.background = watchlistedMovies.has(movie.id)
                        ? 'linear-gradient(135deg, rgba(34, 211, 238, 1), rgba(59, 130, 246, 1))'
                        : 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(139, 92, 246, 0.9))';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = watchlistedMovies.has(movie.id)
                        ? '0 8px 32px rgba(34, 211, 238, 0.3)'
                        : '0 8px 32px rgba(168, 85, 247, 0.3)';
                      e.target.style.background = watchlistedMovies.has(movie.id)
                        ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.8), rgba(59, 130, 246, 0.8))'
                        : 'linear-gradient(135deg, rgba(168, 85, 247, 0.7), rgba(139, 92, 246, 0.7))';
                    }}
                  >
                    <FaHeart style={{ fontSize: '15px' }} />
                    {watchlistedMovies.has(movie.id) ? '✓ Added' : '+ Watchlist'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>No movies found.</p>
          )}
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MovieListingPage;


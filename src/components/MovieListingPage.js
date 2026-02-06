



import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import '../styles/glass-landing.css';

const MovieListingPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
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
      movie_id: movie.id,
    }, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      alert(`Added "${movie.title}" to watchlist`);
    })
    .catch(error => {
      console.error("Error adding to watchlist:", error);
      alert("Failed to add to watchlist");
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
          <FaSearch className="search-icon" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'white' }} />
          <input
            type="text"
            placeholder="Search movies..."
            className="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 15px 15px 45px',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>

        <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="glass-movie-card" onClick={() => handleMovieClick(movie)}>
                <Link to={`/moviedetails/${movie.id}`} className="movie-link" style={{ textDecoration: 'none' }}>
                  <img
                    src={`http://127.0.0.1:8000/${movie.thumbnail}`}
                    alt={movie.title}
                    className="movie-thumbnail" />
                  <div className="movie-info">
                    <div className="movie-title">{movie.title}</div>
                  </div>
                </Link>

                <button
                  className="watchlist-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWatchlist(movie);
                  }}
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    marginTop: '10px'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
                >
                  ➕ Add to Watchlist
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieListingPage;


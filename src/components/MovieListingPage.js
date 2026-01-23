



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Navbar from './Navbar';

const MovieListingPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
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
    const token = localStorage.getItem("authToken");

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
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    // Prevent duplicates
    if (!storedWatchlist.find(m => m.id === movie.id)) {
      const updatedWatchlist = [...storedWatchlist, movie];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      alert(`Added "${movie.title}" to watchlist`);
    } else {
      alert(`"${movie.title}" is already in your watchlist`);
    }
  }

  return (
    <>
    <Navbar />
    <div className="movie-listing-container">
      <h1 className="movie-heading">MOVIE LISTS</h1>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search movies..."
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} />
      </div>

      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
              <Link to={`/moviedetails/${movie.id}`} className="movie-link">
                <img
                  src={`http://127.0.0.1:8000/${movie.thumbnail}`}
                  alt={movie.title}
                  className="movie-thumbnail" />
                <h4 className="movie-title">{movie.title}</h4>
              </Link>

              <button
                className="watchlist-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWatchlist(movie);
                } }
              >
                ➕ Add to Watchlist
              </button>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div></>
  );
};

export default MovieListingPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';

// const MovieListingPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   // 🔐 Redirect if not logged in
//   useEffect(() => {
//     const user = localStorage.getItem('loggedInUser');
//     if (!user) {
//       // If no signup data exists, redirect to signup
//       const signedUpUser = localStorage.getItem('signedUpUser');
//       if (!signedUpUser) navigate('/signup');
//       else navigate('/login');
//     }
//   }, [navigate]);

//   // 🔃 Fetch movies from backend
//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/movies/')
//       .then(res => setMovies(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // 🔍 Search logic
//   const filteredMovies = movies.filter(movie =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="movie-listing-container">
//       <h1 className="movie-heading">MOVIE LISTS</h1>

//       <div className="search-container">
//         <FaSearch className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search movies..."
//           className="search-bar"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className="movie-grid">
//         {filteredMovies.map((movie) => (
//           <div key={movie.id} className="movie-card">
//             <Link to={`/moviedetails/${movie.id}`} className="movie-link">
//               <img
//                 src={`http://127.0.0.1:8000${movie.thumbnail}`}
//                 alt={movie.title}
//                 className="movie-thumbnail"
//               />
//               <h4 className="movie-title">{movie.title}</h4>
//             </Link>
//             <Link to={`/mywatchlist`} className="watchlist-button">
//               ➕ Add to Watchlist
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieListingPage;







import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const MyWatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    setWatchlist(storedWatchlist);

    // 🔃 Fetch full movie details based on stored IDs
    const fetchMovies = async () => {
      try {
        const responses = await Promise.all(
          storedWatchlist.map(id =>
            axios.get(` http://127.0.0.1:8000/api/watchlist/${id}/`)
          )
        );
        setMovies(responses.map(res => res.data));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    if (storedWatchlist.length > 0) {
      fetchMovies();
    }
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter(movieId => movieId !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <>
    <Navbar />
    <div className="watchlist-container">
      <h1 className="watchlist-heading">My Watchlist</h1>

      {movies.length === 0 ? (
        <p className="no-movies">No movies added to watchlist.</p>
      ) : (
        <div className="card-grid">
          {movies.map(movie => (
            <div key={movie.id} className="card">
              <Link to={`/moviedetails/${movie.id}`}>
                <img
                  src={`http://127.0.0.1:8000${movie.thumbnail}`}
                  alt={movie.title}
                  className="movie-thumbnail" />
                <h4 className="movie-title">{movie.title}</h4>
              </Link>
              <button
                className="remove-button"
                onClick={() => removeFromWatchlist(movie.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div></>
  );
};

export default MyWatchlistPage;





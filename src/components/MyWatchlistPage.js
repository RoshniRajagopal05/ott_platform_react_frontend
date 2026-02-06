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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import '../styles/glass-landing.css';

const MyWatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:8000/api/watchlist/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => setWatchlist(res.data))
        .catch(err => console.error(err));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const removeFromWatchlist = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/watchlist/`, {
      data: { id },
      headers: { Authorization: `Token ${token}` }
    })
      .then(() => {
        setWatchlist(watchlist.filter(item => item.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ paddingTop: '100px' }}>
        <button className="back-btn" onClick={() => navigate('/landingpage')}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>My Watchlist</h1>

        <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {watchlist.length > 0 ? (
            watchlist.map((item) => (
              <div key={item.id} className="glass-movie-card">
                <Link to={`/moviedetails/${item.movie.id}`} style={{ textDecoration: 'none' }}>
                  <img
                    src={`http://127.0.0.1:8000/${item.movie.thumbnail}`}
                    alt={item.movie.title}
                  />
                  <div className="movie-info">
                    <div className="movie-title">{item.movie.title}</div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  style={{
                    background: 'rgba(255, 0, 0, 0.7)',
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
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.9)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.7)'}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'white', textAlign: 'center', fontSize: '18px' }}>Your watchlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWatchlistPage;





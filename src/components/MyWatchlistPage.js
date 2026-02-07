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
import { FaArrowLeft, FaHeart, FaStar } from 'react-icons/fa';
import Toast from './Toast';
import '../styles/glass-landing.css';

const MyWatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchlist();
  }, [navigate]);

  const fetchWatchlist = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:8000/api/watchlist/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => {
          console.log('Watchlist data:', res.data);
          // Deduplicate movies by movie ID and keep the first entry
          const uniqueMovies = {};
          res.data.forEach(item => {
            if (!uniqueMovies[item.movie.id]) {
              uniqueMovies[item.movie.id] = item;
            }
          });
          setWatchlist(Object.values(uniqueMovies));
        })
        .catch(err => {
          console.error('Error fetching watchlist:', err);
          if (err.response && err.response.status === 401) {
            navigate('/login');
          }
        });
    } else {
      navigate('/login');
    }
  };

  const removeFromWatchlist = (watchlistId, movieTitle) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/watchlist/`, {
      data: { id: watchlistId },
      headers: { Authorization: `Token ${token}` }
    })
      .then(() => {
        setWatchlist(watchlist.filter(item => item.id !== watchlistId));
        setToast({ message: `Removed "${movieTitle}" from watchlist`, type: 'info' });
      })
      .catch(err => {
        console.error('Error removing from watchlist:', err);
        setToast({ message: 'Failed to remove from watchlist', type: 'error' });
      });
  };

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ paddingTop: '100px' }}>
        <button className="back-btn" onClick={() => navigate('/landingpage')}>
          <FaArrowLeft /> Back to Home
        </button>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '10px', fontSize: '36px', fontWeight: 'bold' }}>My Watchlist</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
          {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
        </p>

        {watchlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <FaHeart style={{ fontSize: '64px', color: 'rgba(255, 255, 255, 0.3)', marginBottom: '20px' }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px' }}>Your watchlist is empty</p>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginBottom: '20px' }}>Add movies from the listing page to get started</p>
            <button
              onClick={() => navigate('/movielisting')}
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
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {watchlist.map((item) => (
              <div key={item.id} style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden' }} className="glass-movie-card">
                <Link to={`/moviedetails/${item.movie.id}`} style={{ textDecoration: 'none' }}>
                  <img
                    src={`http://127.0.0.1:8000${item.movie.thumbnail}`}
                    alt={item.movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="movie-info">
                    <div className="movie-title">{item.movie.title}</div>
                    {item.movie.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                        <FaStar style={{ color: '#fbbf24', fontSize: '12px' }} />
                        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                          {parseFloat(item.movie.rating).toFixed(1)}/10
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Remove Button with Glassmorphism */}
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
                    onClick={() => removeFromWatchlist(item.id, item.movie.title)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(220, 38, 38, 0.7))',
                      border: '1.5px solid rgba(255, 255, 255, 0.3)',
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
                      boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 40px rgba(239, 68, 68, 0.5)';
                      e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.3)';
                      e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(220, 38, 38, 0.7))';
                    }}
                  >
                    −  Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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

export default MyWatchlistPage;





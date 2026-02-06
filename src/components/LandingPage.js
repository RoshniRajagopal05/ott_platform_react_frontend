
// import React from 'react';
// // import movies from './data/MovieData'; // Import full movie list
// import MovieCard from './MovieCard';
// import Navbar from './Navbar';

// const LandingPage = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="landing-page">
//         <div className="movie-grid">
//           {/* Show only first 6 movies */}
//           {movies.slice(0, 6).map(movie => (
//             <MovieCard key={movie.id} title={movie.title} thumbnail={movie.thumbnail} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;





















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/glass-landing.css';

// const LandingPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/movies/')
//       .then(res => setMovies(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="glass-bg">

//       {/* 🍔 Hamburger */}
//       <div className="hamburger" onClick={() => setSidebarOpen(true)}>
//         ☰
//       </div>

//       {/* 📂 Sidebar */}
//       <div className={`glass-sidebar ${sidebarOpen ? 'open' : ''}`}>
//         <span className="close-btn" onClick={() => setSidebarOpen(false)}>×</span>
//         <h3>MOOVIX</h3>
//         <p>Profile</p>
//         <p>Watchlist</p>
//         <p>History</p>
//         <p>Logout</p>
//       </div>

//       {/* 🧊 Main Glass Panel */}
//       <div className="glass-panel">
//         <h2 className="welcome-text">Welcome back 🍿</h2>

//         <h3 className="section-title">Recommended Movies</h3>

//         <div className="glass-movie-row">
//           {movies.slice(0, 6).map(movie => (
//             <div key={movie.id} className="glass-movie-card">
//               <img
//                 src={`http://127.0.0.1:8000${movie.thumbnail}`}
//                 alt={movie.title}
//               />
//               <p>{movie.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default LandingPage;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaSearch, FaHeart, FaHistory, FaCog, FaSignOutAlt, FaStar, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import '../styles/glass-landing.css';

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movies
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:8000/api/movies/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => setMovies(res.data))
        .catch(err => {
          console.error('Error fetching movies:', err);
          // If unauthorized, redirect to login
          if (err.response && err.response.status === 401) {
            navigate('/login');
          }
        });
    } else {
      navigate('/login');
    }

    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const categories = ['all', 'action', 'comedy', 'drama', 'horror', 'romance'];

  const filteredMovies = activeCategory === 'all'
    ? movies
    : movies.filter(movie => movie.genre?.toLowerCase().includes(activeCategory));

  const scrollCarousel = (direction, carouselId) => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const scrollAmount = 300;
      if (direction === 'next') {
        carousel.scrollLeft += scrollAmount;
      } else {
        carousel.scrollLeft -= scrollAmount;
      }
    }
  };

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderCarousel = (title, movieList, carouselId) => (
    <div className="movie-carousel">
      <h3 className="section-title">{title}</h3>
      <button
        className="carousel-btn prev"
        onClick={() => scrollCarousel('prev', carouselId)}
      >
        <FaChevronLeft />
      </button>
      <div className="carousel-container" id={carouselId}>
        {movieList.map(movie => (
          <div key={movie.id} className="glass-movie-card" onClick={() => navigate(`/moviedetails/${movie.id}`)}>
            <img
              src={`http://127.0.0.1:8000${movie.thumbnail}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <div className="movie-title">{movie.title}</div>
              <div className="movie-meta">
                <span>{movie.description ? movie.description.substring(0, 50) + '...' : 'No description'}</span>
                <div className="movie-rating">
                  <FaStar />
                  {parseFloat(movie.rating || 8.5).toFixed(1)}/10
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-btn next"
        onClick={() => scrollCarousel('next', carouselId)}
      >
        <FaChevronRight />
      </button>
    </div>
  );

  return (
    <div className="glass-bg">
      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setSidebarOpen(true)}>
        ☰
      </div>

      {/* Sidebar */}
      <div className={`glass-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <span className="close-btn" onClick={() => setSidebarOpen(false)}>×</span>
        <div className="sidebar-brand">MOOVIX</div>
        <ul className="sidebar-menu">
          <li onClick={() => handleNavigation('/landingpage')}><FaHome /> Home</li>
          <li onClick={() => handleNavigation('/profile')}><FaUser /> Profile</li>
          <li onClick={() => handleNavigation('/movielisting')}><FaSearch /> Browse</li>
          <li onClick={() => handleNavigation('/mywatchlist')}><FaHeart /> Watchlist</li>
          <li onClick={() => handleNavigation('/watchhistory')}><FaHistory /> History</li>
          <li onClick={() => handleNavigation('/change-password')}><FaCog /> Settings</li>
          <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
        </ul>

        {/* User Profile Section */}
        {user && (
          <div className="user-profile">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-name">{user.name || 'User'}</div>
            <div className="user-email">{user.email}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="glass-panel">
        <h2 className="welcome-text">
          Welcome back, {user?.name || 'Movie Lover'}! 🍿
        </h2>

        {/* Categories */}
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Movie Carousels */}
        {movies.length > 0 ? (
          <>
            {renderCarousel('Recommended for You', [...filteredMovies].sort(() => Math.random() - 0.5).slice(0, 10), 'recommended')}
            {renderCarousel('New Releases', [...filteredMovies].sort((a, b) => b.id - a.id).slice(0, 10), 'new-releases')}
          </>
        ) : (
          <div className="no-movies">
            <p>No movies available. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

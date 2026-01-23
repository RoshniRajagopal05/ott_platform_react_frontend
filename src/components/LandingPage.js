
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





















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Navbar from './Navbar';

const LandingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies/')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="landing-page">
        <div className="movie-grid">
          {/* Show only first 6 movies */}
          {movies.slice(0, 6).map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              thumbnail={`http://127.0.0.1:8000${movie.thumbnail}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;

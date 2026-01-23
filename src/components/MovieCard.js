// import React from "react";

// const MovieCard = ({ title, thumbnail }) => {
//   const handleClick = () => {
//     window.location.href = "/login";
//   };

//   return (
//     <div className="movie-card" onClick={handleClick}>
//       <img src={thumbnail} alt={title} />
//       <h3>{title}</h3>
//     </div>
//   );
// };

// export default MovieCard;








import React from "react";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const token = localStorage.getItem("authToken");

  const handleClick = () => {
    // Send movie ID to watch history API
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
      window.location.href = `/moviedetails/${movie.id}`;  // Redirect to movie details
    })
    .catch(error => {
      console.error("Error adding movie to watch history:", error);
    });
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={`http://127.0.0.1:8000/${movie.thumbnail}`} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;

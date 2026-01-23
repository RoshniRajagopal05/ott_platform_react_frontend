







import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(null);
    const token = localStorage.getItem("authToken");

    axios.get(`http://127.0.0.1:8000/api/moviedetail/${id}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => {
      setMovie(res.data);
      console.log(res.data);
    })
    .catch(err => console.error("Error fetching movie:", err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details-container">
      <h1 className="movie-details-title">{movie.title}</h1>

      <video className="movie-details-video" controls>
        <source src={`http://127.0.0.1:8000/${movie.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <p className="movie-details-description">{movie.description}</p>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Movies
      </button>
    </div>
  );
};

export default MovieDetailsPage;



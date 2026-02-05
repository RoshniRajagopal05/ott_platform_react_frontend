import React, { useRef } from "react";

const MoviePoster = ({ movie, setActiveMovie }) => {
  const videoRef = useRef(null);

  return (
    <div
      className="poster-card"
      onMouseEnter={() => {
        setActiveMovie(movie);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
      }}
    >
      {movie.trailer ? (
        <video
          ref={videoRef}
          muted
          loop
          className="poster-video"
          src={`http://127.0.0.1:8000${movie.trailer}`}
        />
      ) : (
        <img
          src={`http://127.0.0.1:8000${movie.thumbnail}`}
          alt={movie.title}
        />
      )}
      <p className="poster-title">{movie.title}</p>
    </div>
  );
};

export default MoviePoster;
